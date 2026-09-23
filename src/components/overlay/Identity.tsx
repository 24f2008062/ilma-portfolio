'use client';

import React from 'react';
import { ArrowDown, Sparkles, FileText, ExternalLink } from 'lucide-react';
import { useSpatialStore } from '@/lib/store';
import styles from './Identity.module.css';

export default function Identity() {
  const activeChapter = useSpatialStore((state) => state.activeChapter);
  const setActiveChapter = useSpatialStore((state) => state.setActiveChapter);
  const portfolioData = useSpatialStore((state) => state.portfolioData);

  const isActive = activeChapter === 1;
  const idData = portfolioData.identity;

  const featureChips = idData.featureChips || [
    "Product Strategy & UX",
    "Modern Web Applications",
    "Python + AI Workflow"
  ];

  const statBadges = idData.statBadges || [
    { id: "stat-1", value: "2+ YRS", label: "Building Products" },
    { id: "stat-2", value: "100+", label: "Users Reached" },
    { id: "stat-3", value: "END-TO-END", label: "Product Development" }
  ];

  return (
    <section
      className={`${styles.identitySection} ${isActive ? styles.activeSection : styles.inactiveSection}`}
      id="chapter-01"
      aria-label="Identity Header"
    >
      {/* Main Kinetic Hero Container */}
      <div className={styles.heroContent}>
        {/* Resume Badge on Front Card Top Border */}
        {idData.resumeUrl && (
          <a
            href={idData.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.resumeBadge}
            title="View Resume / CV Document"
          >
            <FileText size={13} className={styles.resumeIcon} />
            <span>RESUME // CV</span>
            <ExternalLink size={11} className={styles.resumeExternalIcon} />
          </a>
        )}

        <div className={styles.taglineBadge}>
          <span className={styles.badgeDot} />
          <span>{idData.tagline || 'CHAPTER 01 // SPATIAL IDENTITY'}</span>
        </div>

        <h1 className={styles.heroTitle}>{idData.name}</h1>
        
        <p className={styles.heroSubtitle}>{idData.title}</p>
        
        <p className={styles.heroSummary}>{idData.summary}</p>

        {/* Dynamic Feature Capability Chips */}
        <div className={styles.featureChips}>
          {featureChips.map((chipText, idx) => (
            <span key={`chip-${idx}`} className={styles.chip}>
              <Sparkles size={12} className={styles.cyanIcon} />
              {chipText}
            </span>
          ))}
        </div>

        {/* Dynamic Impact Stat Badges */}
        <div className={styles.statGrid}>
          {statBadges.map((stat, idx) => (
            <div key={stat.id || `stat-${idx}`} className={styles.statBox}>
              <span className={styles.statVal}>{stat.value}</span>
              <span className={styles.statLbl}>{stat.label}</span>
            </div>
          ))}
        </div>

        <div className={styles.ctaGroup}>
          <button
            type="button"
            className={styles.primaryCta}
            onClick={() => {
              setActiveChapter(2);
              const el = document.getElementById('chapter-02');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span>ENTER SPATIAL CONSTELLATION</span>
            <ArrowDown size={14} />
          </button>
        </div>
      </div>
    </section>
  );
}
