import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./Loader.css";

function Loader() {
    const [progress, setProgress] = useState(0);

    // Organic counting animation
    useEffect(() => {
        let currentProgress = 0;
        const duration = 2200; // ~2.2 seconds to reach 100
        const intervalTime = 30;
        const totalSteps = duration / intervalTime;
        let step = 0;

        const timer = setInterval(() => {
            step++;
            
            // Organic progress increments: slows down near the end
            if (currentProgress < 75) {
                currentProgress += Math.random() * 3.5 + 1.5;
            } else if (currentProgress < 90) {
                currentProgress += Math.random() * 2 + 0.5;
            } else if (currentProgress < 98) {
                currentProgress += Math.random() * 0.6 + 0.1;
            } else {
                currentProgress += 0.5;
            }

            currentProgress = Math.min(Math.round(currentProgress), 100);
            setProgress(currentProgress);

            if (currentProgress === 100 || step >= totalSteps) {
                setProgress(100);
                clearInterval(timer);
            }
        }, intervalTime);

        return () => clearInterval(timer);
    }, []);

    const title = "MY PORTFOLIO";
    const words = title.split(" ");

    // Staggered letters motion configurations
    const containerVariants = {
        initial: {},
        animate: {
            transition: {
                staggerChildren: 0.04,
                delayChildren: 0.2,
            },
        },
    };

    const letterVariants = {
        initial: { y: "100%", opacity: 0 },
        animate: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.8,
                ease: [0.215, 0.610, 0.355, 1.000], // easeOutCubic
            },
        },
    };

    return (
        <motion.div
            className="loader"
            exit={{
                opacity: 0,
            }}
            transition={{
                delay: 0.8,
                duration: 0.1,
            }}
        >
            {/* SVG Wavy Curtain Transition Background */}
            <svg className="curtain-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                <motion.path
                    initial={{ d: "M0 0 L100 0 L100 100 Q50 100 0 100 Z" }}
                    exit={{ d: "M0 0 L100 0 L100 0 Q50 -30 0 0 Z" }}
                    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.15 }}
                    fill="#0A0A0C"
                />
            </svg>

            {/* Glowing Atmosphere Orbs */}
            <motion.div 
                className="orb orb-1"
                animate={{
                    x: [0, 30, -20, 0],
                    y: [0, -30, 20, 0],
                }}
                exit={{ 
                    opacity: 0,
                    transition: { repeat: 0, duration: 0.3 }
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear",
                }}
            />
            <motion.div 
                className="orb orb-2"
                animate={{
                    x: [0, -20, 40, 0],
                    y: [0, 30, -30, 0],
                }}
                exit={{ 
                    opacity: 0,
                    transition: { repeat: 0, duration: 0.3 }
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "linear",
                }}
            />

            {/* Digital Grid Layout */}
            <motion.div className="loader-grid" exit={{ opacity: 0 }} transition={{ duration: 0.4 }} />

            {/* Main Interactive Panel */}
            <motion.div
                className="loader-content"
                exit={{ opacity: 0, y: -50 }}
                transition={{
                    duration: 0.5,
                    ease: [0.76, 0, 0.24, 1],
                }}
            >
                <motion.p
                    className="loader-subtitle"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 0.85, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.6 }}
                >
                    Welcome to
                </motion.p>

                <motion.h1
                    className="loader-title"
                    variants={containerVariants}
                    initial="initial"
                    animate="animate"
                >
                    {words.map((word, wordIndex) => (
                        <span key={wordIndex} className="word-wrapper">
                            {Array.from(word).map((char, charIndex) => (
                                <span key={charIndex} className="char-wrapper">
                                    <motion.span variants={letterVariants}>
                                        {char}
                                    </motion.span>
                                </span>
                            ))}
                            {wordIndex < words.length - 1 && (
                                <span className="char-wrapper word-space">
                                    <motion.span variants={letterVariants}>
                                        {"\u00A0"}
                                    </motion.span>
                                </span>
                            )}
                        </span>
                    ))}
                </motion.h1>

                {/* Progress Details */}
                <div className="loader-progress-container">
                    <div className="progress-bar-wrapper">
                        <motion.div
                            className="progress-bar"
                            initial={{ width: "0%" }}
                            animate={{ width: `${progress}%` }}
                            transition={{ ease: "easeOut", duration: 0.1 }}
                        />
                    </div>
                    <div className="progress-details">
                        <span className={`loading-text ${progress === 100 ? "ready" : ""}`}>
                            {progress === 100 ? "Portfolio Ready" : "Initializing"}
                        </span>
                        <span className="percentage">
                            {String(progress).padStart(2, "0")}%
                        </span>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default Loader;