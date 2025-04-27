import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Custom colors for the portfolio
        "primary-bg": "hsl(var(--primary-bg))",
        "secondary-bg": "hsl(var(--secondary-bg))",
        "primary-accent": "hsl(var(--primary-accent))",
        "secondary-accent": "hsl(var(--secondary-accent))",
        "text-primary": "hsl(var(--text-primary))",
        "text-secondary": "hsl(var(--text-secondary))",
        success: "hsl(var(--success))",
        error: "hsl(var(--error))",
        warning: "hsl(var(--warning))",
        teal: {
          DEFAULT: "#2DD4BF",
          50: "#D7F8F4",
          100: "#C4F5EF",
          200: "#9EEFE5",
          300: "#78E9DB",
          400: "#53E3D0",
          500: "#2DD4BF",
          600: "#23A999",
          700: "#197D72",
          800: "#10514C",
          900: "#062625",
          950: "#031414",
        },
        cyan: {
          DEFAULT: "#67E8F9",
          50: "#FFFFFF",
          100: "#FFFFFF",
          200: "#EAFCFE",
          300: "#C6F7FC",
          400: "#A1F2FB",
          500: "#67E8F9",
          600: "#31DEF7",
          700: "#0ACCE7",
          800: "#089DB1",
          900: "#066F7B",
          950: "#05586A",
        },
        navy: {
          DEFAULT: "#121A24",
          50: "#4B6A97",
          100: "#44618A",
          200: "#374F71",
          300: "#2A3D58",
          400: "#1D2B3E",
          500: "#121A24",
          600: "#0A0E14",
          700: "#020305",
          800: "#000000",
          900: "#000000",
          950: "#000000",
        },
      },
      borderRadius: {
        DEFAULT: "0.5rem",
        none: "0",
        sm: "0.35rem",
        md: "0.475rem",
        lg: "0.6rem",
        xl: "0.85rem",
        "2xl": "1.1rem",
        "3xl": "1.6rem",
        full: "9999px",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "fade-out": {
          from: { opacity: "1" },
          to: { opacity: "0" },
        },
        "slide-up": {
          from: { transform: "translateY(20px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        "slide-down": {
          from: { transform: "translateY(-20px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 15px rgba(45, 212, 191, 0.5)" },
          "50%": { boxShadow: "0 0 25px rgba(45, 212, 191, 0.8)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "fade-out": "fade-out 0.5s ease-out",
        "slide-up": "slide-up 0.5s ease-out",
        "slide-down": "slide-down 0.5s ease-out",
        "pulse-glow": "pulse-glow 2s infinite",
      },
      fontFamily: {
        sans: ["var(--font-geist)", "var(--font-inter)", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
