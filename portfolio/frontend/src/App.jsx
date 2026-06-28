import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Loader from "./components/Loader/Loader";
import TargetCursor from "./components/TargetCursor/TargetCursor";
import Magnet from "./components/Magnet/Magnet";

import avatarBW from "./assets/2D Vector Black&White.png";
import avatarColor from "./assets/2D Vector Colored.png";

import "./index.css";

function App() {
    const [loading, setLoading] = useState(true);
    const [debugTarget, setDebugTarget] = useState(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3200);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const handleTargetChange = (e) => {
            setDebugTarget(e.detail);
        };
        window.addEventListener("target-change", handleTargetChange);
        return () => window.removeEventListener("target-change", handleTargetChange);
    }, []);

    return (
        <>
            {debugTarget && (
                <div 
                    className="fixed top-4 left-4 bg-black text-[#FFD400] p-4 rounded-xl z-[99999] text-xs font-mono border-[3px] border-black shadow-[4px_4px_0px_0px_#fff]"
                    style={{ pointerEvents: 'none' }}
                >
                    <div className="font-bold border-b border-[#FFD400]/20 pb-1 mb-2 uppercase tracking-wider">Target Debug Info</div>
                    <div>TAG: &lt;{debugTarget.tagName.toLowerCase()}&gt;</div>
                    <div className="max-w-[200px] truncate">CLASS: {debugTarget.className || "(none)"}</div>
                    <div>WIDTH: {Math.round(debugTarget.rect.width)}px</div>
                    <div>HEIGHT: {Math.round(debugTarget.rect.height)}px</div>
                    <div>LEFT: {Math.round(debugTarget.rect.left)}px</div>
                    <div>TOP: {Math.round(debugTarget.rect.top)}px</div>
                </div>
            )}
            {/* SVG Noise Filter for Paper/Analog Texture */}
            <svg className="hidden">
                <filter id="noiseFilter">
                    <feTurbulence 
                        type="fractalNoise" 
                        baseFrequency="0.8" 
                        numOctaves="3" 
                        stitchTiles="stitch"
                    />
                    <feColorMatrix type="matrix" values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.05 0" />
                </filter>
            </svg>

            <TargetCursor 
                spinDuration={2}
                hideDefaultCursor={true}
                parallaxOn={true}
                cursorColor="#ffffff"
                cursorColorOnTarget="#ffffff"
            />

            <AnimatePresence>
                {loading && <Loader key="loader" />}
            </AnimatePresence>

            <motion.div
                className="hero flex-col gap-6"
                initial={{ opacity: 0 }}
                animate={{
                    opacity: loading ? 0 : 1,
                }}
                transition={{
                    duration: 1,
                }}
            >
                {/* Noise overlay */}
                <div className="hero-noise" />

                {/* Top-Right Floating CTA Button */}
                <div className="absolute top-8 right-8 z-[100]">
                    <Magnet 
                        padding={40} 
                        magnetStrength={10}
                        wrapperClassName="cursor-target"
                    >
                        <button
                            className="px-6 py-3 border-2 border-[#111] rounded-xl text-md font-bold bg-[#111] text-[#FFD400] hover:bg-[#FFD400] hover:text-[#111] transition-all duration-300 shadow-[3px_3px_0px_0px_#111] hover:shadow-none active:translate-y-[3px]"
                            onClick={() => {
                                document.getElementById("work")?.scrollIntoView({
                                    behavior: "smooth",
                                });
                            }}
                        >
                            Explore Work
                        </button>
                    </Magnet>
                </div>

                {/* Big Background Name */}
                <div className="hero-name-bg select-none">
                    <span className="hero-name-line">SAMYAK</span>
                    <span className="hero-name-line">OHOLKAR</span>
                </div>

                {/* Hero Content Wrapper (Foreground) */}
                <motion.div 
                    className="hero-content"
                    initial={{ opacity: 0, y: 60 }}
                    animate={{
                        opacity: loading ? 0 : 1,
                        y: loading ? 60 : 0,
                    }}
                    transition={{
                        duration: 1.2,
                        delay: 0.3,
                        ease: [0.16, 1, 0.3, 1], // easeOutExpo
                    }}
                >
                    {/* Magnetized Hoverable Avatar Card */}
                    <Magnet 
                        padding={60} 
                        magnetStrength={15}
                        wrapperClassName="avatar-magnet cursor-target"
                    >
                        <div className="avatar-card">
                            <img 
                                src={avatarBW} 
                                alt="Samyak Oholkar (Black & White)" 
                                className="avatar-img avatar-bw" 
                            />
                            <img 
                                src={avatarColor} 
                                alt="Samyak Oholkar (Colored)" 
                                className="avatar-img avatar-color" 
                            />
                        </div>
                    </Magnet>
                </motion.div>
            </motion.div>
        </>
    );
}

export default App;