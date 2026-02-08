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
    const words = children.split(" ");

    return (
        <span className={className}>
            {words.map((word, i) => {
                // Calculate starting index for this word to maintain correct delay
                const startIndex = i === 0 ? 0 : words.slice(0, i).join(" ").length + 1;

                return (
                    <span key={i} className="inline-block whitespace-nowrap">
                        {word.split("").map((char, j) => (
                            <motion.span
                                key={j}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.4,
                                    delay: (startIndex + j) * staggerDelay,
                                    ease: "easeOut",
                                }}
                                className="inline-block"
                            >
                                {char}
                            </motion.span>
                        ))}
                        {i < words.length - 1 && <span className="inline-block">&nbsp;</span>}
                    </span>
                );
            })}
        </span>
    );
}
