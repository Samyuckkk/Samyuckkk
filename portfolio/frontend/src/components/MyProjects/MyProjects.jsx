import { FocusRail } from "../ui/focus-rail";

const DEMO_ITEMS = [
  {
    id: 1,
    title: "Neon Tokyo",
    description: "Experience the vibrant nightlife and illuminated streets of Shinjuku.",
    meta: "Urban • Travel",
    imageSrc: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1000&auto=format&fit=crop",
    href: "#tokyo",
  },
  {
    id: 2,
    title: "Nordic Silence",
    description: "Minimalist architecture meeting the raw beauty of the Icelandic coast.",
    meta: "Design • Nature",
    imageSrc: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=1000&auto=format&fit=crop",
    href: "#nordic",
  },
  {
    id: 3,
    title: "Sahara Echoes",
    description: "Wandering through the timeless dunes under an endless golden sun.",
    meta: "Adventure • Heat",
    imageSrc: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=1000&auto=format&fit=crop",
    href: "#sahara",
  },
  {
    id: 4,
    title: "Cyber Future",
    description: "A glimpse into a technological singularity where AI meets humanity.",
    meta: "Tech • AI",
    imageSrc: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop",
    href: "#cyber",
  },
  {
    id: 5,
    title: "Deep Ocean",
    description: "The crushing pressure and alien beauty of the Mariana Trench.",
    meta: "Science • Deep",
    imageSrc: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=80&w=1000&auto=format&fit=crop",
    href: "#ocean",
  },
];

export default function MyProjects() {
  return (
    <section className="relative w-full min-h-screen bg-neutral-950 flex flex-col items-center justify-center py-20 select-none">
      {/* Title */}
      <div
  className="text-center"
  style={{
    position: "absolute",
    top: "40px",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 100,
  }}
>
        <h2 
          className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-3"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          My <span className="text-[#FFD500]">Projects</span>
        </h2>
        {/* <p 
          className="text-neutral-400 font-outfit font-light text-base sm:text-lg"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          Navigate the rail to explore selected works.
        </p> */}
        <div className="w-12 h-1 bg-[#FFD500] mt-4 mx-auto rounded-full" />
      </div>

      {/* The FocusRail Component */}
      <FocusRail 
        items={DEMO_ITEMS} 
        autoPlay={false} 
        loop={true} 
      />
    </section>
  );
}
