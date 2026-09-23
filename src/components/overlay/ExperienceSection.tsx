'use client';

import React from 'react';
import { Layers } from 'lucide-react';
import { useSpatialStore } from '@/lib/store';
import styles from './Sections.module.css';

export default function ExperienceSection() {
  const activeChapter = useSpatialStore((state) => state.activeChapter);
  const portfolioData = useSpatialStore((state) => state.portfolioData);

  const isActive = activeChapter === 3;

  return (
    <section
      className={`${styles.sectionContainer} ${isActive ? styles.activeSection : styles.inactiveSection}`}
      id="chapter-03"
      aria-label="Experience Landmarks"
    >
      <div className={styles.experienceWrapper}>
        <div className={styles.sectionHeader}>
          <div className={styles.badgeRow}>
            <Layers size={16} className={styles.cyanIcon} />
            <span>CHAPTER 03 // EXPERIENCE & LEADERSHIP</span>
          </div>
        </div>

        <div className={styles.experienceGrid}>
          {portfolioData.experience.map((exp) => (
            <div key={exp.id} className={styles.expCard}>
              <div className={styles.expCardHeader}>
                <span className={styles.expPeriod}>{exp.period}</span>
                {exp.location && <span className={styles.locationTag}>{exp.location}</span>}
              </div>

              <h3 className={styles.expRole}>{exp.role}</h3>
              <h4 className={styles.expOrg}>{`@ ${exp.organization}`}</h4>
              <p className={styles.expSummary}>{exp.summary}</p>
              <ul className={styles.expHighlights}>
                {exp.highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
