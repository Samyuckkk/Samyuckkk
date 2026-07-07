import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionTemplate } from "framer-motion";
import TiltedCard from "../TiltedCard/TiltedCard";
import Magnet from "../Magnet/Magnet";

/**
 * CinematicAbout Component
 * Pins on scroll to reveal a massive centered "ABOUT ME" heading, holding it centered,
 * then scaling and translating it to the top-left margin using strict transform logic.
 * After the title settles, it reveals the bio paragraph, resume download button, and Tilted Card.
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

    const handleDownload = () => {
        const resumeUrl = "https://ik.imagekit.io/samyuck/Portfolio/Resume/43693d67-c95c-4b61-9cc0-18e0117c4c5b_XAHx3fUoC";
        window.open(resumeUrl, '_blank');
    };

    // Font calculations:
    // Reduced base font sizes to 11vw (desktop/tablet) and 10vw (mobile) to fit comfortably
    const baseFontSizeVw = isMobile ? 0.10 : isTablet ? 0.11 : 0.11;
    const baseFontSizePx = dimensions.width * baseFontSizeVw;
    
    // Target font sizes match the existing About Me heading sizes:
    // Mobile: 48px (text-5xl), Tablet: 60px (text-6xl), Desktop: 96px (text-8xl)
    const targetFontSizePx = isMobile ? 48 : isTablet ? 60 : 96;
    const finalScale = targetFontSizePx / baseFontSizePx;

    // --- STAGED TIMELINE ---
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

    // Staggered reveal timeline for biography content:
    // Bio paragraph + button fades & slides in slightly ahead of the profile Tilted Card
    const bioOpacity = useTransform(smoothProgress, [0.78, 0.93], [0, 1]);
    const bioY = useTransform(smoothProgress, [0.78, 0.93], [30, 0]);

    const cardOpacity = useTransform(smoothProgress, [0.85, 0.98], [0, 1]);
    const cardY = useTransform(smoothProgress, [0.85, 0.98], [30, 0]);

    // Background color and noise texture blending transforms
    const bgColor = useTransform(smoothProgress, [0.45, 0.85], ["#000000", "#0c0c0e"]);
    const noiseOpacity = useTransform(smoothProgress, [0.45, 0.85], [0, 0.02]);

    return (
        <div ref={containerRef} className="relative w-full h-[300vh] bg-black select-none z-50">
            {/* Pinned viewport wrapper (overflow-hidden, sticky, animated bg color) */}
            <motion.div 
                className="sticky top-0 h-screen w-full overflow-hidden z-10"
                style={{ backgroundColor: bgColor }}
            >
                {/* Subtle paper noise texture matching the portfolio theme exactly */}
                <motion.div 
                    className="absolute inset-0 bg-white pointer-events-none z-[1] filter url(#noiseFilter)"
                    style={{ opacity: noiseOpacity }}
                />
                
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

                {/* Staged Content Wrapper (revealed beneath the title at z-[5]) */}
                {/* Changed top alignment to top-start layout to eliminate vertical empty spacing */}
                <div 
                    className="absolute top-[110px] sm:top-[150px] lg:top-[210px] bottom-6 left-6 right-6 sm:left-10 sm:right-10 md:left-16 md:right-16 lg:left-24 lg:right-24 xl:left-[120px] xl:right-[120px] flex items-start justify-start  z-[5] pointer-events-auto"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }} // Hide scrollbar for a cleaner premium feel
                >
                    <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1.3fr_0.9fr] gap-12 lg:gap-20 xl:gap-24 items-center py-4">
                        
                        {/* LEFT COLUMN: Animated Bio Paragraph + Magnet Download Button */}
                        <motion.div
                            style={{ opacity: bioOpacity, y: bioY }}
                            className="flex flex-col items-start gap-8 md:gap-10 w-full"
                        >
                            <p 
                                className="text-base sm:text-lg md:text-xl text-zinc-300 leading-relaxed font-outfit"
                                style={{
                                    fontSize: 20, 
                                    fontWeight: 300
                                }}
                            >
                                I build modern web applications, solve real-world problems, and occasionally spend way too long looking for a missing semicolon. I enjoy turning ideas into products that are fast, intuitive, and actually fun to use. When I'm not coding, I'm probably solving LeetCode problems, exploring new technologies, participating in hackathons, or explaining to Git why I totally meant to push from the wrong branch.
                            </p>

                            {/* Download Resume Magnet Button Block */}
                            <div className="flex flex-row items-center gap-10 sm:gap-14 flex-wrap mt-2">
                                <Magnet 
                                    padding={12} 
                                    magnetStrength={4}
                                    wrapperClassName="cursor-target"
                                >
                                    <button 
                                        onClick={handleDownload}
                                        className="flex items-center gap-3.5 bg-[#111115] border-1 border-[#FFD500] text-[#FFD500] hover:bg-[#FFD500] hover:text-[#111115] font-bold py-4 px-9 rounded-full shadow-lg transition-all duration-300 transform active:scale-95 cursor-none text-base sm:text-lg select-none"
                                        style={{
                                            fontFamily: "'Outfit', sans-serif",
                                            padding: "10px 20px",
                                            borderRadius: "25px"
                                        }}
                                    >
                                        <span>Download Resume</span>
                                        <svg 
                                            className="w-5.5 h-5.5 stroke-current" 
                                            fill="none" 
                                            viewBox="0 0 24 24" 
                                            stroke="currentColor" 
                                            strokeWidth="2.5"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                        </svg>
                                    </button>
                                </Magnet>
                            </div>
                        </motion.div>

                        {/* RIGHT COLUMN: Animated Tilted Card Wrapper */}
                        <motion.div
                            style={{ opacity: cardOpacity, y: cardY }}
                            className="w-full flex justify-center items-center"
                        >
                            <TiltedCard
                                className="cursor-target"
                                imageSrc="https://ik.imagekit.io/samyuck/Portfolio/Profile/1d3c930c-b2cb-49a1-a5c5-f5583904a834_1BCCcaBZg"
                                altText="Samyak Oholkar - Profile Image"
                                captionText="Samyak Oholkar"
                                containerHeight={isMobile ? "320px" : "400px"}
                                containerWidth={isMobile ? "280px" : "350px"}
                                imageHeight={isMobile ? "290px" : "350px"}
                                imageWidth={isMobile ? "260px" : "320px"}
                                rotateAmplitude={12}
                                scaleOnHover={1.12}
                                showMobileWarning={false}
                                showTooltip={true}
                                displayOverlayContent={true}
                                overlayContent={
                                    <div className="relative pointer-events-none select-none"
                                        style={{ width: isMobile ? "260px" : "320px", height: isMobile ? "290px" : "350px" }}
                                    >
                                        <div className="absolute top-[20px] left-6 bg-[#6b7280]/90 backdrop-blur-sm text-white font-serif text-lg py-3 px-6 rounded-2xl shadow-lg border border-white/10 whitespace-nowrap"
                                            style={{
                                                borderRadius: "10px",
                                                padding: "3px 7px"
                                            }}
                                        >
                                            Samyak Oholkar
                                        </div>
                                    </div>
                                }
                            />
                        </motion.div>
                    </div>
                </div>

            </motion.div>
        </div>
    );
}
