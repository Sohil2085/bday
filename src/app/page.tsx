"use client";

import dynamic from "next/dynamic";
import Hero from "../components/birthday/Hero";
import Journey from "../components/birthday/Journey";
import MemoryAlbum from "../components/birthday/MemoryAlbum";
import GujaratiMessage from "../components/birthday/GujaratiMessage";
import PersonalLetter from "../components/birthday/PersonalLetter";
import FinalSurprise from "../components/birthday/FinalSurprise";

// Lazy-load non-critical components for performance
const FloatingParticles = dynamic(
  () => import("../components/birthday/FloatingParticles"),
  { ssr: false }
);
const ScrollProgress = dynamic(
  () => import("../components/birthday/ScrollProgress"),
  { ssr: false }
);
const AudioControl = dynamic(
  () => import("../components/birthday/AudioControl"),
  { ssr: false }
);

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      {/* Background particles */}
      <FloatingParticles count={35} />

      {/* Scroll progress indicator */}
      <ScrollProgress />

      {/* Audio control */}
      <AudioControl />

      {/* ── 1. Cinematic Opening ── */}
      <Hero />

      {/* ── 2. Life Journey Timeline ── */}
      <Journey />

      {/* ── 3. Memory Album ── */}
      <MemoryAlbum />

      {/* ── 4. Gujarati Message ── */}
      <GujaratiMessage />

      {/* ── 5. Personal Letter ── */}
      <PersonalLetter />

      {/* ── 6. Final Surprise + Confetti ── */}
      <FinalSurprise />
    </main>
  );
}
