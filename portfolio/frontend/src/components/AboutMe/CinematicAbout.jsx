import { useState, useEffect } from "react";
import TiltedCard from "../TiltedCard/TiltedCard";
import Magnet from "../Magnet/Magnet";
import LogoLoop from "../LogoLoop/LogoLoop";
import { 
    SiReact, 
    SiNextdotjs, 
    SiTypescript, 
    SiTailwindcss, 
    SiNodedotjs, 
    SiMongodb, 
    SiPython, 
    SiDocker, 
    SiPostgresql, 
    SiGit,
    SiFastapi,
    SiDjango,
    SiTensorflow,
    SiPytorch
} from 'react-icons/si';

const techLogos = [
    { node: <SiReact />, title: "React", href: "https://react.dev" },
    { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
    { node: <SiTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org" },
    { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
    { node: <SiNodedotjs />, title: "Node.js", href: "https://nodejs.org" },
    { node: <SiMongodb />, title: "MongoDB", href: "https://www.mongodb.com" },
    { node: <SiPython />, title: "Python", href: "https://www.python.org" },
    { node: <SiDocker />, title: "Docker", href: "https://www.docker.com" },
    { node: <SiPostgresql />, title: "PostgreSQL", href: "https://www.postgresql.org" },
    { node: <SiGit />, title: "Git", href: "https://git-scm.com" },
    { node: <SiFastapi />, title: "FastAPI", href: "https://fastapi.tiangolo.com" },
    { node: <SiDjango />, title: "Django", href: "https://www.djangoproject.com" },
    { node: <SiTensorflow />, title: "TensorFlow", href: "https://www.tensorflow.org" },
    { node: <SiPytorch />, title: "PyTorch", href: "https://pytorch.org" }
];

export default function CinematicAbout() {
    const [dimensions, setDimensions] = useState({
        width: typeof window !== "undefined" ? window.innerWidth : 1200,
        height: typeof window !== "undefined" ? window.innerHeight : 800
    });

    useEffect(() => {
        const handleResize = () => setDimensions({ width: window.innerWidth, height: window.innerHeight });
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const isMobile = dimensions.width < 640;
    const isTablet = dimensions.width >= 640 && dimensions.width < 1024;

    const handleDownload = () => {
        window.open("https://ik.imagekit.io/samyuck/Portfolio/Resume/43693d67-c95c-4b61-9cc0-18e0117c4c5b_XAHx3fUoC", '_blank');
    };

    return (
        <section id="about-me" className="relative w-full bg-[#0c0c0e] select-none z-50" style={{ minHeight: '100dvh' }}>
            {/* Subtle paper noise texture */}
            <div className="absolute inset-0 bg-white pointer-events-none z-[1] opacity-[0.02] filter url(#noiseFilter)" />

            <div className="relative z-10 w-full flex flex-col justify-between" style={{ minHeight: 'inherit', paddingLeft: 'clamp(1.5rem, 6vw, 8rem)', paddingRight: 'clamp(1.5rem, 6vw, 8rem)', paddingTop: 'clamp(2rem, 5vw, 5rem)', paddingBottom: 'clamp(2rem, 4vw, 4rem)' }}>

                {/* ── ROW 1: Two-column grid ── */}
                <div className="w-full grid grid-cols-1 lg:grid-cols-[1.3fr_0.9fr] gap-12 lg:gap-20 xl:gap-24 items-center">

                    {/* LEFT COLUMN: Heading + Bio + Button */}
                    <div className="flex flex-col items-start w-full">
                        <h2
                            className="font-extrabold uppercase tracking-tight whitespace-nowrap no-cursor-target select-none text-amber-500"
                            style={{
                                fontFamily: '"Anton SC", sans-serif',
                                fontWeight: 400,
                                fontStyle: 'normal',
                                fontSize: 'clamp(2.5rem, 8.5vw, 9vw)',
                                lineHeight: 1,
                                marginBottom: 'clamp(1.5rem, 4vw, 4rem)',
                            }}
                        >
                            About Me.
                        </h2>

                        <p
                            className="text-base sm:text-lg md:text-xl text-zinc-300 leading-relaxed font-outfit mt-8 sm:mt-10"
                            style={{ fontWeight: 300 }}
                        >
                            I build modern web applications, solve real-world problems, and occasionally spend way too long looking for a missing semicolon. I enjoy turning ideas into products that are fast, intuitive, and actually fun to use. When I'm not coding, I'm probably solving LeetCode problems, exploring new technologies, participating in hackathons, or explaining to Git why I totally meant to push from the wrong branch.
                        </p>

                        <Magnet padding={12} magnetStrength={4} wrapperClassName="cursor-target" style={{ marginTop: 'clamp(2.25rem, 3vw, 3rem)' }}>
                            <button
                                onClick={handleDownload}
                                className="flex items-center gap-3.5 bg-[#111115] border-1 border-[#FFD500] text-[#FFD500] hover:bg-[#FFD500] hover:text-[#111115] font-bold rounded-full shadow-lg transition-all duration-300 transform active:scale-95 cursor-none text-base sm:text-lg select-none"
                                style={{ fontFamily: "'Outfit', sans-serif", padding: "10px 20px", borderRadius: "25px" }}
                            >
                                <span>Download Resume</span>
                                <svg className="w-5.5 h-5.5 stroke-current" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                            </button>
                        </Magnet>
                    </div>

                    {/* RIGHT COLUMN: Profile Card */}
                    <div className="w-full flex justify-center lg:justify-end items-center">
                        <TiltedCard
                            className="cursor-target"
                            imageSrc="https://ik.imagekit.io/samyuck/Portfolio/Profile/1d3c930c-b2cb-49a1-a5c5-f5583904a834_1BCCcaBZg"
                            altText="Samyak Oholkar - Profile Image"
                            captionText="Samyak Oholkar"
                            containerHeight={isMobile ? "320px" : "450px"}
                            containerWidth={isMobile ? "280px" : "390px"}
                            imageHeight={isMobile ? "290px" : "390px"}
                            imageWidth={isMobile ? "260px" : "360px"}
                            rotateAmplitude={12}
                            scaleOnHover={1.12}
                            showMobileWarning={false}
                            showTooltip={true}
                            displayOverlayContent={true}
                            overlayContent={
                                <div className="relative pointer-events-none select-none"
                                    style={{ width: isMobile ? "260px" : "360px", height: isMobile ? "290px" : "390px" }}
                                >
                                    <div className="absolute top-[20px] left-6 bg-[#6b7280]/90 backdrop-blur-sm text-white font-serif text-lg py-3 px-6 rounded-2xl shadow-lg border border-white/10 whitespace-nowrap"
                                        style={{ borderRadius: "10px", padding: "3px 7px" }}
                                    >
                                        Samyak Oholkar
                                    </div>
                                </div>
                            }
                        />
                    </div>
                </div>

                {/* ── ROW 2: Full-width tech stack ── */}
                <div style={{ width: 'clamp(95%, 90vw, 90%)', margin: '0 auto' }}>
                    <LogoLoop
                        logos={techLogos}
                        speed={60}
                        direction="left"
                        logoHeight={isMobile ? 36 : isTablet ? 46 : 54}
                        gap={isMobile ? 40 : isTablet ? 60 : 80}
                        hoverSpeed={0}
                        scaleOnHover
                        fadeOut
                        fadeOutColor="#0c0c0e"
                        ariaLabel="Technology stack"
                    />
                </div>
            </div>
        </section>
    );
}
