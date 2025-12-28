"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ExternalLink, Github, Play, Trophy } from "lucide-react";

interface Project {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    tech: string[];
    color: string;
    accentColor: string;
    deviceType: "phone" | "laptop";
    hackathonWin?: boolean;
    github?: string;
    demo?: string;
}

const PROJECTS: Project[] = [
    {
        id: "parallaxpay",
        title: "ParallaxPay",
        subtitle: "Autonomous AI Agent Marketplace • x402 Hackathon Winner",
        description:
            "Revolutionary autonomous AI agent marketplace on distributed compute with x402 micropayments. AI agents discover, pay for, and utilize compute resources without human intervention. Features 6 specialized agent types, swarm intelligence, on-chain reputation, and real-time payment tracking on Solana.",
        tech: ["Solana", "Next.js 15", "React 19", "TypeScript", "x402", "Supabase"],
        color: "from-purple-600/30 via-pink-500/20 to-cyan-500/30",
        accentColor: "#a855f7",
        deviceType: "laptop",
        hackathonWin: true,
        github: "https://github.com/shariqazeem/parallaxpay_x402",
        demo: "https://parallaxpay.online",
    },
    {
        id: "xanscan360",
        title: "XanScan 360",
        subtitle: "Hollywood-Grade Blockchain Explorer • Xandeum Hackathon Winner",
        description:
            "Cinematic command center for Xandeum Network featuring 3D holographic globe with geospatial ping tracking, J.A.R.V.I.S. voice commands, AI-powered natural language search, live gossip terminal, node comparison mode, and deep sleep protocol screensaver. Like stepping into Tony Stark's lab.",
        tech: ["Next.js 15", "TypeScript", "Three.js", "Framer Motion", "Web Audio API"],
        color: "from-cyan-600/30 via-blue-500/20 to-purple-500/30",
        accentColor: "#00ffff",
        deviceType: "laptop",
        hackathonWin: true,
        demo: "https://xanscan360.vercel.app",
    },
    {
        id: "aegis",
        title: "AEGIS",
        subtitle: "Sovereign AI Security System • Gradient Hackathon Winner",
        description:
            "The first sovereign AI security system - 100% local, $0 cloud costs, complete privacy. Features 7-stage AI pipeline powered by Parallax, YOLOv8 computer vision, real-time threat detection. Saves $6,220/year vs AWS. Runs on consumer hardware with offline operation.",
        tech: ["Python", "YOLOv8", "Parallax", "FastAPI", "Tauri", "React"],
        color: "from-emerald-600/30 via-cyan-500/20 to-blue-500/30",
        accentColor: "#10b981",
        deviceType: "laptop",
        hackathonWin: true,
        github: "https://github.com/shariqazeem",
    },
    {
        id: "solana-saga",
        title: "Solana Saga",
        subtitle: "Tinder of Prediction Markets • Indie.fun Hackathon",
        description:
            "Swipe-to-bet prediction market that makes betting addictive and social. Hardware-first design with Gamepad API for Play Solana Gen1 console, Moddio Arcade integration for retention, gamification with XP/Levels/Streaks, and shareable bet tickets for viral loops.",
        tech: ["Solana", "Anchor", "Next.js 15", "Framer Motion", "Gamepad API"],
        color: "from-violet-600/30 via-purple-500/20 to-fuchsia-500/30",
        accentColor: "#8b5cf6",
        deviceType: "phone",
        github: "https://github.com/shariqazeem/solana-saga",
        demo: "https://solana-saga.vercel.app",
    },
    {
        id: "rizqfi",
        title: "RizqFi",
        subtitle: "Trustless Community Savings • Cypherpunk Hackathon",
        description:
            "Bringing Pakistan's $2B+ traditional committee savings to blockchain. Eliminates middleman fraud with Solana smart contracts. Features automated payouts, multi-committee PDAs, real-time trust scoring, and transparent on-chain records. Targeting 50M+ Pakistanis in informal savings.",
        tech: ["Solana", "Anchor", "Rust", "Next.js 15", "TypeScript"],
        color: "from-teal-600/30 via-emerald-500/20 to-green-500/30",
        accentColor: "#14b8a6",
        deviceType: "laptop",
        github: "https://github.com/shariqazeem/rizqfi",
        demo: "https://rizqfi.vercel.app",
    },
    {
        id: "dawnguard",
        title: "DawnGuard",
        subtitle: "Privacy-First AI Family Assistant • DAWN Hackathon",
        description:
            "True decentralized application replacing cloud services with self-hosted AI + storage. Family Vault provides unlimited encrypted storage ($0/month vs $240/year Dropbox). Local Ollama AI with zero-knowledge proof auth, P2P knowledge network, and Solana blockchain verification.",
        tech: ["Python", "Django", "Ollama", "Solana", "Docker", "SQLite"],
        color: "from-orange-600/30 via-amber-500/20 to-yellow-500/30",
        accentColor: "#f59e0b",
        deviceType: "laptop",
        github: "https://github.com/shariqazeem/DawnGuard",
    },
    {
        id: "umanity",
        title: "Umanity",
        subtitle: "Gamified Philanthropy • Solana Hackathon Winner",
        description:
            "Making generosity rewarding through blockchain. One-tap donations with instant Solana transactions, zero fees. Gamified rewards: 1 SOL = 1,000 points → future governance tokens. Features donation pools, community tipping, and transparent on-chain verification.",
        tech: ["Solana", "Anchor", "Next.js 15", "React 19", "Supabase"],
        color: "from-pink-600/30 via-rose-500/20 to-red-500/30",
        accentColor: "#ec4899",
        deviceType: "phone",
        hackathonWin: true,
        github: "https://github.com/shariqazeem",
    },
];

export const WorkApp = () => {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    return (
        <div className="h-full overflow-hidden">
            <AnimatePresence mode="wait">
                {selectedProject ? (
                    <ProjectDetail
                        key="detail"
                        project={selectedProject}
                        onBack={() => setSelectedProject(null)}
                    />
                ) : (
                    <ProjectGrid
                        key="grid"
                        projects={PROJECTS}
                        onSelect={setSelectedProject}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

const ProjectGrid = ({
    projects,
    onSelect,
}: {
    projects: Project[];
    onSelect: (p: Project) => void;
}) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x: -20 }}
            className="h-full p-6 overflow-auto hide-scrollbar"
        >
            <div className="mb-6">
                <h2 className="text-xl font-bold text-white tracking-tight">Selected Work</h2>
                <p className="text-sm text-white/40 tracking-tight">5x Hackathon Winner • Click to explore</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.map((project, i) => (
                    <motion.button
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        onClick={() => onSelect(project)}
                        className="group relative overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 text-left transition-all hover:bg-white/[0.04] hover:border-white/10"
                    >
                        {/* Gradient background */}
                        <div
                            className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                        />

                        <div className="relative z-10">
                            {/* Header */}
                            <div className="flex items-start justify-between mb-3">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-semibold text-white tracking-tight">
                                            {project.title}
                                        </h3>
                                        {project.hackathonWin && (
                                            <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-amber-500/20 border border-amber-500/30">
                                                <Trophy size={10} className="text-amber-400" />
                                                <span className="text-[9px] text-amber-400 font-medium">Winner</span>
                                            </div>
                                        )}
                                    </div>
                                    <p
                                        className="text-xs tracking-tight mt-0.5"
                                        style={{ color: project.accentColor }}
                                    >
                                        {project.subtitle}
                                    </p>
                                </div>
                                <motion.div
                                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                                    whileHover={{ scale: 1.1 }}
                                >
                                    <Play size={16} className="text-white/60" />
                                </motion.div>
                            </div>

                            {/* Tech stack */}
                            <div className="flex flex-wrap gap-1.5">
                                {project.tech.slice(0, 3).map((tech) => (
                                    <span
                                        key={tech}
                                        className="px-2 py-0.5 text-[10px] rounded-full bg-white/[0.05] text-white/50"
                                    >
                                        {tech}
                                    </span>
                                ))}
                                {project.tech.length > 3 && (
                                    <span className="px-2 py-0.5 text-[10px] rounded-full bg-white/[0.05] text-white/50">
                                        +{project.tech.length - 3}
                                    </span>
                                )}
                            </div>
                        </div>
                    </motion.button>
                ))}
            </div>
        </motion.div>
    );
};

const ProjectDetail = ({
    project,
    onBack,
}: {
    project: Project;
    onBack: () => void;
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="h-full flex flex-col"
        >
            {/* Header */}
            <div className="flex items-center gap-3 p-4 border-b border-white/[0.06]">
                <button
                    onClick={onBack}
                    className="p-1.5 rounded-lg hover:bg-white/[0.05] transition-colors"
                >
                    <ArrowLeft size={18} className="text-white/60" />
                </button>
                <div className="flex-1">
                    <div className="flex items-center gap-2">
                        <h2 className="font-semibold text-white tracking-tight">{project.title}</h2>
                        {project.hackathonWin && (
                            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/30">
                                <Trophy size={12} className="text-amber-400" />
                                <span className="text-xs text-amber-400 font-medium">Winner</span>
                            </div>
                        )}
                    </div>
                    <p className="text-xs text-white/40 tracking-tight">{project.subtitle}</p>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto hide-scrollbar p-6">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Device Frame */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                        className="flex-shrink-0 flex items-center justify-center"
                    >
                        {project.deviceType === "phone" ? (
                            <PhoneFrame project={project} />
                        ) : (
                            <LaptopFrame project={project} />
                        )}
                    </motion.div>

                    {/* Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex-1 space-y-6"
                    >
                        <p className="text-white/70 leading-relaxed tracking-tight">
                            {project.description}
                        </p>

                        {/* Tech stack */}
                        <div className="space-y-2">
                            <p className="text-xs uppercase tracking-widest text-white/30">
                                Tech Stack
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {project.tech.map((tech) => (
                                    <span
                                        key={tech}
                                        className="px-3 py-1 text-xs rounded-full border"
                                        style={{
                                            borderColor: `${project.accentColor}40`,
                                            color: project.accentColor,
                                            backgroundColor: `${project.accentColor}10`,
                                        }}
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Links */}
                        <div className="flex gap-3 pt-4">
                            {project.demo && (
                                <a
                                    href={project.demo}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/[0.08] text-white/90 text-sm hover:bg-white/[0.12] transition-colors border border-white/10"
                                >
                                    <ExternalLink size={14} />
                                    Live Demo
                                </a>
                            )}
                            {project.github && (
                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/[0.05] text-white/80 text-sm hover:bg-white/[0.08] transition-colors"
                                >
                                    <Github size={14} />
                                    Source
                                </a>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

const PhoneFrame = ({ project }: { project: Project }) => (
    <div className="relative w-[180px] h-[380px] rounded-[32px] bg-gradient-to-b from-neutral-700 to-neutral-900 p-[2px] shadow-2xl">
        <div className="relative h-full w-full rounded-[30px] bg-black overflow-hidden">
            {/* Dynamic Island */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20">
                <div className="h-[18px] w-[60px] rounded-full bg-black" />
            </div>

            {/* Screen */}
            <div className={`h-full w-full bg-gradient-to-br ${project.color}`}>
                <div className="h-full flex flex-col items-center justify-center p-6">
                    <motion.div
                        className="w-20 h-20 rounded-full blur-2xl"
                        style={{ backgroundColor: project.accentColor, opacity: 0.3 }}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 3, repeat: Infinity }}
                    />
                    <div className="mt-4 text-center">
                        <div
                            className="text-xl font-bold uppercase tracking-widest"
                            style={{ textShadow: `0 0 30px ${project.accentColor}` }}
                        >
                            {project.title.split(" ")[0]}
                        </div>
                    </div>
                </div>
            </div>

            {/* Home indicator */}
            <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-20 h-1 rounded-full bg-white/30" />
        </div>
    </div>
);

const LaptopFrame = ({ project }: { project: Project }) => (
    <div className="relative w-[320px]">
        <div className="aspect-[16/10] w-full rounded-t-lg bg-neutral-900 p-[4px] shadow-2xl border border-neutral-700">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-3 bg-neutral-900 rounded-b-lg z-10" />

            {/* Screen */}
            <div className="h-full w-full rounded-md bg-neutral-950 overflow-hidden">
                <div className={`h-full w-full bg-gradient-to-br ${project.color}`}>
                    {/* Top bar */}
                    <div className="h-4 bg-black/30 flex items-center px-2">
                        <div className="flex gap-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-500/70" />
                            <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/70" />
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500/70" />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex items-center justify-center h-[calc(100%-16px)]">
                        <motion.div
                            className="w-24 h-24 rounded-full border"
                            style={{ borderColor: `${project.accentColor}40` }}
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        >
                            <div className="w-full h-full rounded-full flex items-center justify-center">
                                <div
                                    className="w-2 h-2 rounded-full"
                                    style={{ backgroundColor: project.accentColor }}
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
        {/* Base */}
        <div className="h-2 bg-gradient-to-b from-neutral-800 to-neutral-900 rounded-b-lg" />
        <div className="h-1 w-[105%] -ml-[2.5%] bg-gradient-to-b from-neutral-700 to-neutral-800 rounded-b-lg" />
    </div>
);
