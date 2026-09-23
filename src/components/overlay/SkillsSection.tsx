'use client';

import React from 'react';
import { Sparkles, Cpu, X } from 'lucide-react';
import { useSpatialStore } from '@/lib/store';
import styles from './Sections.module.css';

export default function SkillsSection() {
  const activeChapter = useSpatialStore((state) => state.activeChapter);
  const selectedSkillId = useSpatialStore((state) => state.selectedSkillId);
  const setSelectedSkillId = useSpatialStore((state) => state.setSelectedSkillId);
  const portfolioData = useSpatialStore((state) => state.portfolioData);

  const isActive = activeChapter === 2;
  const skills = portfolioData.skills;
  const activeSkill = skills.find((s) => s.id === selectedSkillId) || skills[0];

  return (
    <section
      className={`${styles.sectionContainer} ${isActive ? styles.activeSection : styles.inactiveSection}`}
      id="chapter-02"
      aria-label="Skills Constellation"
    >
      <div className={styles.skillsMatrixWrapper}>
        <div className={styles.sectionHeader}>
          <div className={styles.badgeRow}>
            <Cpu size={14} className={styles.cyanIcon} />
            <span>CHAPTER 02 // SPATIAL SKILL CONSTELLATION</span>
          </div>
          <span className={styles.interactiveHint}>[ CLICK ANY NODE TO FOCUS ]</span>
        </div>

        <div className={styles.skillsGrid}>
          {/* Category Overview & Pills */}
          <div className={styles.categoryOverview}>
            <h3 className={styles.categoryTitle}>CORE COMPETENCIES</h3>
            <div className={styles.skillPillsGroup}>
              {skills.map((skill) => {
                const isSelected = activeSkill?.id === skill.id;
                return (
                  <button
                    key={skill.id}
                    type="button"
                    className={`${styles.skillPill} ${isSelected ? styles.skillPillActive : ''}`}
                    onClick={() => setSelectedSkillId(skill.id)}
                  >
                    <span className={styles.pillDot} style={{ backgroundColor: skill.color }} />
                    <span>{skill.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Focused Skill Detail Card */}
          {activeSkill && (
            <div className={styles.detailCard}>
              <div className={styles.cardHeader}>
                <div className={styles.badgeRow}>
                  <Sparkles size={14} className={styles.cyanIcon} />
                  <span>{`CATEGORY: ${activeSkill.category.toUpperCase()}`}</span>
                </div>
                {selectedSkillId && (
                  <button
                    type="button"
                    className={styles.closeBtn}
                    onClick={() => setSelectedSkillId(null)}
                    aria-label="Close skill details"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              <h2 className={styles.skillTitle}>{activeSkill.name}</h2>
              <p className={styles.skillDesc}>{activeSkill.description}</p>

              <div className={styles.skillFooter}>
                <span>{`PROFICIENCY LEVEL: ${activeSkill.level} / 5`}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
