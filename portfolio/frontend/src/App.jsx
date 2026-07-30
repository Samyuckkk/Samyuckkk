import { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

import Loader from "./components/Loader/Loader";
import TargetCursor from "./components/TargetCursor/TargetCursor";
import Magnet from "./components/Magnet/Magnet";
import RotatingText from "./components/RotatingText/RotatingText";
import ContactModal from "./components/ContactModal/ContactModal";
import CinematicAbout from "./components/AboutMe/CinematicAbout";
import AboutLoader from "./components/AboutMe/AboutLoader";
import MyProjects from "./components/MyProjects/MyProjects";
import MyJourney from "./components/MyJourney/MyJourney";

import avatarBW from "./assets/2D Vector Black&White.png";
import avatarColor from "./assets/2D Vector Colored.png";

import "./index.css";

function App() {
    const [loading, setLoading] = useState(true);
    const [loaderPlayed, setLoaderPlayed] = useState(false);
    const [showLoader, setShowLoader] = useState(false);

    const messages = [
        "Hire me before someone else does!",
        "I write code. You provide the paycheck. Deal?",
        "I'm one \"Hello!\" away from joining your team."
    ];
    const [messageIndex, setMessageIndex] = useState(-1);
    const [isHovered, setIsHovered] = useState(false);
    const [isContactHovered, setIsContactHovered] = useState(false);
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const heroRef = useRef(null);
    const { scrollYProgress: heroScroll } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"]
    });
    const heroBgOpacity = useTransform(heroScroll, [0, 0.85], [0, 1]);

    const [links, setLinks] = useState({
        github: 'github.com/Samyuckkk',
        linkedin: 'linkedin.com/in/samyakoholkar',
        leetcode: 'leetcode.com/u/Samyuckkk/'
    });

    const formatUrl = (url) => {
        if (!url) return '';
        if (url.startsWith('http://') || url.startsWith('https://')) {
            return url;
        }
        return `https://${url}`;
    };

    useEffect(() => {
        const fetchAdminLinks = async () => {
            try {
                const baseUrl = (import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000').replace(/\/$/, '');
                const response = await fetch(`${baseUrl}/auth/admin`);
                const data = await response.json();
                if (data.success && data.admin && data.admin.length > 0) {
                    const adminData = data.admin[0];
                    setLinks({
                        github: adminData.github || 'github.com/Samyuckkk',
                        linkedin: adminData.linkedin || 'linkedin.com/in/samyakoholkar',
                        leetcode: adminData.leetcode || 'leetcode.com/u/Samyuckkk/'
                    });
                }
            } catch (err) {
                console.error("Error fetching admin links:", err);
            }
        };
        fetchAdminLinks();
    }, []);



    const handleMouseEnter = () => {
        setIsHovered(true);
        setMessageIndex(prev => (prev + 1) % messages.length);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const handleContactMouseEnter = () => {
        setIsContactHovered(true);
    };

    const handleContactMouseLeave = () => {
        setIsContactHovered(false);
    };

    const handleMouseMove = (e) => {
        setMousePos({ x: e.clientX, y: e.clientY });
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3200);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (loading) return;

        // Initialize Lenis smooth scroll
        // const lenis = new Lenis({
        //     duration: 1.3, // slightly slower, very smooth and polished
        //     easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth exponential easing
        //     direction: 'vertical',
        //     gestureDirection: 'vertical',
        //     smooth: true,
        //     mouseMultiplier: 0.9, // slightly dampened scroll speed for premium touch
        //     smoothTouch: false, // native on mobile
        //     touchMultiplier: 1.5,
        //     infinite: false,
        // });

const lenis = new Lenis({
  duration: 1,
  easing: (t) => 1 - Math.pow(1 - t, 5),

  // Make each wheel scroll move much less
  mouseMultiplier: 1,

  wheelMultiplier: 1,

  // Touchpad
  touchMultiplier: 1,

  smoothWheel: true,
  smoothTouch: false,
  infinite: false,
});

        window.lenis = lenis;

        let rafId;
        function raf(time) {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        }

        rafId = requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
            window.lenis = undefined;
            cancelAnimationFrame(rafId);
        };
    }, [loading]);

    useEffect(() => {
        if (loading) return;

        // If the page is already scrolled past Hero, consider loader as played
        if (window.scrollY > 100) {
            setLoaderPlayed(true);
            return;
        }

        const handleScroll = () => {
            if (window.scrollY > 20 && !loaderPlayed && !showLoader) {
                setShowLoader(true);
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [loading, loaderPlayed, showLoader]);

    // Lock scrolling when loader is active
    useEffect(() => {
        if (showLoader) {
            if (window.lenis) window.lenis.stop();
            document.body.style.overflow = "hidden";
            document.documentElement.style.overflow = "hidden";
        }
    }, [showLoader]);

    // Called by AboutLoader only after its exit animation has fully completed
    const handleLoaderScrollReady = () => {
        setShowLoader(false);
        setLoaderPlayed(true);
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";
        // Start Lenis after a single frame so it picks up the already-set scrollTop
        requestAnimationFrame(() => {
            if (window.lenis) window.lenis.start();
        });
    };

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

            {showLoader && <AboutLoader key="about-loader" onScrollReady={handleLoaderScrollReady} />}

            {!loading ? (
                <div className="relative w-full">
                    {/* HERO SECTION */}
                    <div ref={heroRef} className="hero flex-col gap-6 w-full min-h-screen relative overflow-hidden">
                        {/* Noise overlay */}
                        <div className="hero-noise" />

                        {/* Black transition overlay */}
                        <motion.div 
                            className="absolute inset-0 bg-black pointer-events-none z-[99]"
                            style={{ opacity: heroBgOpacity }}
                        />

                        {/* Hero Content Wrapper (Foreground) */}
                        <motion.div 
                            className="hero-content"
                            initial={{ opacity: 0, y: 60 }}
                            animate={{
                                opacity: 1,
                                y: 0,
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
                                Oholkar
                            </span>

                            {/* Magnetized Hoverable Avatar Card */}
                            <Magnet 
                                padding={4} 
                                magnetStrength={7}
                                wrapperClassName="avatar-magnet cursor-target"
                            >
                                <div 
                                    className="avatar-card"
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                    onMouseMove={handleMouseMove}
                                >
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

                        {/* Rotating Text Badge - Positioned at bottom right */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 sm:right-8 sm:left-auto sm:translate-x-0 sm:bottom-8 z-[100] flex items-center gap-2.5 font-bold text-xl sm:text-2xl select-none w-max">
                            <span className="text-[#111] font-extrabold tracking-tight">Creative</span>
                            <Magnet 
                                padding={5} 
                                magnetStrength={4}
                                wrapperClassName="cursor-target"
                            >
                                <RotatingText
                                    texts={['developer!', 'problem solver!', 'learner!', 'builder!']}
                                    mainClassName="bg-[#A855F7] text-white rounded-md"
                                    style={{
                                        paddingLeft: "10px",
                                        paddingRight: "10px",
                                        paddingTop: "6px",
                                        paddingBottom: "8px",
                                    }}
                                    staggerFrom={"first"}
                                    staggerDuration={0.025}
                                    rotationInterval={2500}
                                    transition={{ type: "spring", damping: 30, stiffness: 400 }}
                                />
                            </Magnet>
                        </div>

                        {/* Contact Me Button - Positioned at top left */}
                        <div className="absolute top-6 left-1/2 -translate-x-1/2 sm:left-10 sm:translate-x-0 sm:top-10 z-[100]">
                            <Magnet 
                                padding={15} 
                                magnetStrength={5}
                                wrapperClassName="cursor-target"
                            >
                                <button
                                    className="border-2 border-[#111] rounded-md text-[#111] bg-transparent font-bold text-base tracking-wider uppercase select-none transition-all duration-300 hover:bg-[#111] hover:text-[#FFD500] cursor-none"
                                    style={{ fontFamily: "'Bricolage Grotesque', sans-serif", padding: "15px 15px"}}
                                    onClick={() => setIsContactModalOpen(true)}
                                    onMouseEnter={handleContactMouseEnter}
                                    onMouseLeave={handleContactMouseLeave}
                                    onMouseMove={handleMouseMove}
                                >
                                    Contact Me
                                </button>
                            </Magnet>
                        </div>

                        {/* GitHub, LinkedIn, LeetCode Links - Positioned at top right */}
                        <div className="absolute top-6 right-6 sm:right-10 sm:top-10 z-[100] flex items-center gap-4 sm:gap-8 pointer-events-auto">
                            <Magnet 
                                padding={12} 
                                magnetStrength={5}
                                wrapperClassName="cursor-target"
                            >
                                <a
                                    href={formatUrl(links.github)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs sm:text-base text-[#111] bg-transparent font-bold tracking-wider uppercase select-none cursor-none hover:opacity-75 transition-opacity"
                                    style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
                                >
                                    GitHub
                                </a>
                            </Magnet>
                            <Magnet 
                                padding={12} 
                                magnetStrength={5}
                                wrapperClassName="cursor-target"
                            >
                                <a
                                    href={formatUrl(links.linkedin)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs sm:text-base text-[#111] bg-transparent font-bold tracking-wider uppercase select-none cursor-none hover:opacity-75 transition-opacity"
                                    style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
                                >
                                    LinkedIn
                                </a>
                            </Magnet>
                            <Magnet 
                                padding={12} 
                                magnetStrength={5}
                                wrapperClassName="cursor-target"
                            >
                                <a
                                    href={formatUrl(links.leetcode)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs sm:text-base text-[#111] bg-transparent font-bold tracking-wider uppercase select-none cursor-none hover:opacity-75 transition-opacity"
                                    style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
                                >
                                    LeetCode
                                </a>
                            </Magnet>
                        </div>
                    </div>

                    {/* ABOUT ME SECTION */}
                    <CinematicAbout />

                    {/* MY PROJECTS SECTION */}
                    <MyProjects />

                    {/* MY JOURNEY SECTION */}
                    <MyJourney />

                    {/* Mouse-following Sequential message pop-up */}
                    <AnimatePresence>
                        {isHovered && messageIndex >= 0 && (
                            <div 
                                style={{
                                    position: 'fixed',
                                    left: mousePos.x,
                                    top: mousePos.y,
                                    transform: 'translate(20px, -50%)',
                                    pointerEvents: 'none',
                                    zIndex: 9999,
                                }}
                            >
                                <motion.div 
                                    className="avatar-message-pop font-outfit"
                                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.8, y: 10 }}
                                    transition={{ type: 'spring', damping: 15, stiffness: 200 }}
                                >
                                    {messages[messageIndex]}
                                </motion.div>
                            </div>
                        )}
                    </AnimatePresence>

                    {/* Contact message pop-up */}
                    <AnimatePresence>
                        {isContactHovered && (
                            <div 
                                style={{
                                    position: 'fixed',
                                    left: mousePos.x,
                                    top: mousePos.y,
                                    transform: 'translate(20px, -50%)',
                                    pointerEvents: 'none',
                                    zIndex: 9999,
                                }}
                            >
                                <motion.div 
                                    className="avatar-message-pop font-outfit"
                                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.8, y: 10 }}
                                    transition={{ type: 'spring', damping: 15, stiffness: 200 }}
                                >
                                    Let's connect!
                                </motion.div>
                            </div>
                        )}
                    </AnimatePresence>

                    {/* Contact Pop-up Form Modal */}
                    <ContactModal 
                        isOpen={isContactModalOpen} 
                        onClose={() => setIsContactModalOpen(false)} 
                    />
                </div>
            ) : null}
        </>
    );
}

export default App;