"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useCallback } from "react";
import confetti from "canvas-confetti";
import { finalSurprise } from "../../data/content";

export default function FinalSurprise() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [revealed, setRevealed] = useState(false);

  const launchConfetti = useCallback(() => {
    // Elegant gold/cream confetti
    const colors = ["#c9a96e", "#dfc08a", "#e8d5a3", "#faf5eb", "#ffffff"];

    // First burst
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6, x: 0.5 },
      colors,
      gravity: 0.8,
      scalar: 1.1,
      drift: 0,
      ticks: 200,
    });

    // Side bursts with delay
    setTimeout(() => {
      confetti({
        particleCount: 40,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.6 },
        colors,
        gravity: 0.8,
        ticks: 180,
      });
      confetti({
        particleCount: 40,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.6 },
        colors,
        gravity: 0.8,
        ticks: 180,
      });
    }, 250);

    // Final gentle shower
    setTimeout(() => {
      confetti({
        particleCount: 50,
        spread: 100,
        origin: { y: 0.3 },
        colors,
        gravity: 1,
        scalar: 0.8,
        ticks: 250,
      });
    }, 600);
  }, []);

  const handleReveal = () => {
    if (revealed) return;
    setRevealed(true);
    launchConfetti();
  };

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen flex-col items-center justify-center px-6 py-20"
      style={{ paddingTop: "var(--section-gap)" }}
      aria-label="Final birthday surprise"
    >
      <AnimatePresence mode="wait">
        {!revealed ? (
          <motion.div
            key="teaser"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            exit={{ opacity: 0, y: -20, transition: { duration: 0.5 } }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center text-center"
          >
            <h2
              className="font-serif text-2xl font-light sm:text-3xl"
              style={{ color: "var(--gold-light)" }}
            >
              {finalSurprise.teaser}
            </h2>

            <motion.button
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              onClick={handleReveal}
              className="mt-10 cursor-pointer rounded-full border-none px-8 py-4 text-sm font-medium tracking-wider uppercase transition-shadow duration-300 sm:px-10 sm:text-base"
              style={{
                background:
                  "linear-gradient(135deg, var(--gold-dim) 0%, var(--gold) 50%, var(--gold-light) 100%)",
                color: "var(--midnight)",
                boxShadow:
                  "0 4px 20px rgba(201, 169, 110, 0.3), 0 0 40px rgba(201, 169, 110, 0.1)",
              }}
              aria-label="Reveal your birthday surprise"
            >
              {finalSurprise.buttonText}
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="reveal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center text-center"
          >
            {/* Background brightening glow */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5 }}
              className="pointer-events-none absolute"
              style={{
                width: "min(120vw, 700px)",
                height: "min(120vw, 700px)",
                background:
                  "radial-gradient(circle, rgba(201,169,110,0.1) 0%, transparent 60%)",
                borderRadius: "50%",
              }}
              aria-hidden="true"
            />

            {/* Main text */}
            <motion.h2
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 1,
                delay: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="font-serif glow-gold-strong text-center font-light leading-tight"
              style={{
                fontSize: "clamp(2.5rem, 10vw, 5rem)",
                color: "var(--gold)",
              }}
            >
              {finalSurprise.line1}
            </motion.h2>

            <motion.h2
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 1,
                delay: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="font-serif glow-gold-strong text-center font-light leading-tight"
              style={{
                fontSize: "clamp(2.5rem, 10vw, 5rem)",
                color: "var(--gold)",
              }}
            >
              {finalSurprise.line2}
            </motion.h2>

            {/* Follow up */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5 }}
              className="font-serif mt-10 text-lg sm:text-xl"
              style={{ color: "var(--text-muted)" }}
            >
              {finalSurprise.followUp}
            </motion.p>

            {/* Closing */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.2 }}
              className="font-serif mt-6 text-xl font-medium sm:text-2xl"
              style={{ color: "var(--gold-light)" }}
            >
              {finalSurprise.closing}
            </motion.p>

            {/* Tiny golden heart */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.6,
                delay: 3,
                type: "spring",
                stiffness: 200,
              }}
              className="mt-10 text-2xl"
              aria-hidden="true"
            >
              ✦
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tiny footer closing */}
      <AnimatePresence>
        {revealed && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 4 }}
            className="absolute bottom-8 text-xs tracking-widest"
            style={{ color: "var(--text-soft)" }}
          >
            made with love
          </motion.p>
        )}
      </AnimatePresence>
    </section>
  );
}
