import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionTemplate } from "framer-motion";

/**
 * CinematicAbout Component
 * Pins on scroll to reveal a massive centered "ABOUT ME" heading, holding it centered,
 * then scaling and translating it to the top-left margin using strict transform logic.
 */
export default function CinematicAbout() {
    const containerRef = useRef(null);
    const titleRef = useRef(null);
    
    // Track viewport sizes to calculate absolute pixel-perfect offsets dynamically
    const [dimensions, setDimensions] = useState({
        width: typeof window !== "undefined" ? window.innerWidth : 1200,
        height: typeof window !== "undefined" ? window.innerHeight : 800
    });

    // Track measured width/height of the title DOM element at runtime
    const [titleSize, setTitleSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const handleResize = () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (titleRef.current) {
            // Measure title bounds (offsetWidth / offsetHeight)
            setTitleSize({
                width: titleRef.current.offsetWidth,
                height: titleRef.current.offsetHeight
            });
        }
    }, [dimensions.width, dimensions.height]);

    const isMobile = dimensions.width < 640;
    const isTablet = dimensions.width >= 640 && dimensions.width < 1024;

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 80,
        damping: 24,
        restDelta: 0.001
    });

    // Font calculations:
    // Reduced base font sizes to 11vw (desktop/tablet) and 10vw (mobile) to fit comfortably
    const baseFontSizeVw = isMobile ? 0.10 : isTablet ? 0.11 : 0.11;
    const baseFontSizePx = dimensions.width * baseFontSizeVw;
    
    // Target font sizes match the existing About Me heading sizes:
    // Mobile: 48px (text-5xl), Tablet: 60px (text-6xl), Desktop: 96px (text-8xl)
    const targetFontSizePx = isMobile ? 48 : isTablet ? 60 : 96;
    const finalScale = targetFontSizePx / baseFontSizePx;

    // --- STAGED TIMELINE (SHIFTED EARLIER & SHORTENED HOLD) ---
    // Stage 1 (0.00 -> 0.02): Title is invisible (opacity: 0)
    // Stage 2 (0.02 -> 0.20): Title fades in (opacity: 0 -> 1) and scales from 1.25 -> 1.0 (origin: center)
    // Stage 3 (0.20 -> 0.45): Title holds centered and static (scale: 1.0)
    // Stage 4 (0.45 -> 0.85): Title glides to top-left corner, scales down to finalScale, and turns amber
    // Stage 5 (0.85 -> 1.00): Title remains fixed at top-left at full opacity (no fade-out)

    const opacity = useTransform(smoothProgress, [0.02, 0.20], [0, 1]);
    const scale = useTransform(smoothProgress, [0.02, 0.20, 0.45, 0.85], [1.25, 1.0, 1.0, finalScale]);

    // Smooth color transition from white to amber accent during the glide phase
    const color = useTransform(smoothProgress, [0.45, 0.85], ["#ffffff", "#f59e0b"]);

    // Glides center coordinates to target coordinates:
    const centerX = dimensions.width / 2;
    const centerY = dimensions.height / 2;
    
    // Aligns perfectly with the margins of the container
    const finalLeft = isMobile ? 24 : isTablet ? 60 : 120;
    const finalTop = isMobile ? 36 : isTablet ? 50 : 60;

    // Translation target calculations to align the scaled-down title's top-left corner
    // exactly at finalLeft, finalTop coordinates, while maintaining translate(-50%, -50%).
    const targetX = finalLeft + (titleSize.width * finalScale) / 2 - centerX;
    const targetY = finalTop + (titleSize.height * finalScale) / 2 - centerY;

    const x = useTransform(smoothProgress, [0.45, 0.85], [0, targetX]);
    const y = useTransform(smoothProgress, [0.45, 0.85], [0, targetY]);

    // Strict translate template ensures translate(-50%, -50%) centering is always active
    const transform = useMotionTemplate`translate(-50%, -50%) translate3d(${x}px, ${y}px, 0) scale(${scale})`;

    return (
        <div ref={containerRef} className="relative w-full h-[300vh] bg-black select-none z-50">
            {/* Pinned viewport wrapper (overflow-hidden, sticky, z-index above decorative elements) */}
            <div className="sticky top-0 h-screen w-full overflow-hidden bg-black z-10">

                {/* Staged motion.h2 heading (rendered above background at z-[10]) */}
                <motion.h2
                    ref={titleRef}
                    className="font-extrabold uppercase tracking-tight whitespace-nowrap cursor-target select-none"
                    style={{
                        position: "absolute",
                        left: "50%",
                        top: "50%",
                        transform: transform,
                        opacity: opacity,
                        color: color,
                        fontFamily: '"Anton SC", sans-serif',
                        fontWeight: 400,
                        fontStyle: 'normal',
                        fontSize: isMobile ? "10vw" : isTablet ? "11vw" : "11vw",
                        zIndex: 10,
                    }}
                >
                    About Me.
                </motion.h2>
            </div>
        </div>
    );
}
