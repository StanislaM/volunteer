import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            colors: {
                "main-color": "#FFBE86",
                "main-color-light": "#FFE9CE",
                "gray-dark": "#3F3F3F",
                "gray-medium": "#767070",
                "gray-medium2": "#626367",
                "gray-light": "#F6F6F6",
                "gray-semi-light": "#B6B7BB",
            },
        },
    },
    plugins: [],
};
export default config;
