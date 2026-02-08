"use client";

import { motion } from "framer-motion";
import { MoveRight } from "lucide-react";
import { useRef, useState } from "react";

export default function MagneticButton({
    children,
    className = "",
    onClick,
}: {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}) {
    const ref = useRef<HTMLButtonElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseOnly = (e: React.MouseEvent<HTMLButtonElement>) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current!.getBoundingClientRect();
        const x = clientX - (left + width / 2);
        const y = clientY - (top + height / 2);
        setPosition({ x, y });
    };

    const reset = () => {
        setPosition({ x: 0, y: 0 });
    };

    return (
        <motion.button
            ref={ref}
            className={`relative px-6 py-3 rounded-full border border-primary/20 bg-background text-primary overflow-hidden group ${className}`}
            onMouseMove={handleMouseOnly}
            onMouseLeave={reset}
            animate={{ x: position.x * 0.2, y: position.y * 0.2 }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            onClick={onClick}
        >
            <span className="relative z-10 flex items-center gap-2 group-hover:text-background transition-colors duration-300">
                {children}
                <MoveRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </span>
            <div className="absolute inset-0 z-0 bg-primary translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
        </motion.button>
    );
}
