"use client";

import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import { memories } from "../../data/content";

function MemoryPhoto({
  memory,
  index,
}: {
  memory: (typeof memories)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });
  const [tapped, setTapped] = useState(false);
  const [imgError, setImgError] = useState(false);

  const isPolaroid = memory.style === "polaroid";
  const isFull = memory.style === "full";
  const isOverlap = memory.style === "overlap";

  // Parallax scroll effect for each photo
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useSpring(useTransform(scrollYProgress, [0, 1], [40, -40]), {
    stiffness: 100,
    damping: 30,
  });

  return (
    <motion.div
      ref={ref}
      style={{
        y: isPolaroid || isOverlap ? y : undefined,
        marginTop: index === 0 ? 0 : "2.5rem",
      }}
      initial={{
        opacity: 0,
        y: 60,
        rotate: memory.rotation + (index % 2 === 0 ? -5 : 5),
        scale: 0.85,
        filter: "blur(4px)",
      }}
      animate={
        isInView
          ? {
              opacity: 1,
              y: 0,
              rotate: tapped ? 0 : memory.rotation,
              scale: tapped ? 1.03 : 1,
              filter: "blur(0px)",
            }
          : {}
      }
      transition={{
        duration: 0.9,
        delay: 0.05,
        ease: [0.16, 1, 0.3, 1] as const,
      }}
      whileHover={{ scale: 1.02, rotate: 0, transition: { duration: 0.3 } }}
      onClick={() => setTapped(!tapped)}
      className={`relative cursor-pointer ${
        isFull
          ? "mx-auto w-full max-w-sm"
          : isOverlap
          ? index % 2 === 0
            ? "ml-4 mr-auto w-4/5 max-w-xs sm:ml-8"
            : "ml-auto mr-4 w-4/5 max-w-xs sm:mr-8"
          : "mx-auto w-full max-w-[280px]"
      }`}
      role="button"
      tabIndex={0}
      aria-label={`Photo: ${memory.caption}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setTapped(!tapped);
        }
      }}
    >
      <motion.div
        className={isPolaroid ? "polaroid" : "overflow-hidden rounded-sm"}
        animate={
          isInView
            ? {
                boxShadow: tapped
                  ? "0 20px 60px rgba(201,169,110,0.15), 0 8px 20px rgba(0,0,0,0.3)"
                  : isPolaroid
                  ? "0 4px 20px rgba(0,0,0,0.15), 0 1px 4px rgba(0,0,0,0.1)"
                  : "0 12px 40px rgba(0,0,0,0.35), 0 4px 12px rgba(0,0,0,0.2)",
              }
            : {}
        }
        transition={{ duration: 0.4 }}
      >
        <div
          className="relative w-full overflow-hidden"
          style={{
            paddingBottom: isPolaroid ? "100%" : isFull ? "66.67%" : "75%",
          }}
        >
          {imgError ? (
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                background:
                  "linear-gradient(135deg, var(--midnight-soft), var(--midnight-light))",
              }}
            >
              <div className="text-center px-4">
                <motion.span
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="font-serif block text-4xl"
                  style={{ color: "var(--gold-dim)" }}
                >
                  ✦
                </motion.span>
                <span
                  className="mt-2 block text-xs"
                  style={{ color: "var(--text-soft)" }}
                >
                  {memory.image.split("/").pop()}
                </span>
              </div>
            </div>
          ) : (
            <>
              <Image
                src={memory.image}
                alt={memory.caption}
                fill
                className="object-cover transition-transform duration-700"
                style={{ transform: tapped ? "scale(1.05)" : "scale(1)" }}
                sizes="(max-width: 640px) 90vw, 400px"
                loading="lazy"
                onError={() => setImgError(true)}
              />
              {/* Shimmer light sweep on entrance */}
              <motion.div
                initial={{ x: "-100%" }}
                animate={
                  isInView
                    ? {
                        x: "200%",
                      }
                    : {}
                }
                transition={{
                  duration: 1.2,
                  delay: 0.3,
                  ease: [0.22, 1, 0.36, 1] as const,
                }}
                className="absolute inset-0 z-10"
                style={{
                  background:
                    "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)",
                  width: "50%",
                }}
                aria-hidden="true"
              />
            </>
          )}
        </div>
      </motion.div>

      {/* Caption */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={
          isInView
            ? isPolaroid || tapped
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 10 }
            : {}
        }
        transition={{
          duration: 0.6,
          delay: isPolaroid ? 0.5 : 0,
          ease: [0.22, 1, 0.36, 1] as const,
        }}
        className={`mt-3 text-center text-sm ${
          isPolaroid ? "polaroid-caption" : "font-handwritten"
        }`}
        style={
          !isPolaroid ? { color: "var(--text-muted)", fontSize: "1.05rem" } : {}
        }
      >
        {memory.caption}
      </motion.p>
    </motion.div>
  );
}

export default function MemoryAlbum() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end end"],
  });

  return (
    <section
      id="memories"
      className="relative px-6 py-16 sm:py-24"
      style={{ paddingTop: "var(--section-gap)" }}
      aria-label="Photo memories"
    >
      {/* Section Header with staggered animation */}
      <div
        ref={headerRef}
        className="mx-auto max-w-lg text-center mb-14 sm:mb-20"
      >
        <div className="overflow-hidden">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.9,
              ease: [0.16, 1, 0.3, 1] as const,
            }}
            className="font-serif text-2xl font-light sm:text-3xl"
            style={{ color: "var(--gold-light)" }}
          >
            Little Moments.
          </motion.h2>
        </div>
        <div className="overflow-hidden">
          <motion.h3
            initial={{ opacity: 0, y: 40 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.9,
              delay: 0.15,
              ease: [0.16, 1, 0.3, 1] as const,
            }}
            className="font-serif mt-1 text-2xl font-light sm:text-3xl"
            style={{ color: "var(--gold-light)" }}
          >
            Big Memories.
          </motion.h3>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={headerInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-serif mt-3 text-sm italic tracking-wide"
          style={{ color: "var(--text-soft)" }}
        >
          tap a photo to feel the moment
        </motion.p>

        {/* Animated gold separator */}
        <motion.hr
          initial={{ scaleX: 0, opacity: 0 }}
          animate={
            headerInView ? { scaleX: 1, opacity: 1 } : {}
          }
          transition={{
            duration: 1.2,
            delay: 0.6,
            ease: [0.22, 1, 0.36, 1] as const,
          }}
          className="gold-line mt-8"
        />

        {/* Decorative pulsing dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={headerInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-4 flex justify-center gap-2"
          aria-hidden="true"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                opacity: [0.3, 0.7, 0.3],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                delay: i * 0.3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="h-1 w-1 rounded-full"
              style={{ background: "var(--gold-dim)" }}
            />
          ))}
        </motion.div>
      </div>

      {/* Photo Grid / Scrapbook with Connecting Thread */}
      <div ref={containerRef} className="mx-auto max-w-md relative mt-12 pb-10">
        {/* The glowing thread line */}
        <div 
          className="absolute left-1/2 top-10 bottom-10 w-[1.5px] -translate-x-1/2 z-0"
          style={{ background: "rgba(201,169,110,0.1)" }}
          aria-hidden="true"
        >
          <motion.div 
            className="w-full h-full origin-top"
            style={{ 
              background: "linear-gradient(to bottom, transparent, var(--gold-light), var(--gold-dim), transparent)",
              scaleY: scrollYProgress,
              boxShadow: "0 0 10px rgba(201,169,110,0.5)"
            }}
          />
        </div>

        {/* Photos */}
        <div className="relative z-10 space-y-2">
          {memories.map((memory, index) => (
            <div key={memory.image} className="relative">
              {/* Connecting dot on the thread */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full z-0"
                style={{ 
                  background: "var(--gold)",
                  boxShadow: "0 0 8px rgba(201,169,110,0.8)"
                }}
              />
              <MemoryPhoto memory={memory} index={index} />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom decorative flourish */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mx-auto mt-16 flex flex-col items-center gap-3"
      >
        <div
          className="h-8 w-px"
          style={{
            background:
              "linear-gradient(180deg, var(--gold-dim), transparent)",
          }}
        />
        <motion.span
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="text-xs tracking-[0.3em] uppercase"
          style={{ color: "var(--text-soft)" }}
        >
          ✦
        </motion.span>
      </motion.div>
    </section>
  );
}
