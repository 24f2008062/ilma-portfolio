'use client';

import React from 'react';
import { Sparkles, Layers, Code2, ExternalLink, X, Cpu, Compass } from 'lucide-react';
import { PORTFOLIO_DATA } from '@/lib/content';
import { useSpatialStore } from '@/lib/store';
import styles from './DetailLayer.module.css';

export default function DetailLayer() {
  const activeChapter = useSpatialStore((state) => state.activeChapter);
  const selectedSkillId = useSpatialStore((state) => state.selectedSkillId);
  const setSelectedSkillId = useSpatialStore((state) => state.setSelectedSkillId);
  const selectedProjectId = useSpatialStore((state) => state.selectedProjectId);
  const setSelectedProjectId = useSpatialStore((state) => state.setSelectedProjectId);

  const activeSkill = PORTFOLIO_DATA.skills.find((s) => s.id === (selectedSkillId || 'figma'));
  const activeProject = PORTFOLIO_DATA.projects.find((p) => p.id === (selectedProjectId || 'aranious-visual-design'));

  return (
    <div className={styles.layerContainer}>
      {/* Chapter 02: Skills Constellation */}
      {activeChapter === 2 && (
        <aside className={styles.skillsMatrixWrapper} aria-label="Skill Matrix Panel">
          <div className={styles.skillsMatrixHeader}>
            <div className={styles.badgeRow}>
              <Cpu size={14} className={styles.cyanIcon} />
              <span>CHAPTER 02 // SPATIAL SKILL CONSTELLATION</span>
            </div>
            <span className={styles.interactiveHint}>[ CLICK ANY 3D NODE TO FOCUS ]</span>
          </div>

          <div className={styles.skillsGrid}>
            {/* Quick Skill Category Cards */}
            <div className={styles.categoryOverview}>
              <h3 className={styles.categoryTitle}>CORE COMPETENCIES</h3>
              <div className={styles.skillPillsGroup}>
                {PORTFOLIO_DATA.skills.map((skill) => {
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

            {/* Focused Skill Detail Glass Card */}
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
        </aside>
      )}

      {/* Chapter 03: Experience Landmarks Timeline */}
      {activeChapter === 3 && (
        <aside className={styles.experienceContainer} aria-label="Experience Landmarks">
          <div className={styles.sectionHeader}>
            <Layers size={16} className={styles.cyanIcon} />
            <span>CHAPTER 03 // EXPERIENCE & LEADERSHIP</span>
          </div>

          <div className={styles.experienceGrid}>
            {PORTFOLIO_DATA.experience.map((exp) => (
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
        </aside>
      )}

      {/* Chapter 04: Project Portals Showcase */}
      {activeChapter === 4 && (
        <aside className={styles.projectsContainer} aria-label="Project Portals Showcase">
          <div className={styles.sectionHeader}>
            <Compass size={16} className={styles.cyanIcon} />
            <span>CHAPTER 04 // PROJECT PORTALS & INITIATIVES</span>
          </div>

          <div className={styles.projectsGrid}>
            {PORTFOLIO_DATA.projects.map((project) => {
              const isSelected = activeProject?.id === project.id;
              return (
                <div
                  key={project.id}
                  className={`${styles.projectCard} ${isSelected ? styles.projectCardSelected : ''}`}
                  onClick={() => setSelectedProjectId(project.id)}
                >
                  <div className={styles.cardHeader}>
                    <div className={styles.badgeRow}>
                      <Code2 size={14} className={styles.cyanIcon} />
                      <span>{project.subtitle}</span>
                    </div>
                  </div>

                  <h2 className={styles.projectTitle}>{project.title}</h2>
                  <p className={styles.projectDesc}>{project.description}</p>

                  <div className={styles.techStackContainer}>
                    {project.techStack.map((tech) => (
                      <span key={tech} className={styles.techBadge}>
                        {tech}
                      </span>
                    ))}
                  </div>

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.projectLink}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span>VIEW DETAILS</span>
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        </aside>
      )}
    </div>
  );
}
