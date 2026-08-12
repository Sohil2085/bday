"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { gujaratiMessage } from "../../data/content";

export default function GujaratiMessage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative px-6 py-20 sm:py-28"
      style={{ paddingTop: "var(--section-gap)" }}
      aria-label="Gujarati personal message"
    >
      {/* Decorative top line */}
      <motion.hr
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1 }}
        className="gold-line mb-14 sm:mb-20"
      />

      <div className="mx-auto max-w-md text-center">
        {/* Greeting */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="font-gujarati text-2xl font-medium sm:text-3xl"
          style={{ color: "var(--gold-light)" }}
          lang="gu"
        >
          {gujaratiMessage.greeting}
        </motion.p>

        {/* Main lines */}
        <div className="mt-6 space-y-2">
          {gujaratiMessage.lines.map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.3 + i * 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="font-gujarati text-base leading-relaxed sm:text-lg"
              style={{ color: "var(--text-primary)" }}
              lang="gu"
            >
              {line}
            </motion.p>
          ))}
        </div>

        {/* Closing */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.8,
            delay: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="font-gujarati mt-8 text-base italic sm:text-lg"
          style={{ color: "var(--gold)" }}
          lang="gu"
        >
          {gujaratiMessage.closing}
        </motion.p>
      </div>

      {/* Decorative bottom line */}
      <motion.hr
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1, delay: 1 }}
        className="gold-line mt-14 sm:mt-20"
      />
    </section>
  );
}
