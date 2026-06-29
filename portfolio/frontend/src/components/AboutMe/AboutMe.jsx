
import Magnet from "../Magnet/Magnet";
import { Case } from "../ui/cases-with-infinite-scroll";
import SpotlightCard from "../SpotlightCard/SpotlightCard";
import TiltedCard from "../TiltedCard/TiltedCard";

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

                {/* Right Column (TiltedCard Profile Image) */}
                <div 
                    className="w-full lg:w-auto flex justify-center lg:justify-end lg:pt-24 self-center lg:self-start cursor-target"
                    style={{ 
                        marginLeft: "250px",
                        marginTop: "70px"
                    }}
                >
                    <TiltedCard
                        imageSrc="https://ik.imagekit.io/samyuck/Portfolio/Profile/1d3c930c-b2cb-49a1-a5c5-f5583904a834_1BCCcaBZg"
                        // imageSrc="https://ik.imagekit.io/samyuck/Portfolio/Profile/ba052c09-c97b-486a-a005-f01ff776946d_B6qFEZbP-"
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

            </div>
        </section>
    );
}
