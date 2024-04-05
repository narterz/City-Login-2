import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "main": "#dee1e8",
        "highlight": "#e8e5de",
        "dark": "#525561",
        "light-dark": "#3f424e",
        "triadic": "#e8dee1",
        "sky": "#b5a4ac"
      },
      fontFamily: {
        'sans': ['Roboto Condensed', 'sans-serif']
      },
      fontWeight: {
        'normal': '400',
        'bold': '700',
        "boldest": "900"
      },
      fontSize: {
        '2xl': '1.875rem', // For h1
        'xl': '1.5rem',    // For h2
        'lg': '1.25rem',   // For h3
        'base': '1rem',    // For h4
        'sm': '0.875rem',  // For h5
        'xs': '0.75rem',   // For h6
      },
      screens: {
        'sm': '640px', 
        'md': '768px',  
        'lg': '1024px', 
        'xl': '1280px', 
        '2xl': '1536px', 
        'custom': '1600px', 
      },
      boxShadow: {
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [],
};
export default config;
