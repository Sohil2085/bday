"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { openingSequence } from "../../data/content";

export default function Hero() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      setPhase(7);
      return;
    }

    const timers = [
      setTimeout(() => setPhase(1), 400),    // particles visible
      setTimeout(() => setPhase(2), 800),    // "A little surprise..."
      setTimeout(() => setPhase(3), 2400),   // "for someone very special."
      setTimeout(() => setPhase(4), 4000),   // "50"
      setTimeout(() => setPhase(5), 5200),   // reveal lines
      setTimeout(() => setPhase(6), 6400),   // greeting
      setTimeout(() => setPhase(7), 7400),  // scroll prompt
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  const fadeUp = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  };

  const scrollToJourney = () => {
    const el = document.getElementById("journey");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6"
      aria-label="Opening"
    >
      {/* Radial glow behind the 50 */}
      <AnimatePresence>
        {phase >= 4 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="pointer-events-none absolute"
            style={{
              width: "min(80vw, 400px)",
              height: "min(80vw, 400px)",
              background:
                "radial-gradient(circle, rgba(201,169,110,0.12) 0%, transparent 70%)",
              borderRadius: "50%",
            }}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Phase 2: "A little surprise..." */}
      <AnimatePresence mode="wait">
        {phase === 2 && (
          <motion.p
            key="line1"
            {...fadeUp}
            exit={{ opacity: 0, y: -10, transition: { duration: 0.4 } }}
            className="font-serif text-lg tracking-wide sm:text-xl"
            style={{ color: "var(--text-muted)" }}
          >
            {openingSequence.line1}
          </motion.p>
        )}

        {/* Phase 3: "for someone very special." */}
        {phase === 3 && (
          <motion.p
            key="line2"
            {...fadeUp}
            exit={{ opacity: 0, y: -10, transition: { duration: 0.4 } }}
            className="font-serif text-lg tracking-wide sm:text-xl"
            style={{ color: "var(--text-muted)" }}
          >
            {openingSequence.line2}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Phase 4: The big "50" */}
      {phase >= 4 && (
        <motion.h1
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] as const }}
          className="font-serif glow-gold-strong text-center font-light leading-none"
          style={{
            fontSize: "clamp(6rem, 25vw, 14rem)",
            color: "var(--gold)",
            letterSpacing: "-0.02em",
          }}
        >
          {openingSequence.number}
        </motion.h1>
      )}

      {/* Phase 5: Reveal lines */}
      {phase >= 5 && (
        <div className="mt-6 flex flex-col items-center gap-1 sm:mt-8">
          {openingSequence.revealLines.map((line, i) => (
            <motion.p
              key={line}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: i * 0.25,
                ease: [0.22, 1, 0.36, 1] as const,
              }}
              className="font-serif text-base tracking-wide sm:text-lg"
              style={{ color: "var(--text-muted)" }}
            >
              {line}
            </motion.p>
          ))}
        </div>
      )}

      {/* Phase 6: Greeting */}
      {phase >= 6 && (
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] as const }}
          className="font-serif glow-gold mt-8 text-center text-2xl font-medium sm:mt-12 sm:text-3xl"
          style={{ color: "var(--gold-light)" }}
        >
          {openingSequence.greeting}
        </motion.h2>
      )}

      {/* Phase 7: Scroll prompt */}
      {phase >= 7 && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          onClick={scrollToJourney}
          className="group mt-16 flex cursor-pointer flex-col items-center gap-3 border-none bg-transparent sm:mt-20"
          aria-label="Scroll to begin the journey"
        >
          <span
            className="font-serif text-sm tracking-widest uppercase"
            style={{ color: "var(--text-soft)" }}
          >
            {openingSequence.scrollPrompt}
          </span>
          <motion.svg
            animate={{ y: [0, 6, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            style={{ color: "var(--gold-dim)" }}
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </motion.svg>
        </motion.button>
      )}
    </section>
  );
}
