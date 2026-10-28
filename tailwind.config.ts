import type { Config } from "tailwindcss";

const token = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: token("bg"),
        surface: token("surface"),
        soft: token("soft"),
        primary: { DEFAULT: token("primary"), hover: token("primary-hover") },
        accent: token("accent"),
        ink: token("ink"),
        text: token("text"),
        eyebrow: token("eyebrow"),
        line: token("line"),
        deep: token("deep"),
        "on-primary": token("on-primary"),
        tone: token("tone"),
        "tone-2": token("tone-2"),
        "deep-section": token("deep-section"),
        cream: "#F6E9D9",
        sand: "#D9C1A4",
        gold: "#D4AF7C",
        espresso: "#2E231C",
      },
      fontFamily: {
        display: ["'Cormorant Garamond Variable'", "Cormorant Garamond", "Georgia", "serif"],
        sans: ["'Jost Variable'", "system-ui", "sans-serif"],
      },
      letterSpacing: { eyebrow: "0.3em" },
      boxShadow: {
        soft: "0 24px 60px -30px rgb(62 47 37 / 0.35)",
        lift: "0 14px 30px -12px rgb(166 124 82 / 0.55)",
      },
      transitionTimingFunction: { lux: "cubic-bezier(0.22, 1, 0.36, 1)" },
      keyframes: {
        kenburns: { "0%": { transform: "scale(1.12)" }, "100%": { transform: "scale(1)" } },
        marquee: { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-50%)" } },
        "marquee-rev": { "0%": { transform: "translateX(-50%)" }, "100%": { transform: "translateX(0)" } },
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(8px)" } },
        ping2: { "0%": { transform: "scale(1)", opacity: "0.55" }, "100%": { transform: "scale(1.7)", opacity: "0" } },
        spin: { to: { transform: "rotate(360deg)" } },
      },
      animation: {
        kenburns: "kenburns 8s ease-out forwards",
        marquee: "marquee var(--marquee-duration, 40s) linear infinite",
        "marquee-rev": "marquee-rev var(--marquee-duration, 40s) linear infinite",
        float: "float 2.6s ease-in-out infinite",
        ping2: "ping2 2.4s cubic-bezier(0,0,0.2,1) infinite",
        "spin-slow": "spin 22s linear infinite",
      },
    },
  },
  // The page container is defined in globals.css (fluid side spacing + max width)
  corePlugins: { container: false },
  plugins: [],
};

export default config;
