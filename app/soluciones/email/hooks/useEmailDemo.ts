"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import {
  SCENARIOS,
  TRADITIONAL_MESSAGES,
  TAGS,
  type Scenario,
  type EmailItem,
  type DemoMode,
} from "../data";

export interface DisplayEmail extends EmailItem {
  id: string;
  visible: boolean;
  analyzing: boolean;
  tagsVisible: boolean;
}

function generateId() {
  return Math.random().toString(36).slice(2, 9);
}

function createDisplayEmail(email: EmailItem): DisplayEmail {
  return {
    ...email,
    id: generateId(),
    visible: false,
    analyzing: false,
    tagsVisible: false,
  };
}

interface TagCounts extends Record<string, number> {
  all: number;
  urgent: number;
  client: number;
  provider: number;
  internal: number;
  spam: number;
}

function countTags(emails: EmailItem[]): TagCounts {
  const counts: TagCounts = { all: emails.length, urgent: 0, client: 0, provider: 0, internal: 0, spam: 0 };
  emails.forEach((email) => {
    email.tags.forEach((tag) => {
      if (tag in counts) {
        counts[tag as keyof TagCounts]++;
      }
    });
  });
  return counts;
}

export function useEmailDemo() {
  const [currentScenario, setCurrentScenario] = useState("ecommerce");
  const [demoMode, setDemoMode] = useState<DemoMode>("ai");
  const [emails, setEmails] = useState<DisplayEmail[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("Esperando correos...");
  const [statusType, setStatusType] = useState<"neutral" | "success" | "danger">("neutral");
  const [tagCounts, setTagCounts] = useState<TagCounts>({ all: 0, urgent: 0, client: 0, provider: 0, internal: 0, spam: 0 });
  const [hasStarted, setHasStarted] = useState(false);

  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const isTransitioningRef = useRef(false);
  const currentModeRef = useRef<DemoMode>("ai");
  const listRef = useRef<HTMLDivElement>(null);

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
      if (listRef.current) {
        listRef.current.scrollTop = listRef.current.scrollHeight;
      }
    });
  }, []);

  const renderInbox = useCallback(
    (scenarioKey: string, explicitMode?: DemoMode) => {
      clearAllTimeouts();
      setIsAnimating(true);
      isTransitioningRef.current = true;
      setActiveFilter("all");
      setProgress(0);
      setStatusType("neutral");
      setEmails([]);

      const scenario = SCENARIOS[scenarioKey];
      if (!scenario) return;

      const mode = explicitMode ?? currentModeRef.current;
      const isTraditional = mode === "traditional";
      const sourceEmails = scenario.emails;
      const displayEmails = isTraditional
        ? [...TRADITIONAL_MESSAGES, ...sourceEmails]
        : sourceEmails;

      if (!isTraditional) {
        setTagCounts(countTags(sourceEmails));
      } else {
        setTagCounts({ all: displayEmails.length, urgent: 0, client: 0, provider: 0, internal: 0, spam: 0 });
      }

      setStatusText(isTraditional ? "Bandeja sin clasificar..." : "Recibiendo correos...");

      let delay = 300;
      const total = displayEmails.length;

      displayEmails.forEach((email, index) => {
        const built = createDisplayEmail(email);

        schedule(() => {
          if (!isTransitioningRef.current) return;

          setEmails((prev) => {
            const updated = [...prev, built];
            return updated;
          });

          schedule(() => {
            setEmails((prev) =>
              prev.map((e) => (e.id === built.id ? { ...e, visible: true } : e))
            );
            scrollToBottom();
          }, 50);

          setProgress(Math.round(((index + 1) / total) * 100));

          if (isTraditional) return;

          // AI mode: analyzing then tags
          if (email.tags && email.tags.length > 0) {
            setEmails((prev) =>
              prev.map((e) => (e.id === built.id ? { ...e, analyzing: true } : e))
            );

            schedule(() => {
              setEmails((prev) =>
                prev.map((e) =>
                  e.id === built.id
                    ? { ...e, analyzing: false, tagsVisible: true }
                    : e
                )
              );
            }, 700 + Math.random() * 300);
          }

          if (index === total - 1) {
            schedule(() => {
              if (isTraditional) {
                setStatusText(`❌ ${total} emails sin clasificar. 8 urgentes perdidos.`);
                setStatusType("danger");
              } else {
                const counts = countTags(sourceEmails);
                setStatusText(`✅ ${total} emails clasificados. ${counts.urgent} urgentes priorizados.`);
                setStatusType("success");
              }
              setIsAnimating(false);
              isTransitioningRef.current = false;
            }, 900);
          }
        }, delay);

        delay += 1100;
      });
    },
    [clearAllTimeouts, schedule, scrollToBottom]
  );

  const changeScenario = useCallback(
    (scenarioKey: string) => {
      if (scenarioKey === currentScenario && !isAnimating) return;
      setCurrentScenario(scenarioKey);
      renderInbox(scenarioKey);
    },
    [currentScenario, isAnimating, renderInbox]
  );

  const toggleDemoMode = useCallback(
    (mode: DemoMode) => {
      if (mode === currentModeRef.current) return;
      setDemoMode(mode);
      currentModeRef.current = mode;
      renderInbox(currentScenario, mode);
    },
    [currentScenario, renderInbox]
  );

  const applyFilter = useCallback((filterKey: string) => {
    setActiveFilter(filterKey);
  }, []);

  const getVisibleEmails = useCallback(() => {
    return emails.filter((email) => {
      if (activeFilter === "all") return true;
      return email.tags.includes(activeFilter);
    });
  }, [emails, activeFilter]);

  // Auto-start on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasStarted(true);
      renderInbox("ecommerce", "ai");
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
    emails,
    isAnimating,
    activeFilter,
    progress,
    statusText,
    statusType,
    tagCounts,
    scenario,
    listRef,
    changeScenario,
    toggleDemoMode,
    applyFilter,
    getVisibleEmails,
    hasStarted,
    SCENARIOS,
    TAGS,
    FILTERS: [
      { key: "all", label: "Recibidos", icon: "📥" },
      { key: "urgent", label: "Urgentes", icon: "🔴" },
      { key: "client", label: "Clientes", icon: "👤" },
      { key: "provider", label: "Proveedores", icon: "🏭" },
      { key: "internal", label: "Internos", icon: "📢" },
      { key: "spam", label: "Spam", icon: "🚫" },
    ] as const,
  };
}
