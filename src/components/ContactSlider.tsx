"use client";

import { motion, useMotionValue, useTransform, useAnimation, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Mail, Copy, Sparkles } from "lucide-react";
import { useState, useCallback } from "react";
import confetti from "canvas-confetti";

const EMAIL = "hello@example.com"; // Update with your email

export const ContactSlider = () => {
    const [success, setSuccess] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const x = useMotionValue(0);
    const controls = useAnimation();

    const sliderWidth = 300;
    const handleWidth = 56;
    const maxDrag = sliderWidth - handleWidth - 8;

    // Transform values based on drag position
    const progress = useTransform(x, [0, maxDrag], [0, 1]);
    const textOpacity = useTransform(x, [0, maxDrag * 0.5], [1, 0]);
    const backgroundColor = useTransform(
        x,
        [0, maxDrag],
        ["rgba(255,255,255,0.03)", "rgba(0,255,255,0.1)"]
    );
    const borderColor = useTransform(
        x,
        [0, maxDrag],
        ["rgba(255,255,255,0.08)", "rgba(0,255,255,0.3)"]
    );

    // Glow intensity based on progress
    const glowOpacity = useTransform(x, [0, maxDrag], [0, 0.5]);

    const handleDragEnd = useCallback(async () => {
        const currentX = x.get();
        setIsDragging(false);

        if (currentX > maxDrag * 0.85) {
            // Success threshold reached
            setSuccess(true);

            // Snap to end
            await controls.start({ x: maxDrag });

            // Trigger confetti
            triggerConfetti();

            // Copy email to clipboard
            try {
                await navigator.clipboard.writeText(EMAIL);
            } catch (err) {
                console.error("Failed to copy email:", err);
            }

            // Open mail client after a short delay
            setTimeout(() => {
                window.location.href = `mailto:${EMAIL}`;
            }, 1500);
        } else {
            // Reset with spring animation
            controls.start({
                x: 0,
                transition: { type: "spring", stiffness: 400, damping: 30 }
            });
        }
    }, [x, maxDrag, controls]);

    const triggerConfetti = () => {
        const defaults = {
            spread: 360,
            ticks: 100,
            gravity: 0.5,
            decay: 0.94,
            startVelocity: 30,
            colors: ["#00ffff", "#a855f7", "#ffffff", "#3b82f6"],
        };

        confetti({
            ...defaults,
            particleCount: 50,
            scalar: 1.2,
            shapes: ["circle", "square"],
            origin: { y: 0.7 },
        });

        setTimeout(() => {
            confetti({
                ...defaults,
                particleCount: 30,
                scalar: 0.75,
                shapes: ["circle"],
                origin: { y: 0.7 },
            });
        }, 150);
    };

    const reset = () => {
        setSuccess(false);
        controls.start({ x: 0 });
    };

    return (
        <div className="flex flex-col items-center justify-center gap-10 py-32 px-4">
            {/* Section header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center space-y-3"
            >
                <span className="text-xs uppercase tracking-[0.3em] text-white/40">
                    Get in Touch
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-white">
                    Let&apos;s Build Something
                </h2>
                <p className="text-white/50 max-w-md mx-auto">
                    Got a project in mind? I&apos;d love to hear about it.
                </p>
            </motion.div>

            {/* Slider container */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="relative"
            >
                {/* Glow effect */}
                <motion.div
                    className="absolute inset-0 rounded-full blur-2xl"
                    style={{
                        opacity: glowOpacity,
                        background: "radial-gradient(circle at center, rgba(0,255,255,0.3), transparent 70%)",
                    }}
                />

                {/* Slider track */}
                <motion.div
                    className="relative h-16 rounded-full overflow-hidden"
                    style={{
                        width: sliderWidth,
                        backgroundColor,
                        border: "1px solid",
                        borderColor,
                        boxShadow: "inset 0 2px 4px rgba(0,0,0,0.2)",
                    }}
                >
                    {/* Progress fill */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20"
                        style={{
                            scaleX: progress,
                            transformOrigin: "left",
                        }}
                    />

                    {/* Background text */}
                    <motion.div
                        style={{ opacity: textOpacity }}
                        className="absolute inset-0 flex items-center justify-center text-sm font-medium text-white/30 pointer-events-none select-none"
                    >
                        <span className="flex items-center gap-2">
                            <ArrowRight size={16} />
                            Slide to Connect
                        </span>
                    </motion.div>

                    {/* Success overlay */}
                    <AnimatePresence>
                        {success && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-sm"
                            >
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="flex items-center gap-2 text-cyan-400"
                                >
                                    <Sparkles size={18} />
                                    <span className="text-sm font-medium">Connecting...</span>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Slider handle */}
                    <motion.div
                        drag={success ? false : "x"}
                        dragConstraints={{ left: 0, right: maxDrag }}
                        dragElastic={0}
                        dragMomentum={false}
                        onDragStart={() => setIsDragging(true)}
                        onDragEnd={handleDragEnd}
                        animate={controls}
                        style={{ x }}
                        whileDrag={{ scale: 1.05 }}
                        className="absolute top-1 left-1 flex h-14 w-14 cursor-grab active:cursor-grabbing items-center justify-center rounded-full bg-white shadow-lg z-10"
                    >
                        <AnimatePresence mode="wait">
                            {success ? (
                                <motion.div
                                    key="check"
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    exit={{ scale: 0 }}
                                    transition={{ type: "spring", stiffness: 500, damping: 25 }}
                                >
                                    <Check className="text-cyan-500" size={22} strokeWidth={3} />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="arrow"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <ArrowRight
                                        className={`text-neutral-800 transition-transform ${isDragging ? "translate-x-0.5" : ""}`}
                                        size={22}
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Pulse ring when dragging */}
                        {isDragging && (
                            <motion.div
                                className="absolute inset-0 rounded-full border-2 border-cyan-400"
                                initial={{ scale: 1, opacity: 0.5 }}
                                animate={{ scale: 1.3, opacity: 0 }}
                                transition={{ duration: 0.8, repeat: Infinity }}
                            />
                        )}
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Status message */}
            <AnimatePresence mode="wait">
                {success ? (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex flex-col items-center gap-4"
                    >
                        <div className="flex items-center gap-2 text-cyan-400">
                            <Copy size={16} />
                            <span className="text-sm font-medium">Email copied to clipboard!</span>
                        </div>
                        <button
                            onClick={reset}
                            className="text-xs text-white/40 hover:text-white/60 transition-colors"
                        >
                            Try again
                        </button>
                    </motion.div>
                ) : (
                    <motion.div
                        key="hint"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2 text-white/30 text-sm"
                    >
                        <Mail size={14} />
                        <span>{EMAIL}</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Alternative contact methods */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="flex gap-4 pt-8"
            >
                <SocialButton href="https://github.com" label="GitHub">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                </SocialButton>
                <SocialButton href="https://linkedin.com" label="LinkedIn">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                </SocialButton>
                <SocialButton href="https://twitter.com" label="Twitter">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                </SocialButton>
            </motion.div>
        </div>
    );
};

const SocialButton = ({
    href,
    label,
    children,
}: {
    href: string;
    label: string;
    children: React.ReactNode;
}) => (
    <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 transition-all hover:border-white/20 hover:bg-white/10 hover:text-white"
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
    >
        {children}
    </motion.a>
);
