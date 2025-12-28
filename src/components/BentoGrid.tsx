"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useRef, useCallback } from "react";

export const BentoGrid = () => {
    return (
        <section className="relative z-10 mx-auto max-w-6xl px-4 py-32">
            {/* Section header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="mb-16 text-center"
            >
                <span className="text-xs uppercase tracking-[0.3em] text-white/40">
                    Tech Stack
                </span>
                <h2 className="mt-3 text-4xl font-bold tracking-tight text-white/90">
                    The Arsenal
                </h2>
            </motion.div>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-2 auto-rows-[280px] md:auto-rows-[240px]">
                {/* Card 1: React/Next.js - Tall left */}
                <MagneticCard
                    className="md:row-span-2"
                    delay={0}
                >
                    <ReactCard />
                </MagneticCard>

                {/* Card 2: Solana/Rust - Wide top right */}
                <MagneticCard
                    className="md:col-span-2"
                    delay={0.1}
                >
                    <SolanaCard />
                </MagneticCard>

                {/* Card 3: Design Toggle - Wide bottom right */}
                <MagneticCard
                    className="md:col-span-2"
                    delay={0.2}
                >
                    <DesignToggleCard />
                </MagneticCard>
            </div>
        </section>
    );
};

// Magnetic hover card wrapper
interface MagneticCardProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}

const MagneticCard = ({ children, className = "", delay = 0 }: MagneticCardProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
    const xSpring = useSpring(x, springConfig);
    const ySpring = useSpring(y, springConfig);

    // Rotation based on mouse position
    const rotateX = useTransform(ySpring, [-50, 50], [5, -5]);
    const rotateY = useTransform(xSpring, [-50, 50], [-5, 5]);

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set((e.clientX - centerX) * 0.1);
        y.set((e.clientY - centerY) * 0.1);
    }, [x, y]);

    const handleMouseLeave = useCallback(() => {
        x.set(0);
        y.set(0);
    }, [x, y]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                x: xSpring,
                y: ySpring,
                rotateX,
                rotateY,
                transformPerspective: 1000,
            }}
            className={`group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.05] to-transparent backdrop-blur-sm transition-colors duration-500 hover:border-white/[0.12] ${className}`}
        >
            {/* Gradient highlight on hover */}
            <motion.div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                    background: "radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.06), transparent 40%)",
                }}
            />

            {/* Content */}
            <div className="relative z-10 h-full">{children}</div>

            {/* Shimmer effect */}
            <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                <motion.div
                    className="absolute -inset-full top-0 z-10 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "200%" }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                />
            </div>
        </motion.div>
    );
};

// React/Next.js Card
const ReactCard = () => {
    return (
        <div className="flex h-full flex-col items-center justify-center gap-8 p-8">
            {/* Animated React Logo */}
            <div className="relative">
                {/* Outer glow */}
                <div className="absolute inset-0 rounded-full bg-cyan-500/20 blur-2xl" />

                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="relative flex h-28 w-28 items-center justify-center"
                >
                    {/* Core */}
                    <motion.div
                        className="absolute h-4 w-4 rounded-full bg-cyan-400"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        style={{ boxShadow: "0 0 20px #22d3ee, 0 0 40px #22d3ee50" }}
                    />

                    {/* Orbits */}
                    {[0, 60, 120].map((rotation, i) => (
                        <motion.div
                            key={i}
                            className="absolute h-full w-full"
                            style={{ rotate: `${rotation}deg` }}
                        >
                            <div className="absolute left-0 top-1/2 h-[1px] w-full -translate-y-1/2 scale-y-[20] rounded-full border border-cyan-500/30" />
                            {/* Electron */}
                            <motion.div
                                className="absolute h-2 w-2 rounded-full bg-cyan-400"
                                animate={{
                                    rotate: [0, 360],
                                }}
                                transition={{
                                    duration: 3 + i,
                                    repeat: Infinity,
                                    ease: "linear",
                                }}
                                style={{
                                    top: "50%",
                                    left: "50%",
                                    x: "-50%",
                                    y: "-50%",
                                    transformOrigin: "50% 50%",
                                    offsetPath: "ellipse(50px 20px)",
                                    offsetRotate: "0deg",
                                    boxShadow: "0 0 10px #22d3ee",
                                }}
                            />
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Text */}
            <div className="text-center">
                <h3 className="text-xl font-bold text-white">React & Next.js</h3>
                <p className="mt-2 text-sm text-white/50">Component Architecture</p>
            </div>

            {/* Stats */}
            <div className="flex gap-6 text-center">
                <div>
                    <div className="text-lg font-bold text-cyan-400">3+</div>
                    <div className="text-xs text-white/40">Years</div>
                </div>
                <div className="h-8 w-px bg-white/10" />
                <div>
                    <div className="text-lg font-bold text-cyan-400">50+</div>
                    <div className="text-xs text-white/40">Projects</div>
                </div>
            </div>
        </div>
    );
};

// Solana/Rust Card
const SolanaCard = () => {
    const [copied, setCopied] = useState(false);

    const codeSnippet = `pub fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    input: &[u8]
) -> ProgramResult {
    msg!("Hello Solana");
    Ok(())
}`;

    const handleCopy = async () => {
        await navigator.clipboard.writeText(codeSnippet);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative flex h-full flex-col">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-pink-600/5" />

            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/[0.06] px-6 py-4">
                <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                        <div className="h-3 w-3 rounded-full bg-red-500/70" />
                        <div className="h-3 w-3 rounded-full bg-yellow-500/70" />
                        <div className="h-3 w-3 rounded-full bg-green-500/70" />
                    </div>
                    <span className="font-mono text-xs text-white/50">lib.rs</span>
                </div>
                <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-white/50 transition-colors hover:bg-white/5 hover:text-white"
                >
                    {copied ? (
                        <>
                            <svg className="h-3.5 w-3.5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Copied
                        </>
                    ) : (
                        <>
                            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                            </svg>
                            Copy
                        </>
                    )}
                </button>
            </div>

            {/* Code content */}
            <div className="flex-1 overflow-hidden p-6">
                <pre className="font-mono text-[11px] leading-relaxed">
                    <code>
                        <span className="text-pink-400">pub fn</span>{" "}
                        <span className="text-yellow-300">process_instruction</span>
                        {"(\n"}
                        {"    program_id: &"}<span className="text-blue-300">Pubkey</span>{",\n"}
                        {"    accounts: &["}<span className="text-blue-300">AccountInfo</span>{"],\n"}
                        {"    input: &["}<span className="text-blue-300">u8</span>{"]\n"}
                        {") -> "}<span className="text-blue-300">ProgramResult</span>{" {\n"}
                        {"    "}<span className="text-gray-500">{"// The impossible happens here"}</span>{"\n"}
                        {"    msg!("}<span className="text-green-300">{'"Hello Solana"'}</span>{");\n"}
                        {"    "}<span className="text-pink-400">Ok</span>{"(())\n"}
                        {"}"}
                    </code>
                </pre>
            </div>

            {/* Gradient fade */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" />

            {/* Solana badge */}
            <div className="absolute bottom-4 right-4 flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-purple-500 animate-pulse" />
                <span className="text-xs font-medium text-purple-400">Solana</span>
            </div>
        </div>
    );
};

// Design/Engineering Toggle Card
const DesignToggleCard = () => {
    const [isDesign, setIsDesign] = useState(true);

    return (
        <div className="flex h-full items-center justify-between px-12 py-8">
            {/* Left content */}
            <div className="flex flex-col gap-3">
                <motion.h3
                    key={isDesign ? "design" : "engineering"}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl font-bold text-white"
                >
                    {isDesign ? "Design" : "Engineering"}
                </motion.h3>
                <motion.p
                    key={isDesign ? "design-desc" : "engineering-desc"}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-white/40"
                >
                    {isDesign ? "Obsessed with pixels." : "Obsessed with performance."}
                </motion.p>

                {/* Skill indicators */}
                <div className="mt-4 flex gap-2">
                    {(isDesign
                        ? ["Figma", "Motion", "UI/UX"]
                        : ["System Design", "Optimization", "Testing"]
                    ).map((skill, i) => (
                        <motion.span
                            key={skill}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="rounded-full bg-white/5 px-3 py-1 text-xs text-white/60"
                        >
                            {skill}
                        </motion.span>
                    ))}
                </div>
            </div>

            {/* Toggle switch */}
            <button
                onClick={() => setIsDesign(!isDesign)}
                className="relative h-14 w-28 rounded-full bg-neutral-900 p-1 transition-colors"
                style={{
                    boxShadow: "inset 0 2px 4px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)",
                }}
            >
                {/* Track glow */}
                <motion.div
                    className="absolute inset-0 rounded-full opacity-50"
                    animate={{
                        background: isDesign
                            ? "linear-gradient(135deg, rgba(168,85,247,0.3), rgba(236,72,153,0.3))"
                            : "linear-gradient(135deg, rgba(34,211,238,0.3), rgba(59,130,246,0.3))",
                    }}
                />

                {/* Knob */}
                <motion.div
                    className="relative h-12 w-12 rounded-full bg-white shadow-lg"
                    animate={{
                        x: isDesign ? 0 : 56,
                    }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    style={{
                        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                    }}
                >
                    {/* Icon */}
                    <div className="flex h-full w-full items-center justify-center">
                        {isDesign ? (
                            <svg className="h-5 w-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                            </svg>
                        ) : (
                            <svg className="h-5 w-5 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                            </svg>
                        )}
                    </div>
                </motion.div>
            </button>

            {/* Background decoration */}
            <motion.div
                className="absolute -right-20 -top-20 h-64 w-64 rounded-full blur-3xl opacity-20"
                animate={{
                    background: isDesign
                        ? "radial-gradient(circle, rgba(168,85,247,0.5), transparent)"
                        : "radial-gradient(circle, rgba(34,211,238,0.5), transparent)",
                }}
            />
        </div>
    );
};
