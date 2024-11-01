import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      primary: {
        50: '#f0f9ff',
        100: '#e0f2fe',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      zIndex: {
        '-10': '-10',
      },
      colors: {
        'cyber-blue': '#00BCD4',
        'deep-space': '#1A1A2E',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
export default config;
