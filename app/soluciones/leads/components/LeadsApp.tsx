"use client";

import { useRef, useEffect } from "react";
import type { DisplayLead } from "../hooks/useLeadsDemo";
import type { DemoMode } from "../data";

interface Props {
  leads: DisplayLead[];
  demoMode: DemoMode;
  columnCounts: Record<string, number>;
  progress: number;
  statusText: string;
  statusType: "neutral" | "success" | "danger";
  tags: Record<string, { label: string; className: string }>;
  columns: readonly { key: string; label: string; dotColor: string; dotGlow: string }[];
}

function getScoreClass(score: number) {
  if (score >= 80) return { color: "text-green-400", fill: "bg-green-400" };
  if (score >= 50) return { color: "text-amber-400", fill: "bg-amber-400" };
  return { color: "text-red-400", fill: "bg-red-400" };
}

function LeadCard({
  lead,
  demoMode,
  tags,
}: {
  lead: DisplayLead;
  demoMode: DemoMode;
  tags: Record<string, { label: string; className: string }>;
}) {
  const isTraditional = demoMode === "traditional";
  const scoreStyle = getScoreClass(lead.score);

  return (
    <div
      className={`rounded-lg border border-transparent p-3 transition-all md:p-3.5 ${
        lead.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
      } ${
        lead.isSystem
          ? "border-dashed border-red-500/15 bg-red-500/[0.04]"
          : "bg-white/[0.03] hover:border-white/[0.1] hover:bg-white/[0.06] hover:-translate-y-px"
      } ${lead.analyzing ? "border-blue-500/10 bg-blue-500/[0.04]" : ""}`}
      style={{ transitionDuration: "450ms" }}
    >
      <div className="mb-1.5 flex items-center justify-between gap-2">
        <span
          className={`truncate text-sm ${
            lead.isSystem ? "text-red-400/80" : "font-bold text-white"
          }`}
        >
          {lead.name}
        </span>
        <span className="shrink-0 text-[10px] text-[#7a8ba5]">{lead.time}</span>
      </div>
      <p
        className={`mb-2.5 line-clamp-2 text-xs leading-relaxed ${
          lead.isSystem ? "italic text-red-400/50" : "text-[#7a8ba5]/80"
        }`}
      >
        {lead.preview}
      </p>

      {/* AI mode footer: score + tags */}
      {!lead.isSystem && demoMode === "ai" && (
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-bold text-[#7a8ba5]">Score</span>
            <div className="h-1 w-10 overflow-hidden rounded-full bg-white/[0.08]">
              <div
                className={`h-full rounded-full transition-all ${scoreStyle.fill}`}
                style={{
                  width: lead.scoreVisible ? `${lead.score}%` : "0%",
                  transitionDuration: "600ms",
                }}
              />
            </div>
            <span className={`text-[10px] font-bold ${scoreStyle.color}`}>{lead.score}</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {lead.tagsVisible &&
              lead.tags.map((tagKey) => {
                const tag = tags[tagKey];
                if (!tag) return null;
                return (
                  <span
                    key={tagKey}
                    className={`rounded-full border px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide transition-all ${tag.className} ${
                      lead.tagsVisible ? "scale-100 opacity-100" : "scale-75 opacity-0"
                    }`}
                    style={{
                      transitionDuration: "300ms",
                      transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
                    }}
                  >
                    {tag.label}
                  </span>
                );
              })}
          </div>
        </div>
      )}

      {/* Analyzing indicator */}
      {lead.analyzing && (
        <div className="flex items-center gap-2 text-xs italic text-[#3b82f6]">
          <span>Analizando intención</span>
          <span className="flex gap-1">
            <span className="h-1 w-1 animate-bounce rounded-full bg-[#3b82f6]" style={{ animationDelay: "0ms" }} />
            <span className="h-1 w-1 animate-bounce rounded-full bg-[#3b82f6]" style={{ animationDelay: "200ms" }} />
            <span className="h-1 w-1 animate-bounce rounded-full bg-[#3b82f6]" style={{ animationDelay: "400ms" }} />
          </span>
        </div>
      )}
    </div>
  );
}

export default function LeadsApp({
  leads,
  demoMode,
  columnCounts,
  progress,
  statusText,
  statusType,
  tags,
  columns,
}: Props) {
  const isTraditional = demoMode === "traditional";
  const colRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Scroll columns to bottom when new leads arrive
  useEffect(() => {
    if (!isTraditional) {
      columns.forEach((col) => {
        const el = colRefs.current[col.key];
        if (el) el.scrollTop = el.scrollHeight;
      });
    }
  }, [leads, isTraditional, columns]);

  return (
    <div className="w-full max-w-[860px] overflow-hidden rounded-xl border border-white/[0.06] bg-[#0f0f1a] shadow-[0_24px_64px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.03)]">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 border-b border-white/[0.06] bg-gradient-to-b from-[#0c0c18] to-[#080810] px-4 py-3.5 md:px-5">
        <div className="flex items-center gap-2.5">
          <span className="text-xl">📊</span>
          <span className="text-sm font-bold text-white">Pipeline de Leads</span>
          <span className="rounded-full bg-blue-500/10 px-2.5 py-0.5 text-[10px] font-bold tracking-wide text-[#3b82f6]">
            INERTI
          </span>
        </div>
        <div className="hidden items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.04] px-3.5 py-1.5 text-xs text-[#7a8ba5] md:flex">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <span>Buscar leads...</span>
        </div>
      </div>

      {/* Body — altura fija */}
      <div className="h-[520px] md:h-[580px] overflow-hidden">
        {/* Kanban Board (AI mode) */}
        {!isTraditional && (
          <div className="grid h-full grid-cols-1 gap-2.5 p-3 md:grid-cols-3 md:gap-3 md:p-4">
            {columns.map((col) => {
              const colLeads = leads.filter((l) => l.column === col.key && !l.isSystem);
              return (
                <div
                  key={col.key}
                  className="flex min-h-0 flex-col rounded-lg border border-white/[0.06] bg-white/[0.015]"
                >
                  {/* Column Header */}
                  <div className="flex items-center gap-2 border-b border-white/[0.06] px-3 py-2.5 text-xs font-semibold">
                    <span
                      className="h-2 w-2 shrink-0 rounded-full"
                      style={{
                        background: col.dotColor,
                        boxShadow: `0 0 6px ${col.dotGlow}`,
                      }}
                    />
                    <span className="min-w-0 flex-1 truncate text-white">{col.label}</span>
                    <span className="shrink-0 rounded-full bg-white/[0.08] px-2 py-0.5 text-[10px] font-bold text-[#7a8ba5]">
                      {columnCounts[col.key] ?? 0}
                    </span>
                  </div>
                  {/* Column Content */}
                  <div
                    ref={(el) => { colRefs.current[col.key] = el; }}
                    className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto p-2.5"
                  >
                    {colLeads.map((lead) => (
                      <LeadCard key={lead.id} lead={lead} demoMode={demoMode} tags={tags} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Traditional List */}
        {isTraditional && (
          <div className="flex h-full flex-col gap-2 overflow-y-auto p-3 md:p-4">
            {leads.length === 0 && (
              <div className="flex h-full flex-col items-center justify-center p-10 text-center text-[#7a8ba5]">
                <span className="mb-3 text-5xl opacity-50">📭</span>
                <p className="max-w-[240px] text-sm leading-relaxed">
                  Selecciona un escenario para ver los leads entrantes
                </p>
              </div>
            )}
            {leads.map((lead) => (
              <LeadCard key={lead.id} lead={lead} demoMode={demoMode} tags={tags} />
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex min-h-[48px] items-center justify-between gap-4 border-t border-white/[0.06] bg-gradient-to-b from-[#080810] to-[#0c0c18] px-4 py-3 md:px-5">
        <span
          className={`text-xs transition-colors ${
            statusType === "success"
              ? "text-green-400"
              : statusType === "danger"
                ? "text-red-400"
                : "text-[#7a8ba5]"
          }`}
        >
          {statusText}
        </span>
        <div
          className={`h-1 w-[120px] overflow-hidden rounded-full bg-white/[0.06] ${
            progress > 0 && progress < 100 ? "block" : "hidden"
          }`}
        >
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] transition-all"
            style={{ width: `${progress}%`, transitionDuration: "400ms" }}
          />
        </div>
      </div>
    </div>
  );
}
