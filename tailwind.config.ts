import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        sidebar: {
          DEFAULT: "#f8fafc",
          foreground: "#0f172a",
          primary: "#1e293b",
          accent: "#f1f5f9",
          border: "#e2e8f0",
        },
      },
    },
  },
  plugins: [],
};

export default config;
