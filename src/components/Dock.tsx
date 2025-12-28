"use client";

import {
    MotionValue,
    motion,
    useMotionValue,
    useSpring,
    useTransform,
    AnimatePresence,
} from "framer-motion";
import { Home, Layers, Briefcase, Send, Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";

const DOCK_ITEMS = [
    { href: "#home", icon: Home, label: "Home" },
    { href: "#skills", icon: Layers, label: "Skills" },
    { href: "#work", icon: Briefcase, label: "Work" },
    { href: "#contact", icon: Send, label: "Connect" },
];

const SOCIAL_ITEMS = [
    { href: "https://github.com", icon: Github, label: "GitHub" },
    { href: "https://linkedin.com", icon: Linkedin, label: "LinkedIn" },
    { href: "https://twitter.com", icon: Twitter, label: "Twitter" },
];

export const Dock = () => {
    const mouseX = useMotionValue(Infinity);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <motion.nav
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            onMouseMove={(e) => mouseX.set(e.pageX)}
            onMouseLeave={() => {
                mouseX.set(Infinity);
                setHoveredIndex(null);
            }}
            className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2"
            role="navigation"
            aria-label="Main navigation"
        >
            {/* Dock Container with premium glass effect */}
            <motion.div
                className="flex h-[62px] items-end gap-1 rounded-2xl border border-white/[0.08] bg-black/30 px-2 pb-2 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_0_0_1px_rgba(255,255,255,0.05)]"
                style={{
                    background: "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0.3) 100%)",
                }}
            >
                {/* Main nav items */}
                {DOCK_ITEMS.map((item, index) => (
                    <DockIcon
                        key={item.href}
                        mouseX={mouseX}
                        href={item.href}
                        icon={<item.icon strokeWidth={1.5} />}
                        label={item.label}
                        index={index}
                        hoveredIndex={hoveredIndex}
                        setHoveredIndex={setHoveredIndex}
                    />
                ))}

                {/* Divider */}
                <div className="mx-1 h-8 w-px self-center bg-gradient-to-b from-transparent via-white/20 to-transparent" />

                {/* Social items */}
                {SOCIAL_ITEMS.map((item, index) => (
                    <DockIcon
                        key={item.href}
                        mouseX={mouseX}
                        href={item.href}
                        icon={<item.icon strokeWidth={1.5} />}
                        label={item.label}
                        external
                        index={DOCK_ITEMS.length + index}
                        hoveredIndex={hoveredIndex}
                        setHoveredIndex={setHoveredIndex}
                    />
                ))}
            </motion.div>

            {/* Reflection effect */}
            <div
                className="mx-auto mt-1 h-[1px] w-3/4 rounded-full opacity-30"
                style={{
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                }}
            />
        </motion.nav>
    );
};

interface DockIconProps {
    mouseX: MotionValue<number>;
    icon: React.ReactNode;
    href: string;
    label: string;
    external?: boolean;
    index: number;
    hoveredIndex: number | null;
    setHoveredIndex: (index: number | null) => void;
}

const DockIcon = ({
    mouseX,
    icon,
    href,
    label,
    external = false,
    index,
    hoveredIndex,
    setHoveredIndex,
}: DockIconProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isPressed, setIsPressed] = useState(false);

    // Calculate distance from mouse to icon center
    const distance = useTransform(mouseX, (val) => {
        const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
        return val - bounds.x - bounds.width / 2;
    });

    // macOS-style magnification curve
    // Items closer to cursor get larger, with smooth falloff
    const baseSize = 44;
    const maxSize = 72;
    const magnificationRange = 150;

    const sizeTransform = useTransform(distance, [-magnificationRange, 0, magnificationRange], [
        baseSize,
        maxSize,
        baseSize,
    ]);

    // Icon size scales proportionally
    const iconSizeTransform = useTransform(distance, [-magnificationRange, 0, magnificationRange], [
        18,
        26,
        18,
    ]);

    // Smooth spring for buttery animation
    const springConfig = { mass: 0.2, stiffness: 200, damping: 15 };
    const size = useSpring(sizeTransform, springConfig);
    const iconSize = useSpring(iconSizeTransform, springConfig);

    // Y offset for "pop" effect
    const yTransform = useTransform(distance, [-magnificationRange, 0, magnificationRange], [0, -8, 0]);
    const y = useSpring(yTransform, springConfig);

    const isHovered = hoveredIndex === index;

    return (
        <Link
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            className="relative"
            aria-label={label}
        >
            <motion.div
                ref={ref}
                style={{ width: size, height: size, y }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseDown={() => setIsPressed(true)}
                onMouseUp={() => setIsPressed(false)}
                onMouseLeave={() => setIsPressed(false)}
                className="relative flex items-center justify-center"
            >
                {/* Icon background with glow */}
                <motion.div
                    className="absolute inset-0 rounded-xl"
                    style={{
                        background: isHovered
                            ? "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)"
                            : "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
                        boxShadow: isHovered
                            ? "0 4px 20px rgba(0,255,255,0.15), inset 0 0 0 1px rgba(255,255,255,0.1)"
                            : "inset 0 0 0 1px rgba(255,255,255,0.05)",
                    }}
                    animate={{
                        scale: isPressed ? 0.92 : 1,
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                />

                {/* Icon */}
                <motion.span
                    style={{ width: iconSize, height: iconSize }}
                    className="relative z-10 flex items-center justify-center text-white/70"
                    animate={{
                        color: isHovered ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.7)",
                    }}
                >
                    {icon}
                </motion.span>

                {/* Tooltip */}
                <AnimatePresence>
                    {isHovered && (
                        <motion.div
                            initial={{ opacity: 0, y: 4, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 4, scale: 0.96 }}
                            transition={{ duration: 0.15, ease: "easeOut" }}
                            className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap"
                        >
                            <div className="relative">
                                {/* Tooltip background */}
                                <div className="rounded-md bg-neutral-900/95 border border-white/10 px-2.5 py-1 text-xs font-medium text-white shadow-lg backdrop-blur-xl">
                                    {label}
                                </div>
                                {/* Arrow */}
                                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-neutral-900/95 border-r border-b border-white/10" />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Active indicator dot */}
                <motion.div
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white/50"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                        opacity: isHovered ? 1 : 0,
                        scale: isHovered ? 1 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                />
            </motion.div>
        </Link>
    );
};
