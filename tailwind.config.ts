import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",   // IMPORTANT: scan everything under /src
  ],
  darkMode: "class",                    // we force dark via <html class="dark">
  theme: {
    extend: {
      colors: {
        brandGreen: "#2F8F4E",          // your green token used in globals.css
      },
    },
  },
  plugins: [],
};

export default config;
