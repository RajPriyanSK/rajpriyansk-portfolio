"use client";

import { motion } from "framer-motion";
import React from "react";

export default function TextReveal({
    children,
    className = "",
    delay = 0,
}: {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}) {
    return (
        <div className={`overflow-hidden ${className}`}>
            <motion.div
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay, ease: [0.76, 0, 0.24, 1] }}
            >
                {children}
            </motion.div>
        </div>
    );
}
