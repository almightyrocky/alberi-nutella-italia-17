
import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
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
        nutella: {
          brown: "#5D4037",
          darkbrown: "#3E2723",
          red: "#e2211c",
          beige: "#f7f3ef",
          green: "#2e7d32",
          darkgreen: "#1B5E20",
          gold: "#e5a100",
          white: "#fff8f0",
          lightgold: "#ffd54f",
          lightgreen: "#81c784",
          cream: "#fff3e0",
          lightred: "#ff8a80"
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["Nunito", "var(--font-sans)", ...fontFamily.sans],
        display: ["Nunito", "var(--font-display)", ...fontFamily.sans],
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
        'bounce-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' }
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' }
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'bounce-in': {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        'bounce-slow': 'bounce-slow 3s ease-in-out infinite',
        'pulse-slow': 'pulse-slow 2s ease-in-out infinite',
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'bounce-in': 'bounce-in 0.5s ease-out forwards',
        'float': 'float 6s ease-in-out infinite'
      },
      backgroundImage: {
        'nutella-gradient': 'linear-gradient(135deg, #f7f3ef 0%, #5D4037 100%)',
        'hero-pattern': 'url("/SFONDO HERO.jpg")',
        'green-gradient': 'linear-gradient(to right, #2e7d32, #81c784)',
        'red-gradient': 'linear-gradient(to right, #e2211c, #ff8a80)',
        'gold-gradient': 'linear-gradient(to right, #e5a100, #ffd54f)'
      },
      boxShadow: {
        'nutella': '0 10px 25px -5px rgba(93, 64, 55, 0.1), 0 8px 10px -6px rgba(93, 64, 55, 0.1)',
        'nutella-lg': '0 20px 25px -5px rgba(93, 64, 55, 0.1), 0 8px 10px -6px rgba(93, 64, 55, 0.1)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
