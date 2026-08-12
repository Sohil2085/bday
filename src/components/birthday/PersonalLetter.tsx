"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { personalLetter } from "../../data/content";

export default function PersonalLetter() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      className="relative px-4 py-16 sm:px-6 sm:py-24"
      style={{ paddingTop: "var(--section-gap)" }}
      aria-label="Personal letter"
    >
      {/* Letter card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="letter-bg relative mx-auto max-w-md overflow-hidden rounded-sm px-6 py-10 sm:px-10 sm:py-14"
        lang="gu"
        style={{
          boxShadow:
            "0 10px 40px rgba(0,0,0,0.25), 0 2px 10px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.3)",
        }}
      >
        {/* Tiny decorative gold line at top */}
        <div
          className="absolute left-1/2 top-0 h-px w-16 -translate-x-1/2"
          style={{
            background:
              "linear-gradient(90deg, transparent, var(--gold), transparent)",
          }}
        />

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-gujarati text-center text-xl font-semibold sm:text-2xl"
          style={{ color: "#5a4a35" }}
        >
          {personalLetter.title}
        </motion.h2>

        {/* Separator */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mx-auto my-6 h-px w-12"
          style={{
            background:
              "linear-gradient(90deg, transparent, var(--gold-dim), transparent)",
          }}
        />

        {/* Message lines */}
        <div className="space-y-3">
          {personalLetter.lines.map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.8 + i * 0.25,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="font-gujarati text-center text-sm leading-relaxed sm:text-base"
              style={{ color: "#4a4035" }}
            >
              {line}
            </motion.p>
          ))}
        </div>

        {/* Closing */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 2.2 }}
          className="font-gujarati mt-8 text-center text-lg font-medium sm:text-xl"
          style={{ color: "#5a4a35" }}
        >
          {personalLetter.closing}
        </motion.p>

        {/* Signature */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 2.6 }}
          className="font-gujarati mt-4 text-center text-base font-medium sm:text-lg"
          style={{ color: "var(--gold-dim)" }}
        >
          {personalLetter.signature}
        </motion.p>

        {/* Bottom decorative line */}
        <div
          className="absolute bottom-0 left-1/2 h-px w-16 -translate-x-1/2"
          style={{
            background:
              "linear-gradient(90deg, transparent, var(--gold), transparent)",
          }}
        />
      </motion.div>
    </section>
  );
}
