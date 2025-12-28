"use client";

import React, { useEffect, useState, useCallback } from "react";
import { motion, useSpring, useMotionValue, useScroll, useTransform } from "framer-motion";

export const Spotlight = ({ children }: { children: React.ReactNode }) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const [isVisible, setIsVisible] = useState(false);

    // Scroll-based aurora color shift
    const { scrollYProgress } = useScroll();
    const auroraHue1 = useTransform(scrollYProgress, [0, 0.5, 1], [280, 200, 320]);
    const auroraHue2 = useTransform(scrollYProgress, [0, 0.5, 1], [200, 280, 180]);

    // Smooth spring physics for the spotlight movement
    const springConfig = { damping: 30, stiffness: 200, mass: 0.5 };
    const x = useSpring(mouseX, springConfig);
    const y = useSpring(mouseY, springConfig);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
        setIsVisible(true);
    }, [mouseX, mouseY]);

    const handleMouseLeave = useCallback(() => {
        setIsVisible(false);
    }, []);

    useEffect(() => {
        window.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [handleMouseMove, handleMouseLeave]);

    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-[#050505]">
            {/* Aurora Container */}
            <div className="aurora-container">
                <motion.div
                    className="aurora-gradient"
                    style={{
                        background: useTransform(
                            [auroraHue1, auroraHue2],
                            ([h1, h2]) => `
                                radial-gradient(ellipse 80% 50% at 20% 40%, hsla(${h1}, 70%, 40%, 0.15), transparent 50%),
                                radial-gradient(ellipse 60% 40% at 80% 60%, hsla(${h2}, 70%, 40%, 0.1), transparent 50%),
                                radial-gradient(ellipse 50% 30% at 40% 80%, hsla(${Number(h1) + 60}, 60%, 50%, 0.08), transparent 50%)
                            `
                        ),
                    }}
                />
            </div>

            {/* Secondary Aurora Layer - Slower movement */}
            <motion.div
                className="fixed inset-0 pointer-events-none z-[1] opacity-30"
                style={{
                    background: useTransform(
                        auroraHue1,
                        (h) => `radial-gradient(ellipse 100% 80% at 50% 100%, hsla(${h}, 50%, 30%, 0.2), transparent 60%)`
                    ),
                }}
            />

            {/* Spotlight Effect - Follows cursor */}
            <motion.div
                className="pointer-events-none fixed z-[2]"
                style={{
                    left: x,
                    top: y,
                    x: "-50%",
                    y: "-50%",
                }}
            >
                {/* Outer glow */}
                <motion.div
                    className="absolute rounded-full"
                    style={{
                        width: 600,
                        height: 600,
                        x: "-50%",
                        y: "-50%",
                        background: "radial-gradient(circle at center, rgba(255,255,255,0.03) 0%, transparent 70%)",
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                        opacity: isVisible ? 1 : 0,
                        scale: isVisible ? 1 : 0.8,
                    }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                />

                {/* Inner spotlight */}
                <motion.div
                    className="absolute rounded-full"
                    style={{
                        width: 300,
                        height: 300,
                        x: "-50%",
                        y: "-50%",
                        background: "radial-gradient(circle at center, rgba(255,255,255,0.05) 0%, transparent 60%)",
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isVisible ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                />

                {/* Accent color glow */}
                <motion.div
                    className="absolute rounded-full blur-2xl"
                    style={{
                        width: 200,
                        height: 200,
                        x: "-50%",
                        y: "-50%",
                        background: "radial-gradient(circle at center, rgba(0,255,255,0.03) 0%, transparent 70%)",
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isVisible ? 1 : 0 }}
                    transition={{ duration: 0.5 }}
                />
            </motion.div>

            {/* Content */}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
};
