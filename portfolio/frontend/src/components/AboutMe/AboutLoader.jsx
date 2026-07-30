import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

export default function AboutLoader({ onScrollReady }) {
  const [phase, setPhase] = useState("curtain-in"); // curtain-in → text → text-out → fading-out → done

  const stableOnScrollReady = useCallback(() => {
    if (onScrollReady) onScrollReady();
  }, [onScrollReady]);

  useEffect(() => {
    // Phase 1: curtain rises (1s) + 400ms pause
    const textTimer = setTimeout(() => setPhase("text"), 1400);

    // Phase 2: text holds for 0.9s, then begin text fade-out
    const textOutTimer = setTimeout(() => setPhase("text-out"), 2900);

    // Phase 3: after text fade-out (~0.7s), scroll then fade out the overlay
    const fadeOutTimer = setTimeout(() => {
      // Scroll to About Me while still fully covered.
      // Set scrollTop directly — works even with overflow:hidden on body/html.
      // Also sync Lenis's internal target so it doesn't snap back on resume.
      const aboutMeEl = document.getElementById("about-me");
      if (aboutMeEl) {
        const top = aboutMeEl.offsetTop;
        document.documentElement.scrollTop = top;
        document.body.scrollTop = top;
        if (window.lenis) window.lenis.scrollTo(top, { immediate: true });
      }
      setPhase("fading-out");
    }, 3700);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(textOutTimer);
      clearTimeout(fadeOutTimer);
    };
  }, [stableOnScrollReady]);

  const handleFadeComplete = useCallback(() => {
    stableOnScrollReady();
  }, [stableOnScrollReady]);

  return (
    <motion.div
      className="fixed inset-0 z-[99999] select-none pointer-events-auto"
      animate={{ opacity: phase === "fading-out" ? 0 : 1 }}
      transition={{ duration: phase === "fading-out" ? 0.75 : 0, ease: [0.4, 0, 0.2, 1] }}
      onAnimationComplete={phase === "fading-out" ? handleFadeComplete : undefined}
    >
      <svg
        className="fixed inset-0 w-full h-full z-[99999]"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{ pointerEvents: "none" }}
      >
        {/* Entry: curtain rises from bottom — DO NOT TOUCH */}
        <motion.path
          initial={{ d: "M0 100 L100 100 L100 100 Q50 130 0 100 Z" }}
          animate={{ d: "M0 100 L100 100 L100 0 Q50 -30 0 0 Z" }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          fill="#000000"
        />
      </svg>

      {/* Solid black backdrop */}
      <motion.div
        className="fixed inset-0 bg-black z-[99998]"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === "curtain-in" ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      />

      {/* Centered text */}
      {(phase === "text" || phase === "text-out") && (
        <motion.div
          className="fixed inset-0 z-[100000] flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{
            opacity: phase === "text-out" ? 0 : 1,
            scale: phase === "text-out" ? 0.95 : 1,
          }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        >
          <span
            className="text-3xl sm:text-4xl md:text-5xl tracking-tight text-white"
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 500,
              letterSpacing: "-0.02em",
            }}
          >
            Know about me...
          </span>
        </motion.div>
      )}
    </motion.div>
  );
}
