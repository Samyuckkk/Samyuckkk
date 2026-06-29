
import Magnet from "../Magnet/Magnet";
import { Case } from "../ui/cases-with-infinite-scroll";
import SpotlightCard from "../SpotlightCard/SpotlightCard";
import TiltedCard from "../TiltedCard/TiltedCard";
import BorderGlow from "../BorderGlow/BorderGlow";

/**
 * AboutMe Component - Dark themed section with a large Anton SC display heading,
 * biography paragraph, customized magnetized download button, calligraphic signature,
 * and a side-aligned premium TiltedCard profile image layout.
 */
export default function AboutMe() {
    const handleDownload = () => {
        const resumeUrl = "https://ik.imagekit.io/samyuck/Portfolio/Resume/43693d67-c95c-4b61-9cc0-18e0117c4c5b_XAHx3fUoC";
        window.open(resumeUrl, '_blank');
    };

    return (
        <section className="w-full min-h-screen relative flex flex-col justify-start p-8 sm:p-16 overflow-hidden bg-[#0c0c0e] text-white select-none">
            {/* Subtle white noise overlay for paper feel */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-white z-[1] filter url(#noiseFilter)" />

            {/* Content container - two column layout on large screens */}
            <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-16">
                
                {/* Left Column (Content details) */}
                <div className="flex-1 flex flex-col justify-start w-full">
                    {/* Large stylish heading on top left - styled as div to avoid cursor snap brackets */}
                    <div 
                        className="text-6xl sm:text-8xl text-amber-500 tracking-tight"
                        style={{ 
                            fontFamily: '"Anton SC", sans-serif',
                            fontWeight: 400,
                            fontStyle: 'normal',
                            marginTop: "50px",
                            marginLeft: "50px"
                        }}
                    >
                        About Me.
                    </div>

                    {/* About Me bio paragraph - constrained to left side of screen */}
                    <p 
                        className="text-lg sm:text-xl text-zinc-300 leading-relaxed max-w-xl sm:max-w-2xl font-outfit"
                        style={{ 
                            marginTop: "40px",
                            marginLeft: "55px",
                            fontWeight: 300
                        }}
                    >
                        I build modern web applications, solve real-world problems, and occasionally spend way too long looking for a missing semicolon. I enjoy turning ideas into products that are fast, intuitive, and actually fun to use. When I'm not coding, I'm probably solving LeetCode problems, exploring new technologies, participating in hackathons, or explaining to Git why I totally meant to push from the wrong branch.
                    </p>

                    {/* Resume Download CTA & Handwritten Signature Block */}
                    <div 
                        className="flex flex-row items-center gap-10 sm:gap-14 flex-wrap"
                        style={{ 
                            marginTop: "45px",
                            marginLeft: "55px"
                        }}
                    >
                        {/* Magnet-wrapped Download Button */}
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

                        {/* Styled Handwriting Signature next to button */}
                        <div 
                            className="text-amber-500/85 tracking-widest select-none pointer-events-none text-5xl sm:text-6xl"
                            style={{ 
                                fontFamily: '"Mrs Saint Delafield", cursive',
                                fontWeight: 400,
                                fontStyle: 'normal',
                                transform: "rotate(-9deg)",
                                fontSize: "42px",
                                marginLeft: "50px"
                            }}
                        >
                            Samyak Oholkar
                        </div>
                    </div>

                    {/* Tech Stack Infinite Carousel inside Spotlight Card - aligned left in line with the bio text */}
                    <div 
                        className="max-w-xl sm:max-w-2xl w-full"
                        style={{ 
                            marginTop: "80px",
                            marginLeft: "55px" 
                        }}
                    >
                        <SpotlightCard 
                            className="w-full bg-[#111115]/50 border-zinc-800/80 shadow-2xl"
                            spotlightColor="rgba(255, 213, 0, 0.15)"
                        >
                            <Case />
                        </SpotlightCard>
                    </div>
                </div>

                {/* Right Column (Profile details - stacked vertically) */}
                <div 
                    className="w-full lg:w-[850px] flex flex-col items-center lg:items-end lg:pt-24 self-center lg:self-start gap-10"
                    style={{ 
                        marginTop: "60px"
                    }}
                >
                    {/* Tilted Card Wrapper - Fixed Width aligned to Right */}
                    <div
    className="w-[350px] self-center lg:self-start cursor-target"
    style={{ marginLeft: "250px" }}
>
                        <TiltedCard
                            imageSrc="https://ik.imagekit.io/samyuck/Portfolio/Profile/1d3c930c-b2cb-49a1-a5c5-f5583904a834_1BCCcaBZg"
                            altText="Samyak Oholkar - Profile Image"
                            captionText="Samyak Oholkar"
                            containerHeight="400px"
                            containerWidth="350px"
                            imageHeight="350px"
                            imageWidth="320px"
                            rotateAmplitude={12}
                            scaleOnHover={1.12}
                            showMobileWarning={false}
                            showTooltip={true}
                            displayOverlayContent={true}
                            overlayContent={
                                <div className="relative w-[320px] h-[350px] pointer-events-none select-none">
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
                    </div>

                    {/* Border Glow Stats/Status Card - Independent Width aligned to Right */}
                    <div 
                        className="w-full lg:w-[850px] max-w-full self-center lg:self-end"
                        style={{ 
                            marginTop: "5px",     // Move down
                        }}
                    >
                        <BorderGlow
                            edgeSensitivity={30}
                            glowColor="45 100 50"
                            backgroundColor="#111115"
                            borderRadius={18}
                            glowRadius={35}
                            glowIntensity={1.2}
                            coneSpread={25}
                            animated={true}
                            colors={['#FFD500', '#FFAA00', '#FF8C00']}
                        >
                            <div className="p-8 sm:p-10 font-outfit select-none text-left w-full">
                                {/* Header */}
                                <div className="mb-8" style={{
                            padding: "20px 50px"

                                        }}>
                                    <h3 className="text-2xl font-bold tracking-tight text-white font-outfit">
                                        My <span className="text-[#FFD500]">Strengths</span>
                                    </h3>
                                    {/* <div className="w-12 h-1 bg-white mt-3 rounded-full" /> */}
                                </div>

                                {/* Responsive Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-5"
                                        style={{
                            padding: "25px 50px",
                            paddingBottom: "10px" 
                                        }}
                                >
                                    
                                    {/* Problem Solving */}
                                    <div className="group flex items-start gap-4 transition-all duration-300 hover:-translate-y-1 p-2 rounded-xl hover:bg-zinc-800/10">
                                        <div className="w-14 h-14 rounded-2xl bg-[#FFD500]/10 border border-[#FFD500]/20 flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-105 group-hover:bg-[#FFD500]/18 group-hover:border-[#FFD500]/45 group-hover:shadow-[0_0_15px_rgba(255,213,0,0.35)]">
                                            <svg className="w-6 h-6 text-[#FFD500] fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .5 2.2 1.5 3.1.7.7 1.3 1.5 1.5 2.5" />
                                                <path d="M9 18h6" />
                                                <path d="M10 22h4" />
                                            </svg>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <span className="text-white font-bold text-base tracking-wide font-outfit">Problem Solving</span>
                                            <span className="text-zinc-400 text-sm leading-relaxed font-outfit font-normal">I love breaking down problems and finding efficient solutions.</span>
                                        </div>
                                    </div>

                                    {/* Team Player */}
                                    <div className="group flex items-start gap-4 transition-all duration-300 hover:-translate-y-1 p-2 rounded-xl hover:bg-zinc-800/10">
                                        <div className="w-14 h-14 rounded-2xl bg-[#FFD500]/10 border border-[#FFD500]/20 flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-105 group-hover:bg-[#FFD500]/18 group-hover:border-[#FFD500]/45 group-hover:shadow-[0_0_15px_rgba(255,213,0,0.35)]">
                                            <svg className="w-6 h-6 text-[#FFD500] fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                                <circle cx="9" cy="7" r="4" />
                                                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                            </svg>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <span className="text-white font-bold text-base tracking-wide font-outfit">Team Player</span>
                                            <span className="text-zinc-400 text-sm leading-relaxed font-outfit font-normal">I enjoy collaborating with others and learning together.</span>
                                        </div>
                                    </div>

                                    {/* Clean Code */}
                                    <div className="group flex items-start gap-4 transition-all duration-300 hover:-translate-y-1 p-2 rounded-xl hover:bg-zinc-800/10">
                                        <div className="w-14 h-14 rounded-2xl bg-[#FFD500]/10 border border-[#FFD500]/20 flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-105 group-hover:bg-[#FFD500]/18 group-hover:border-[#FFD500]/45 group-hover:shadow-[0_0_15px_rgba(255,213,0,0.35)]">
                                            <svg className="w-6 h-6 text-[#FFD500] fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="16 18 22 12 16 6" />
                                                <polyline points="8 6 2 12 8 18" />
                                                <line x1="14" y1="4" x2="10" y2="20" />
                                            </svg>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <span className="text-white font-bold text-base tracking-wide font-outfit">Clean Code</span>
                                            <span className="text-zinc-400 text-sm leading-relaxed font-outfit font-normal">I write clean, maintainable and scalable code.</span>
                                        </div>
                                    </div>

                                    {/* Creative Thinker */}
                                    <div className="group flex items-start gap-4 transition-all duration-300 hover:-translate-y-1 p-2 rounded-xl hover:bg-zinc-800/10">
                                        <div className="w-14 h-14 rounded-2xl bg-[#FFD500]/10 border border-[#FFD500]/20 flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-105 group-hover:bg-[#FFD500]/18 group-hover:border-[#FFD500]/45 group-hover:shadow-[0_0_15px_rgba(255,213,0,0.35)]">
                                            <svg className="w-6 h-6 text-[#FFD500] fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M12 20h9" />
                                                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                                            </svg>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <span className="text-white font-bold text-base tracking-wide font-outfit">Creative Thinker</span>
                                            <span className="text-zinc-400 text-sm leading-relaxed font-outfit font-normal">I bring ideas to life with creativity and logic.</span>
                                        </div>
                                    </div>

                                    {/* Quick Learner */}
                                    <div className="group flex items-start gap-4 transition-all duration-300 hover:-translate-y-1 p-2 rounded-xl hover:bg-zinc-800/10">
                                        <div className="w-14 h-14 rounded-2xl bg-[#FFD500]/10 border border-[#FFD500]/20 flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-105 group-hover:bg-[#FFD500]/18 group-hover:border-[#FFD500]/45 group-hover:shadow-[0_0_15px_rgba(255,213,0,0.35)]">
                                            <svg className="w-6 h-6 text-[#FFD500] fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M22 2s-3 0-8.5 6-6.5 11.5-6.5 11.5h4.5s5.5-1 11.5-6.5C22 6.5 22 2 22 2z" />
                                                <path d="M9 15l-3 3-3-3 3-3 3 3z" />
                                                <path d="M3 21h3l-3-3v3z" />
                                                <path d="M14 8a2 2 0 1 0-2-2" />
                                            </svg>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <span className="text-white font-bold text-base tracking-wide font-outfit">Quick Learner</span>
                                            <span className="text-zinc-400 text-sm leading-relaxed font-outfit font-normal">I adapt quickly to new technologies and frameworks.</span>
                                        </div>
                                    </div>

                                    {/* Detail Oriented */}
                                    <div className="group flex items-start gap-4 transition-all duration-300 hover:-translate-y-1 p-2 rounded-xl hover:bg-zinc-800/10">
                                        <div className="w-14 h-14 rounded-2xl bg-[#FFD500]/10 border border-[#FFD500]/20 flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-105 group-hover:bg-[#FFD500]/18 group-hover:border-[#FFD500]/45 group-hover:shadow-[0_0_15px_rgba(255,213,0,0.35)]">
                                            <svg className="w-6 h-6 text-[#FFD500] fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <circle cx="12" cy="12" r="10" />
                                                <circle cx="12" cy="12" r="6" />
                                                <circle cx="12" cy="12" r="2" />
                                            </svg>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <span className="text-white font-bold text-base tracking-wide font-outfit">Detail Oriented</span>
                                            <span className="text-zinc-400 text-sm leading-relaxed font-outfit font-normal">I focus on the little things that make a big difference.</span>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </BorderGlow>
                    </div>
                </div>

            </div>
        </section>
    );
}
