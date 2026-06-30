"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Helper to wrap indices (e.g., -1 becomes length-1)
 */
function wrap(min, max, v) {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
}

/**
 * Physics Configuration
 * Base spring for spatial movement (x/z)
 */
const BASE_SPRING = {
  type: "spring",
  stiffness: 300,
  damping: 30,
  mass: 1,
};

/**
 * Scale Spring
 * Bouncier spring specifically for the visual "Click/Tap" feedback on the center card
 */
const TAP_SPRING = {
  type: "spring",
  stiffness: 450,
  damping: 18, // Lower damping = subtle overshoot/wobble "tap"
  mass: 1,
};

export function FocusRail({
  items,
  initialIndex = 0,
  loop = true,
  autoPlay = false,
  interval = 4000,
  className,
}) {
  const [active, setActive] = React.useState(initialIndex);
  const [isHovering, setIsHovering] = React.useState(false);
  const lastWheelTime = React.useRef(0);

  const count = items ? items.length : 0;
  const activeIndex = count > 0 ? wrap(0, count, active) : 0;
  const activeItem = count > 0 ? items[activeIndex] : null;

  // --- NAVIGATION HANDLERS ---
  const handlePrev = React.useCallback(() => {
    if (!loop && active === 0) return;
    setActive((p) => p - 1);
  }, [loop, active]);

  const handleNext = React.useCallback(() => {
    if (!loop && active === count - 1) return;
    setActive((p) => p + 1);
  }, [loop, active, count]);

  // --- MOUSE WHEEL / TRACKPAD LOGIC ---
  const onWheel = React.useCallback(
    (e) => {
      const now = Date.now();
      // Debounce: prevent rapid firing from inertia scrolling (400ms lockout)
      if (now - lastWheelTime.current < 400) return;

      // Detect horizontal scroll primarily, but also fallback to vertical if shift is held
      const isHorizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY);
      const delta = isHorizontal ? e.deltaX : e.deltaY;

      // Threshold to avoid accidental micro-scrolls
      if (Math.abs(delta) > 20) {
        if (delta > 0) {
          handleNext();
        } else {
          handlePrev();
        }
        lastWheelTime.current = now;
      }
    },
    [handleNext, handlePrev]
  );

  // Autoplay logic
  React.useEffect(() => {
    if (!autoPlay || isHovering) return;
    const timer = setInterval(() => handleNext(), interval);
    return () => clearInterval(timer);
  }, [autoPlay, isHovering, handleNext, interval]);

  // Keyboard navigation
  const onKeyDown = (e) => {
    if (e.key === "ArrowLeft") handlePrev();
    if (e.key === "ArrowRight") handleNext();
  };

  // --- SWIPE / DRAG LOGIC ---
  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  const onDragEnd = (e, { offset, velocity }) => {
    const swipe = swipePower(offset.x, velocity.x);

    if (swipe < -swipeConfidenceThreshold) {
      handleNext();
    } else if (swipe > swipeConfidenceThreshold) {
      handlePrev();
    }
  };

  const visibleIndices = [-2, -1, 0, 1, 2];

  if (!items || items.length === 0) return null;

  return (
    <div
      className={cn(
        "group relative flex h-screen w-full flex-col overflow-hidden bg-neutral-950 text-white outline-none select-none overflow-x-hidden",
        className
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onWheel={onWheel}
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={`bg-${activeItem.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.45 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <img
              src={activeItem.imageSrc}
              alt=""
              className="h-full w-full object-cover blur-3xl saturate-200"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/50 to-transparent" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Main Stage */}
      <div className="relative z-10 flex flex-1 flex-col justify-center px-4 md:px-8"
      style={{ transform: "translateY(-10px)" }}
      >
        {/* DRAGGABLE RAIL CONTAINER */}
        <motion.div
          className="relative mx-auto flex h-[360px] w-full max-w-6xl items-center justify-center perspective-[1200px] cursor-grab active:cursor-grabbing"
          style={{ marginLeft: "265px", marginTop: "150px" }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={onDragEnd}
        >
          {visibleIndices.map((offset) => {
            const absIndex = active + offset;
            const index = wrap(0, count, absIndex);
            const item = items[index];

            if (!loop && (absIndex < 0 || absIndex >= count)) return null;

            const isCenter = offset === 0;
            const dist = Math.abs(offset);

            // Dynamic transforms
            const xOffset = offset * 500;
            const zOffset = -dist * 180;
            const scale = isCenter ? 1 : 0.85;
            const rotateY = offset * -20;

            const opacity = isCenter ? 1 : Math.max(0.1, 1 - dist * 0.5);
            const blur = isCenter ? 0 : dist * 6;
            const brightness = isCenter ? 1 : 0.5;

            return (
              <motion.div
                key={absIndex}
                className={cn(
                  "absolute aspect-[4/3] w-[500px] md:w-[560px] rounded-2xl border-t border-white/20 bg-neutral-900 shadow-2xl transition-shadow duration-300",
                  isCenter ? "z-20 shadow-white/10" : "z-10"
                )}
                initial={false}
                animate={{
                  x: xOffset,
                  z: zOffset,
                  scale: scale,
                  rotateY: rotateY,
                  opacity: opacity,
                  filter: `blur(${blur}px) brightness(${brightness})`,
                }}
                transition={(val) => {
                    if (val === "scale") return TAP_SPRING;
                    return BASE_SPRING;
                }}
                style={{
                  transformStyle: "preserve-3d",
                }}
                onClick={() => {
                  if (offset !== 0) setActive((p) => p + offset);
                }}
              >
                <img
                  src={item.imageSrc}
                  alt={item.title}
                  className="h-full w-full rounded-2xl object-cover pointer-events-none"
                />

                {/* Lighting layers */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
                <div className="absolute inset-0 rounded-2xl bg-black/10 pointer-events-none mix-blend-multiply" />
              </motion.div>
            );
          })}
        </motion.div>
{/* <div
    style={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        width: "100%",      // adjust as needed
        marginLeft: "2px", // same offset as the card
        // marginTop: "80px",
    }}
> */}


{/* Info & Controls */}
<div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    width: "100%",
    marginTop: "80px",
    paddingLeft: "80px",   // adjust if needed
    paddingRight: "120px",  // adjust if needed
  }}
>
  {/* LEFT : INFO */}
  <AnimatePresence mode="wait">
    <motion.div
      key={activeItem.id}
      initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
      transition={{ duration: 0.3 }}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        textAlign: "left",
        maxWidth: "500px",
      }}
    >
      {activeItem.meta && (
        <span
          className="text-xs font-medium uppercase tracking-wider text-emerald-400"
          style={{ marginBottom: "10px" }}
        >
          {activeItem.meta}
        </span>
      )}

      <h2
        className="text-3xl font-bold tracking-tight md:text-4xl text-white"
        style={{ marginBottom: "10px" }}
      >
        {activeItem.title}
      </h2>

      {activeItem.description && (
        <p className="text-neutral-400">
          {activeItem.description}
        </p>
      )}
    </motion.div>
  </AnimatePresence>

  {/* centre : CONTROLS */}
  <div
    // style={{
    //   display: "flex",
    //   alignItems: "center",
    //   alignSelf: "flex-start",
    //   marginTop: "40px",
    //   transform: "translateX(-190px)",
    // }}
    style={{
      position: "absolute",
      left: "52%",
      top: "700px",          // adjust
      transform: "translateX(-80px)",
      display: "flex",
      alignItems: "center",
  }}
  >
    <div className="flex items-center gap-1 rounded-full bg-neutral-900/80 p-1 ring-1 ring-white/10 backdrop-blur-md">
      <button
        onClick={handlePrev}
        className="rounded-full p-3 text-neutral-400 transition hover:bg-white/10 hover:text-white active:scale-95 cursor-none"
        aria-label="Previous"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <span className="min-w-[40px] text-center text-xs font-mono text-neutral-500">
        {activeIndex + 1} / {count}
      </span>

      <button onClick={handleNext}
        className="rounded-full p-3 text-neutral-400 transition hover:bg-white/10 hover:text-white active:scale-95 cursor-none"
        aria-label="Next"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  </div>
    {/* right : link buttons */}

    <div className="flex items-center gap-3"
        style={{
      display: "flex",
      alignItems: "center",
      alignSelf: "flex-start",
      marginTop: "40px",
    }}
    >
      {/* GitHub Repository Link Button */}
      {activeItem.github && (
        <a
          href={activeItem.github}
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-none flex items-center justify-center w-11 h-11 rounded-full bg-neutral-900/80 border border-white/10 text-neutral-400 hover:text-white hover:bg-white/10 transition active:scale-95 shadow-md"
          title="GitHub Repository"
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
          </svg>
        </a>
      )}

      {/* External live-link button using emoji */}
      {activeItem.href && (
        <a
          href={activeItem.href}
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-none flex items-center justify-center w-11 h-11 rounded-full bg-neutral-900/80 border border-white/10 text-neutral-400 hover:text-white hover:bg-white/10 transition active:scale-95 shadow-md text-base"
          title="Live Demo"
        >
          🔗
        </a>
      )}
    </div>

</div>
      </div>
      </div>
    // </div>
  );
}
