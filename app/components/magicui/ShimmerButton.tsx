"use client";

import React from "react";

interface ShimmerButtonProps {
  children: React.ReactNode;
  className?: string;
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
}

export default function ShimmerButton({
  children,
  className = "",
  shimmerColor = "#8b5cf6",
  shimmerSize = "0.15em",
  borderRadius = "10px",
  shimmerDuration = "3s",
  href,
  target,
  rel,
  onClick,
}: ShimmerButtonProps) {
  const style = {
    "--shimmer-color": shimmerColor,
    "--shimmer-size": shimmerSize,
    "--radius": borderRadius,
    "--shimmer-duration": shimmerDuration,
  } as React.CSSProperties;

  const buttonContent = (
    <>
      <div className="absolute inset-0 -z-10 overflow-hidden rounded-[var(--radius)]">
        <div
          className="absolute inset-[-100%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,var(--shimmer-color)_50%,transparent_100%)]"
          style={{ animationDuration: shimmerDuration }}
        />
      </div>
      <div className="absolute inset-[2px] -z-10 rounded-[calc(var(--radius)-2px)] bg-[#3b82f6]" />
      <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        className={`group relative inline-flex cursor-pointer overflow-hidden rounded-[var(--radius)] px-9 py-4 text-lg font-semibold text-white transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] ${className}`}
        style={style}
      >
        {buttonContent}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`group relative inline-flex cursor-pointer overflow-hidden rounded-[var(--radius)] px-9 py-4 text-lg font-semibold text-white transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] ${className}`}
      style={style}
    >
      {buttonContent}
    </button>
  );
}
