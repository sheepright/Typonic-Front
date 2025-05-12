export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        salad: "var(--font-salad)",
        corn: "var(--font-corn)",
        dung: "var(--font-dung)",
        d2: "var(--font-d2)",
        paper: "var(--font-paper)",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        cred: "var(--color-cred)",
        corange: "var(--color-corange)",
        cgreen: "var(--color-cgreen)",
        cblue: "var(--color-cblue)",
        cdark: "var(--color-cdark)",
      },
    },
  },
  plugins: [],
};