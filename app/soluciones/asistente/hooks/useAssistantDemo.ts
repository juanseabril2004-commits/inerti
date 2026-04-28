"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import {
  SCENARIOS,
  TRADITIONAL_MESSAGES,
  type ChatMessage,
  type DemoMode,
} from "../data";

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

function getTimeString() {
  const now = new Date();
  const h = now.getHours();
  const m = now.getMinutes().toString().padStart(2, "0");
  return `${h}:${m}`;
}

function createDemoMessage(msg: ChatMessage): DemoMessage {
  return {
    ...msg,
    id: generateId(),
    time: getTimeString(),
  };
}

export function useAssistantDemo() {
  const [currentScenario, setCurrentScenario] = useState("tienda");
  const [demoMode, setDemoMode] = useState<DemoMode>("ai");
  const [tryMode, setTryMode] = useState(false);
  const [messages, setMessages] = useState<DemoMessage[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showTyping, setShowTyping] = useState(false);
  const [showChips, setShowChips] = useState(false);
  const [availableChips, setAvailableChips] = useState<{ q: string; a: ChatMessage }[]>([]);

  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const isTransitioningRef = useRef(false);
  const currentModeRef = useRef<DemoMode>("ai");
  const bodyRef = useRef<HTMLDivElement>(null);

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

  const startConversation = useCallback(
    (msgs: ChatMessage[], mode: DemoMode, scenarioKey: string) => {
      setShowChips(false);
      setShowTyping(false);
      setMessages([]);
      setIsAnimating(true);
      isTransitioningRef.current = true;

      const scenario = SCENARIOS[scenarioKey];

      let delay = 400;

      msgs.forEach((msg, index) => {
        const isLast = index === msgs.length - 1;
        const isBot = msg.type === "in" && !msg.isSystem;

        schedule(() => {
          if (!isTransitioningRef.current) return;

          if (isBot && mode === "ai") {
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
                if (mode === "ai" && scenario) {
                  schedule(() => {
                    setAvailableChips(scenario.chips);
                    setShowChips(true);
                  }, 500);
                }
              }
            }, BOT_TYPING_MIN + Math.random() * (BOT_TYPING_MAX - BOT_TYPING_MIN));
          } else {
            setMessages((prev) => [...prev, createDemoMessage(msg)]);
            scrollToBottom();

            if (isLast) {
              setIsAnimating(false);
              isTransitioningRef.current = false;
              if (mode === "ai" && !tryMode && scenario) {
                schedule(() => {
                  setAvailableChips(scenario.chips);
                  setShowChips(true);
                }, 500);
              }
            }
          }
        }, delay);

        const baseDelay =
          index === 0
            ? 400
            : msg.type === "in"
              ? mode === "ai"
                ? 1400
                : 2200
              : 950;

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
    (scenarioKey: string, explicitMode?: DemoMode) => {
      clearAllTimeouts();
      setTryMode(false);

      const scenario = SCENARIOS[scenarioKey];
      if (!scenario) return;

      setCurrentScenario(scenarioKey);
      const mode = explicitMode ?? currentModeRef.current;
      const msgs =
        mode === "ai"
          ? [{ type: "in" as const, text: scenario.welcome }, ...scenario.messages]
          : TRADITIONAL_MESSAGES[scenarioKey] || [];

      startConversation(msgs, mode, scenarioKey);
    },
    [clearAllTimeouts, startConversation]
  );

  const handleChipClick = useCallback(
    (chip: { q: string; a: ChatMessage }) => {
      if (isAnimating) return;
      setIsAnimating(true);

      setMessages((prev) => [...prev, createDemoMessage({ type: "out", text: chip.q })]);
      scrollToBottom();

      schedule(() => {
        setShowTyping(true);
        scrollToBottom();

        schedule(() => {
          setShowTyping(false);
          setMessages((prev) => [...prev, createDemoMessage(chip.a)]);
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

      const scenario = SCENARIOS[currentScenario];
      if (scenario) {
        const welcome = createDemoMessage({
          type: "in",
          text: `¡Buenos días! Soy tu asistente de ${scenario.name}. Elige una pregunta y mira cómo te ayudo 😊`,
        });
        setMessages([welcome]);
        schedule(() => {
          setAvailableChips(scenario.chips);
          setShowChips(true);
        }, 500);
      }
    } else {
      setShowChips(false);
      renderConversation(currentScenario);
    }
  }, [tryMode, currentScenario, clearAllTimeouts, schedule, renderConversation]);

  const changeScenario = useCallback(
    (scenarioKey: string) => {
      if (scenarioKey === currentScenario && !isAnimating && !tryMode) return;
      setCurrentScenario(scenarioKey);
      setTryMode(false);
      renderConversation(scenarioKey);
    },
    [currentScenario, isAnimating, tryMode, renderConversation]
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

      const scenarioKey = currentScenario;
      const scenario = SCENARIOS[scenarioKey];
      if (!scenario) return;

      const msgs =
        mode === "ai"
          ? [{ type: "in" as const, text: scenario.welcome }, ...scenario.messages]
          : TRADITIONAL_MESSAGES[scenarioKey] || [];

      startConversation(msgs, mode, scenarioKey);
    },
    [tryMode, currentScenario, clearAllTimeouts, startConversation]
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      const scenario = SCENARIOS.tienda;
      if (scenario) {
        startConversation(
          [{ type: "in", text: scenario.welcome }, ...scenario.messages],
          "ai",
          "tienda"
        );
      }
    }, 500);
    return () => {
      clearTimeout(timer);
      clearAllTimeouts();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scenario = SCENARIOS[currentScenario];

  return {
    currentScenario,
    demoMode,
    tryMode,
    messages,
    isAnimating,
    showTyping,
    showChips,
    availableChips,
    scenario,
    bodyRef,
    changeScenario,
    toggleDemoMode,
    toggleTryMode,
    handleChipClick,
    SCENARIOS,
  };
}
