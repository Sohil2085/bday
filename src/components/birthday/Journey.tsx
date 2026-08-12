"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { journeyMilestones } from "../../data/content";

function Milestone({
  milestone,
  index,
}: {
  milestone: (typeof journeyMilestones)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="relative flex gap-4 sm:gap-6 pb-12 last:pb-0">
      {/* Vertical line + dot */}
      <div className="flex flex-col items-center">
        {/* Dot */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{
            duration: 0.5,
            delay: 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative z-10 flex h-3 w-3 items-center justify-center rounded-full"
          style={{ background: "var(--gold)" }}
        >
          <div
            className="absolute h-6 w-6 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(201,169,110,0.3) 0%, transparent 70%)",
            }}
          />
        </motion.div>
        {/* Line */}
        {index < journeyMilestones.length - 1 && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{
              duration: 0.8,
              delay: 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="w-px flex-1 origin-top"
            style={{
              background: "linear-gradient(180deg, var(--gold-dim), transparent)",
            }}
          />
        )}
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{
          duration: 0.7,
          delay: 0.3,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="-mt-1 flex-1 pb-8"
      >
        <span
          className="font-serif text-2xl font-semibold sm:text-3xl"
          style={{ color: "var(--gold)" }}
        >
          {milestone.year}
        </span>
        <h3
          className="font-serif mt-1 text-lg font-medium sm:text-xl"
          style={{ color: "var(--text-primary)" }}
        >
          {milestone.title}
        </h3>
        <p
          className="mt-2 text-sm leading-relaxed sm:text-base"
          style={{ color: "var(--text-muted)" }}
        >
          {milestone.description}
        </p>
      </motion.div>
    </div>
  );
}

export default function Journey() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });

  return (
    <section
      id="journey"
      className="relative px-6 py-20 sm:py-28"
      style={{ paddingTop: "var(--section-gap)" }}
      aria-label="Life journey timeline"
    >
      {/* Section Header */}
      <div ref={headerRef} className="mx-auto max-w-lg text-center mb-16 sm:mb-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-3xl font-light sm:text-4xl"
          style={{ color: "var(--gold-light)" }}
        >
          50 Years.
        </motion.h2>
        <motion.h3
          initial={{ opacity: 0, y: 16 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.8,
            delay: 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="font-serif mt-2 text-xl font-light sm:text-2xl"
          style={{ color: "var(--text-muted)" }}
        >
          One Beautiful Journey.
        </motion.h3>

        <motion.hr
          initial={{ scaleX: 0 }}
          animate={headerInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
          className="gold-line mt-8"
        />
      </div>

      {/* Timeline */}
      <div className="mx-auto max-w-md">
        {journeyMilestones.map((milestone, index) => (
          <Milestone key={milestone.year} milestone={milestone} index={index} />
        ))}
      </div>
    </section>
  );
}
