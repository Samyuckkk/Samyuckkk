import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import axios from "axios";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Magnet from "../Magnet/Magnet";

gsap.registerPlugin(ScrollTrigger);

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
};

const sortExperiences = (arr) =>
  [...arr].sort((a, b) => {
    if (a.currentlyWorking && !b.currentlyWorking) return -1;
    if (!a.currentlyWorking && b.currentlyWorking) return 1;
    return new Date(b.startDate || 0) - new Date(a.startDate || 0);
  });



/* ─── Card wrapper: turns cursor black on hover ──────────────────────── */
function BlackCursorCard({ children }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const getCorners = () => document.querySelectorAll('.target-cursor-corner');
    const getDot = () => document.querySelector('.fixed.top-0.left-0 .rounded-full');
    const enter = () => {
      getCorners().forEach(c => gsap.to(c, { borderColor: '#111111', duration: 0.15, ease: 'power2.out' }));
      const dot = getDot();
      if (dot) gsap.to(dot, { backgroundColor: '#111111', duration: 0.15, ease: 'power2.out' });
    };
    const leave = () => {
      getCorners().forEach(c => gsap.to(c, { borderColor: '#ffffff', duration: 0.15, ease: 'power2.out' }));
      const dot = getDot();
      if (dot) gsap.to(dot, { backgroundColor: '#ffffff', duration: 0.15, ease: 'power2.out' });
    };
    el.addEventListener('mouseenter', enter);
    el.addEventListener('mouseleave', leave);
    return () => {
      el.removeEventListener('mouseenter', enter);
      el.removeEventListener('mouseleave', leave);
    };
  }, []);
  return <div ref={ref} className="journey-card">{children}</div>;
}

/* ─── Single journey card ─────────────────────────────────────────────── */
function JourneyCard({ item }) {
  const startStr = formatDate(item.startDate);
  const endStr = item.currentlyWorking ? "Present" : formatDate(item.endDate);
  const dateLabel =
    startStr && endStr
      ? `${startStr} – ${endStr}`
      : item.timePeriod || "";

  return (
    <div className="journey-card-inner">
      {/* date pill */}
      <span className="journey-date-pill">{dateLabel}</span>

      {/* logo + title row */}
      <div className="journey-card-header">
        {item.companyLogo && (
          <img
            src={item.companyLogo}
            alt={item.company}
            className="journey-logo"
          />
        )}
        <div>
          <h3 className="journey-card-title">{item.title}</h3>
          <p className="journey-card-company">{item.company}</p>
        </div>
      </div>

      {/* description */}
      {item.description && (
        <p className="journey-card-desc">{item.description}</p>
      )}

      {/* tech badges */}
      {item.technologies && item.technologies.length > 0 && (
        <div className="journey-tech-row">
          {item.technologies.map((t) => (
            <span key={t} className="journey-tech-badge">
              {t}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Main component ──────────────────────────────────────────────────── */
export default function MyJourney() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mobileHeaderVisible, setMobileHeaderVisible] = useState(false);

  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* fetch */
  useEffect(() => {
    const base = BACKEND_URL.replace(/\/$/, "");
    axios
      .get(`${base}/experience`)
      .then((res) => {
        const data = Array.isArray(res.data)
          ? res.data
          : res.data?.allExperiences ?? [];
        setExperiences(data);
      })
      .catch((err) => {
        console.error("MyJourney fetch error:", err);
        setError("Could not load journey entries.");
      })
      .finally(() => setLoading(false));
  }, []);

  /* mobile fixed header — shown once section top reaches viewport top */
  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth >= 768) return;

    const update = () => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;
      // Fixed header takes over once section top hits viewport top; hides after section leaves
      setMobileHeaderVisible(rect.top <= 0 && rect.bottom > 0);
    };

    window.addEventListener("scroll", update, { passive: true });
    const lenis = window.lenis;
    if (lenis) lenis.on("scroll", update);
    update();

    return () => {
      window.removeEventListener("scroll", update);
      if (lenis) lenis.off("scroll", update);
    };
  }, [experiences]);

  /* scroll animation — desktop only */
  useEffect(() => {
    if (prefersReducedMotion) return;
    if (!trackRef.current || !sectionRef.current) return;
    if (experiences.length === 0) return;
    if (window.innerWidth < 768) return;

    let ctx;
    const id = setTimeout(() => {
      const track = trackRef.current;
      const section = sectionRef.current;
      if (!track || !section) return;

      const trackH = track.scrollHeight;
      const viewH = window.innerHeight;
      const travelDist = Math.max(0, trackH - viewH + 120);

      ctx = gsap.context(() => {
        gsap.to(track, {
          y: -travelDist,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${travelDist + viewH * 0.3}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
      }, section);
    }, 120);

    return () => {
      clearTimeout(id);
      ctx?.revert();
    };
  }, [experiences, prefersReducedMotion]);

  const sorted = sortExperiences(experiences);

  /* ── states ── */
  if (loading) {
    return (
      <section className="journey-section journey-section--loading">
        <div className="journey-loading-text">Loading Journey…</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="journey-section journey-section--loading">
        <div className="journey-loading-text" style={{ color: "#c0392b" }}>
          {error}
        </div>
      </section>
    );
  }

  if (sorted.length === 0) {
    return (
      <section className="journey-section journey-section--loading">
        <div className="journey-loading-text">No journey entries yet.</div>
      </section>
    );
  }

  /* portal: fixed overlay header, takes over once section reaches top */
  const mobileFixedHeader = typeof document !== "undefined"
    ? createPortal(
        <div
          className="journey-mobile-header-fixed"
          style={{ display: mobileHeaderVisible ? "block" : "none" }}
          aria-hidden={!mobileHeaderVisible}
        >
          <div className="journey-left-content">
            <h2 className="journey-heading notable-regular no-cursor-target">
              MY<br />STORY SO FAR..
            </h2>
            <p className="journey-intro">
              A collection of milestones, roles, and experiences that have
              shaped who I am as a developer and problem-solver.
            </p>
          </div>
        </div>,
        document.body
      )
    : null;

  return (
    <>
      <style>{JOURNEY_CSS}</style>

      {/* fixed overlay — portalled to body so no ancestor can clip/transform it */}
      {mobileFixedHeader}

      <section ref={sectionRef} className="journey-section" id="my-journey">
        <div className="journey-noise" aria-hidden="true" />

        {/*
          Mobile static header: always in-flow at the top of the section.
          Visible before the section reaches the viewport top (before fixed header kicks in).
          Hidden once fixed header takes over (mobileHeaderVisible = true) to avoid duplicate.
        */}
        <div className="journey-mobile-static-header" aria-hidden={mobileHeaderVisible}>
          <div className="journey-left-content">
            <h2 className="journey-heading notable-regular no-cursor-target">
              MY<br />STORY SO FAR..
            </h2>
            <p className="journey-intro">
              A collection of milestones, roles, and experiences that have
              shaped who I am as a developer and problem-solver.
            </p>
          </div>
        </div>

        {/* ── two-column layout (desktop) / cards-only block (mobile) ── */}
        <div className="journey-layout">

          {/* LEFT — desktop only */}
          <div className="journey-left">
            <div className="journey-left-content">
              <h2 className="journey-heading notable-regular no-cursor-target">
                MY<br />STORY SO FAR..
              </h2>
              <p className="journey-intro">
                A collection of milestones, roles, and experiences that have
                shaped who I am as a developer and problem-solver.
              </p>
            </div>
          </div>

          {/* RIGHT — scrolling timeline */}
          <div className="journey-right">
            <div ref={trackRef} className="journey-track">
              {/* vertical timeline line */}
              <div className="journey-line" aria-hidden="true" />

              {sorted.map((item, idx) => (
                <div key={item._id} className="journey-row">
                  {/* milestone dot */}
                  <div className="journey-milestone cursor-target">
                    <span className="journey-milestone-num">{idx + 1}</span>
                  </div>

                  {/* card */}
                  <BlackCursorCard>
                    <Magnet padding={20} magnetStrength={15} wrapperClassName="cursor-target w-full" innerClassName="w-full">
                      <JourneyCard item={item} />
                    </Magnet>
                  </BlackCursorCard>
                </div>
              ))}

              {/* end cap */}
              <div className="journey-end-cap" aria-hidden="true" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ─── Scoped CSS ──────────────────────────────────────────────────────── */
const JOURNEY_CSS = `
/* section shell */
.journey-section {
  position: relative;
  width: 100%;
  background: radial-gradient(circle at center, #FFD500 0%, #FFC300 65%, #FFAA00 100%);
}

.journey-section--loading {
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.journey-loading-text {
  font-family: 'Outfit', sans-serif;
  font-size: 1.2rem;
  font-weight: 600;
  color: #111;
  opacity: 0.7;
}

/* noise overlay */
.journey-noise {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
  opacity: 0.08;
  background: #ffffff;
  filter: url(#noiseFilter);
  mix-blend-mode: multiply;
}

/* mobile static header: in-flow, desktop hidden */
.journey-mobile-static-header {
  display: none;
}

/* mobile fixed header: portalled to body, desktop hidden */
.journey-mobile-header-fixed {
  display: none;
}

/* two-column layout */
.journey-layout {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 42% 58%;
  min-height: 100vh;
}

/* LEFT column */
.journey-left {
  position: relative;
  display: flex;
  align-items: flex-start;
  padding: 80px 32px 80px 48px;
  overflow: hidden;
}

.journey-left-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
}

.journey-heading {
  font-family: 'Notable', sans-serif;
  font-size: clamp(3rem, 6vw, 6.5rem);
  font-weight: 400;
  line-height: 0.88;
  color: #111;
  letter-spacing: 0em;
  text-transform: uppercase;
  margin: 0;
}

.journey-intro {
  font-family: 'Outfit', sans-serif;
  font-size: clamp(0.9rem, 1.3vw, 1.1rem);
  font-weight: 400;
  color: #222;
  line-height: 1.65;
  max-width: 340px;
  opacity: 0.85;
}

/* RIGHT column */
.journey-right {
  position: relative;
  overflow: hidden;
  padding: 80px 48px 80px 24px;
}

.journey-track {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0;
  will-change: transform;
}

.journey-line {
  position: absolute;
  left: 19px;
  top: 24px;
  bottom: 40px;
  width: 3px;
  background: #111;
  border-radius: 2px;
  z-index: 0;
}

.journey-row {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 28px;
  padding-bottom: 48px;
}

.journey-milestone {
  position: relative;
  z-index: 2;
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #FFD500;
  border: 3px solid #111;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.18);
  margin-top: 4px;
}

.journey-milestone-num {
  font-family: 'Outfit', sans-serif;
  font-size: 0.8rem;
  font-weight: 800;
  color: #111;
  line-height: 1;
}

.journey-card {
  flex: 1;
  min-width: 0;
}

.journey-card-inner {
  background: #FEFAE8;
  border-radius: 18px;
  padding: 22px 24px 20px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06);
  border: 1.5px solid rgba(0,0,0,0.07);
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.journey-date-pill {
  display: inline-block;
  background: #111;
  color: #fff;
  font-family: 'Outfit', sans-serif;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  padding: 4px 12px;
  border-radius: 999px;
  width: fit-content;
}

.journey-card-header {
  display: flex;
  align-items: center;
  gap: 14px;
}

.journey-logo {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  object-fit: cover;
  border: 1.5px solid rgba(0,0,0,0.1);
  background: #fff;
  flex-shrink: 0;
}

.journey-card-title {
  font-family: 'Outfit', sans-serif;
  font-size: 1.05rem;
  font-weight: 800;
  color: #111;
  margin: 0 0 2px;
  line-height: 1.2;
}

.journey-card-company {
  font-family: 'Outfit', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  color: #D4900A;
  margin: 0;
}

.journey-card-desc {
  font-family: 'Outfit', sans-serif;
  font-size: 0.85rem;
  font-weight: 400;
  color: #555;
  line-height: 1.6;
  margin: 0;
}

.journey-tech-row {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.journey-tech-badge {
  font-family: 'Outfit', sans-serif;
  font-size: 0.7rem;
  font-weight: 600;
  color: #1a6b4a;
  background: #d1fae5;
  border: 1px solid #6ee7b7;
  border-radius: 999px;
  padding: 3px 10px;
  letter-spacing: 0.02em;
}

.journey-end-cap {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #111;
  margin-left: 13px;
  margin-top: -24px;
  margin-bottom: 20px;
}

/* DESKTOP / TABLET: restore overflow clipping, GSAP pin manages scroll */
@media (min-width: 768px) {
  .journey-section {
    overflow: hidden;
  }
}

@media (max-width: 1024px) {
  .journey-layout {
    grid-template-columns: 38% 62%;
  }
  .journey-left {
    padding: 60px 20px 60px 28px;
  }
  .journey-right {
    padding: 60px 28px 60px 16px;
  }
}

/* MOBILE
   Key insight: position:sticky on a grid child only sticks within its own
   grid track height. To span the full section, the sticky header must be
   a direct child of the section (outside the grid), which is what
   journey-mobile-header provides. The grid left column is hidden on mobile.
*/
@media (max-width: 767px) {
  .journey-section {
    overflow: visible;
  }

  /*
   * Static header: always in-flow at the top of the section.
   * Visible on initial load before the section reaches the viewport top.
   * Visually hidden (opacity 0, pointer-events none) once the fixed overlay
   * takes over — keeps its height so the layout doesn't shift.
   */
  .journey-mobile-static-header {
    display: block;
    padding: 28px 20px 20px;
    background: radial-gradient(circle at center, #FFD500 0%, #FFC300 65%, #FFAA00 100%);
    position: relative;
    z-index: 2;
    transition: opacity 0.15s ease;
  }

  .journey-mobile-static-header[aria-hidden="true"] {
    opacity: 0;
    pointer-events: none;
  }

  .journey-mobile-static-header .journey-left-content {
    gap: 6px;
  }

  .journey-mobile-static-header .journey-heading {
    font-size: clamp(1.9rem, 9.5vw, 2.8rem);
    line-height: 0.92;
  }

  .journey-mobile-static-header .journey-intro {
    font-size: 0.78rem;
    max-width: 100%;
    line-height: 1.45;
    opacity: 0.8;
  }

  /*
   * Fixed overlay header: portalled to <body>, driven by JS.
   * position:fixed is immune to any ancestor overflow/transform/Lenis virtual scroll.
   * Shown only while section is scrolled past the top of the viewport.
   */
  .journey-mobile-header-fixed {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 200;
    padding: 20px 20px 14px;
    background: radial-gradient(circle at center, #FFD500 0%, #FFC300 65%, #FFAA00 100%);
    box-shadow: 0 3px 10px rgba(200,140,0,0.35);
  }

  .journey-mobile-header-fixed .journey-left-content {
    gap: 6px;
  }

  .journey-mobile-header-fixed .journey-heading {
    font-size: clamp(1.9rem, 9.5vw, 2.8rem);
    line-height: 0.92;
  }

  .journey-mobile-header-fixed .journey-intro {
    font-size: 0.78rem;
    max-width: 100%;
    line-height: 1.45;
    opacity: 0.8;
  }

  /* hide the grid's left column on mobile */
  .journey-left {
    display: none;
  }

  /* grid becomes single column, cards only */
  .journey-layout {
    grid-template-columns: 1fr;
    min-height: unset;
    overflow: visible;
  }

  /*
   * No top padding needed — the static header above the grid provides
   * the visual space. Cards sit directly below it in normal flow.
   * When fixed header is active, the static header's height (opacity:0 but
   * still in-flow) keeps the cards from jumping up.
   */
  .journey-right {
    overflow: visible;
    padding: 16px 16px 48px 16px;
  }

  .journey-row {
    gap: 14px;
    padding-bottom: 28px;
  }

  .journey-card-inner {
    padding: 14px 14px 12px;
  }

  .journey-card-title {
    font-size: 0.92rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .journey-track {
    transform: none !important;
  }
}
`;
