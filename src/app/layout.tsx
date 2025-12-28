import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-inter",
});

export const metadata: Metadata = {
    metadataBase: new URL("https://shariqshaukat.vercel.app"),
    title: "Shariq Shaukat | Full Stack Engineer & Blockchain Developer",
    description: "5x Hackathon Winner building on Solana. A spatial desktop experience showcasing AI agents, DeFi protocols, and production-grade dApps.",
    keywords: ["Shariq Shaukat", "Full Stack Engineer", "Blockchain Developer", "Solana", "React", "Next.js", "Web3", "AI", "DeFi"],
    authors: [{ name: "Shariq Shaukat" }],
    creator: "Shariq Shaukat",
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://shariqshaukat.vercel.app",
        title: "Shariq Shaukat | Full Stack Engineer & Blockchain Developer",
        description: "5x Hackathon Winner building on Solana. AI agents, DeFi protocols, and production-grade dApps.",
        siteName: "Shariq Shaukat Portfolio",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "Shariq Shaukat - Spatial Portfolio",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Shariq Shaukat | Full Stack Engineer",
        description: "5x Hackathon Winner building on Solana. AI agents, DeFi protocols, and production-grade dApps.",
        creator: "@shariqshkt",
        images: ["/og-image.png"],
    },
    robots: {
        index: true,
        follow: true,
    },
};

export const viewport: Viewport = {
    themeColor: "#050505",
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={inter.variable}>
            <head>
                <link rel="icon" href="/favicon.ico" sizes="any" />
            </head>
            <body className="font-sans antialiased bg-[#050505] text-white overflow-hidden selection:bg-cyan-400 selection:text-black">
                {children}
            </body>
        </html>
    );
}
