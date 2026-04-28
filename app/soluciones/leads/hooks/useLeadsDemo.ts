"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import {
  SCENARIOS,
  TRADITIONAL_MESSAGES,
  TAGS,
  type LeadItem,
  type DemoMode,
} from "../data";

export interface DisplayLead extends LeadItem {
  id: string;
  visible: boolean;
  analyzing: boolean;
  tagsVisible: boolean;
  scoreVisible: boolean;
}

function generateId() {
  return Math.random().toString(36).slice(2, 9);
}

function createDisplayLead(lead: LeadItem): DisplayLead {
  return {
    ...lead,
    id: generateId(),
    visible: false,
    analyzing: false,
    tagsVisible: false,
    scoreVisible: false,
  };
}

interface ColumnCounts extends Record<string, number> {
  nuevo: number;
  calificado: number;
  listo: number;
}

function countColumns(leads: LeadItem[]): ColumnCounts {
  const counts: ColumnCounts = { nuevo: 0, calificado: 0, listo: 0 };
  leads.forEach((lead) => {
    if (lead.column && counts[lead.column] !== undefined) {
      counts[lead.column]++;
    }
  });
  return counts;
}

export function useLeadsDemo() {
  const [currentScenario, setCurrentScenario] = useState("inmobiliaria");
  const [demoMode, setDemoMode] = useState<DemoMode>("ai");
  const [leads, setLeads] = useState<DisplayLead[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("Esperando leads...");
  const [statusType, setStatusType] = useState<"neutral" | "success" | "danger">("neutral");
  const [columnCounts, setColumnCounts] = useState<ColumnCounts>({ nuevo: 0, calificado: 0, listo: 0 });

  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const isTransitioningRef = useRef(false);
  const currentModeRef = useRef<DemoMode>("ai");

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

  const renderPipeline = useCallback(
    (scenarioKey: string, explicitMode?: DemoMode) => {
      clearAllTimeouts();
      setIsAnimating(true);
      isTransitioningRef.current = true;
      setProgress(0);
      setStatusType("neutral");
      setLeads([]);

      const scenario = SCENARIOS[scenarioKey];
      if (!scenario) return;

      const mode = explicitMode ?? currentModeRef.current;
      const isTraditional = mode === "traditional";
      const sourceLeads = scenario.leads;
      const displayLeads = isTraditional
        ? [...TRADITIONAL_MESSAGES, ...sourceLeads]
        : sourceLeads;

      if (!isTraditional) {
        setColumnCounts(countColumns(sourceLeads));
      } else {
        setColumnCounts({ nuevo: 0, calificado: 0, listo: 0 });
      }

      setStatusText(isTraditional ? "Leads sin clasificar..." : "Recibiendo leads...");

      let delay = 300;
      const total = displayLeads.length;

      displayLeads.forEach((lead, index) => {
        const built = createDisplayLead(lead);

        schedule(() => {
          if (!isTransitioningRef.current) return;

          setLeads((prev) => [...prev, built]);

          schedule(() => {
            setLeads((prev) =>
              prev.map((l) => (l.id === built.id ? { ...l, visible: true } : l))
            );
          }, 50);

          setProgress(Math.round(((index + 1) / total) * 100));

          if (isTraditional || lead.isSystem) return;

          // AI mode: analyzing then score + tags
          if (lead.tags && lead.tags.length > 0) {
            setLeads((prev) =>
              prev.map((l) => (l.id === built.id ? { ...l, analyzing: true } : l))
            );

            schedule(() => {
              setLeads((prev) =>
                prev.map((l) =>
                  l.id === built.id
                    ? { ...l, analyzing: false, scoreVisible: true, tagsVisible: true }
                    : l
                )
              );
            }, 700 + Math.random() * 300);
          }

          if (index === total - 1) {
            schedule(() => {
              if (isTraditional) {
                setStatusText(`❌ ${total} leads sin clasificar. 5 oportunidades perdidas.`);
                setStatusType("danger");
              } else {
                const hotCount = sourceLeads.filter((l) => l.temp === "hot").length;
                setStatusText(`✅ ${total} leads calificados. ${hotCount} hot leads listos para cerrar.`);
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
    [clearAllTimeouts, schedule]
  );

  const changeScenario = useCallback(
    (scenarioKey: string) => {
      if (scenarioKey === currentScenario && !isAnimating) return;
      setCurrentScenario(scenarioKey);
      renderPipeline(scenarioKey);
    },
    [currentScenario, isAnimating, renderPipeline]
  );

  const toggleDemoMode = useCallback(
    (mode: DemoMode) => {
      if (mode === currentModeRef.current) return;
      setDemoMode(mode);
      currentModeRef.current = mode;
      renderPipeline(currentScenario, mode);
    },
    [currentScenario, renderPipeline]
  );

  // Auto-start on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      renderPipeline("inmobiliaria", "ai");
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
    leads,
    isAnimating,
    progress,
    statusText,
    statusType,
    columnCounts,
    scenario,
    changeScenario,
    toggleDemoMode,
    renderPipeline,
    SCENARIOS,
    TAGS,
    COLUMNS: [
      { key: "nuevo", label: "Nuevos", dotColor: "#60a5fa", dotGlow: "rgba(96,165,250,0.4)" },
      { key: "calificado", label: "Calificados", dotColor: "#fbbf24", dotGlow: "rgba(251,191,36,0.4)" },
      { key: "listo", label: "Listos para cerrar", dotColor: "#4ade80", dotGlow: "rgba(74,222,128,0.4)" },
    ] as const,
  };
}
