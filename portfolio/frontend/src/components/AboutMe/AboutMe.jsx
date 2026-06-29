
import Magnet from "../Magnet/Magnet";
import { Case } from "../ui/cases-with-infinite-scroll";
import SpotlightCard from "../SpotlightCard/SpotlightCard";

/**
 * AboutMe Component - Dark themed section with a large Anton SC display heading,
 * biography paragraph, customized magnetized download button, and a calligraphic signature.
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

            {/* Content container */}
            <div className="relative z-10 w-full h-full flex flex-col justify-start">
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
                            style={{
        padding: "50px"
    }}
                        spotlightColor="rgba(255, 213, 0, 0.15)"
                    >
                        <Case />
                    </SpotlightCard>
                </div>
            </div>
        </section>
    );
}
