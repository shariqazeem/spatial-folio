import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-inter",
});

export const metadata: Metadata = {
    title: "Spatial Portfolio | Full Stack Engineer",
    description: "A spatial desktop experience showcasing the work of a design-obsessed full stack engineer. Building the impossible on Solana.",
    keywords: ["developer", "portfolio", "React", "Next.js", "Solana", "blockchain", "web3", "spatial", "desktop"],
    authors: [{ name: "Developer" }],
    creator: "Developer",
    openGraph: {
        type: "website",
        locale: "en_US",
        title: "Spatial Portfolio | Full Stack Engineer",
        description: "A spatial desktop experience showcasing the work of a design-obsessed full stack engineer.",
        siteName: "Spatial Portfolio",
    },
    twitter: {
        card: "summary_large_image",
        title: "Spatial Portfolio | Full Stack Engineer",
        description: "A spatial desktop experience showcasing the work of a design-obsessed full stack engineer.",
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
