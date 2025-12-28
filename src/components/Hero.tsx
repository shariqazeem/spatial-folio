"use client";

import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useState, useCallback, useMemo } from "react";

// Floating particles configuration
const PARTICLE_COUNT = 50;

export const Hero = () => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const [isHovered, setIsHovered] = useState(false);

    // Ultra smooth springs for 3D tilt
    const springConfig = { damping: 40, stiffness: 150, mass: 0.8 };
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), springConfig);
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), springConfig);

    // Subtle parallax for depth layers
    const parallaxX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-20, 20]), springConfig);
    const parallaxY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-20, 20]), springConfig);

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        const { clientX, clientY, currentTarget } = e;
        const { width, height, left, top } = currentTarget.getBoundingClientRect();
        const x = (clientX - left) / width - 0.5;
        const y = (clientY - top) / height - 0.5;
        mouseX.set(x);
        mouseY.set(y);
    }, [mouseX, mouseY]);

    const handleMouseLeave = useCallback(() => {
        mouseX.set(0);
        mouseY.set(0);
        setIsHovered(false);
    }, [mouseX, mouseY]);

    return (
        <section
            id="home"
            className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            style={{ perspective: "1200px" }}
        >
            {/* Floating Particles */}
            <FloatingParticles />

            {/* Ambient glow behind text */}
            <motion.div
                style={{ x: parallaxX, y: parallaxY }}
                className="absolute w-[800px] h-[800px] rounded-full bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-blue-500/10 blur-[120px] pointer-events-none"
            />

            {/* Main Content */}
            <div className="relative z-10 flex flex-col items-center gap-16 text-center pointer-events-none select-none px-4">
                {/* Kinetic Typography with 3D Transform */}
                <motion.div
                    style={{
                        rotateX,
                        rotateY,
                        transformStyle: "preserve-3d",
                    }}
                    className="relative"
                >
                    {/* Glow layer behind text */}
                    <div className="absolute inset-0 blur-3xl opacity-30">
                        <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-[-0.04em] leading-[0.9] gradient-text">
                            Building the<br />impossible<br />on Solana.
                        </h1>
                    </div>

                    {/* Main text with staggered animation */}
                    <div className="relative">
                        <AnimatedHeadline />
                    </div>

                    {/* 3D Depth shadow */}
                    <motion.div
                        style={{ translateZ: -50 }}
                        className="absolute inset-0 -z-10"
                    >
                        <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-[-0.04em] leading-[0.9] text-white/5 blur-sm">
                            Building the<br />impossible<br />on Solana.
                        </h1>
                    </motion.div>
                </motion.div>

                {/* Status Pill */}
                <StatusPill />

                {/* Scroll Indicator */}
                <ScrollIndicator />
            </div>
        </section>
    );
};

// Animated headline with letter-by-letter reveal
const AnimatedHeadline = () => {
    const line1 = "Building the";
    const line2 = "impossible";
    const line3 = "on Solana.";

    return (
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-[-0.04em] leading-[0.9]">
            <AnimatedLine text={line1} delay={0} className="text-white/90" />
            <br />
            <AnimatedLine
                text={line2}
                delay={0.3}
                className="gradient-text text-glow-cyan"
                isHighlight
            />
            <br />
            <AnimatedLine text={line3} delay={0.6} className="text-white/90" />
        </h1>
    );
};

const AnimatedLine = ({
    text,
    delay,
    className,
    isHighlight = false
}: {
    text: string;
    delay: number;
    className?: string;
    isHighlight?: boolean;
}) => {
    return (
        <span className={`inline-block ${className}`}>
            {text.split("").map((char, i) => (
                <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 50, rotateX: -90 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{
                        duration: 0.6,
                        delay: delay + i * 0.03,
                        ease: [0.215, 0.61, 0.355, 1],
                    }}
                    className={`inline-block ${char === " " ? "w-[0.3em]" : ""} ${isHighlight ? "hover:scale-110 transition-transform cursor-default" : ""}`}
                    style={{ transformOrigin: "bottom" }}
                >
                    {char === " " ? "\u00A0" : char}
                </motion.span>
            ))}
        </span>
    );
};

// Premium Status Pill (Dynamic Island inspired)
const StatusPill = () => {
    const [time, setTime] = useState("");
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setTime(now.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
                timeZone: 'America/Los_Angeles'
            }));
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
            onHoverStart={() => setIsExpanded(true)}
            onHoverEnd={() => setIsExpanded(false)}
            className="pointer-events-auto"
        >
            <motion.div
                layout
                className="flex items-center gap-4 rounded-full border border-white/[0.08] bg-black/40 backdrop-blur-2xl px-6 py-3 shadow-[0_0_40px_-10px_rgba(0,0,0,0.5)] cursor-default"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
            >
                {/* Status Indicator */}
                <div className="flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></span>
                    </span>
                    <span className="text-sm font-medium text-white/90">Available</span>
                </div>

                <Divider />

                {/* Location */}
                <div className="flex items-center gap-1.5 text-sm text-white/60">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>San Francisco</span>
                </div>

                <Divider />

                {/* Time */}
                <div className="flex items-center gap-1.5 text-sm font-mono text-white/60">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="tabular-nums">{time || "..."}</span>
                </div>

                {/* Expanded content */}
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: "auto" }}
                            exit={{ opacity: 0, width: 0 }}
                            className="flex items-center gap-3 overflow-hidden"
                        >
                            <Divider />
                            <span className="text-sm text-cyan-400 whitespace-nowrap">Let&apos;s connect</span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </motion.div>
    );
};

const Divider = () => (
    <div className="h-4 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />
);

// Scroll indicator
const ScrollIndicator = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-auto"
        >
            <motion.span
                className="text-xs uppercase tracking-[0.2em] text-white/30"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                Scroll
            </motion.span>
            <motion.div
                className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1"
            >
                <motion.div
                    className="w-1 h-2 rounded-full bg-white/40"
                    animate={{ y: [0, 12, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                />
            </motion.div>
        </motion.div>
    );
};

// Floating particles for ambient effect
const FloatingParticles = () => {
    const particles = useMemo(() => {
        return Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 3 + 1,
            duration: Math.random() * 20 + 20,
            delay: Math.random() * 10,
            opacity: Math.random() * 0.3 + 0.1,
        }));
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="absolute rounded-full bg-white"
                    style={{
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                        width: particle.size,
                        height: particle.size,
                        opacity: particle.opacity,
                    }}
                    animate={{
                        y: [0, -30, 0],
                        x: [0, Math.random() * 20 - 10, 0],
                        opacity: [particle.opacity, particle.opacity * 1.5, particle.opacity],
                    }}
                    transition={{
                        duration: particle.duration,
                        delay: particle.delay,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </div>
    );
};
