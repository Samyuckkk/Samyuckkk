import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Calendar } from "lucide-react";
import Magnet from "../Magnet/Magnet";

const BACKEND_URL = import.meta.env.BACKEND_URL || 'http://localhost:3000';

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
};

const getIcon = (item) => {
  const titleLower = (item.title || "").toLowerCase();
  const companyLower = (item.company || "").toLowerCase();
  const descLower = (item.description || "").toLowerCase();
  
  if (
    titleLower.includes("bachelor") || 
    titleLower.includes("degree") || 
    titleLower.includes("university") || 
    titleLower.includes("bca") ||
    titleLower.includes("education") ||
    titleLower.includes("student") ||
    companyLower.includes("university") ||
    companyLower.includes("school") ||
    companyLower.includes("college") ||
    companyLower.includes("academy") ||
    descLower.includes("cgpa") ||
    descLower.includes("gpa")
  ) {
    return GraduationCap;
  }
  return Briefcase;
};

export default function MyJourney() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const baseUrl = BACKEND_URL.replace(/\/$/, '');
        const response = await axios.get(`${baseUrl}/experience`);
        
        // Extract array from response wrapper safely
        const experiencesData = Array.isArray(response.data)
          ? response.data
          : (response.data && response.data.allExperiences ? response.data.allExperiences : []);
        
        setExperiences(experiencesData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching experiences:", err);
        setError("Error loading experience.");
        setLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  if (loading) {
    return (
      <section className="relative w-full min-h-screen bg-[#0c0c0e] py-28 px-4 md:px-12 flex flex-col items-center justify-center select-none overflow-hidden">
        <div 
          className="text-white font-outfit text-xl font-medium tracking-wide animate-pulse"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          Loading Experience...
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="relative w-full min-h-screen bg-[#0c0c0e] py-28 px-4 md:px-12 flex flex-col items-center justify-center select-none overflow-hidden">
        <div 
          className="text-zinc-500 font-outfit text-lg"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          {error}
        </div>
      </section>
    );
  }

  if (experiences.length === 0) {
    return (
      <section className="relative w-full min-h-screen bg-[#0c0c0e] py-28 px-4 md:px-12 flex flex-col items-center justify-center select-none overflow-hidden">
        {/* Title block */}
        <div className="mb-20 text-center z-10 relative">
          <div 
            className="text-4xl sm:text-5xl font-bold tracking-widest text-white mb-4 uppercase"
            style={{ 
              fontFamily: "'Syncopate', sans-serif",
              letterSpacing: "0.15em"
            }}
          >
            My <span className="text-[#FFD500]">Journey</span>
          </div>
          <div className="w-12 h-1 bg-[#FFD500] mt-5 mx-auto rounded-full" />
        </div>
        <div 
          className="text-zinc-500 font-outfit text-lg z-10"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          No experience found.
        </div>
      </section>
    );
  }

  // Sort experiences before rendering
  // 1. Currently working first
  // 2. Sort by startDate descending
  const sortedExperiences = [...experiences].sort((a, b) => {
    if (a.currentlyWorking && !b.currentlyWorking) return -1;
    if (!a.currentlyWorking && b.currentlyWorking) return 1;
    const dateA = new Date(a.startDate || 0);
    const dateB = new Date(b.startDate || 0);
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <section className="relative w-full min-h-screen bg-[#0c0c0e] py-28 px-4 md:px-12 flex flex-col items-center justify-start select-none overflow-hidden"
    style={{
      marginTop: "50px"
    }}
    >
      
      {/* Premium ambient backdrop glow */}
      <div className="absolute right-[-10%] bottom-[-10%] w-[350px] h-[350px] rounded-full bg-[#FFD500]/5 blur-[120px] pointer-events-none z-0" />
      <div className="absolute left-[-10%] top-[-10%] w-[350px] h-[350px] rounded-full bg-amber-500/5 blur-[120px] pointer-events-none z-0" />

      {/* Title block - div tag to prevent target cursor snap brackets */}
      <div className="mb-20 text-center z-10 relative"   
      style={{
    marginBottom: "20px",
  }}>
        <div 
          className="text-4xl sm:text-5xl font-bold tracking-widest text-white mb-4 uppercase"
          style={{ 
            fontFamily: "'Syncopate', sans-serif",
            letterSpacing: "0.15em"
          }}
        >
          My <span className="text-[#FFD500]">Journey</span>
        </div>
        {/* <p 
          className="text-neutral-400 font-outfit font-light text-base sm:text-lg max-w-md mx-auto"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          Milestones of professional experience and growth.
        </p> */}
        {/* <div className="w-12 h-1 bg-[#FFD500] mt-5 mx-auto rounded-full" /> */}
      </div>

      {/* Timeline Wrapper */}
      <div className="relative w-full max-w-4xl mx-auto z-10">
        
        {/* Central timeline line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#FFD500] via-[#FFD500]/50 to-transparent transform md:-translate-x-1/2 pointer-events-none" />

        {/* Timeline Items */}
        <div className="space-y-12 md:space-y-16"
          style={{
            marginTop: "50px",
    marginBottom: "50px",
  }}
        >
          {sortedExperiences.map((item, idx) => {
            const Icon = getIcon(item);
            // Pattern: Experience 1 (index 0) -> Right side (isRight = true)
            //          Experience 2 (index 1) -> Left side (isRight = false)
            const isRight = idx % 2 === 0;

            // Generate timeline period string
            const startStr = formatDate(item.startDate);
            const endStr = item.currentlyWorking ? "Present" : formatDate(item.endDate);
            const dateLabel = startStr && endStr ? `${startStr} - ${endStr}` : (item.timePeriod || "");

            return (
              <div 
                key={item._id}
                className="relative flex flex-col md:flex-row items-center md:justify-between w-full"
              >
                {/* Timeline node */}
                <div className="absolute left-4 md:left-1/2 top-6 md:top-1/2 w-8 h-8 rounded-full bg-neutral-900 border-2 border-[#FFD500] flex items-center justify-center transform -translate-x-[15px] md:-translate-x-1/2 md:-translate-y-1/2 z-20 shadow-[0_0_10px_rgba(255,213,0,0.2)] hover:scale-110 hover:shadow-[0_0_15px_rgba(255,213,0,0.5)] transition-all duration-300">
                  <Icon className="w-3.5 h-3.5 text-[#FFD500]" />
                </div>

                {/* Left side space (desktop only) */}
                <div className="hidden md:block w-[45%] text-right pr-8">
                  {isRight ? (
                    /* Date Badge on the Left side of line */
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFD500]/10 border border-[#FFD500]/20 text-[#FFD500] text-xs font-mono"
                      style={{
                        borderRadius: "10px",
  padding: "5px 15px",
}}
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        {dateLabel}
                      </div>
                    </motion.div>
                  ) : (
                    /* Card on the Left side of line */
                    <motion.div 
                      className="cursor-target w-full"
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                      <Magnet padding={5} magnetStrength={5} wrapperClassName="w-full" innerClassName="w-full">
                        <JourneyCard item={item} isRight={isRight} dateLabel={dateLabel} />
                      </Magnet>
                    </motion.div>
                  )}
                </div>

                {/* Right side space (desktop only) */}
                <div className="hidden md:block w-[45%] text-left pl-8">
                  {!isRight ? (
                    /* Date Badge on the Right side of line */
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFD500]/10 border border-[#FFD500]/20 text-[#FFD500] text-xs font-mono"
                      style={{
                        borderRadius: "10px",
  padding: "5px 15px",
}}
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        {dateLabel}
                      </div>
                    </motion.div>
                  ) : (
                    /* Card on the Right side of line */
                    <motion.div 
                      className="cursor-target w-full"
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                      <Magnet padding={5} magnetStrength={5} wrapperClassName="w-full" innerClassName="w-full">
                        <JourneyCard item={item} isRight={isRight} dateLabel={dateLabel} />
                      </Magnet>
                    </motion.div>
                  )}
                </div>

                {/* Mobile view (stacked, pl-12) */}
                <div className="block md:hidden w-full pl-12 py-2">
                  <motion.div 
                    className="cursor-target w-full"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  >
                    <Magnet disabled={true} wrapperClassName="w-full" innerClassName="w-full">
                      <JourneyCard item={item} isRight={isRight} dateLabel={dateLabel} isMobile={true} />
                    </Magnet>
                  </motion.div>
                </div>

              </div>
            );
          })}
        </div>

      </div>

    </section>
  );
}

function JourneyCard({ item, dateLabel, isMobile = false }) {
  return (
    <div className="group relative bg-zinc-900/40 border border-zinc-800/80 hover:border-[#FFD500]/30 hover:bg-zinc-900/60 backdrop-blur-md rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 shadow-lg text-left"
    style={{
      padding: "20px"
    }}
    >
      
      {/* Date Badge (mobile only) */}
      {isMobile && (
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFD500]/10 border border-[#FFD500]/20 text-[#FFD500] text-xs font-mono mb-4">
          <Calendar className="w-3 h-3" />
          {dateLabel}
        </div>
      )}

      {/* Company Logo, Title, and Company Wrapper */}
      <div className="flex items-start gap-4 mb-4">
        {/* Company Logo */}
        {item.companyLogo && (
          <img 
            src={item.companyLogo} 
            alt={item.company}
            className="w-12 h-12 rounded-xl object-cover border border-zinc-800 bg-neutral-900 shrink-0" 
          />
        )}

        {/* Title & Company Stack */}
        <div className="flex flex-col">
          {/* {item.technologies && item.technologies.length > 0 && (
            <span className="text-xs font-medium uppercase tracking-wider text-emerald-400 mb-2 block text-left">
              {item.technologies.join(" • ")}
            </span>
          )} */}
          <h3 
            className="text-white text-xl font-bold tracking-tight mb-1"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            {item.title}
          </h3>
          <div 
            className="text-[#FFD500] text-sm font-medium"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            {item.company}
          </div>
        </div>
      </div>

      {/* Description */}
      <p 
        className="text-neutral-400 text-sm leading-relaxed font-light mb-4"
        style={{ fontFamily: "'Outfit', sans-serif", paddingTop: "10px" }}
      >
        {item.description}
      </p>

      {item.technologies && item.technologies.length > 0 && (
            <span className="text-xs font-medium uppercase tracking-wider text-emerald-400 mb-2 block text-left"
            style={{
              marginTop: "10px"
            }}
            >
              {item.technologies.join(" • ")}
            </span>
          )}

    </div>
  );
}
