"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

export default function SpotlightButton({
    children,
    className = "",
    onClick,
}: {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}) {
    const btnRef = useRef<HTMLButtonElement>(null);
    const spanRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { left, top } = btnRef.current!.getBoundingClientRect();
            const x = e.clientX - left;
            const y = e.clientY - top;

            spanRef.current!.style.setProperty("--x", `${x}px`);
            spanRef.current!.style.setProperty("--y", `${y}px`);
        };

        const btn = btnRef.current;
        if (btn) {
            btn.addEventListener("mousemove", handleMouseMove);
        }

        return () => {
            if (btn) {
                btn.removeEventListener("mousemove", handleMouseMove);
            }
        };
    }, []);

    return (
        <motion.button
            ref={btnRef}
            className={`relative overflow-hidden group ${className}`}
            onClick={onClick}
            whileTap={{ scale: 0.98 }}
        >
            <span
                ref={spanRef}
                className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-[var(--x)] translate-y-[var(--y)]"
                style={{
                    background:
                        "radial-gradient(circle closest-side, rgba(255, 255, 255, 0.3) 0%, transparent 100%)",
                    transform: "translate(-50%, -50%)",
                    left: 0,
                    top: 0,
                    width: "200%",
                    height: "200%",
                }}
            />
            <div className="relative z-10">{children}</div>
        </motion.button>
    );
}
