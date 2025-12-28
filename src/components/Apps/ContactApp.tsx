"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Github, Linkedin, Twitter, Copy, Check, Send, MapPin } from "lucide-react";
import confetti from "canvas-confetti";

const EMAIL = "shariqshaukat786@gmail.com";

const SOCIAL_LINKS = [
    { icon: Github, label: "GitHub", href: "https://github.com/shariqazeem", username: "@shariqazeem" },
    { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/shariqshaukat", username: "in/shariqshaukat" },
    { icon: Twitter, label: "Twitter", href: "https://twitter.com/shariqshkt", username: "@shariqshkt" },
];

export const ContactApp = () => {
    const [copied, setCopied] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleCopyEmail = async () => {
        await navigator.clipboard.writeText(EMAIL);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleSliderComplete = () => {
        setSuccess(true);
        triggerConfetti();

        // Copy email
        navigator.clipboard.writeText(EMAIL);

        // Open mail client after delay
        setTimeout(() => {
            window.location.href = `mailto:${EMAIL}`;
        }, 1500);
    };

    const triggerConfetti = () => {
        confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ["#00ffff", "#a855f7", "#ffffff"],
        });
    };

    return (
        <div className="h-full p-6 overflow-auto hide-scrollbar">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md mx-auto space-y-8"
            >
                {/* Header */}
                <div className="text-center space-y-2">
                    <h2 className="text-2xl font-bold text-white tracking-tight">
                        Let&apos;s Connect
                    </h2>
                    <p className="text-white/50 tracking-tight">
                        Always open to new opportunities
                    </p>
                    <div className="flex items-center justify-center gap-1.5 text-white/40">
                        <MapPin size={14} />
                        <span className="text-sm">Lahore, Pakistan</span>
                    </div>
                </div>

                {/* Email Card */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]"
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center">
                                <Mail size={18} className="text-cyan-400" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-white">{EMAIL}</p>
                                <p className="text-xs text-white/40">Primary contact</p>
                            </div>
                        </div>
                        <button
                            onClick={handleCopyEmail}
                            className="p-2 rounded-lg hover:bg-white/[0.05] transition-colors"
                        >
                            <AnimatePresence mode="wait">
                                {copied ? (
                                    <motion.div
                                        key="check"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        exit={{ scale: 0 }}
                                    >
                                        <Check size={16} className="text-green-400" />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="copy"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        exit={{ scale: 0 }}
                                    >
                                        <Copy size={16} className="text-white/40" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </button>
                    </div>
                </motion.div>

                {/* Social Links */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-3"
                >
                    <p className="text-xs uppercase tracking-widest text-white/30">
                        Elsewhere
                    </p>
                    <div className="grid gap-2">
                        {SOCIAL_LINKS.map((link, i) => (
                            <motion.a
                                key={link.label}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 + i * 0.05 }}
                                className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] hover:border-white/[0.08] transition-all group"
                            >
                                <div className="flex items-center gap-3">
                                    <link.icon size={18} className="text-white/50 group-hover:text-white/80 transition-colors" />
                                    <span className="text-sm text-white/70 group-hover:text-white transition-colors">
                                        {link.label}
                                    </span>
                                </div>
                                <span className="text-xs text-white/30 group-hover:text-white/50 transition-colors">
                                    {link.username}
                                </span>
                            </motion.a>
                        ))}
                    </div>
                </motion.div>

                {/* Slide to Send */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="pt-4"
                >
                    <SlideToSend
                        onComplete={handleSliderComplete}
                        success={success}
                    />
                </motion.div>

                {/* Success message */}
                <AnimatePresence>
                    {success && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="text-center space-y-2"
                        >
                            <p className="text-sm text-cyan-400">Email copied to clipboard!</p>
                            <p className="text-xs text-white/40">Opening mail client...</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

const SlideToSend = ({
    onComplete,
    success,
}: {
    onComplete: () => void;
    success: boolean;
}) => {
    const [isDragging, setIsDragging] = useState(false);
    const [progress, setProgress] = useState(0);
    const sliderWidth = 280;
    const handleWidth = 48;
    const maxDrag = sliderWidth - handleWidth - 8;

    const handleDrag = (_: unknown, info: { offset: { x: number } }) => {
        const newProgress = Math.max(0, Math.min(1, info.offset.x / maxDrag));
        setProgress(newProgress);
    };

    const handleDragEnd = (_: unknown, info: { offset: { x: number } }) => {
        setIsDragging(false);
        if (info.offset.x > maxDrag * 0.9) {
            setProgress(1);
            onComplete();
        } else {
            setProgress(0);
        }
    };

    return (
        <div className="relative h-14 rounded-full bg-white/[0.03] border border-white/[0.06] overflow-hidden" style={{ width: sliderWidth }}>
            {/* Progress fill */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10"
                style={{ scaleX: progress, transformOrigin: "left" }}
            />

            {/* Text */}
            <motion.div
                className="absolute inset-0 flex items-center justify-center text-sm text-white/30 pointer-events-none"
                style={{ opacity: 1 - progress }}
            >
                <Send size={14} className="mr-2" />
                Slide to send
            </motion.div>

            {/* Handle */}
            <motion.div
                drag={success ? false : "x"}
                dragConstraints={{ left: 0, right: maxDrag }}
                dragElastic={0}
                dragMomentum={false}
                onDragStart={() => setIsDragging(true)}
                onDrag={handleDrag}
                onDragEnd={handleDragEnd}
                animate={{ x: success ? maxDrag : progress * maxDrag }}
                className="absolute top-1 left-1 w-12 h-12 rounded-full bg-white flex items-center justify-center cursor-grab active:cursor-grabbing shadow-lg"
            >
                <AnimatePresence mode="wait">
                    {success ? (
                        <motion.div
                            key="check"
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                        >
                            <Check size={20} className="text-cyan-500" />
                        </motion.div>
                    ) : (
                        <motion.div key="arrow">
                            <Send size={18} className="text-neutral-700" />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Pulse when dragging */}
                {isDragging && !success && (
                    <motion.div
                        className="absolute inset-0 rounded-full border-2 border-cyan-400"
                        initial={{ scale: 1, opacity: 0.5 }}
                        animate={{ scale: 1.3, opacity: 0 }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                    />
                )}
            </motion.div>
        </div>
    );
};
