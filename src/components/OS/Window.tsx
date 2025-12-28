"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useOSStore, WindowState } from "@/store/os-store";

interface WindowProps {
    windowState: WindowState;
    children: React.ReactNode;
}

export const Window = ({ windowState, children }: WindowProps) => {
    const { id, title, position, size, zIndex, isMaximized, isMinimized } = windowState;
    const {
        activeWindowId,
        focusWindow,
        closeWindow,
        minimizeWindow,
        toggleMaximizeWindow,
        updateWindowPosition,
    } = useOSStore();

    const windowRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [windowPos, setWindowPos] = useState(position);

    const isActive = activeWindowId === id;

    // Sync position from store
    useEffect(() => {
        setWindowPos(position);
    }, [position]);

    // Handle drag
    const handleMouseDown = (e: React.MouseEvent) => {
        if (isMaximized) return;
        e.preventDefault();
        setIsDragging(true);
        setDragStart({
            x: e.clientX - windowPos.x,
            y: e.clientY - windowPos.y,
        });
        focusWindow(id);
    };

    useEffect(() => {
        if (!isDragging) return;

        const handleMouseMove = (e: MouseEvent) => {
            const newX = Math.max(0, Math.min(e.clientX - dragStart.x, window.innerWidth - 100));
            const newY = Math.max(0, Math.min(e.clientY - dragStart.y, window.innerHeight - 100));
            setWindowPos({ x: newX, y: newY });
        };

        const handleMouseUp = () => {
            setIsDragging(false);
            updateWindowPosition(id, windowPos);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, dragStart, id, updateWindowPosition, windowPos]);

    const handleWindowClick = () => {
        if (!isActive) {
            focusWindow(id);
        }
    };

    // Don't render if minimized
    if (isMinimized) return null;

    return (
        <motion.div
            ref={windowRef}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{
                opacity: 1,
                scale: 1,
                x: windowPos.x,
                y: windowPos.y,
                width: size.width,
                height: size.height,
            }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{
                type: "spring",
                stiffness: 400,
                damping: 35,
                mass: 0.8,
            }}
            onClick={handleWindowClick}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                zIndex: zIndex + 100,
                willChange: isDragging ? "transform" : "auto",
            }}
            className={`
                flex flex-col rounded-xl overflow-hidden
                ${isActive
                    ? "shadow-2xl shadow-black/60"
                    : "shadow-xl shadow-black/40"
                }
            `}
        >
            {/* Glass background */}
            <div
                className={`absolute inset-0 rounded-xl transition-colors duration-200 ${
                    isActive
                        ? "bg-[#1a1a1a]/90 border border-white/15"
                        : "bg-[#1a1a1a]/70 border border-white/10"
                }`}
                style={{
                    backdropFilter: "blur(40px) saturate(180%)",
                    WebkitBackdropFilter: "blur(40px) saturate(180%)",
                }}
            />

            {/* Title bar */}
            <div
                className={`relative flex items-center h-11 px-3 border-b border-white/[0.06] select-none ${
                    isDragging ? "cursor-grabbing" : "cursor-grab"
                }`}
                onMouseDown={handleMouseDown}
                onDoubleClick={() => toggleMaximizeWindow(id)}
            >
                {/* Traffic lights */}
                <div className="flex items-center gap-2 z-10">
                    <TrafficLight
                        color="close"
                        onClick={() => closeWindow(id)}
                        isActive={isActive}
                    />
                    <TrafficLight
                        color="minimize"
                        onClick={() => minimizeWindow(id)}
                        isActive={isActive}
                    />
                    <TrafficLight
                        color="maximize"
                        onClick={() => toggleMaximizeWindow(id)}
                        isActive={isActive}
                        isMaximized={isMaximized}
                    />
                </div>

                {/* Title */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className={`text-sm font-medium tracking-tight transition-colors ${
                        isActive ? "text-white/70" : "text-white/40"
                    }`}>
                        {title}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="relative flex-1 overflow-hidden">
                {children}
            </div>
        </motion.div>
    );
};

// Traffic light button component
const TrafficLight = ({
    color,
    onClick,
    isActive,
    isMaximized = false,
}: {
    color: "close" | "minimize" | "maximize";
    onClick: () => void;
    isActive: boolean;
    isMaximized?: boolean;
}) => {
    const [isHovered, setIsHovered] = useState(false);

    const colors = {
        close: {
            bg: "bg-[#ff5f57]",
            hoverBg: "bg-[#ff5f57]",
            inactiveBg: "bg-white/20",
        },
        minimize: {
            bg: "bg-[#febc2e]",
            hoverBg: "bg-[#febc2e]",
            inactiveBg: "bg-white/20",
        },
        maximize: {
            bg: "bg-[#28c840]",
            hoverBg: "bg-[#28c840]",
            inactiveBg: "bg-white/20",
        },
    };

    const { bg, inactiveBg } = colors[color];

    const icons = {
        close: (
            <svg viewBox="0 0 12 12" className="w-[8px] h-[8px]">
                <path
                    d="M3 3L9 9M9 3L3 9"
                    stroke="#4a0000"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    fill="none"
                />
            </svg>
        ),
        minimize: (
            <svg viewBox="0 0 12 12" className="w-[8px] h-[8px]">
                <path
                    d="M2 6H10"
                    stroke="#9a6700"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    fill="none"
                />
            </svg>
        ),
        maximize: isMaximized ? (
            <svg viewBox="0 0 12 12" className="w-[8px] h-[8px]">
                <path
                    d="M3 3L9 3L9 9L3 9Z"
                    stroke="#006500"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    fill="none"
                />
            </svg>
        ) : (
            <svg viewBox="0 0 12 12" className="w-[8px] h-[8px]">
                <path
                    d="M2 4L6 2L10 4L10 8L6 10L2 8Z"
                    stroke="#006500"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                />
            </svg>
        ),
    };

    return (
        <button
            onClick={(e) => {
                e.stopPropagation();
                onClick();
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`
                w-3 h-3 rounded-full flex items-center justify-center
                transition-all duration-150
                ${isActive ? bg : inactiveBg}
                hover:brightness-110
            `}
        >
            <span className={`transition-opacity ${isHovered && isActive ? "opacity-100" : "opacity-0"}`}>
                {icons[color]}
            </span>
        </button>
    );
};
