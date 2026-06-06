import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#F7F3EA",
        "bg-deep": "#EFE9DC",
        "bg-elev": "#FEFCF7",
        surface: "#FEFCF7",
        ink: "#11110F",
        "ink-dim": "#5F6670",
        "ink-muted": "#7B838D",
        muted: "#636B76",
        line: "#E4DED2",
        "line-strong": "#D4CABC",
        safety: "#FF5A1F",
        cyan: "#0EA5E9",
        sky: "#0EA5E9",
        "soft-blue": "#EAF7FF",
        "soft-orange": "#FFF1E8",
        zinc: {
          50: "#fafafa",
          100: "#f4f4f5",
          200: "#e4e4e7",
          300: "#d4d4d8",
          400: "#a1a1aa",
          500: "#71717a",
          600: "#52525b",
          700: "#3f3f46",
          800: "#27272a",
          900: "#18181b",
          950: "#09090b",
        },
      },
      fontFamily: {
        sans: ["var(--font-outfit)", "var(--font-inter)", "ui-sans-serif", "system-ui"],
        display: ["var(--font-space)", "ui-sans-serif", "system-ui"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        soft: "0 4px 20px -2px oklch(20% 0.02 250 / 0.05), 0 2px 10px -1px oklch(20% 0.02 250 / 0.03)",
        card: "0 1px 3px oklch(0% 0 0 / 0.05), 0 20px 40px -20px oklch(20% 0.02 250 / 0.12)",
      },
      backgroundImage: {
        "grid-fine":
          "linear-gradient(to right, oklch(20% 0.02 250 / 0.03) 1px, transparent 1px), linear-gradient(to bottom, oklch(20% 0.02 250 / 0.03) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "44px 44px",
      },
      keyframes: {
        ropeFall: {
          "0%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(380px)" },
          "100%": { transform: "translateY(0)" },
        },
        scanY: {
          "0%": { transform: "translateY(0)", opacity: "0" },
          "10%": { opacity: "0.4" },
          "90%": { opacity: "0.4" },
          "100%": { transform: "translateY(440px)", opacity: "0" },
        },
        pulse: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
        flicker: {
          "0%, 100%": { opacity: "0.85" },
          "45%": { opacity: "0.85" },
          "50%": { opacity: "0.3" },
          "55%": { opacity: "0.85" },
        },
      },
      animation: {
        ropeFall: "ropeFall 12s ease-in-out infinite",
        scanY: "scanY 6s linear infinite",
        pulse: "pulse 2.4s ease-in-out infinite",
        flicker: "flicker 5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
