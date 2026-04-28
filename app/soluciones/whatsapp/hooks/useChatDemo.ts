"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import {
  RUBROS,
  TRADITIONAL_MESSAGES,
  getTimeString,
  type ChatMessage,
  type QuickReplyChip,
} from "../data";

export type DemoMode = "ai" | "traditional";

export interface DemoMessage extends ChatMessage {
  id: string;
  time: string;
}

const READING_DELAY = 1100;
const BOT_TYPING_MIN = 900;
const BOT_TYPING_MAX = 1600;

function generateId() {
  return Math.random().toString(36).slice(2, 9);
}

function createDemoMessage(msg: ChatMessage): DemoMessage {
  return {
    ...msg,
    id: generateId(),
    time: getTimeString(),
  };
}

export function useChatDemo() {
  const [currentRubro, setCurrentRubro] = useState("ferreteria");
  const [demoMode, setDemoMode] = useState<DemoMode>("ai");
  const [tryMode, setTryMode] = useState(false);
  const [messages, setMessages] = useState<DemoMessage[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showTyping, setShowTyping] = useState(false);
  const [showChips, setShowChips] = useState(false);
  const [availableChips, setAvailableChips] = useState<QuickReplyChip[]>([]);

  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const isTransitioningRef = useRef(false);
  const currentModeRef = useRef<DemoMode>("ai");
  const bodyRef = useRef<HTMLDivElement>(null);

  // Keep ref in sync
  currentModeRef.current = demoMode;

  const clearAllTimeouts = useCallback(() => {
    timeoutsRef.current.forEach((id) => clearTimeout(id));
    timeoutsRef.current = [];
  }, []);

  const schedule = useCallback((fn: () => void, delay: number) => {
    const id = setTimeout(() => {
      const idx = timeoutsRef.current.indexOf(id);
      if (idx > -1) timeoutsRef.current.splice(idx, 1);
      fn();
    }, delay);
    timeoutsRef.current.push(id);
  }, []);

  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      if (bodyRef.current) {
        bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
      }
    });
  }, []);

  // Core conversation renderer — takes mode explicitly to avoid closure staleness
  const startConversation = useCallback(
    (msgs: ChatMessage[], mode: DemoMode, rubroKey: string) => {
      setShowChips(false);
      setShowTyping(false);
      setMessages([]);
      setIsAnimating(true);
      isTransitioningRef.current = true;

      const rubro = RUBROS[rubroKey];

      let delay = 400;

      msgs.forEach((msg, index) => {
        const isLast = index === msgs.length - 1;
        const isBot = msg.type === "in" && !msg.isSystem;

        schedule(() => {
          if (!isTransitioningRef.current) return;

          if (isBot && mode === "ai") {
            // Bot typing animation
            setShowTyping(true);
            scrollToBottom();

            schedule(() => {
              if (!isTransitioningRef.current) return;
              setShowTyping(false);
              setMessages((prev) => [...prev, createDemoMessage(msg)]);
              scrollToBottom();

              if (isLast) {
                setIsAnimating(false);
                isTransitioningRef.current = false;
                if (mode === "ai" && rubro) {
                  schedule(() => {
                    setAvailableChips(rubro.chips);
                    setShowChips(true);
                  }, 500);
                }
              }
            }, BOT_TYPING_MIN + Math.random() * (BOT_TYPING_MAX - BOT_TYPING_MIN));
          } else {
            // System or user message
            setMessages((prev) => [...prev, createDemoMessage(msg)]);
            scrollToBottom();

            if (isLast) {
              setIsAnimating(false);
              isTransitioningRef.current = false;
              if (mode === "ai" && !tryMode && rubro) {
                schedule(() => {
                  setAvailableChips(rubro.chips);
                  setShowChips(true);
                }, 500);
              }
            }
          }
        }, delay);

        // Calculate delay for NEXT message
        const baseDelay =
          index === 0
            ? 400
            : msg.type === "in"
              ? mode === "ai"
                ? 1400
                : 2200
              : 950;

        // After a bot message, add reading delay before the user responds
        const readingPause =
          msg.type === "in" && !isLast && msgs[index + 1]?.type === "out"
            ? READING_DELAY
            : 0;

        delay += baseDelay + readingPause + (Math.random() * 120 - 60);
      });
    },
    [schedule, scrollToBottom]
  );

  const renderConversation = useCallback(
    (rubroKey: string, explicitMode?: DemoMode) => {
      clearAllTimeouts();
      setTryMode(false);

      const rubro = RUBROS[rubroKey];
      if (!rubro) return;

      setCurrentRubro(rubroKey);
      const mode = explicitMode ?? currentModeRef.current;
      const msgs =
        mode === "ai"
          ? rubro.messages
          : TRADITIONAL_MESSAGES[rubroKey] || [];

      startConversation(msgs, mode, rubroKey);
    },
    [clearAllTimeouts, startConversation]
  );

  const handleChipClick = useCallback(
    (chip: QuickReplyChip) => {
      if (isAnimating) return;
      setIsAnimating(true);

      setMessages((prev) => [...prev, createDemoMessage({ type: "out", text: chip.q })]);
      scrollToBottom();

      schedule(() => {
        setShowTyping(true);
        scrollToBottom();

        schedule(() => {
          setShowTyping(false);
          setMessages((prev) => [...prev, createDemoMessage({ type: "in", text: chip.a })]);
          scrollToBottom();
          setIsAnimating(false);
        }, BOT_TYPING_MIN + Math.random() * 600);
      }, 350);
    },
    [isAnimating, schedule, scrollToBottom]
  );

  const toggleTryMode = useCallback(() => {
    if (currentModeRef.current === "traditional") return;

    clearAllTimeouts();
    const newTryMode = !tryMode;
    setTryMode(newTryMode);

    if (newTryMode) {
      setMessages([]);
      setShowTyping(false);
      setIsAnimating(false);
      isTransitioningRef.current = false;

      const rubro = RUBROS[currentRubro];
      if (rubro) {
        const welcome = createDemoMessage({
          type: "in",
          text: `¡Hola! Soy el asistente de ${rubro.name}. Elige una pregunta y mira cómo respondo 😊`,
        });
        setMessages([welcome]);
        schedule(() => {
          setAvailableChips(rubro.chips);
          setShowChips(true);
        }, 500);
      }
    } else {
      setShowChips(false);
      renderConversation(currentRubro);
    }
  }, [tryMode, currentRubro, clearAllTimeouts, schedule, renderConversation]);

  const changeRubro = useCallback(
    (rubroKey: string) => {
      if (rubroKey === currentRubro && !isAnimating && !tryMode) return;
      setCurrentRubro(rubroKey);
      setTryMode(false);
      renderConversation(rubroKey);
    },
    [currentRubro, isAnimating, tryMode, renderConversation]
  );

  const toggleDemoMode = useCallback(
    (mode: DemoMode) => {
      if (mode === currentModeRef.current) return;
      setDemoMode(mode);
      currentModeRef.current = mode;
      clearAllTimeouts();
      setShowChips(false);
      setShowTyping(false);
      setMessages([]);
      setIsAnimating(false);
      isTransitioningRef.current = false;

      if (tryMode && mode === "traditional") {
        setTryMode(false);
      }

      // Force immediate render with the new mode
      const rubroKey = currentRubro;
      const rubro = RUBROS[rubroKey];
      if (!rubro) return;

      const msgs =
        mode === "ai"
          ? rubro.messages
          : TRADITIONAL_MESSAGES[rubroKey] || [];

      startConversation(msgs, mode, rubroKey);
    },
    [tryMode, currentRubro, clearAllTimeouts, startConversation]
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      startConversation(RUBROS.ferreteria.messages, "ai", "ferreteria");
    }, 500);
    return () => {
      clearTimeout(timer);
      clearAllTimeouts();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const rubro = RUBROS[currentRubro];

  return {
    currentRubro,
    demoMode,
    tryMode,
    messages,
    isAnimating,
    showTyping,
    showChips,
    availableChips,
    rubro,
    bodyRef,
    changeRubro,
    toggleDemoMode,
    toggleTryMode,
    handleChipClick,
    RUBROS,
  };
}
