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
      setPhase(8);
      return;
    }

    const timers = [
      setTimeout(() => setPhase(1), 300),    // particles visible
      setTimeout(() => setPhase(2), 600),    // "A little surprise..."
      setTimeout(() => setPhase(3), 1500),   // "for someone very special."
      setTimeout(() => setPhase(4), 3000),   // Fade out intro
      setTimeout(() => setPhase(5), 3800),   // "50"
      setTimeout(() => setPhase(6), 4800),   // reveal lines
      setTimeout(() => setPhase(7), 5600),   // greeting
      setTimeout(() => setPhase(8), 6400),   // scroll prompt
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  const fadeUp = {
    initial: { opacity: 0, y: 15, filter: "blur(8px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: { duration: 0.8, ease: "easeOut" as const },
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
      {/* Intro Sequence */}
      <AnimatePresence mode="wait">
        {phase >= 2 && phase < 4 && (
          <motion.div
            key="intro"
            exit={{ opacity: 0, filter: "blur(10px)", scale: 1.05 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute flex flex-col items-center justify-center gap-4 text-center z-20"
          >
            {phase >= 2 && (
              <motion.p
                {...fadeUp}
                className="font-serif text-xl tracking-wide sm:text-2xl"
                style={{ color: "var(--text-muted)" }}
              >
                {openingSequence.line1}
              </motion.p>
            )}

            {phase >= 3 && (
              <motion.p
                {...fadeUp}
                className="font-serif text-xl tracking-wide sm:text-2xl"
                style={{ color: "var(--gold-dim)" }}
              >
                {openingSequence.line2}
              </motion.p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Hero Content */}
      <AnimatePresence>
        {phase >= 5 && (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative flex flex-col items-center justify-center z-10 w-full"
          >
            {/* Radial glow behind the 50 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                width: "min(100vw, 500px)",
                height: "min(100vw, 500px)",
                background:
                  "radial-gradient(circle, rgba(201,169,110,0.12) 0%, transparent 60%)",
                borderRadius: "50%",
              }}
              aria-hidden="true"
            />

            {/* The big "50" */}
            <motion.h1
              initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] as const }}
              className="font-serif glow-gold-strong text-center font-light leading-none relative z-10"
              style={{
                fontSize: "clamp(6rem, 25vw, 14rem)",
                color: "var(--gold)",
                letterSpacing: "-0.02em",
              }}
            >
              {openingSequence.number}
            </motion.h1>

            {/* Reveal lines */}
            {phase >= 6 && (
              <div className="mt-4 flex flex-col items-center gap-2 sm:mt-6 relative z-10">
                {openingSequence.revealLines.map((line, i) => (
                  <motion.p
                    key={line}
                    initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{
                      duration: 0.6,
                      delay: i * 0.15,
                      ease: [0.22, 1, 0.36, 1] as const,
                    }}
                    className="font-serif text-base tracking-wide sm:text-lg text-center"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {line}
                  </motion.p>
                ))}
              </div>
            )}

            {/* Greeting */}
            {phase >= 7 && (
              <motion.h2
                initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] as const }}
                className="font-serif glow-gold mt-10 text-center text-3xl font-medium sm:mt-14 sm:text-4xl relative z-10"
                style={{ color: "var(--gold-light)" }}
              >
                {openingSequence.greeting}
              </motion.h2>
            )}

            {/* Scroll prompt */}
            {phase >= 8 && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                onClick={scrollToJourney}
                className="group mt-16 flex cursor-pointer flex-col items-center gap-3 border-none bg-transparent sm:mt-20 relative z-10"
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
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
