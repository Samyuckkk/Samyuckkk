import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import ScrollStack, { ScrollStackItem } from "./ScrollStack";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
const pad = (n) => String(n + 1).padStart(2, "0");

/* ─── Icons ───────────────────────────────────────────────────────────── */
function GithubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd"
        d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
    </svg>
  );
}
function ArrowRight({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 7h10M8 3l4 4-4 4" />
    </svg>
  );
}
function ExternalIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2H2v10h10V8M8 2h4v4M6 8l6-6" />
    </svg>
  );
}

/* ─── Project Card ────────────────────────────────────────────────────── */
function ProjectCard({ project, index }) {
  const [imgError, setImgError] = useState(false);
  const screenshot = !imgError && project.screenshots?.[0] ? project.screenshots[0] : null;
  const hasGithub = !!project.githubLink?.trim();
  const hasDeployment = !!project.deploymentLink?.trim();

  // Categorize based on technology tags
  const typeLabel = project.technologies?.length
    ? (project.technologies.some(t =>
        ["express","django","fastapi","node","react","next","mern","vue","svelte"].includes(t.toLowerCase()))
        ? "Web App"
        : project.technologies.some(t =>
            ["opencv","pytorch","tensorflow","yolo","ai","ml","keras","nlp"].includes(t.toLowerCase()))
          ? "AI / ML"
          : "Web App")
    : "Web App";

  // Label for second action button
  const isDriveDoc = project.deploymentLink && (
    project.deploymentLink.includes("drive.google.com") ||
    project.deploymentLink.includes("docs.google.com") ||
    project.deploymentLink.endsWith(".pdf")
  );
  const actionLabel = isDriveDoc ? "Documentation" : "Live Demo";

  return (
    <div className="pj-card" id={`project-card-${index}`}>
      <div className="pj-card-header">
        <div className="pj-card-header-left">
          <span className="pj-num-badge">{pad(index)}</span>
          <h3 className="pj-card-title" title={project.title}>{project.title}</h3>
        </div>
        <span className="pj-type-pill">{typeLabel}</span>
      </div>

      {project.description && (
        <p className="pj-card-desc">{project.description}</p>
      )}

      {project.technologies?.length > 0 && (
        <div className="pj-tech-row">
          {project.technologies.map((t) => (
            <span key={t} className="pj-tech-badge">{t}</span>
          ))}
        </div>
      )}

      {screenshot ? (
        <div className="pj-screenshot-wrap">
          <img
            src={screenshot}
            alt={`${project.title} screenshot`}
            className="pj-screenshot"
            onError={() => setImgError(true)}
            loading="lazy"
          />
        </div>
      ) : (
        <div className="pj-screenshot-wrap pj-screenshot-wrap--empty">
          <span className="pj-screenshot-placeholder">💻 {project.title}</span>
        </div>
      )}

      {(hasGithub || hasDeployment) && (
        <div className="pj-actions">
          {hasGithub && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="pj-btn pj-btn-dark cursor-target"
            >
              <GithubIcon />
              <span>View Code</span>
              <ArrowRight />
            </a>
          )}
          {hasDeployment && (
            <a
              href={project.deploymentLink}
              target="_blank"
              rel="noopener noreferrer"
              className="pj-btn pj-btn-light cursor-target"
            >
              <ExternalIcon />
              <span>{actionLabel}</span>
              <ArrowRight />
            </a>
          )}
        </div>
      )}
    </div>
  );
}

/* ─── Timeline ────────────────────────────────────────────────────────── */
function ProjectTimeline({ projects, activeIndex, onSelect }) {
  return (
    <div className="pj-timeline" role="navigation" aria-label="Projects Timeline">
      <div className="pj-timeline-line" />
      {projects.map((p, i) => (
        <button
          key={p._id || i}
          type="button"
          onClick={() => onSelect?.(i)}
          className={`pj-timeline-item cursor-target${i === activeIndex ? " pj-timeline-item--active" : ""}`}
          aria-label={`Jump to project ${p.title}`}
          aria-current={i === activeIndex ? "true" : undefined}
        >
          <div className="pj-timeline-dot">{pad(i)}</div>
          <span className="pj-timeline-label" title={p.title}>{p.title}</span>
        </button>
      ))}
    </div>
  );
}

/* ─── Mobile Timeline Indicator ───────────────────────────────────────── */
function MobileTimeline({ projects, activeIndex, onSelect }) {
  return (
    <div className="pj-mobile-timeline" role="navigation" aria-label="Projects Step Navigation">
      <div className="pj-mobile-dots">
        {projects.map((p, i) => (
          <button
            key={p._id || i}
            type="button"
            onClick={() => onSelect?.(i)}
            className={`pj-mobile-dot cursor-target${i === activeIndex ? " pj-mobile-dot--active" : ""}`}
            aria-label={`Jump to project ${p.title}`}
          >
            {pad(i)}
          </button>
        ))}
      </div>
      <div className="pj-mobile-active-title">
        {projects[activeIndex]?.title || "Projects"}
      </div>
    </div>
  );
}

/* ─── Main Component ──────────────────────────────────────────────────── */
export default function MyProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const base = BACKEND_URL.replace(/\/$/, "");
    axios.get(`${base}/project`)
      .then((res) => {
        const data = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data?.projects)
            ? res.data.projects
            : [];
        setProjects(data);
        setActiveIndex(0);
      })
      .catch((err) => {
        console.error("MyProjects fetch error:", err);
        setError("Could not load projects from server.");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleStackComplete = useCallback(() => {
    if (projects.length > 0) {
      setActiveIndex(projects.length - 1);
    }
  }, [projects.length]);

  const handleSelectCard = useCallback((index) => {
    setActiveIndex(index);
    const target = document.getElementById(`project-card-${index}`);
    if (target) {
      if (window.lenis) {
        window.lenis.scrollTo(target, { offset: -110 });
      } else {
        target.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, []);

  if (loading) return (
    <section className="pj-section pj-section--state" id="my-projects">
      <style>{CSS}</style>
      <div className="pj-noise" aria-hidden="true" />
      <div className="pj-state-box">
        <div className="pj-spinner" />
        <p className="pj-state-text">Loading Projects…</p>
      </div>
    </section>
  );

  if (error) return (
    <section className="pj-section pj-section--state" id="my-projects">
      <style>{CSS}</style>
      <div className="pj-noise" aria-hidden="true" />
      <div className="pj-state-box">
        <p className="pj-state-text pj-state-text--err">{error}</p>
      </div>
    </section>
  );

  if (projects.length === 0) return (
    <section className="pj-section pj-section--state" id="my-projects">
      <style>{CSS}</style>
      <div className="pj-noise" aria-hidden="true" />
      <div className="pj-state-box">
        <p className="pj-state-text">No projects yet.</p>
      </div>
    </section>
  );

  return (
    <>
      <style>{CSS}</style>
      <section className="pj-section" id="my-projects">
        <div className="pj-noise" aria-hidden="true" />

        <div className="pj-outer">

          {/* LEFT: Heading and Introduction in normal document flow */}
          <div className="pj-left">
            <div className="pj-left-inner">
              <div className="pj-heading-box">
                <h2 className="pj-heading">MY<br />PROJECTS.</h2>
              </div>
              <p className="pj-desc">
                A collection of projects where I turned ideas into real products,
                solving problems and learning something new along the way.
              </p>
            </div>
          </div>

          {/* MOBILE TIMELINE BAR (Narrow screens) */}
          <MobileTimeline
            projects={projects}
            activeIndex={activeIndex}
            onSelect={handleSelectCard}
          />

          {/* CENTER: React Bits ScrollStack manages progressive stacking */}
          <div className="pj-center">
            <ScrollStack
              useWindowScroll={true}
              stackPosition="100px"
              itemDistance={180}
              itemStackDistance={28}
              itemScale={0.025}
              baseScale={0.92}
              dimAmount={0}
              blurAmount={0}
              tiltAmount={0}
              rotationAmount={0}
              holdDistance={100}
              smoothScroll={true}
              snap={false}
              onActiveChange={setActiveIndex}
              onStackComplete={handleStackComplete}
            >
              {projects.map((project, i) => (
                <ScrollStackItem
                  key={project._id || i}
                  itemClassName="pj-stack-item"
                >
                  <ProjectCard project={project} index={i} />
                </ScrollStackItem>
              ))}
            </ScrollStack>
          </div>

          {/* RIGHT: Desktop Timeline */}
          <div className="pj-right">
            <div className="pj-timeline-wrap">
              <ProjectTimeline
                projects={projects}
                activeIndex={activeIndex}
                onSelect={handleSelectCard}
              />
            </div>
          </div>

        </div>
      </section>
    </>
  );
}

/* ─── CSS ─────────────────────────────────────────────────────────────── */
const CSS = `
.pj-section {
  position: relative;
  width: 100%;
  background: radial-gradient(circle at center, #FFD500 0%, #FFC300 65%, #FFAA00 100%);
}
.pj-section--state {
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.pj-noise {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
  opacity: 0.12;
  background: #ffffff;
  filter: url(#noiseFilter);
  mix-blend-mode: multiply;
}

/* State Box */
.pj-state-box {
  position: relative;
  z-index: 2;
  background: #FEFAE8;
  border-radius: 20px;
  padding: 36px 48px;
  box-shadow: 0 10px 35px rgba(0,0,0,0.12);
  border: 1.5px solid rgba(0,0,0,0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}
.pj-state-text {
  font-family: 'Outfit', sans-serif;
  font-size: 1.1rem;
  font-weight: 700;
  color: #111;
  margin: 0;
}
.pj-state-text--err { color: #c0392b; }
.pj-spinner {
  width: 36px; height: 36px;
  border: 3px solid rgba(0,0,0,0.15);
  border-top-color: #111;
  border-radius: 50%;
  animation: pjSpin 0.7s linear infinite;
}
@keyframes pjSpin { to { transform: rotate(360deg); } }

/* Outer 3-column Grid */
.pj-outer {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 280px minmax(0, 680px) 200px;
  justify-content: center;
  gap: 32px;
  width: 100%;
  max-width: 1360px;
  margin: 0 auto;
  padding: 72px 28px 90px;
  box-sizing: border-box;
  align-items: start;
}

/* LEFT COLUMN — Sticky within the projects section, aligned with first card */
.pj-left {
  position: sticky;
  top: 100px;
  align-self: start;
  z-index: 10;
}
.pj-left-inner {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.pj-heading-box { position: relative; }
.pj-heading {
  font-family: 'Notable', sans-serif;
  font-size: clamp(2.8rem, 4.4vw, 5.2rem);
  font-weight: 400;
  line-height: 0.92;
  color: #111;
  letter-spacing: -0.01em;
  text-transform: uppercase;
  margin: 0;
}
.pj-desc {
  font-family: 'Outfit', sans-serif;
  font-size: 0.95rem;
  font-weight: 400;
  color: #222;
  line-height: 1.65;
  max-width: 255px;
  opacity: 0.88;
  margin: 22px 0 0 0;
}

/* CENTER COLUMN */
.pj-center {
  min-width: 0;
  width: 100%;
}

/* ScrollStackItem wrapper overrides */
.pj-stack-item {
  height: auto !important;
  background: transparent !important;
  padding: 0 !important;
  border-radius: 0 !important;
  box-shadow: none !important;
  border: none !important;
}

/* CARD */
.pj-card {
  position: relative;
  background: #FEFAE8;
  border-radius: 24px;
  padding: 26px 28px 24px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06);
  border: 1.5px solid rgba(0,0,0,0.09);
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  box-sizing: border-box;
}

.pj-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}
.pj-card-header-left {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
}
.pj-num-badge {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px; height: 38px;
  border-radius: 10px;
  background: #FFE566;
  border: 1.5px solid #111;
  font-family: 'Outfit', sans-serif;
  font-size: 0.88rem;
  font-weight: 800;
  color: #111;
}
.pj-card-title {
  font-family: 'Outfit', sans-serif;
  font-size: 1.25rem;
  font-weight: 800;
  color: #111;
  margin: 0;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.pj-type-pill {
  flex-shrink: 0;
  font-family: 'Outfit', sans-serif;
  font-size: 0.7rem;
  font-weight: 700;
  color: #111;
  background: #FFE566;
  border: 1.5px solid #111;
  border-radius: 999px;
  padding: 3px 12px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  white-space: nowrap;
}
.pj-card-desc {
  font-family: 'Outfit', sans-serif;
  font-size: 0.88rem;
  font-weight: 400;
  color: #333333;
  line-height: 1.62;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.pj-tech-row {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.pj-tech-badge {
  font-family: 'Outfit', sans-serif;
  font-size: 0.7rem;
  font-weight: 700;
  color: #1a6b4a;
  background: #d1fae5;
  border: 1px solid #6ee7b7;
  border-radius: 999px;
  padding: 3px 12px;
  letter-spacing: 0.03em;
  text-transform: uppercase;
}
.pj-screenshot-wrap {
  width: 100%;
  border-radius: 14px;
  overflow: hidden;
  border: 1.5px solid rgba(0,0,0,0.09);
  background: #f0ead6;
  aspect-ratio: 16/9;
}
.pj-screenshot-wrap--empty {
  display: flex;
  align-items: center;
  justify-content: center;
}
.pj-screenshot-placeholder {
  font-family: 'Outfit', sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  color: #555;
  opacity: 0.7;
}
.pj-screenshot {
  width: 100%; height: 100%;
  object-fit: cover;
  display: block;
}
.pj-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 2px;
}
.pj-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: 'Outfit', sans-serif;
  font-size: 0.84rem;
  font-weight: 700;
  border-radius: 10px;
  padding: 10px 18px;
  text-decoration: none;
  transition: opacity 0.15s ease, transform 0.15s ease, background 0.15s ease, color 0.15s ease;
  cursor: pointer;
  letter-spacing: 0.02em;
  border: 1.5px solid #111;
}
.pj-btn:hover { opacity: 0.88; transform: translateY(-1px); }
.pj-btn-dark { background: #111; color: #fff; }
.pj-btn-light { background: transparent; color: #111; }
.pj-btn-light:hover { background: #111; color: #FFE566; }

/* RIGHT COLUMN — Sticky Timeline aligned with stackPosition */
.pj-right {
  position: sticky;
  top: 100px;
  align-self: start;
  z-index: 51;
}
.pj-timeline-wrap { width: 100%; }
.pj-timeline {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-left: 14px;
}
.pj-timeline-line {
  position: absolute;
  left: 31px;
  top: 18px;
  bottom: 18px;
  width: 2px;
  background: #111;
  border-radius: 2px;
  z-index: 1;
}
.pj-timeline-item {
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 0;
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
}
.pj-timeline-dot {
  position: relative;
  z-index: 2;
  flex-shrink: 0;
  width: 36px; height: 36px;
  border-radius: 50%;
  background: #FFE566;
  border: 2px solid #111;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Outfit', sans-serif;
  font-size: 0.72rem;
  font-weight: 800;
  color: #111;
  transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease;
}
.pj-timeline-item--active .pj-timeline-dot {
  background: #111;
  color: #FFE566;
  transform: scale(1.1);
}
.pj-timeline-label {
  font-family: 'Outfit', sans-serif;
  font-size: 0.76rem;
  font-weight: 600;
  color: #333;
  opacity: 0.65;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 130px;
  transition: opacity 0.2s ease, color 0.2s ease;
}
.pj-timeline-item--active .pj-timeline-label {
  color: #111;
  opacity: 1;
  font-weight: 800;
}

/* MOBILE ADAPTED TIMELINE (hidden on desktop) */
.pj-mobile-timeline {
  display: none;
}

/* Desktop-only layout refinements. */
@media (min-width: 1101px) {
  .pj-left {
    width: 280px;
  }
  .pj-left-inner,
  .pj-heading-box,
  .pj-heading {
    width: 100%;
    max-width: 280px;
    box-sizing: border-box;
  }
  .pj-heading {
    // font-size: 2.55rem;
    font-size: 2.2rem;
  }
  .pj-right {
    top: 50vh;
    transform: translateY(-50%);
  }
  .pj-timeline {
    gap: 8px;
    padding-left: 14px;
  }
  .pj-timeline-line {
    left: 38px;
    top: 24px;
    bottom: 24px;
    width: 3px;
  }
  .pj-timeline-item {
    gap: 16px;
    padding: 10px 0;
  }
  .pj-timeline-dot {
    width: 48px;
    height: 48px;
    font-size: 0.9rem;
  }
  .pj-timeline-label {
    flex: 1;
    min-width: 0;
    max-width: none;
    font-size: 0.9rem;
    line-height: 1.25;
    white-space: normal;
    overflow-wrap: anywhere;
  }
}

@media (min-width: 1101px) and (max-width: 1439px) {
  .pj-heading {
    font-size: clamp(2.2rem, 3vw, 2.4rem);
  }
}

@media (min-width: 1440px) {
  .pj-outer {
    grid-template-columns: 400px minmax(0, 660px) 160px;
    justify-content: space-between;
    max-width: none;
    gap: 32px;
    padding-left: 32px;
    padding-right: 32px;
  }
  .pj-left {
    width: 400px;
    transform: none;
  }
  .pj-left-inner,
  .pj-heading-box,
  .pj-heading {
    max-width: 400px;
  }
  .pj-heading {
    font-size: clamp(5rem, 5.5vw, 5.25rem);
    letter-spacing: -0.05em;
  }
}

/* TABLET */
@media (max-width: 1100px) {
  .pj-outer {
    grid-template-columns: 220px minmax(0, 1fr) 170px;
    gap: 20px;
    padding: 56px 20px 72px;
  }
  .pj-heading { font-size: clamp(2.4rem, 4vw, 3.8rem); }
  .pj-desc { max-width: 200px; font-size: 0.88rem; }
  .pj-timeline-label { max-width: 100px; font-size: 0.72rem; }
}

@media (max-width: 860px) {
  .pj-outer {
    display: flex;
    flex-direction: column;
    padding: 48px 18px 48px;
    gap: 24px;
  }
  .pj-left {
    position: relative;
    top: auto;
    width: 100%;
  }
  .pj-heading { font-size: clamp(2.8rem, 8vw, 4.2rem); }
  .pj-desc { max-width: 100%; font-size: 0.92rem; }
  .pj-right { display: none; }
  
  /* Show Mobile Timeline Bar */
  .pj-mobile-timeline {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 10px 16px;
    background: rgba(254, 250, 232, 0.85);
    backdrop-filter: blur(8px);
    border: 1.5px solid rgba(17,17,17,0.12);
    border-radius: 14px;
    box-sizing: border-box;
    position: sticky;
    top: 12px;
    z-index: 25;
  }
  .pj-mobile-dots {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .pj-mobile-dot {
    width: 32px; height: 32px;
    border-radius: 50%;
    background: #FFE566;
    border: 1.5px solid #111;
    font-family: 'Outfit', sans-serif;
    font-size: 0.72rem;
    font-weight: 800;
    color: #111;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: transform 0.2s ease, background 0.2s ease, color 0.2s ease;
  }
  .pj-mobile-dot--active {
    background: #111;
    color: #FFE566;
    transform: scale(1.1);
  }
  .pj-mobile-active-title {
    font-family: 'Outfit', sans-serif;
    font-size: 0.84rem;
    font-weight: 800;
    color: #111;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 180px;
  }

  .pj-center {
    width: 100%;
  }
  .pj-card {
    border-radius: 20px;
    padding: 20px 18px 18px;
  }
  .pj-card-title { font-size: 1.15rem; }
}

@media (prefers-reduced-motion: reduce) {
  .pj-card, .pj-timeline-dot, .pj-mobile-dot, .pj-btn {
    transition: none !important;
    animation: none !important;
  }
}
`;

