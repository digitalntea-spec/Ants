import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "ants-bg": "#FAFAFC",
        "ants-surface": "#FFFFFF",
        "ants-ink": "#1A1A2E",
        "ants-ink-muted": "#5B5B6E",
        "ants-lila": "#C4B5FD",
        "ants-menta": "#5EEAD4",
        "ants-amarillo": "#FFD60A",
        "ants-verde": "#34D399",
        "ants-border": "#ECECF2",
      },
      fontFamily: {
        graffiti: ["var(--font-graffiti)", "cursive"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      animation: {
        marquee: "marquee 55s linear infinite",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
