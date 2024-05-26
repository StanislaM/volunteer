import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import StoreProvider from "./_providers/StoreProvider";

export const montserrat = Montserrat({
    subsets: ["cyrillic"],
    variable: "--font-montserrat",
});
export const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
    title: "Volunteer",
    description: "Voluteer logistic platform",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <StoreProvider>
            <html lang="en">
                <body
                    className={`${montserrat.variable} ${inter.variable} overflow-x-hidden bg-gray-bg font-montserrat`}
                >
                    {children}
                </body>
            </html>
        </StoreProvider>
    );
}
