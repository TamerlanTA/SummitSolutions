import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

type ButtonProps = {
  variant?: Variant;
  href?: string;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  className?: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<"button">, "className" | "children">;

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-[4px] px-6 py-3 text-sm font-semibold uppercase tracking-wider transition-all duration-200 active:scale-[0.97] active:transition-transform active:duration-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:opacity-50 disabled:cursor-not-allowed";

const variants: Record<Variant, string> = {
  primary:
    "bg-ink text-bg shadow-soft hover:bg-ink/90 hover:translate-y-[-1px] active:translate-y-0",
  secondary:
    "bg-bg-elev text-ink ring-1 ring-line-strong hover:bg-bg hover:ring-line active:translate-y-0 shadow-sm",
  ghost:
    "text-ink/80 hover:text-ink transition-colors",
};

export function Button({
  variant = "primary",
  href,
  leadingIcon,
  trailingIcon,
  className = "",
  children,
  ...rest
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${className}`;
  const inner = (
    <>
      {leadingIcon && <span className="shrink-0">{leadingIcon}</span>}
      <span>{children}</span>
      {trailingIcon && (
        <span className="shrink-0 transition-transform group-hover:translate-x-0.5">
          {trailingIcon}
        </span>
      )}
    </>
  );
  if (href) {
    return (
      <a href={href} className={classes}>
        {inner}
      </a>
    );
  }
  return (
    <button {...rest} className={classes}>
      {inner}
    </button>
  );
}
