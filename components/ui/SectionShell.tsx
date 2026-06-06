"use client";

import { motion } from "framer-motion";
import type { PropsWithChildren, ReactNode } from "react";

type SectionShellProps = PropsWithChildren<{
  id: string;
  index?: string;
  eyebrow?: string;
  title?: ReactNode;
  subtitle?: ReactNode;
  tone?: "default" | "deep";
  className?: string;
  contentClassName?: string;
}>;

export function SectionShell({
  id,
  index,
  eyebrow,
  title,
  subtitle,
  tone = "default",
  className = "",
  contentClassName = "",
  children,
}: SectionShellProps) {
  const bg = tone === "deep" ? "bg-bg-deep" : "bg-bg";
  return (
    <section
      id={id}
      className={`relative ${bg} border-t border-line ${className}`}
    >
      <div className="absolute inset-0 grid-overlay opacity-40 pointer-events-none" />
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        className="relative max-w-6xl mx-auto px-6 py-32 md:py-48"
      >
        {(index || eyebrow) && (
          <div className="flex items-center gap-3 text-[11px] mono uppercase tracking-[0.22em] text-ink-dim mb-6">
            {index && (
              <span className="text-cyan">
                {index} <span className="text-ink-muted">/ 10</span>
              </span>
            )}
            {index && eyebrow && (
              <span className="h-px w-8 bg-line-strong" aria-hidden />
            )}
            {eyebrow && <span>{eyebrow}</span>}
          </div>
        )}
        {title && (
          <h2 className="text-3xl md:text-5xl font-semibold leading-[1.05] tracking-tighter max-w-3xl gradient-text text-balance">
            {title}
          </h2>
        )}
        {subtitle && (
          <p className="mt-5 max-w-2xl text-ink-dim text-base md:text-lg">{subtitle}</p>
        )}
        <div className={`${title || subtitle ? "mt-14" : ""} ${contentClassName}`}>
          {children}
        </div>
      </motion.div>
    </section>
  );
}
