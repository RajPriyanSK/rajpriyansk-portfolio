"use client";

import { motion } from "framer-motion";

export default function StaggerText({
    children,
    className = "",
    staggerDelay = 0.02,
}: {
    children: string;
    className?: string;
    staggerDelay?: number;
}) {
    const chars = children.split("");

    return (
        <span className={className}>
            {chars.map((char, i) => (
                <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                        duration: 0.4,
                        delay: i * staggerDelay,
                        ease: "easeOut",
                    }}
                    className="inline-block"
                >
                    {char === " " ? "\u00A0" : char}
                </motion.span>
            ))}
        </span>
    );
}
