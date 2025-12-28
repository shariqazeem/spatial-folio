"use client";

import { useRef, useState, useCallback } from "react";
import {
    motion,
    useMotionValue,
    useSpring,
    useTransform,
    MotionValue,
    AnimatePresence,
} from "framer-motion";
import { User, Briefcase, Layers, Mail, Volume2, VolumeX, FileText } from "lucide-react";
import { useOSStore, AppId } from "@/store/os-store";

interface DockApp {
    id: AppId;
    icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
    label: string;
}

const DOCK_APPS: DockApp[] = [
    { id: "about", icon: User, label: "About" },
    { id: "work", icon: Briefcase, label: "Work" },
    { id: "stack", icon: Layers, label: "Stack" },
    { id: "contact", icon: Mail, label: "Contact" },
];

export const Dock = () => {
    const mouseX = useMotionValue(Infinity);
    const { windows, soundEnabled, toggleSound } = useOSStore();

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        // Only enable magnification on non-touch devices
        if (window.matchMedia('(hover: hover)').matches) {
            mouseX.set(e.pageX);
        }
    }, [mouseX]);

    const handleMouseLeave = useCallback(() => {
        mouseX.set(Infinity);
    }, [mouseX]);

    return (
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[200]"
            style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        >
            <motion.nav
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="flex items-end gap-1 md:gap-[3px] px-2 pb-2 pt-2 rounded-2xl border border-white/[0.1] bg-white/[0.03] shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
                style={{
                    backdropFilter: "blur(30px) saturate(150%)",
                    WebkitBackdropFilter: "blur(30px) saturate(150%)",
                }}
            >
                {DOCK_APPS.map((app) => (
                    <DockIcon
                        key={app.id}
                        app={app}
                        mouseX={mouseX}
                        isOpen={windows[app.id].isOpen}
                        isMinimized={windows[app.id].isMinimized}
                    />
                ))}

                {/* Divider */}
                <div className="mx-1 md:mx-1.5 h-6 md:h-8 w-px bg-white/10 self-center" />

                {/* Resume download */}
                <DockButton
                    mouseX={mouseX}
                    onClick={() => {
                        const link = document.createElement("a");
                        link.href = "/resume.pdf";
                        link.download = "Shariq_Shaukat_Resume.pdf";
                        link.click();
                    }}
                    icon={FileText}
                    label="Resume"
                />

                {/* Sound toggle - Hidden on mobile via CSS */}
                <div className="hidden md:block">
                    <DockButton
                        mouseX={mouseX}
                        onClick={toggleSound}
                        icon={soundEnabled ? Volume2 : VolumeX}
                        label={soundEnabled ? "Sound On" : "Sound Off"}
                    />
                </div>
            </motion.nav>
        </motion.div>
    );
};

interface DockIconProps {
    app: DockApp;
    mouseX: MotionValue<number>;
    isOpen: boolean;
    isMinimized: boolean;
}

const DockIcon = ({ app, mouseX, isOpen, isMinimized }: DockIconProps) => {
    const ref = useRef<HTMLButtonElement>(null);
    const { openWindow, focusWindow } = useOSStore();
    const [isHovered, setIsHovered] = useState(false);

    const distance = useTransform(mouseX, (val) => {
        const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
        return val - bounds.x - bounds.width / 2;
    });

    // Magnification settings
    const baseSize = 48;
    const maxSize = 68;
    const range = 120;

    const size = useSpring(
        useTransform(distance, [-range, 0, range], [baseSize, maxSize, baseSize]),
        { stiffness: 300, damping: 25 }
    );

    const y = useSpring(
        useTransform(distance, [-range, 0, range], [0, -8, 0]),
        { stiffness: 300, damping: 25 }
    );

    const handleClick = () => {
        if (isOpen && !isMinimized) {
            focusWindow(app.id);
        } else {
            openWindow(app.id);
        }
    };

    const Icon = app.icon;

    return (
        <motion.button
            ref={ref}
            onClick={handleClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="dock-icon relative flex items-center justify-center active:scale-90 transition-transform"
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            style={{ width: size, height: size, y }}
        >
            {/* Background */}
            <motion.div
                className="absolute inset-0 rounded-xl"
                style={{
                    background: isOpen
                        ? "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 100%)"
                        : "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
                    boxShadow: isHovered
                        ? "inset 0 0 0 1px rgba(255,255,255,0.1), 0 4px 16px rgba(0,255,255,0.1)"
                        : "inset 0 0 0 1px rgba(255,255,255,0.05)",
                }}
                transition={{ duration: 0.2 }}
            />

            {/* Icon */}
            <motion.div className="relative z-10 flex items-center justify-center text-white/70 dock-icon-svg">
                <Icon size={22} strokeWidth={1.5} />
            </motion.div>

            {/* Tooltip - Desktop only, controlled by CSS */}
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        transition={{ duration: 0.15 }}
                        className="hidden md:block absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-none"
                    >
                        <div className="px-2.5 py-1 rounded-md bg-[#1a1a1a]/95 border border-white/10 text-xs font-medium text-white shadow-lg">
                            {app.label}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Open indicator */}
            <motion.div
                className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white/60"
                initial={false}
                animate={{
                    opacity: isOpen ? 1 : 0,
                    scale: isOpen ? 1 : 0,
                }}
                transition={{ duration: 0.2 }}
            />
        </motion.button>
    );
};

interface DockButtonProps {
    mouseX: MotionValue<number>;
    onClick: () => void;
    icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
    label: string;
}

const DockButton = ({ mouseX, onClick, icon: Icon, label }: DockButtonProps) => {
    const ref = useRef<HTMLButtonElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    const distance = useTransform(mouseX, (val) => {
        const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
        return val - bounds.x - bounds.width / 2;
    });

    const baseSize = 40;
    const maxSize = 52;
    const range = 100;

    const size = useSpring(
        useTransform(distance, [-range, 0, range], [baseSize, maxSize, baseSize]),
        { stiffness: 300, damping: 25 }
    );

    const y = useSpring(
        useTransform(distance, [-range, 0, range], [0, -5, 0]),
        { stiffness: 300, damping: 25 }
    );

    return (
        <motion.button
            ref={ref}
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="dock-button relative flex items-center justify-center rounded-lg active:scale-90 transition-transform"
            whileTap={{ scale: 0.9 }}
            style={{ width: size, height: size, y }}
        >
            <div
                className="absolute inset-0 rounded-lg"
                style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%)",
                    boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.05)",
                }}
            />
            <div className="dock-button-svg text-white/50 relative z-10">
                <Icon size={18} strokeWidth={1.5} />
            </div>

            {/* Tooltip - Desktop only */}
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        className="hidden md:block absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-none"
                    >
                        <div className="px-2.5 py-1 rounded-md bg-[#1a1a1a]/95 border border-white/10 text-xs font-medium text-white shadow-lg">
                            {label}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.button>
    );
};
