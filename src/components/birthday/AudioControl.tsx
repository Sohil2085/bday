"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { audioConfig } from "../../data/content";

export default function AudioControl() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasAudio, setHasAudio] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(audioConfig.src);
    audio.loop = true;
    audio.preload = "none";

    audio.addEventListener("error", () => {
      setHasAudio(false);
    });

    audio.addEventListener("ended", () => {
      setIsPlaying(false);
    });

    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.removeAttribute("src");
      audio.load();
    };
  }, []);

  const toggle = async () => {
    if (!audioRef.current || !hasAudio) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch {
        setHasAudio(false);
      }
    }
  };

  if (!hasAudio) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-2 sm:bottom-8 sm:right-8">
      {/* Jumping arrow prompt */}
      <AnimatePresence>
        {!isPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, -6, 0] }}
            exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.3 } }}
            transition={{
              opacity: { delay: 4, duration: 1 },
              y: { repeat: Infinity, duration: 1.5, ease: "easeInOut" },
            }}
            className="flex flex-col items-center"
            style={{ color: "var(--gold-dim)" }}
            aria-hidden="true"
          >
            <span className="mb-1 text-[10px] tracking-widest uppercase opacity-80">
              Tap to play
            </span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        onClick={toggle}
        className="flex items-center gap-2 rounded-full border px-4 py-2.5 backdrop-blur-md transition-colors duration-300"
        style={{
          background: isPlaying
            ? "rgba(201, 169, 110, 0.15)"
            : "rgba(10, 14, 23, 0.7)",
          borderColor: isPlaying
            ? "rgba(201, 169, 110, 0.3)"
            : "rgba(201, 169, 110, 0.15)",
        }}
        aria-label={isPlaying ? "Pause music" : "Play music"}
      >
      {/* Music icon */}
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ color: "var(--gold)" }}
      >
        {isPlaying ? (
          <>
            <rect x="6" y="4" width="4" height="16" />
            <rect x="14" y="4" width="4" height="16" />
          </>
        ) : (
          <>
            <path d="M9 18V5l12-2v13" />
            <circle cx="6" cy="18" r="3" />
            <circle cx="18" cy="16" r="3" />
          </>
        )}
      </svg>

      <span
        className="text-xs tracking-wide"
        style={{ color: "var(--gold-light)" }}
      >
        {isPlaying ? "Playing..." : audioConfig.label}
      </span>

      {/* Animated sound bars when playing */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-end gap-0.5"
            aria-hidden="true"
          >
            {[0, 0.15, 0.3].map((delay, i) => (
              <motion.div
                key={i}
                animate={{
                  height: ["4px", "12px", "6px", "10px", "4px"],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay,
                  ease: "easeInOut",
                }}
                className="w-0.5 rounded-full"
                style={{ background: "var(--gold)" }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
    </div>
  );
}
