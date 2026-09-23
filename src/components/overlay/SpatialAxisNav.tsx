'use client';

import React from 'react';
import { useSpatialStore, ChapterNumber } from '@/lib/store';
import styles from './SpatialAxisNav.module.css';

const CHAPTERS: { number: ChapterNumber; label: string }[] = [
  { number: 1, label: 'IDENTITY' },
  { number: 2, label: 'SKILLS' },
  { number: 3, label: 'EXPERIENCE' },
  { number: 4, label: 'PROJECTS' },
  { number: 5, label: 'CONTACT' },
];

export default function SpatialAxisNav() {
  const activeChapter = useSpatialStore((state) => state.activeChapter);
  const setActiveChapter = useSpatialStore((state) => state.setActiveChapter);
  const setScrollProgress = useSpatialStore((state) => state.setScrollProgress);

  const handleNodeClick = (chapterNum: ChapterNumber) => {
    setActiveChapter(chapterNum);
    // Smooth scroll progress mapping (0 to 1)
    const progress = (chapterNum - 1) / 4;
    setScrollProgress(progress);

    // Scroll window smoothly
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollHeight > 0) {
      window.scrollTo({
        top: progress * scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  return (
    <nav className={styles.axisNav} aria-label="Spatial Axis Navigation">
      {/* 1px Vertical Thread Line */}
      <div className={styles.axisThreadLine} />

      {/* Axis Chapter Nodes */}
      <div className={styles.axisNodes}>
        {CHAPTERS.map((ch) => {
          const isActive = activeChapter === ch.number;

          return (
            <button
              key={ch.number}
              type="button"
              className={`${styles.nodeButton} ${isActive ? styles.activeNode : ''}`}
              onClick={() => handleNodeClick(ch.number)}
              aria-current={isActive ? 'page' : undefined}
            >
              <div className={styles.orbWrapper}>
                <span className={styles.orbDot} />
                {isActive && <span className={styles.orbPulse} />}
              </div>

              <div className={styles.labelContainer}>
                <span className={styles.numberPrefix}>{`0${ch.number}`}</span>
                {isActive && (
                  <span className={styles.chapterBadge}>{`// ${ch.label}`}</span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
