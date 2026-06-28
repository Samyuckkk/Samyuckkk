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

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3200);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
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
                    {/* Line 1: Samyak */}
                    <span className="hero-name-line name-samyak select-none">
                        Samyak
                    </span>

                    {/* Line 2: Oholkar */}
                    <span className="hero-name-line name-oholkar select-none">
                        OHOLKAR
                    </span>

                    {/* Magnetized Hoverable Avatar Card */}
                    <Magnet 
                        padding={4} 
                        magnetStrength={7}
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