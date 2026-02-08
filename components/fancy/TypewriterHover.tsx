"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function TypewriterHover({
    children,
    className = "",
    minSpeed = 10,
    maxSpeed = 50,
}: {
    children: string;
    className?: string;
    minSpeed?: number;
    maxSpeed?: number;
}) {
    const [displayText, setDisplayText] = useState(children);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        setDisplayText(children);
    }, [children]);

    const startTyping = () => {
        setDisplayText("");
        let currentIndex = 0;

        if (intervalRef.current) clearInterval(intervalRef.current);

        // Calculate dynamic speed based on length to keep animations snappy
        // Longer text = faster typing
        const calculatedSpeed = Math.max(minSpeed, Math.min(maxSpeed, 1500 / children.length));

        intervalRef.current = setInterval(() => {
            if (currentIndex < children.length) {
                setDisplayText(children.substring(0, currentIndex + 1));
                currentIndex++;
            } else {
                if (intervalRef.current) clearInterval(intervalRef.current);
            }
        }, calculatedSpeed);
    };

    return (
        <motion.span
            onMouseEnter={startTyping}
            className={`relative inline-block whitespace-pre-wrap ${className}`}
        >
            {/* Ghost text to maintain width/height and prevent layout shift */}
            <span className="opacity-0">{children}</span>

            {/* Actual typing text overlaid */}
            <span className="absolute inset-0">
                {displayText}
                {displayText.length < children.length && (
                    <span className="animate-pulse border-r-2 border-current ml-0.5"></span>
                )}
            </span>
        </motion.span>
    );
}
