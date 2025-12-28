"use client";

import { useScroll, useTransform, motion, useSpring, MotionValue } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github } from "lucide-react";

interface Project {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    tech: string[];
    color: string;
    accentColor: string;
    deviceType: "phone" | "laptop";
    links?: {
        demo?: string;
        github?: string;
    };
}

const PROJECTS: Project[] = [
    {
        id: 1,
        title: "Neon Arcade",
        subtitle: "Retro Gaming Platform",
        description: "A retro-futuristic game arcade built with WebGL and Next.js. Features real-time leaderboards, multiplayer synchronization, and authentic CRT shader effects.",
        tech: ["Solana", "WebGL", "Next.js", "TypeScript"],
        color: "from-purple-600/20 via-pink-500/10 to-cyan-500/20",
        accentColor: "#a855f7",
        deviceType: "phone",
        links: {
            demo: "https://neonarcade.example.com",
            github: "https://github.com",
        },
    },
    {
        id: 2,
        title: "XanScan 360",
        subtitle: "Blockchain Explorer",
        description: "A decentralized explorer visualizing blockchain nodes on a 3D interactive globe. Live tracking of network status, validator health, and transaction flows.",
        tech: ["Three.js", "React", "Rust", "WebSocket"],
        color: "from-emerald-600/20 via-cyan-500/10 to-blue-500/20",
        accentColor: "#10b981",
        deviceType: "laptop",
        links: {
            demo: "https://xanscan.example.com",
            github: "https://github.com",
        },
    },
];

export const ProjectShowcase = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Smooth spring for scroll progress
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    return (
        <section ref={containerRef} className="relative h-[400vh]">
            {/* Sticky container */}
            <div className="sticky top-0 h-screen overflow-hidden">
                {/* Section title */}
                <motion.div
                    className="absolute top-16 left-0 right-0 z-20"
                    style={{
                        opacity: useTransform(smoothProgress, [0, 0.05, 0.1], [0, 1, 0.3]),
                    }}
                >
                    <div className="mx-auto max-w-7xl px-8">
                        <span className="text-xs uppercase tracking-[0.3em] text-white/40">Featured Work</span>
                        <h2 className="mt-2 text-4xl font-bold tracking-tight text-white/90">
                            Selected Projects
                        </h2>
                    </div>
                </motion.div>

                {/* Projects */}
                <div className="relative h-full w-full flex items-center justify-center">
                    {PROJECTS.map((project, index) => (
                        <ProjectSlide
                            key={project.id}
                            project={project}
                            index={index}
                            totalProjects={PROJECTS.length}
                            scrollProgress={smoothProgress}
                        />
                    ))}
                </div>

                {/* Progress indicator */}
                <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-3 z-20">
                    {PROJECTS.map((project, index) => (
                        <ProgressDot
                            key={project.id}
                            index={index}
                            totalProjects={PROJECTS.length}
                            scrollProgress={smoothProgress}
                            color={project.accentColor}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

interface ProjectSlideProps {
    project: Project;
    index: number;
    totalProjects: number;
    scrollProgress: MotionValue<number>;
}

const ProjectSlide = ({ project, index, totalProjects, scrollProgress }: ProjectSlideProps) => {
    // Calculate visibility range for each project
    const projectDuration = 1 / totalProjects;
    const start = index * projectDuration;
    const end = start + projectDuration;
    const midPoint = start + projectDuration / 2;

    // Opacity: fade in, stay, fade out
    const opacity = useTransform(
        scrollProgress,
        [
            start,
            start + projectDuration * 0.15,
            end - projectDuration * 0.15,
            end,
        ],
        [0, 1, 1, 0]
    );

    // Y position for parallax
    const yText = useTransform(
        scrollProgress,
        [start, midPoint, end],
        [100, 0, -100]
    );

    const yDevice = useTransform(
        scrollProgress,
        [start, midPoint, end],
        [80, 0, -80]
    );

    // Scale for depth
    const scale = useTransform(
        scrollProgress,
        [start, start + projectDuration * 0.2, end - projectDuration * 0.2, end],
        [0.9, 1, 1, 0.9]
    );

    // Rotation for 3D effect
    const rotateY = useTransform(
        scrollProgress,
        [start, midPoint, end],
        [10, 0, -10]
    );

    return (
        <motion.div
            className="absolute inset-0 flex items-center justify-center"
            style={{ opacity }}
        >
            {/* Background gradient */}
            <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-30 blur-3xl`}
                style={{ scale }}
            />

            {/* Content container */}
            <div className="relative z-10 flex w-full max-w-7xl items-center justify-between gap-16 px-8">
                {/* Text content */}
                <motion.div
                    className="w-[45%] space-y-6"
                    style={{ y: yText }}
                >
                    <div className="space-y-2">
                        <motion.span
                            className="inline-block text-xs uppercase tracking-[0.2em] font-medium"
                            style={{ color: project.accentColor }}
                        >
                            {project.subtitle}
                        </motion.span>
                        <h3 className="text-5xl font-bold tracking-tight text-white">
                            {project.title}
                        </h3>
                    </div>

                    <p className="text-lg leading-relaxed text-white/60">
                        {project.description}
                    </p>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-2 pt-2">
                        {project.tech.map((tech) => (
                            <TechBadge key={tech} color={project.accentColor}>
                                {tech}
                            </TechBadge>
                        ))}
                    </div>

                    {/* Links */}
                    {project.links && (
                        <div className="flex gap-4 pt-4">
                            {project.links.demo && (
                                <ProjectLink href={project.links.demo} icon={<ExternalLink size={16} />}>
                                    Live Demo
                                </ProjectLink>
                            )}
                            {project.links.github && (
                                <ProjectLink href={project.links.github} icon={<Github size={16} />}>
                                    Source
                                </ProjectLink>
                            )}
                        </div>
                    )}
                </motion.div>

                {/* Device frame */}
                <motion.div
                    className="w-[50%] flex items-center justify-center"
                    style={{
                        y: yDevice,
                        scale,
                        rotateY,
                        transformPerspective: 1200,
                    }}
                >
                    {project.deviceType === "phone" ? (
                        <IPhoneFrame project={project} />
                    ) : (
                        <MacBookFrame project={project} />
                    )}
                </motion.div>
            </div>
        </motion.div>
    );
};

// Premium iPhone 15 Pro Frame
const IPhoneFrame = ({ project }: { project: Project }) => {
    return (
        <div className="relative">
            {/* Device shadow */}
            <div className="absolute inset-0 translate-y-8 blur-3xl opacity-50 bg-black rounded-[50px]" />

            {/* Phone frame */}
            <div className="relative w-[280px] h-[580px] rounded-[50px] bg-gradient-to-b from-neutral-700 to-neutral-900 p-[3px] shadow-2xl">
                {/* Inner bezel */}
                <div className="relative h-full w-full rounded-[47px] bg-black overflow-hidden">
                    {/* Dynamic Island */}
                    <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20">
                        <div className="h-[28px] w-[100px] rounded-full bg-black flex items-center justify-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-neutral-800" />
                            <div className="w-3 h-3 rounded-full bg-neutral-800" />
                        </div>
                    </div>

                    {/* Screen content */}
                    <div className={`h-full w-full bg-gradient-to-br ${project.color} relative overflow-hidden`}>
                        {/* App content */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                            {/* Animated glow */}
                            <motion.div
                                className="absolute w-40 h-40 rounded-full blur-3xl"
                                style={{ backgroundColor: project.accentColor, opacity: 0.3 }}
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.2, 0.4, 0.2],
                                }}
                                transition={{ duration: 3, repeat: Infinity }}
                            />

                            {/* Logo/Title */}
                            <div className="relative text-center">
                                <motion.div
                                    className="text-4xl font-bold uppercase tracking-widest text-white"
                                    style={{ textShadow: `0 0 40px ${project.accentColor}` }}
                                >
                                    {project.title.split(" ")[0]}
                                </motion.div>
                                <motion.div
                                    className="text-2xl font-light uppercase tracking-[0.5em] text-white/70 mt-2"
                                >
                                    {project.title.split(" ")[1]}
                                </motion.div>
                            </div>

                            {/* Decorative elements */}
                            <div className="absolute bottom-20 left-0 right-0 flex justify-center gap-3">
                                {[...Array(5)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="w-2 h-2 rounded-full bg-white/30"
                                        animate={{ opacity: [0.3, 0.8, 0.3] }}
                                        transition={{
                                            duration: 1.5,
                                            repeat: Infinity,
                                            delay: i * 0.2,
                                        }}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Screen reflection */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
                    </div>

                    {/* Home indicator */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 rounded-full bg-white/30" />
                </div>

                {/* Side buttons */}
                <div className="absolute left-[-3px] top-28 w-[3px] h-8 bg-neutral-700 rounded-l-md" />
                <div className="absolute left-[-3px] top-44 w-[3px] h-12 bg-neutral-700 rounded-l-md" />
                <div className="absolute left-[-3px] top-60 w-[3px] h-12 bg-neutral-700 rounded-l-md" />
                <div className="absolute right-[-3px] top-36 w-[3px] h-16 bg-neutral-700 rounded-r-md" />
            </div>
        </div>
    );
};

// Premium MacBook Pro Frame
const MacBookFrame = ({ project }: { project: Project }) => {
    return (
        <div className="relative w-full max-w-[600px]">
            {/* Device shadow */}
            <div className="absolute inset-0 translate-y-12 blur-3xl opacity-40 bg-black rounded-2xl" />

            {/* Laptop lid */}
            <div className="relative">
                {/* Screen bezel */}
                <div className="relative aspect-[16/10] w-full rounded-t-xl bg-neutral-900 p-[8px] shadow-2xl border border-neutral-700">
                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-neutral-900 rounded-b-xl z-10 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-neutral-800" />
                    </div>

                    {/* Screen */}
                    <div className="relative h-full w-full rounded-lg bg-neutral-950 overflow-hidden">
                        {/* Screen content */}
                        <div className={`h-full w-full bg-gradient-to-br ${project.color} relative`}>
                            {/* Globe visualization */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                {/* Animated globe */}
                                <motion.div
                                    className="relative w-48 h-48 rounded-full"
                                    style={{
                                        background: `radial-gradient(circle at 30% 30%, ${project.accentColor}20, transparent 50%), radial-gradient(circle at 70% 70%, ${project.accentColor}10, transparent 50%)`,
                                        border: `1px solid ${project.accentColor}40`,
                                    }}
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                                >
                                    {/* Grid lines */}
                                    <div className="absolute inset-0 rounded-full border border-white/10" />
                                    <div className="absolute inset-2 rounded-full border border-white/5" />
                                    <div className="absolute inset-4 rounded-full border border-white/5" />

                                    {/* Data points */}
                                    {[...Array(8)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            className="absolute w-1.5 h-1.5 rounded-full"
                                            style={{
                                                backgroundColor: project.accentColor,
                                                top: `${20 + Math.random() * 60}%`,
                                                left: `${20 + Math.random() * 60}%`,
                                                boxShadow: `0 0 10px ${project.accentColor}`,
                                            }}
                                            animate={{
                                                opacity: [0.5, 1, 0.5],
                                                scale: [1, 1.2, 1],
                                            }}
                                            transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                                delay: i * 0.3,
                                            }}
                                        />
                                    ))}
                                </motion.div>

                                {/* Status text */}
                                <div className="absolute bottom-8 left-0 right-0 text-center">
                                    <motion.span
                                        className="font-mono text-xs tracking-wider"
                                        style={{ color: project.accentColor }}
                                        animate={{ opacity: [0.5, 1, 0.5] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                    >
                                        SCANNING NETWORK...
                                    </motion.span>
                                </div>
                            </div>

                            {/* Top bar */}
                            <div className="absolute top-0 left-0 right-0 h-6 bg-black/30 backdrop-blur-sm flex items-center px-4">
                                <div className="flex gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                                </div>
                            </div>
                        </div>

                        {/* Screen reflection */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />
                    </div>
                </div>

                {/* Laptop base */}
                <div className="relative h-4 bg-gradient-to-b from-neutral-800 to-neutral-900 rounded-b-xl">
                    {/* Hinge notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-1 bg-neutral-700 rounded-b-md" />
                </div>

                {/* Keyboard base */}
                <div className="relative h-2 w-[105%] -ml-[2.5%] bg-gradient-to-b from-neutral-700 to-neutral-800 rounded-b-xl" />
            </div>
        </div>
    );
};

const TechBadge = ({ children, color }: { children: React.ReactNode; color: string }) => (
    <span
        className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium backdrop-blur-md"
        style={{
            background: `${color}15`,
            border: `1px solid ${color}30`,
            color: color,
        }}
    >
        {children}
    </span>
);

const ProjectLink = ({
    href,
    icon,
    children,
}: {
    href: string;
    icon: React.ReactNode;
    children: React.ReactNode;
}) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white/80 transition-all hover:text-white hover:bg-white/10 border border-white/10 hover:border-white/20"
    >
        {icon}
        {children}
    </a>
);

interface ProgressDotProps {
    index: number;
    totalProjects: number;
    scrollProgress: MotionValue<number>;
    color: string;
}

const ProgressDot = ({ index, totalProjects, scrollProgress, color }: ProgressDotProps) => {
    const projectDuration = 1 / totalProjects;
    const start = index * projectDuration;
    const end = start + projectDuration;
    const midPoint = start + projectDuration / 2;

    const isActive = useTransform(
        scrollProgress,
        [start, midPoint, end],
        [0, 1, 0]
    );

    const width = useSpring(
        useTransform(isActive, [0, 1], [8, 32]),
        { stiffness: 300, damping: 30 }
    );

    const opacity = useSpring(
        useTransform(isActive, [0, 1], [0.3, 1]),
        { stiffness: 300, damping: 30 }
    );

    return (
        <motion.div
            className="h-2 rounded-full"
            style={{
                width,
                opacity,
                backgroundColor: color,
            }}
        />
    );
};
