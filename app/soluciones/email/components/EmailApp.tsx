"use client";

import { useRef, useEffect } from "react";
import type { DisplayEmail } from "../hooks/useEmailDemo";
import type { DemoMode, EmailTag } from "../data";

interface Props {
  emails: DisplayEmail[];
  demoMode: DemoMode;
  activeFilter: string;
  tagCounts: Record<string, number>;
  progress: number;
  statusText: string;
  statusType: "neutral" | "success" | "danger";
  listRef: React.RefObject<HTMLDivElement | null>;
  onFilterChange: (filter: string) => void;
  tags: Record<string, EmailTag>;
  filters: readonly { key: string; label: string; icon: string }[];
}

export default function EmailApp({
  emails,
  demoMode,
  activeFilter,
  tagCounts,
  progress,
  statusText,
  statusType,
  listRef,
  onFilterChange,
  tags,
  filters,
}: Props) {
  const isTraditional = demoMode === "traditional";

  const visibleEmails = emails.filter((email) => {
    if (activeFilter === "all") return true;
    return email.tags.includes(activeFilter);
  });

  return (
    <div className="w-full max-w-[760px] overflow-hidden rounded-xl border border-white/[0.06] bg-[#0f0f1a] shadow-[0_24px_64px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.03)]">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 border-b border-white/[0.06] bg-gradient-to-b from-[#0c0c18] to-[#080810] px-4 py-3.5 md:px-5">
        <div className="flex items-center gap-2.5">
          <span className="text-xl">📧</span>
          <span className="text-sm font-bold text-white">Bandeja de Entrada</span>
          <span className="rounded-full bg-blue-500/10 px-2.5 py-0.5 text-[10px] font-bold tracking-wide text-[#3b82f6]">
            INERTI
          </span>
        </div>
        <div className="hidden items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.04] px-3.5 py-1.5 text-xs text-[#7a8ba5] md:flex">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <span>Buscar en correos...</span>
        </div>
      </div>

      {/* Body — altura fija para evitar estiramiento al cargar correos */}
      <div className="flex h-[520px] md:h-[560px]">
        {/* Filters */}
        <div
          className={`flex w-[52px] shrink-0 flex-col gap-1 border-r border-white/[0.06] bg-white/[0.015] p-2 md:w-[180px] md:p-3 ${
            isTraditional ? "opacity-50 pointer-events-none" : ""
          }`}
        >
          {filters.map((filter) => {
            const isActive = activeFilter === filter.key;
            const count = tagCounts[filter.key] ?? 0;
            return (
              <button
                key={filter.key}
                onClick={() => onFilterChange(filter.key)}
                className={`flex items-center gap-2.5 rounded-md px-2.5 py-2 text-xs transition-all md:px-3 ${
                  isActive
                    ? "bg-blue-500/10 font-semibold text-[#3b82f6]"
                    : "text-[#7a8ba5] hover:bg-white/[0.04] hover:text-white"
                }`}
              >
                <span>{filter.icon}</span>
                <span className="hidden md:inline">{filter.label}</span>
                <span
                  className={`ml-auto hidden min-w-[22px] rounded-full px-2 py-0.5 text-center text-[10px] font-bold md:inline ${
                    isActive ? "bg-blue-500/10 text-[#3b82f6]" : "bg-white/[0.08] text-[#7a8ba5]"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Email List */}
        <div
          ref={listRef}
          className="flex-1 overflow-y-auto p-2 md:p-3"
          style={{
            background:
              "radial-gradient(circle, rgba(20,20,30,0.5) 1px, transparent 1px) 0 0 / 24px 24px, #080810",
          }}
        >
          {emails.length === 0 && (
            <div className="flex h-full flex-col items-center justify-center p-10 text-center text-[#7a8ba5]">
              <span className="mb-3 text-5xl opacity-50">📭</span>
              <p className="max-w-[240px] text-sm leading-relaxed">
                Selecciona un escenario para ver los correos entrantes
              </p>
            </div>
          )}

          {visibleEmails.map((email) => (
            <div
              key={email.id}
              data-tags={email.tags.join(" ")}
              className={`mb-1.5 flex items-start gap-3 rounded-lg border border-transparent p-3.5 transition-all md:p-4 ${
                email.visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3"
              } ${
                email.isSystem
                  ? "border-dashed border-red-500/15 bg-red-500/[0.04]"
                  : isTraditional && !email.isSystem
                    ? "bg-white/[0.04]"
                    : "bg-white/[0.02] hover:border-white/[0.06] hover:bg-white/[0.05]"
              } ${email.analyzing ? "border-blue-500/10 bg-blue-500/[0.04]" : ""}`}
              style={{ transitionDuration: "450ms" }}
            >
              {/* Avatar */}
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold uppercase text-white ${
                  email.isSystem
                    ? "bg-gradient-to-br from-green-500/20 to-blue-500/15"
                    : "bg-gradient-to-br from-blue-500/20 to-violet-500/15"
                }`}
              >
                {email.initials}
              </div>

              {/* Content */}
              <div className="min-w-0 flex-1">
                <div className="mb-1 flex items-center justify-between gap-2">
                  <span
                    className={`truncate text-sm ${
                      isTraditional && !email.isSystem ? "font-bold text-white" : "font-semibold text-white"
                    }`}
                  >
                    {email.sender}
                  </span>
                  <span className="shrink-0 text-[10px] text-[#7a8ba5]">{email.time}</span>
                </div>
                <div
                  className={`mb-1.5 truncate text-xs ${
                    isTraditional && !email.isSystem ? "font-bold text-white" : "text-[#7a8ba5]"
                  }`}
                >
                  {email.subject}
                </div>
                <p className="line-clamp-2 text-xs leading-relaxed text-[#7a8ba5]/70">{email.preview}</p>

                {/* Tags */}
                <div className="mt-2 flex min-h-[22px] flex-wrap gap-1.5">
                  {email.analyzing && (
                    <div className="flex items-center gap-2 text-xs italic text-[#3b82f6]">
                      <span>Analizando contenido</span>
                      <span className="flex gap-1">
                        <span className="h-1 w-1 animate-bounce rounded-full bg-[#3b82f6]" style={{ animationDelay: "0ms" }} />
                        <span className="h-1 w-1 animate-bounce rounded-full bg-[#3b82f6]" style={{ animationDelay: "200ms" }} />
                        <span className="h-1 w-1 animate-bounce rounded-full bg-[#3b82f6]" style={{ animationDelay: "400ms" }} />
                      </span>
                    </div>
                  )}
                  {email.tagsVisible &&
                    email.tags.map((tagKey) => {
                      const tag = tags[tagKey];
                      if (!tag) return null;
                      return (
                        <span
                          key={tagKey}
                          className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide transition-all ${tag.className} ${
                            email.tagsVisible ? "scale-100 opacity-100" : "scale-75 opacity-0"
                          }`}
                          style={{ transitionDuration: "300ms", transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)" }}
                        >
                          {tag.label}
                        </span>
                      );
                    })}
                </div>
              </div>
            </div>
          ))}
        </div>
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
