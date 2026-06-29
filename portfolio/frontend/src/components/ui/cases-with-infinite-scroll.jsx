"use client";

import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const technologies = [
  { name: "C++", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
  { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "React.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "Express.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", invertOnDark: true },
  { name: "Django", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg", invertOnDark: true },
  { name: "FastAPI", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" },
  { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "PostgreSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "MySQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "GitHub", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", invertOnDark: true },
  { name: "Vercel", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg", invertOnDark: true },
  { name: "TensorFlow", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
  { name: "PyTorch", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg" },
  { name: "OpenCV", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg" },
  { name: "REST API", iconType: "api" },
  { name: "Authentication", iconType: "auth" },
  { name: "Render", iconType: "render" },
  { name: "MediaPipe", iconType: "mediapipe" },
  { name: "OCR", iconType: "ocr" },
  { name: "NLP", iconType: "nlp" },
  { name: "LLM Integration", iconType: "llm" },
];

function Case() {
  const [api, setApi] = useState(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    const timer = setTimeout(() => {
      if (api.selectedScrollSnap() + 1 === api.scrollSnapList().length) {
        setCurrent(0);
        api.scrollTo(0);
      } else {
        api.scrollNext();
        setCurrent(current + 1);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [api, current]);

  const renderIcon = (tech) => {
    if (tech.logo) {
      return (
        <img
          src={tech.logo}
          alt={tech.name}
          className={`w-10 h-10 object-contain select-none pointer-events-none ${tech.invertOnDark ? "filter invert dark:invert-0" : ""}`}
        />
      );
    }

    switch (tech.iconType) {
      case "api":
        return (
          <svg className="w-10 h-10 text-[#FFD500]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      case "auth":
        return (
          <svg className="w-10 h-10 text-[#FFD500]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        );
      case "render":
        return (
          <svg className="w-10 h-10 text-[#FFD500]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
          </svg>
        );
      case "mediapipe":
        return (
          <svg className="w-10 h-10 text-[#FFD500]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        );
      case "ocr":
        return (
          <svg className="w-10 h-10 text-[#FFD500]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M4 8h16M4 16h16" />
          </svg>
        );
      case "nlp":
        return (
          <svg className="w-10 h-10 text-[#FFD500]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        );
      case "llm":
        return (
          <svg className="w-10 h-10 text-[#FFD500]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full py-6 sm:py-8">
      <div className="w-full">
        <div className="flex flex-col gap-6">
          {/* Header styled as div to bypass target cursor snap triggers */}
          <div 
            className="text-2xl sm:text-3xl tracking-tight text-left font-outfit text-zinc-300 select-none"
            style={{ 
              fontWeight: 400
            }}
          >
            My Tech Stack & Expertise
          </div>
          <div className="w-full relative">
            <Carousel setApi={setApi} className="w-full" opts={{ loop: true, dragFree: true }}>
              <CarouselContent>
                {technologies.map((tech, index) => (
                  <CarouselItem className="basis-1/3 sm:basis-1/4 pl-4" key={index}>
                    <div className="flex flex-col items-center justify-center p-5 rounded-xl bg-white/5 border border-zinc-800/50 aspect-video hover:bg-white/10 hover:border-[#FFD500]/30 hover:scale-105 transition-all duration-300 shadow-md"
                    style={{
        width: "120px",
        // height: "120px",
        padding: "20px",
        marginTop: "20px"
    }}
                    >
                      {renderIcon(tech)}
                      <span className="text-[11px] sm:text-xs text-zinc-400 font-outfit mt-3.5 tracking-wide text-center">
                        {tech.name}
                      </span>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Case };
