"use client";

import { motion } from "framer-motion";

export default function ImageReveal({
    children,
    className = "",
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div className={`overflow-hidden relative ${className}`}>
            <motion.div
                initial={{ scale: 1.2, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
                className="w-full h-full"
            >
                {children}
            </motion.div>
        </div>
    );
}
