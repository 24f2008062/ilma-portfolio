'use client';

import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { useSpatialStore, ChapterNumber } from '@/lib/store';
import { PORTFOLIO_DATA } from '@/lib/content';
import CanvasRoot from '@/components/space/CanvasRoot';
import SpatialAxisNav from '@/components/overlay/SpatialAxisNav';
import Identity from '@/components/overlay/Identity';
import SkillsSection from '@/components/overlay/SkillsSection';
import ExperienceSection from '@/components/overlay/ExperienceSection';
import ProjectsSection from '@/components/overlay/ProjectsSection';
import ContactSection from '@/components/overlay/ContactSection';
import styles from './page.module.css';

const CHAPTER_MAP: Record<string, ChapterNumber> = {
  'chapter-01': 1,
  'chapter-02': 2,
  'chapter-03': 3,
  'chapter-04': 4,
  'chapter-05': 5,
};

export default function Home() {
  const setScrollProgress = useSpatialStore((state) => state.setScrollProgress);
  const setActiveChapter = useSpatialStore((state) => state.setActiveChapter);
  const fetchRemotePortfolioData = useSpatialStore((state) => state.fetchRemotePortfolioData);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    fetchRemotePortfolioData();
  }, [fetchRemotePortfolioData]);

  useEffect(() => {
    // Initialize Lenis Smooth Scroll Inertia Engine
    const lenis = new Lenis({
      duration: 0.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.2,
    });

    lenisRef.current = lenis;

    const updateActiveSection = () => {
      const viewportCenter = window.innerHeight * 0.45;
      let closestChapter: ChapterNumber = 1;
      let minDistance = Infinity;

      Object.entries(CHAPTER_MAP).forEach(([id, chapterNum]) => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const elemCenter = rect.top + rect.height * 0.4;
          const dist = Math.abs(elemCenter - viewportCenter);
          if (dist < minDistance) {
            minDistance = dist;
            closestChapter = chapterNum;
          }
        }
      });

      setActiveChapter(closestChapter);
    };

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        const progress = Math.min(1, Math.max(0, window.scrollY / scrollHeight));
        setScrollProgress(progress);
      }
      updateActiveSection();
    };

    lenis.on('scroll', handleScroll);
    window.addEventListener('scroll', handleScroll, { passive: true });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      lenis.destroy();
    };
  }, [setScrollProgress, setActiveChapter]);

  return (
    <main className={styles.mainContainer}>
      {/* 3D WebGL Spatial Canvas Background Layer */}
      <CanvasRoot />

      {/* Fixed Left Vertical Axial Nav Thread */}
      <SpatialAxisNav />

      {/* Continuous Vertical Scroll Document Content */}
      <div className={styles.scrollContentContainer}>
        <Identity />
        
        <div className={styles.transitionFiller}>
          [ SPATIAL TRAVERSE // LOADING SKILL MATRIX ]
        </div>

        <SkillsSection />

        <div className={styles.transitionFiller}>
          [ SYSTEM TELEMETRY // LOADING LEADERSHIP LANDMARKS ]
        </div>

        <ExperienceSection />

        <div className={styles.transitionFiller}>
          [ PORTAL SCANNER // DEPLOYING PROJECT WORKFLOWS ]
        </div>

        <ProjectsSection />

        <div className={styles.transitionFiller}>
          [ SECURE CHANNEL // INITIATING DIRECT LINK ]
        </div>

        <ContactSection />
      </div>

      {/* Semantic Accessible 2D Fallback for SEO & Screen Readers */}
      <article className="sr-only" aria-label="Semantic Portfolio Content">
        <header>
          <h1>{PORTFOLIO_DATA.identity.name}</h1>
          <h2>{PORTFOLIO_DATA.identity.title}</h2>
          <p>{PORTFOLIO_DATA.identity.summary}</p>
        </header>

        <section id="skills-fallback">
          <h2>Technical Skills & Frameworks</h2>
          <ul>
            {PORTFOLIO_DATA.skills.map((s) => (
              <li key={s.id}>
                <strong>{s.name}</strong> — {s.description}
              </li>
            ))}
          </ul>
        </section>

        <section id="experience-fallback">
          <h2>Experience & Leadership</h2>
          {PORTFOLIO_DATA.experience.map((e) => (
            <div key={e.id}>
              <h3>{`${e.role} @ ${e.organization}`}</h3>
              <p>{e.summary}</p>
            </div>
          ))}
        </section>

        <section id="projects-fallback">
          <h2>Projects</h2>
          {PORTFOLIO_DATA.projects.map((p) => (
            <div key={p.id}>
              <h3>{p.title}</h3>
              <p>{p.description}</p>
            </div>
          ))}
        </section>
      </article>
    </main>
  );
}
