"use client";

import React, { useEffect, useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useOSStore, AppId } from "@/store/os-store";
import { Window } from "./Window";
import { Dock } from "./Dock";
import { AboutApp } from "../Apps/AboutApp";
import { WorkApp } from "../Apps/WorkApp";
import { StackApp } from "../Apps/StackApp";
import { ContactApp } from "../Apps/ContactApp";
import { X } from "lucide-react";

// App content mapping
const APP_COMPONENTS: Record<AppId, React.ComponentType> = {
    about: AboutApp,
    work: WorkApp,
    stack: StackApp,
    contact: ContactApp,
};

const APP_TITLES: Record<AppId, string> = {
    about: "About",
    work: "Work",
    stack: "Stack",
    contact: "Contact",
};

// Hook to detect mobile
const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    return { isMobile, hasMounted };
};

export const Desktop = () => {
    const { windows, activeWindowId, closeWindow } = useOSStore();
    const { isMobile, hasMounted } = useIsMobile();

    // Keyboard shortcuts
    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'w') {
            e.preventDefault();
            if (activeWindowId) {
                closeWindow(activeWindowId);
            }
        }
    }, [activeWindowId, closeWindow]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    const openWindows = Object.values(windows).filter(w => w.isOpen && !w.isMinimized);

    return (
        <div className="fixed inset-0 overflow-hidden bg-[#050505] select-none">
            {/* Aurora Background */}
            <AuroraBackground />

            {/* Grain Overlay */}
            <div className="grain-overlay" aria-hidden="true" />

            {/* Desktop Area */}
            <div className="relative z-10 h-full w-full">
                {/* Welcome message when no windows open */}
                <AnimatePresence>
                    {openWindows.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-6"
                        >
                            <motion.h1
                                className="text-4xl sm:text-6xl md:text-8xl font-bold tracking-[-0.04em] text-white/90 text-center"
                                initial={{ y: 20 }}
                                animate={{ y: 0 }}
                                transition={{ delay: 0.1 }}
                            >
                                Welcome.
                            </motion.h1>
                            <motion.p
                                className="mt-4 sm:mt-6 text-base sm:text-lg text-white/40 tracking-tight text-center"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                {isMobile ? "Tap the dock below to explore." : "Click the dock below to explore."}
                            </motion.p>

                            {/* Animated hint arrow */}
                            <motion.div
                                className="absolute bottom-28 sm:bottom-32"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                            >
                                <motion.svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    className="text-white/30"
                                    animate={{ y: [0, 8, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                >
                                    <path d="M12 5v14M5 12l7 7 7-7" />
                                </motion.svg>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Windows - Mobile: Full-screen sheet */}
                <div className="md:hidden">
                    <AnimatePresence mode="wait">
                        {openWindows.length > 0 && (
                            <MobileSheet
                                windowState={openWindows[openWindows.length - 1]}
                                onClose={() => closeWindow(openWindows[openWindows.length - 1].id)}
                            />
                        )}
                    </AnimatePresence>
                </div>

                {/* Windows - Desktop: Draggable windows */}
                <div className="hidden md:block">
                    <AnimatePresence mode="popLayout">
                        {openWindows.map((windowState) => {
                            const AppComponent = APP_COMPONENTS[windowState.id];
                            return (
                                <Window key={windowState.id} windowState={windowState}>
                                    <AppComponent />
                                </Window>
                            );
                        })}
                    </AnimatePresence>
                </div>
            </div>

            {/* Dock */}
            <Dock />

            {/* Clock - Hidden on mobile */}
            <Clock />
        </div>
    );
};

// Mobile full-screen sheet component
const MobileSheet = ({
    windowState,
    onClose,
}: {
    windowState: { id: AppId; title: string };
    onClose: () => void;
}) => {
    const AppComponent = APP_COMPONENTS[windowState.id];

    return (
        <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-0 z-50 flex flex-col bg-[#0a0a0a]"
            style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#0a0a0a]/95 backdrop-blur-xl">
                <div className="w-10" /> {/* Spacer for centering */}
                <h2 className="text-base font-semibold text-white/90">
                    {APP_TITLES[windowState.id]}
                </h2>
                <button
                    onClick={onClose}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 active:bg-white/20 transition-colors"
                >
                    <X size={20} className="text-white/70" />
                </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto">
                <AppComponent />
            </div>

            {/* Bottom safe area */}
            <div className="h-20" /> {/* Space for dock */}
        </motion.div>
    );
};

// Aurora background effect
const AuroraBackground = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
                className="absolute w-[150%] h-[150%] top-[-25%] left-[-25%]"
                animate={{
                    rotate: [0, 360],
                }}
                transition={{
                    duration: 120,
                    repeat: Infinity,
                    ease: "linear",
                }}
            >
                <div
                    className="w-full h-full opacity-20"
                    style={{
                        background: `
                            radial-gradient(ellipse 60% 40% at 30% 30%, rgba(120, 0, 255, 0.3), transparent 50%),
                            radial-gradient(ellipse 50% 30% at 70% 60%, rgba(0, 200, 255, 0.2), transparent 50%),
                            radial-gradient(ellipse 40% 25% at 50% 80%, rgba(0, 255, 200, 0.15), transparent 50%)
                        `,
                        filter: "blur(100px)",
                    }}
                />
            </motion.div>

            <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[600px] h-[400px] md:h-[600px] rounded-full"
                style={{
                    background: "radial-gradient(circle, rgba(100, 100, 255, 0.1), transparent 60%)",
                    filter: "blur(80px)",
                }}
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.3, 0.2],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
        </div>
    );
};

// System clock
const Clock = () => {
    const [time, setTime] = React.useState("");
    const [date, setDate] = React.useState("");

    React.useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setTime(now.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
            }));
            setDate(now.toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
            }));
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="fixed top-4 right-4 sm:right-6 z-50 text-right hidden sm:block"
        >
            <div className="text-sm font-medium text-white/80 tabular-nums tracking-tight">
                {time}
            </div>
            <div className="text-xs text-white/40 tracking-tight">
                {date}
            </div>
        </motion.div>
    );
};
