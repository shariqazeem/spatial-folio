"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface TechItem {
    name: string;
    category: string;
    icon: React.ReactNode;
    color: string;
    description: string;
}

const TECH_STACK: TechItem[] = [
    {
        name: "Solana",
        category: "Blockchain",
        icon: <SolanaIcon />,
        color: "#9945FF",
        description: "High-performance blockchain",
    },
    {
        name: "Anchor",
        category: "Framework",
        icon: <AnchorIcon />,
        color: "#3B82F6",
        description: "Solana program framework",
    },
    {
        name: "Rust",
        category: "Language",
        icon: <RustIcon />,
        color: "#DEA584",
        description: "Systems programming",
    },
    {
        name: "Next.js 15",
        category: "Framework",
        icon: <NextIcon />,
        color: "#FFFFFF",
        description: "Full-stack React framework",
    },
    {
        name: "React 19",
        category: "Frontend",
        icon: <ReactIcon />,
        color: "#61DAFB",
        description: "UI component library",
    },
    {
        name: "TypeScript",
        category: "Language",
        icon: <TypeScriptIcon />,
        color: "#3178C6",
        description: "Type-safe JavaScript",
    },
    {
        name: "Python",
        category: "Language",
        icon: <PythonIcon />,
        color: "#3776AB",
        description: "AI & backend scripting",
    },
    {
        name: "FastAPI",
        category: "Backend",
        icon: <FastAPIIcon />,
        color: "#009688",
        description: "Modern Python API",
    },
    {
        name: "Ollama",
        category: "AI/ML",
        icon: <OllamaIcon />,
        color: "#FF6B6B",
        description: "Local LLM inference",
    },
    {
        name: "YOLOv8",
        category: "AI/ML",
        icon: <YoloIcon />,
        color: "#00D4AA",
        description: "Object detection AI",
    },
    {
        name: "Tailwind CSS",
        category: "Styling",
        icon: <TailwindIcon />,
        color: "#06B6D4",
        description: "Utility-first CSS",
    },
    {
        name: "Framer Motion",
        category: "Animation",
        icon: <FramerIcon />,
        color: "#FF0055",
        description: "Production animations",
    },
];

export const StackApp = () => {
    return (
        <div className="h-full p-6 overflow-auto hide-scrollbar">
            <div className="mb-6">
                <h2 className="text-xl font-bold text-white tracking-tight">Tech Stack</h2>
                <p className="text-sm text-white/40 tracking-tight">Tools & technologies I work with</p>
            </div>

            {/* Bento Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[120px]">
                {TECH_STACK.map((tech, i) => (
                    <TechCard key={tech.name} tech={tech} index={i} />
                ))}
            </div>
        </div>
    );
};

const TechCard = ({ tech, index }: { tech: TechItem; index: number }) => {
    const [isHovered, setIsHovered] = useState(false);

    // Special sizing for featured items
    const isLarge = index === 0 || index === 3;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`
                group relative overflow-hidden rounded-xl border border-white/[0.06]
                bg-white/[0.02] p-4 cursor-pointer transition-all duration-300
                hover:bg-white/[0.04] hover:border-white/10
                ${isLarge ? "md:col-span-2 md:row-span-1" : ""}
            `}
            style={{
                boxShadow: isHovered ? `0 0 40px ${tech.color}20` : "none",
            }}
        >
            {/* Glow effect */}
            <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                    background: `radial-gradient(circle at center, ${tech.color}10, transparent 70%)`,
                }}
            />

            <div className="relative z-10 h-full flex flex-col justify-between">
                {/* Icon */}
                <motion.div
                    className="w-10 h-10 flex items-center justify-center"
                    animate={isHovered ? { scale: 1.1, rotate: tech.name === "React 19" ? 360 : 0 } : {}}
                    transition={{ duration: tech.name === "React 19" ? 2 : 0.3 }}
                    style={{ color: tech.color }}
                >
                    {tech.icon}
                </motion.div>

                {/* Info */}
                <div className="space-y-1">
                    <h3 className="font-medium text-white tracking-tight">{tech.name}</h3>
                    <p className="text-[10px] uppercase tracking-widest text-white/30">
                        {tech.category}
                    </p>
                </div>

                {/* Description on hover */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
                    className="absolute bottom-4 left-4 right-4"
                >
                    <p className="text-xs text-white/50 tracking-tight">{tech.description}</p>
                </motion.div>
            </div>
        </motion.div>
    );
};

// Icon Components
function ReactIcon() {
    return (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
            <circle cx="12" cy="12" r="2.5" />
            <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="currentColor" strokeWidth="1" />
            <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="currentColor" strokeWidth="1" transform="rotate(60 12 12)" />
            <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="currentColor" strokeWidth="1" transform="rotate(120 12 12)" />
        </svg>
    );
}

function NextIcon() {
    return (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
            <path d="M11.5 0C5.149 0 0 5.149 0 11.5S5.149 23 11.5 23 23 17.851 23 11.5 17.851 0 11.5 0zm0 1.5c5.523 0 10 4.477 10 10s-4.477 10-10 10-10-4.477-10-10 4.477-10 10-10zm-2 5v10l7-5-7-5z" />
        </svg>
    );
}

function TypeScriptIcon() {
    return (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
            <path d="M0 12v12h24V0H0v12zm19.341-.956c.61.152 1.074.423 1.501.865.221.236.549.666.575.77.008.03-1.036.73-1.668 1.123-.023.015-.115-.084-.217-.236-.31-.45-.633-.644-1.128-.678-.728-.05-1.196.331-1.192.967a.88.88 0 0 0 .102.45c.16.331.458.53 1.39.933 1.719.74 2.454 1.227 2.911 1.92.51.773.625 2.008.278 2.926-.38.998-1.325 1.676-2.655 1.9-.411.073-1.386.062-1.828-.018-.964-.172-1.878-.648-2.442-1.273-.221-.243-.652-.88-.625-.925.011-.016.11-.077.22-.141.108-.061.511-.294.892-.515l.69-.4.145.214c.202.308.643.731.91.872.766.404 1.817.347 2.335-.118a.883.883 0 0 0 .313-.72c0-.278-.035-.4-.18-.61-.186-.266-.567-.49-1.649-.96-1.238-.533-1.771-.864-2.259-1.39a3.165 3.165 0 0 1-.659-1.2c-.091-.339-.114-1.189-.042-1.531.255-1.197 1.158-2.03 2.461-2.278.423-.08 1.406-.05 1.821.053zm-5.634 1.002l.008.983H10.59v8.876H8.38v-8.876H5.258v-.964c0-.534.011-.98.026-.99.012-.016 1.913-.024 4.217-.02l4.195.012z" />
        </svg>
    );
}

function SolanaIcon() {
    return (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
            <path d="M4.29 17.71a.77.77 0 0 1 .54-.22h17.74a.38.38 0 0 1 .27.65l-3.1 3.09a.77.77 0 0 1-.54.22H1.46a.38.38 0 0 1-.27-.65l3.1-3.09zm0-15.16a.79.79 0 0 1 .54-.22h17.74a.38.38 0 0 1 .27.65l-3.1 3.09a.77.77 0 0 1-.54.22H1.46a.38.38 0 0 1-.27-.65l3.1-3.09zm15.42 7.58a.77.77 0 0 0-.54-.22H1.43a.38.38 0 0 0-.27.65l3.1 3.09a.77.77 0 0 0 .54.22h17.74a.38.38 0 0 0 .27-.65l-3.1-3.09z" />
        </svg>
    );
}

function RustIcon() {
    return (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
            <path d="M23.834 8.101a13.912 13.912 0 0 0-1.383-2.343l.191-.233c.188-.23.153-.57-.077-.758l-.939-.77a.555.555 0 0 0-.758.077l-.191.233a14.082 14.082 0 0 0-2.343-1.383l.087-.289a.556.556 0 0 0-.389-.682l-1.164-.35a.556.556 0 0 0-.682.389l-.087.289a14.258 14.258 0 0 0-2.705 0l-.087-.289a.556.556 0 0 0-.682-.389l-1.164.35a.556.556 0 0 0-.389.682l.087.289a14.082 14.082 0 0 0-2.343 1.383l-.191-.233a.555.555 0 0 0-.758-.077l-.939.77c-.23.188-.265.528-.077.758l.191.233a13.912 13.912 0 0 0-1.383 2.343l-.289-.087a.556.556 0 0 0-.682.389l-.35 1.164c-.096.32.067.656.389.682l.289.087a14.258 14.258 0 0 0 0 2.705l-.289.087a.556.556 0 0 0-.389.682l.35 1.164c.096.32.432.485.682.389l.289-.087c.369.851.836 1.639 1.383 2.343l-.191.233a.555.555 0 0 0 .077.758l.939.77c.23.188.57.153.758-.077l.191-.233a14.082 14.082 0 0 0 2.343 1.383l-.087.289a.556.556 0 0 0 .389.682l1.164.35c.32.096.656-.067.682-.389l.087-.289a14.258 14.258 0 0 0 2.705 0l.087.289c.096.32.432.485.682.389l1.164-.35a.556.556 0 0 0 .389-.682l-.087-.289a14.082 14.082 0 0 0 2.343-1.383l.191.233c.188.23.528.265.758.077l.939-.77a.555.555 0 0 0 .077-.758l-.191-.233a13.912 13.912 0 0 0 1.383-2.343l.289.087a.556.556 0 0 0 .682-.389l.35-1.164a.556.556 0 0 0-.389-.682l-.289-.087a14.258 14.258 0 0 0 0-2.705l.289-.087a.556.556 0 0 0 .389-.682l-.35-1.164a.556.556 0 0 0-.682-.389l-.289.087zM12 16.5a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9z" />
        </svg>
    );
}

function AnchorIcon() {
    return (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
            <path d="M12 2a3 3 0 0 0-3 3c0 1.3.84 2.4 2 2.82V9H8v2h3v8.92a7.001 7.001 0 0 1-5.5-5.78l1.5.86 1-1.73-4-2.31-4 2.31 1 1.73 1.5-.86A9.002 9.002 0 0 0 12 22a9.002 9.002 0 0 0 8.5-5.86l1.5.86 1-1.73-4-2.31-4 2.31 1 1.73 1.5-.86A7.001 7.001 0 0 1 13 19.92V11h3V9h-3V7.82A3.001 3.001 0 0 0 12 2zm0 2a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
        </svg>
    );
}

function PythonIcon() {
    return (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
            <path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z" />
        </svg>
    );
}

function FastAPIIcon() {
    return (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
            <path d="M12 0C5.375 0 0 5.375 0 12c0 6.627 5.375 12 12 12 6.626 0 12-5.373 12-12 0-6.625-5.373-12-12-12zm-.624 21.62v-7.528H7.19L13.203 2.38v7.528h4.029L11.376 21.62z" />
        </svg>
    );
}

function OllamaIcon() {
    return (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
            <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v4M12 18v4M2 12h4M18 12h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
    );
}

function YoloIcon() {
    return (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
            <rect x="3" y="3" width="18" height="18" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
            <rect x="7" y="7" width="10" height="10" rx="1" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="12" cy="12" r="2" />
        </svg>
    );
}

function FramerIcon() {
    return (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
            <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" />
        </svg>
    );
}

function TailwindIcon() {
    return (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
            <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
        </svg>
    );
}
