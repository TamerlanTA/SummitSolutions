"use client";

import { motion } from "framer-motion";

const FLOORS = 14;
const COLS = 5;

// deterministic lit-window pattern (stable across SSR/CSR)
function isLit(r: number, c: number) {
  const v = (r * 7 + c * 13 + 5) % 11;
  return v < 5;
}

function intensity(r: number, c: number) {
  return ((r * 3 + c * 11) % 5) / 5;
}

export function HeroBuilding() {
  const VB_W = 400;
  const VB_H = 620;
  const BLD_X = 110;
  const BLD_Y = 70;
  const BLD_W = 200;
  const BLD_H = 510;
  const ROPE_X = BLD_X + BLD_W - 32;
  const ROPE_TOP = BLD_Y + 4;
  const ROPE_BOTTOM = BLD_Y + BLD_H - 12;

  const cellW = (BLD_W - 30) / COLS;
  const cellH = (BLD_H - 50) / FLOORS;

  return (
    <div className="relative w-full h-[460px] sm:h-[560px] md:h-[640px] bg-bg-deep/5">
      {/* faint grid */}
      <div className="absolute inset-0 grid-overlay opacity-20" />

      <svg
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        className="absolute inset-0 w-full h-full"
        aria-hidden
      >
        <defs>
          <linearGradient id="bldShade" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="oklch(94% 0.01 250)" />
            <stop offset="100%" stopColor="oklch(90% 0.015 250)" />
          </linearGradient>
          <linearGradient id="bldEdge" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="oklch(20% 0.02 250 / 0.1)" />
            <stop offset="100%" stopColor="oklch(20% 0.02 250 / 0.05)" />
          </linearGradient>
        </defs>

        {/* background buildings */}
        <rect
          x={20}
          y={210}
          width={88}
          height={420}
          fill="oklch(20% 0.02 250 / 0.03)"
          stroke="oklch(20% 0.02 250 / 0.06)"
        />
        <rect
          x={320}
          y={250}
          width={70}
          height={380}
          fill="oklch(20% 0.02 250 / 0.02)"
          stroke="oklch(20% 0.02 250 / 0.05)"
        />

        {/* main building */}
        <rect
          x={BLD_X}
          y={BLD_Y}
          width={BLD_W}
          height={BLD_H}
          fill="url(#bldShade)"
          stroke="url(#bldEdge)"
          strokeWidth={1}
        />

        {/* roof equipment block */}
        <rect
          x={BLD_X + 30}
          y={BLD_Y - 14}
          width={60}
          height={14}
          fill="oklch(85% 0.01 250)"
          stroke="oklch(20% 0.02 250 / 0.08)"
        />
        <line
          x1={BLD_X + 60}
          y1={BLD_Y - 14}
          x2={BLD_X + 60}
          y2={BLD_Y - 36}
          stroke="oklch(20% 0.02 250 / 0.15)"
        />
        <circle cx={BLD_X + 60} cy={BLD_Y - 38} r="2" fill="#FF7A1A" />

        {/* windows grid */}
        {Array.from({ length: FLOORS }).map((_, r) =>
          Array.from({ length: COLS }).map((__, c) => {
            const x = BLD_X + 15 + c * cellW;
            const y = BLD_Y + 18 + r * cellH;
            const w = cellW - 6;
            const h = cellH - 10;
            const lit = isLit(r, c);
            const opacity = 0.5 + intensity(r, c) * 0.4;
            return (
              <g key={`${r}-${c}`}>
                <rect
                  x={x}
                  y={y}
                  width={w}
                  height={h}
                  fill={lit ? "oklch(20% 0.02 250 / 0.8)" : "oklch(20% 0.02 250 / 0.05)"}
                  stroke="oklch(20% 0.02 250 / 0.04)"
                />
                {lit && (
                  <rect
                    x={x + 1}
                    y={y + 1}
                    width={w - 2}
                    height={h - 2}
                    fill="oklch(20% 0.02 250)"
                    opacity={opacity}
                  />
                )}
              </g>
            );
          })
        )}

        {/* floor lines */}
        {Array.from({ length: FLOORS - 1 }).map((_, r) => (
          <line
            key={`fl-${r}`}
            x1={BLD_X + 8}
            x2={BLD_X + BLD_W - 8}
            y1={BLD_Y + 18 + (r + 1) * cellH - 3}
            y2={BLD_Y + 18 + (r + 1) * cellH - 3}
            stroke="oklch(20% 0.02 250 / 0.05)"
          />
        ))}

        {/* scan line */}
        <motion.line
          x1={BLD_X - 10}
          x2={BLD_X + BLD_W + 10}
          stroke="oklch(45% 0.12 250 / 0.3)"
          strokeWidth={1}
          initial={{ y1: BLD_Y, y2: BLD_Y, opacity: 0 }}
          animate={{
            y1: [BLD_Y, BLD_Y + BLD_H, BLD_Y],
            y2: [BLD_Y, BLD_Y + BLD_H, BLD_Y],
            opacity: [0, 0.4, 0.4, 0],
          }}
          transition={{ duration: 9, repeat: Infinity, ease: "linear", times: [0, 0.1, 0.9, 1] }}
        />

        {/* rope */}
        <line
          x1={ROPE_X}
          y1={ROPE_TOP}
          x2={ROPE_X}
          y2={ROPE_BOTTOM}
          stroke="#FF7A1A"
          strokeOpacity={0.6}
          strokeWidth={1.2}
          strokeDasharray="5 5"
        />
        <circle cx={ROPE_X} cy={ROPE_TOP} r="3" fill="#FF7A1A" />

        {/* climber dot + halo */}
        <motion.g
          initial={{ y: ROPE_TOP + 20 }}
          animate={{ y: [ROPE_TOP + 20, ROPE_BOTTOM - 30, ROPE_TOP + 20] }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: [0.45, 0, 0.55, 1],
          }}
        >
          <circle cx={ROPE_X} r="14" fill="#FF7A1A" opacity={0.1} />
          <circle cx={ROPE_X} r="6" fill="#FF7A1A" />
          <circle cx={ROPE_X} r="2.2" fill="oklch(100% 0 0)" />
        </motion.g>

        {/* coordinate ticks */}
        {[0.25, 0.5, 0.75].map((t) => {
          const y = BLD_Y + BLD_H * t;
          return (
            <g key={t}>
              <line
                x1={BLD_X + BLD_W + 16}
                x2={BLD_X + BLD_W + 26}
                y1={y}
                y2={y}
                stroke="oklch(20% 0.02 250 / 0.15)"
              />
              <text
                x={BLD_X + BLD_W + 30}
                y={y + 3}
                fill="oklch(20% 0.02 250 / 0.4)"
                fontSize="9"
                fontFamily="JetBrains Mono, monospace"
              >
                {Math.round((1 - t) * 42)} М
              </text>
            </g>
          );
        })}
      </svg>

      {/* HUD corners */}
      <div className="absolute top-4 left-4 flex items-center gap-2 mono text-[9px] uppercase tracking-[0.2em] text-ink-muted">
        <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
        Object · LCD · 14 Floors
      </div>
      <div className="absolute bottom-4 right-4 mono text-[9px] uppercase tracking-[0.2em] text-ink-muted">
        43.238° N · 76.945° E
      </div>
    </div>
  );
}
