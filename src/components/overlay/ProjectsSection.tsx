'use client';

import React from 'react';
import { Compass, Code2, ExternalLink } from 'lucide-react';
import { useSpatialStore } from '@/lib/store';
import styles from './Sections.module.css';

export default function ProjectsSection() {
  const activeChapter = useSpatialStore((state) => state.activeChapter);
  const selectedProjectId = useSpatialStore((state) => state.selectedProjectId);
  const setSelectedProjectId = useSpatialStore((state) => state.setSelectedProjectId);
  const portfolioData = useSpatialStore((state) => state.portfolioData);

  const isActive = activeChapter === 4;
  const projects = portfolioData.projects;
  const activeProject = projects.find((p) => p.id === selectedProjectId) || projects[0];

  return (
    <section
      className={`${styles.sectionContainer} ${isActive ? styles.activeSection : styles.inactiveSection}`}
      id="chapter-04"
      aria-label="Project Portals Showcase"
    >
      <div className={styles.projectsWrapper}>
        <div className={styles.sectionHeader}>
          <div className={styles.badgeRow}>
            <Compass size={16} className={styles.cyanIcon} />
            <span>CHAPTER 04 // PROJECT PORTALS</span>
          </div>
        </div>

        <div className={styles.projectsGrid}>
          {projects.map((project) => {
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
                    <span>VIEW SOURCE REPOSITORY</span>
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
