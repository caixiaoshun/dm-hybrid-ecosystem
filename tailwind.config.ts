import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary colors - used across all prototypes
        primary: "#2563eb",
        "primary-dark": "#1d4ed8",
        "primary-hover": "#1d4ed8",
        "primary-light": "#eff6ff",
        // Background colors
        "background-light": "#f8fafc",
        "background-main": "#f0f4fa",
        "background-card": "#ffffff",
        "background-dark": "#111722",
        "page-bg": "#f0f6ff",
        "bg-main": "#f0f4f9",
        "bg-card": "#ffffff",
        // Surface colors
        "surface-light": "#ffffff",
        "surface-white": "#ffffff",
        "surface-hover": "#f8fafc",
        "surface-active": "#eff6ff",
        "surface-dark": "#192233",
        // Text colors
        "text-main": "#1e293b",
        "text-secondary": "#64748b",
        // Border colors
        "border-color": "#e2e8f0",
        "border-light": "#e2e8f0",
        "border-dark": "#324467",
        // Input colors
        "input-bg": "#f1f5f9",
        // Accent colors
        "accent-blue": "#eff6ff",
      },
      fontFamily: {
        display: ["Inter", "Noto Sans", "Noto Sans SC", "sans-serif"],
        body: ["Inter", "Noto Sans", "Noto Sans SC", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
        full: "9999px",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
export default config;
