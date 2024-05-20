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
            boxShadow: {
                default: "0 4px 12px rgba(0, 0, 0, 0.25)",
                soft: "7px 7px 22px -5px rgba(0, 0, 0, 0.15) ",
            },
            colors: {
                "main-color": "#FFBE86",
                "main-color-light": "#FFE9CE",
                "gray-dark": "#3F3F3F",
                "gray-medium": "#767070",
                "gray-medium2": "#626367",
                "gray-light": "#F6F6F6",
                "gray-semi-light": "#B6B7BB",
                "gray-bg": "#F9FAF4",
                "logo-violet": "#565B86",
            },
            fontFamily: {
                montserrat: "var(--font-montserrat)",
                inter: "var(--font-inter)",
            },
        },
    },
    plugins: [],
};
export default config;
