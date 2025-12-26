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
        primary: "#2563eb",
        "primary-dark": "#1d4ed8",
        "primary-hover": "#1d4ed8",
        "background-light": "#f8fafc",
        "background-main": "#f0f4fa",
        "background-card": "#ffffff",
        "page-bg": "#f0f6ff",
        "surface-light": "#ffffff",
        "surface-white": "#ffffff",
        "surface-hover": "#f8fafc",
        "surface-active": "#eff6ff",
        "text-main": "#1e293b",
        "text-secondary": "#64748b",
        "border-color": "#e2e8f0",
        "border-light": "#e2e8f0",
        "input-bg": "#f1f5f9",
        "accent-blue": "#eff6ff",
      },
      fontFamily: {
        display: ["Inter", "Noto Sans", "sans-serif"],
        body: ["Inter", "Noto Sans", "sans-serif"],
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
