import { useEffect, useState } from "react";
import axios from "axios";
import { FocusRail } from "../ui/focus-rail";

const BACKEND_URL = import.meta.env.BACKEND_URL || 'http://localhost:3000';
const PLACEHOLDER_IMAGE = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop";

export default function MyProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const baseUrl = BACKEND_URL.replace(/\/$/, '');
        const response = await axios.get(`${baseUrl}/project`);
        const projectsData = Array.isArray(response.data) 
          ? response.data 
          : (response.data && response.data.projects ? response.data.projects : []);
        setProjects(projectsData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError("Error loading projects.");
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <section className="relative w-full min-h-[600px] bg-neutral-950 flex flex-col items-center justify-center py-20 select-none">
        <div 
          className="text-white font-outfit text-xl font-medium tracking-wide animate-pulse"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          Loading Projects...
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="relative w-full min-h-[600px] bg-neutral-950 flex flex-col items-center justify-center py-20 select-none">
        <div 
          className="text-zinc-500 font-outfit text-lg"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          {error}
        </div>
      </section>
    );
  }

  if (projects.length === 0) {
    return (
      <section className="relative w-full min-h-[600px] bg-neutral-950 flex flex-col items-center justify-center py-20 select-none">
        {/* Title */}
        <div
          className="text-right pr-4 md:pr-[120px]"
          style={{
            position: "absolute",
            top: "40px",
            right: "0",
            zIndex: 100,
          }}
        >
          <h2 
            className="text-4xl sm:text-5xl tracking-tight text-white mb-3"
            style={{ 
              fontFamily: '"Gasoek One", sans-serif',
              fontWeight: 400,
              fontStyle: 'normal'
            }}
          >
            My <span className="text-[#FFD500]">Projects</span>
          </h2>
          <div className="w-12 h-1 bg-[#FFD500] mt-4 ml-auto rounded-full" />
        </div>
        <div 
          className="text-zinc-500 font-outfit text-lg mt-24"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          No projects found.
        </div>
      </section>
    );
  }

  // Map backend projects to FocusRail items format
  const railItems = projects.map((project) => {
    const technologiesString = project.technologies && project.technologies.length > 0 
      ? project.technologies.join(" • ") 
      : "";

    return {
      id: project._id,
      title: project.title,
      description: project.description,
      meta: technologiesString,
      imageSrc: project.screenshots && project.screenshots.length > 0 && project.screenshots[0]
        ? project.screenshots[0]
        : PLACEHOLDER_IMAGE,
      github: project.githubLink && project.githubLink.trim() !== "" ? project.githubLink : null,
      href: project.deploymentLink && project.deploymentLink.trim() !== "" ? project.deploymentLink : null,
    };
  });

  return (
    <section className="relative w-full min-h-screen bg-neutral-950 flex flex-col items-center justify-center py-20 select-none">
      {/* Title */}
      <div
        className="text-right pr-4 md:pr-[120px]"
        style={{
          position: "absolute",
          top: "40px",
          right: "0",
          zIndex: 100,
        }}
      >
        <h1 
          className="text-4xl sm:text-5xl tracking-tight text-white mb-3"
          style={{ 
            fontFamily: '"Gasoek One", sans-serif',
            fontWeight: 400,
            fontSize: "68px",
            fontStyle: 'normal',
            marginRight:"40px"
          }}
        >
          My <span className="text-[#FFD500]">Projects.</span>
        </h1>
        {/* <div className="w-12 h-1 bg-[#FFD500] mt-4 ml-auto rounded-full" /> */}
      </div>

      {/* The FocusRail Component */}
      <FocusRail 
        items={railItems} 
        autoPlay={false} 
        loop={true} 
      />
    </section>
  );
}
