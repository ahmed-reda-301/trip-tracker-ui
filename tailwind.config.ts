import { type Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#007bff",      
        header: "#052c65",      
        secondary: "#f4f6f8",    
        border: "#e5e7eb",       
        danger: "#ef4444",       
        success: "#20c997",      
        textMain: "#1f2937",     
      },
      fontFamily: {
        arabic: ["'Cairo'", "sans-serif"],
        english: ["'Inter'", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
