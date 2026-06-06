type StatusDotProps = {
  tone?: "cyan" | "safety" | "ink";
  label?: string;
  className?: string;
};

const toneColor: Record<NonNullable<StatusDotProps["tone"]>, string> = {
  cyan: "bg-cyan",
  safety: "bg-safety",
  ink: "bg-ink-dim",
};

export function StatusDot({ tone = "cyan", label, className = "" }: StatusDotProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 mono text-[11px] uppercase tracking-[0.22em] text-ink-dim ${className}`}
    >
      <span className={`relative h-1.5 w-1.5 rounded-full ${toneColor[tone]}`}>
        <span
          className={`absolute inset-0 rounded-full ${toneColor[tone]} opacity-40 animate-pulse`}
          aria-hidden
        />
      </span>
      {label}
    </span>
  );
}
