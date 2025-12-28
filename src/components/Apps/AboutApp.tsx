"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Trophy, GraduationCap } from "lucide-react";

export const AboutApp = () => {
    return (
        <div className="h-full p-8 overflow-auto hide-scrollbar">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-lg mx-auto space-y-8"
            >
                {/* Avatar */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="flex justify-center"
                >
                    <div className="relative">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 p-[2px]">
                            <div className="w-full h-full rounded-full overflow-hidden bg-black">
                                <Image
                                    src="/pfp.jpeg"
                                    alt="Shariq Shaukat"
                                    width={96}
                                    height={96}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                        {/* Status indicator */}
                        <div className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-black" />
                    </div>
                </motion.div>

                {/* Intro */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-center space-y-2"
                >
                    <h1 className="text-3xl font-bold tracking-tight text-white">
                        Shariq Shaukat
                    </h1>
                    <p className="text-white/50 tracking-tight">
                        Full Stack Engineer & Blockchain Developer
                    </p>
                    <div className="flex items-center justify-center gap-1.5 text-white/40">
                        <MapPin size={14} />
                        <span className="text-sm">Lahore, Pakistan</span>
                    </div>
                </motion.div>

                {/* Bio */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-4"
                >
                    <p className="text-white/70 leading-relaxed tracking-tight">
                        Design-obsessed engineer building on Solana. I craft high-performance
                        dApps and full-stack applications with a focus on exceptional user
                        experience and bulletproof architecture.
                    </p>
                    <p className="text-white/70 leading-relaxed tracking-tight">
                        Specializing in cross-chain payments, AI-powered security systems,
                        and DeFi protocols. Passionate about pushing the boundaries of
                        what&apos;s possible in Web3.
                    </p>
                </motion.div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="grid grid-cols-3 gap-4 py-6 border-y border-white/10"
                >
                    <Stat value="5x" label="Hackathon Wins" icon={<Trophy size={14} className="text-amber-400" />} />
                    <Stat value="7+" label="Projects Built" />
                    <Stat value="3+" label="Years Coding" />
                </motion.div>

                {/* Current Status */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]"
                >
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-white/90">Available for work</p>
                            <p className="text-xs text-white/40">Open to founding roles & contracts</p>
                        </div>
                    </div>
                </motion.div>

                {/* Education */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.55 }}
                    className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                            <GraduationCap size={18} className="text-blue-400" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-white/80">BS Computer Science</p>
                            <p className="text-xs text-white/40">Virtual University of Pakistan • Expected 2025</p>
                        </div>
                    </div>
                </motion.div>

                {/* Interests */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="space-y-3"
                >
                    <p className="text-xs uppercase tracking-widest text-white/30">
                        Interests
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {["Solana", "DeFi", "AI/ML", "Cross-Chain", "Security", "Motion Design"].map(
                            (interest, i) => (
                                <motion.span
                                    key={interest}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.6 + i * 0.05 }}
                                    className="px-3 py-1 rounded-full text-xs bg-white/[0.05] text-white/60 border border-white/[0.06]"
                                >
                                    {interest}
                                </motion.span>
                            )
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

const Stat = ({ value, label, icon }: { value: string; label: string; icon?: React.ReactNode }) => (
    <div className="text-center">
        <div className="flex items-center justify-center gap-1.5">
            {icon}
            <span className="text-2xl font-bold text-white tracking-tight">{value}</span>
        </div>
        <div className="text-xs text-white/40 tracking-tight">{label}</div>
    </div>
);
