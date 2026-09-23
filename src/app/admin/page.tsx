'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Lock, Shield, ArrowLeft, Plus, Edit2, Trash2, CheckCircle, AlertTriangle, RefreshCw, Save, ArrowUp, ArrowDown } from 'lucide-react';
import { useSpatialStore } from '@/lib/store';
import { ProjectItem, ExperienceItem, SkillNode, StatBadgeItem } from '@/lib/content';
import styles from './admin.module.css';

// Admin Credentials
const ADMIN_USER = 'siddiquiilma679@gmail.com';
const ADMIN_USER_ALT = 'ilma-admin@portfolio';
const ADMIN_PASS = 'Ilmaah_0604';
const AUTH_KEY = 'ilma_admin_authed_v1';

const SUGGESTED_SKILL_CATEGORIES = [
  'Design Tool',
  'Design & Creative',
  'Programming Language',
  'Professional Skill',
  'Language',
  'UI & 3D Spatial'
];

export default function AdminPage() {
  const [isAuthed, setIsAuthed] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState<'identity' | 'projects' | 'experience' | 'skills' | 'contact'>('identity');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const portfolioData = useSpatialStore((state) => state.portfolioData);
  const updateIdentity = useSpatialStore((state) => state.updateIdentity);
  const updateContact = useSpatialStore((state) => state.updateContact);
  const addProject = useSpatialStore((state) => state.addProject);
  const updateProject = useSpatialStore((state) => state.updateProject);
  const deleteProject = useSpatialStore((state) => state.deleteProject);
  const moveProject = useSpatialStore((state) => state.moveProject);
  const addExperience = useSpatialStore((state) => state.addExperience);
  const updateExperience = useSpatialStore((state) => state.updateExperience);
  const deleteExperience = useSpatialStore((state) => state.deleteExperience);
  const moveExperience = useSpatialStore((state) => state.moveExperience);
  const addSkill = useSpatialStore((state) => state.addSkill);
  const updateSkill = useSpatialStore((state) => state.updateSkill);
  const deleteSkill = useSpatialStore((state) => state.deleteSkill);
  const resetToDefaults = useSpatialStore((state) => state.resetToDefaults);
  const fetchRemotePortfolioData = useSpatialStore((state) => state.fetchRemotePortfolioData);

  // Check auth session on load & fetch latest remote portfolio data
  useEffect(() => {
    fetchRemotePortfolioData();
    if (typeof window !== 'undefined') {
      const savedAuth = localStorage.getItem(AUTH_KEY);
      if (savedAuth === 'true') {
        setIsAuthed(true);
      }
    }
  }, [fetchRemotePortfolioData]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const inputUser = username.trim().toLowerCase();
    const inputPass = password.trim();

    const isUserValid = inputUser === ADMIN_USER.toLowerCase() || inputUser === ADMIN_USER_ALT.toLowerCase();
    const isPassValid = inputPass === ADMIN_PASS;

    if (isUserValid && isPassValid) {
      setIsAuthed(true);
      localStorage.setItem(AUTH_KEY, 'true');
      setLoginError('');
    } else {
      setLoginError('INVALID CREDENTIALS! Access Denied.');
    }
  };

  const handleLogout = () => {
    setIsAuthed(false);
    localStorage.removeItem(AUTH_KEY);
  };

  const triggerStatus = (msg: string) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(null), 3000);
  };

  // --- Identity State & Form ---
  const [identityForm, setIdentityForm] = useState(portfolioData.identity);
  useEffect(() => {
    setIdentityForm({
      ...portfolioData.identity,
      resumeUrl: portfolioData.identity.resumeUrl || "https://docs.google.com/document/d/1c5Jp_exVd5yHEZeHXWQCef0v3bzBZyYsT96C4mbMxQY/edit?usp=sharing",
      featureChips: portfolioData.identity.featureChips || [
        "Product Strategy & UX",
        "Modern Web Applications",
        "Python + AI Workflow"
      ],
      statBadges: portfolioData.identity.statBadges || [
        { id: "stat-1", value: "2+ YRS", label: "Building Products" },
        { id: "stat-2", value: "100+", label: "Users Reached" },
        { id: "stat-3", value: "END-TO-END", label: "Product Development" }
      ]
    });
  }, [portfolioData.identity]);

  const handleSaveIdentity = (e: React.FormEvent) => {
    e.preventDefault();
    updateIdentity(identityForm);
    triggerStatus('Personal Info, Badges & Stat Cards Saved!');
  };

  // Badge CRUD Helpers
  const addFeatureChip = () => {
    const newChip = prompt('Enter new Feature Chip text (e.g. TypeScript 5.0):');
    if (newChip && newChip.trim()) {
      setIdentityForm((prev) => ({
        ...prev,
        featureChips: [...(prev.featureChips || []), newChip.trim()]
      }));
    }
  };

  const deleteFeatureChip = (index: number) => {
    setIdentityForm((prev) => ({
      ...prev,
      featureChips: prev.featureChips.filter((_, i) => i !== index)
    }));
  };

  const addStatBadge = () => {
    const value = prompt('Enter Stat Value (e.g. 5+):');
    if (!value) return;
    const label = prompt('Enter Stat Label (e.g. Major Projects Launched):');
    if (!label) return;

    const newStat: StatBadgeItem = {
      id: `stat-${Date.now()}`,
      value: value.trim(),
      label: label.trim()
    };

    setIdentityForm((prev) => ({
      ...prev,
      statBadges: [...(prev.statBadges || []), newStat]
    }));
  };

  const deleteStatBadge = (id: string) => {
    setIdentityForm((prev) => ({
      ...prev,
      statBadges: prev.statBadges.filter((s) => s.id !== id)
    }));
  };

  // --- Contact State & Form ---
  const [contactForm, setContactForm] = useState(portfolioData.contact);
  useEffect(() => {
    setContactForm(portfolioData.contact);
  }, [portfolioData.contact]);

  const handleSaveContact = (e: React.FormEvent) => {
    e.preventDefault();
    updateContact(contactForm);
    triggerStatus('Contact Information Updated Successfully!');
  };

  // --- Project Form State ---
  const [editingProjectId, setEditingProjectId] = useState<string | 'new' | null>(null);
  const [projectForm, setProjectForm] = useState({
    title: '',
    subtitle: '',
    description: '',
    techStack: '',
    githubUrl: '',
    liveUrl: ''
  });

  const openNewProjectForm = () => {
    setProjectForm({
      title: '',
      subtitle: '',
      description: '',
      techStack: '',
      githubUrl: '',
      liveUrl: ''
    });
    setEditingProjectId('new');
  };

  const openEditProjectForm = (p: ProjectItem) => {
    setProjectForm({
      title: p.title,
      subtitle: p.subtitle,
      description: p.description,
      techStack: p.techStack.join(', '),
      githubUrl: p.githubUrl || '',
      liveUrl: p.liveUrl || ''
    });
    setEditingProjectId(p.id);
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    const techArray = projectForm.techStack.split(',').map((s) => s.trim()).filter(Boolean);
    if (editingProjectId === 'new') {
      addProject({
        title: projectForm.title,
        subtitle: projectForm.subtitle,
        description: projectForm.description,
        techStack: techArray,
        githubUrl: projectForm.githubUrl || undefined,
        liveUrl: projectForm.liveUrl || undefined
      });
      triggerStatus('New Project Created Successfully!');
    } else if (editingProjectId) {
      updateProject(editingProjectId, {
        title: projectForm.title,
        subtitle: projectForm.subtitle,
        description: projectForm.description,
        techStack: techArray,
        githubUrl: projectForm.githubUrl || undefined,
        liveUrl: projectForm.liveUrl || undefined
      });
      triggerStatus('Project Updated Successfully!');
    }
    setEditingProjectId(null);
  };

  // --- Experience Form State ---
  const [editingExpId, setEditingExpId] = useState<string | 'new' | null>(null);
  const [expForm, setExpForm] = useState({
    role: '',
    organization: '',
    period: '',
    location: '',
    summary: '',
    highlights: ''
  });

  const openNewExpForm = () => {
    setExpForm({
      role: '',
      organization: '',
      period: '',
      location: '',
      summary: '',
      highlights: ''
    });
    setEditingExpId('new');
  };

  const openEditExpForm = (exp: ExperienceItem) => {
    setExpForm({
      role: exp.role,
      organization: exp.organization,
      period: exp.period,
      location: exp.location || '',
      summary: exp.summary,
      highlights: exp.highlights.join('\n')
    });
    setEditingExpId(exp.id);
  };

  const handleSaveExp = (e: React.FormEvent) => {
    e.preventDefault();
    const highlightsArray = expForm.highlights.split('\n').map((s) => s.trim()).filter(Boolean);
    if (editingExpId === 'new') {
      addExperience({
        role: expForm.role,
        organization: expForm.organization,
        period: expForm.period,
        location: expForm.location || undefined,
        summary: expForm.summary,
        highlights: highlightsArray
      });
      triggerStatus('New Experience Landmark Added!');
    } else if (editingExpId) {
      updateExperience(editingExpId, {
        role: expForm.role,
        organization: expForm.organization,
        period: expForm.period,
        location: expForm.location || undefined,
        summary: expForm.summary,
        highlights: highlightsArray
      });
      triggerStatus('Experience Record Updated!');
    }
    setEditingExpId(null);
  };

  // --- Skill Form State ---
  const [editingSkillId, setEditingSkillId] = useState<string | 'new' | null>(null);
  const [skillForm, setSkillForm] = useState({
    name: '',
    category: 'Design Tool',
    level: 1 as SkillNode['level'],
    description: '',
    color: '#00f0ff',
    isFeatured: false
  });

  const openNewSkillForm = () => {
    setSkillForm({
      name: '',
      category: 'Design Tool',
      level: 1,
      description: '',
      color: '#00f0ff',
      isFeatured: false
    });
    setEditingSkillId('new');
  };

  const openEditSkillForm = (s: SkillNode) => {
    setSkillForm({
      name: s.name,
      category: s.category,
      level: s.level,
      description: s.description,
      color: s.color,
      isFeatured: !!s.isFeatured
    });
    setEditingSkillId(s.id);
  };

  const handleSaveSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingSkillId === 'new') {
      addSkill(skillForm);
      triggerStatus('New Skill Added to Constellation!');
    } else if (editingSkillId) {
      updateSkill(editingSkillId, skillForm);
      triggerStatus('Skill Updated Successfully!');
    }
    setEditingSkillId(null);
  };

  // Render Login Card if not authorized
  if (!isAuthed) {
    return (
      <div className={styles.adminContainer}>
        <div className={styles.loginCard}>
          <div className={styles.loginHeader}>
            <Shield size={16} />
            <span>AUTHENTICATION TERMINAL</span>
          </div>

          <h1 className={styles.loginTitle}>Admin Portal Login</h1>
          <p className={styles.loginSubtitle}>Enter single administrator authorization key to manage portfolio content.</p>

          {loginError && (
            <div className={styles.errorBanner}>
              <AlertTriangle size={16} />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className={styles.formGroup}>
              <label className={styles.label}>ADMIN EMAIL</label>
              <input
                type="email"
                className={styles.input}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="siddiquiilma679@gmail.com"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>AUTHORIZATION PASSWORD</label>
              <input
                type="password"
                className={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter authorization password"
                required
              />
            </div>

            <button type="submit" className={styles.primaryBtn}>
              <Lock size={16} />
              <span>AUTHENTICATE TERMINAL</span>
            </button>
          </form>

          <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            <Link href="/" className={styles.secondaryBtn}>
              <ArrowLeft size={14} />
              <span>Return to Public Portfolio</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Render Admin Dashboard Control Panel
  return (
    <div className={styles.adminContainer}>
      <div className={styles.dashboardWrapper}>
        {/* Top Control Bar */}
        <div className={styles.topBar}>
          <div className={styles.topTitle}>
            <Shield size={20} />
            <span>PORTFOLIO ADMIN CMS TERMINAL</span>
          </div>

          <div className={styles.topActions}>
            <Link href="/" className={styles.secondaryBtn}>
              <ArrowLeft size={14} />
              <span>View Live Portfolio</span>
            </Link>
            <button
              type="button"
              className={styles.secondaryBtn}
              onClick={() => {
                if (confirm('Reset all content back to defaults? Custom edits will be overwritten.')) {
                  resetToDefaults();
                  triggerStatus('Portfolio content reset to default values!');
                }
              }}
            >
              <RefreshCw size={14} />
              <span>Reset Defaults</span>
            </button>
            <button type="button" className={styles.dangerBtn} onClick={handleLogout}>
              <Lock size={14} />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Global Notification Banner */}
        {statusMessage && (
          <div className={styles.successBanner}>
            <CheckCircle size={16} />
            <span>{statusMessage}</span>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className={styles.navTabs}>
          <button
            type="button"
            className={`${styles.tabBtn} ${activeTab === 'identity' ? styles.tabBtnActive : ''}`}
            onClick={() => setActiveTab('identity')}
          >
            1. PERSONAL INFO & BADGES
          </button>
          <button
            type="button"
            className={`${styles.tabBtn} ${activeTab === 'projects' ? styles.tabBtnActive : ''}`}
            onClick={() => setActiveTab('projects')}
          >
            2. PROJECTS MANAGER ({portfolioData.projects.length})
          </button>
          <button
            type="button"
            className={`${styles.tabBtn} ${activeTab === 'experience' ? styles.tabBtnActive : ''}`}
            onClick={() => setActiveTab('experience')}
          >
            3. EXPERIENCE MANAGER ({portfolioData.experience.length})
          </button>
          <button
            type="button"
            className={`${styles.tabBtn} ${activeTab === 'skills' ? styles.tabBtnActive : ''}`}
            onClick={() => setActiveTab('skills')}
          >
            4. SKILLS MATRIX ({portfolioData.skills.length})
          </button>
          <button
            type="button"
            className={`${styles.tabBtn} ${activeTab === 'contact' ? styles.tabBtnActive : ''}`}
            onClick={() => setActiveTab('contact')}
          >
            5. CONTACT DETAILS
          </button>
        </div>

        {/* TAB 1: IDENTITY & BADGES */}
        {activeTab === 'identity' && (
          <div className={styles.contentCard}>
            <div className={styles.cardSectionHeader}>
              <h2 className={styles.sectionTitle}>Edit Personal Info & Manage Badges (Add / Delete)</h2>
            </div>

            <form onSubmit={handleSaveIdentity}>
              {/* Section 1: Hero Main Content */}
              <h3 style={{ color: 'var(--accent-cyan)', marginBottom: '1rem' }}>{"// HERO IDENTITY CONTENT"}</h3>
              <div className={styles.formGroup}>
                <label className={styles.label}>FULL NAME</label>
                <input
                  type="text"
                  className={styles.input}
                  value={identityForm.name}
                  onChange={(e) => setIdentityForm({ ...identityForm, name: e.target.value })}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>HERO TITLE / ROLE</label>
                <input
                  type="text"
                  className={styles.input}
                  value={identityForm.title}
                  onChange={(e) => setIdentityForm({ ...identityForm, title: e.target.value })}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>CHAPTER BADGE / TAGLINE</label>
                <input
                  type="text"
                  className={styles.input}
                  value={identityForm.tagline}
                  onChange={(e) => setIdentityForm({ ...identityForm, tagline: e.target.value })}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>SUMMARY PARAGRAPH</label>
                <textarea
                  className={styles.textarea}
                  value={identityForm.summary}
                  onChange={(e) => setIdentityForm({ ...identityForm, summary: e.target.value })}
                  rows={3}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>RESUME DOCUMENT LINK (URL)</label>
                <input
                  type="url"
                  className={styles.input}
                  value={identityForm.resumeUrl || ''}
                  onChange={(e) => setIdentityForm({ ...identityForm, resumeUrl: e.target.value })}
                  placeholder="https://docs.google.com/document/d/..."
                  required
                />
              </div>

              {/* Section 2: Feature Capability Chips */}
              <div style={{ marginTop: '2.5rem', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ color: 'var(--accent-cyan)', margin: 0 }}>{`// FEATURE CAPABILITY CHIPS (${identityForm.featureChips.length})`}</h3>
                <button type="button" className={styles.primaryBtn} style={{ width: 'auto', padding: '0.4rem 0.8rem' }} onClick={addFeatureChip}>
                  <Plus size={14} />
                  <span>ADD FEATURE CHIP</span>
                </button>
              </div>

              {identityForm.featureChips.map((chip, idx) => (
                <div key={`chip-edit-${idx}`} className={styles.formGroup} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <input
                    type="text"
                    className={styles.input}
                    value={chip}
                    onChange={(e) => {
                      const newChips = [...identityForm.featureChips];
                      newChips[idx] = e.target.value;
                      setIdentityForm({ ...identityForm, featureChips: newChips });
                    }}
                    required
                  />
                  <button type="button" className={styles.dangerBtn} style={{ padding: '0.6rem' }} onClick={() => deleteFeatureChip(idx)}>
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}

              {/* Section 3: Impact Stat Badges */}
              <div style={{ marginTop: '2.5rem', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ color: 'var(--accent-cyan)', margin: 0 }}>{`// IMPACT STAT BADGES (${identityForm.statBadges.length})`}</h3>
                <button type="button" className={styles.primaryBtn} style={{ width: 'auto', padding: '0.4rem 0.8rem' }} onClick={addStatBadge}>
                  <Plus size={14} />
                  <span>ADD STAT BADGE</span>
                </button>
              </div>

              {identityForm.statBadges.map((stat, idx) => (
                <div key={stat.id || `stat-edit-${idx}`} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '0.5rem', marginBottom: '1rem', alignItems: 'center' }}>
                  <div className={styles.formGroup} style={{ margin: 0 }}>
                    <label className={styles.label}>STAT VALUE</label>
                    <input
                      type="text"
                      className={styles.input}
                      value={stat.value}
                      onChange={(e) => {
                        const newStats = [...identityForm.statBadges];
                        newStats[idx].value = e.target.value;
                        setIdentityForm({ ...identityForm, statBadges: newStats });
                      }}
                      required
                    />
                  </div>
                  <div className={styles.formGroup} style={{ margin: 0 }}>
                    <label className={styles.label}>STAT LABEL</label>
                    <input
                      type="text"
                      className={styles.input}
                      value={stat.label}
                      onChange={(e) => {
                        const newStats = [...identityForm.statBadges];
                        newStats[idx].label = e.target.value;
                        setIdentityForm({ ...identityForm, statBadges: newStats });
                      }}
                      required
                    />
                  </div>
                  <button type="button" className={styles.dangerBtn} style={{ padding: '0.7rem', marginTop: '1.2rem' }} onClick={() => deleteStatBadge(stat.id)}>
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}

              <button type="submit" className={styles.primaryBtn} style={{ marginTop: '2rem' }}>
                <Save size={16} />
                <span>SAVE PERSONAL INFO & BADGES</span>
              </button>
            </form>
          </div>
        )}

        {/* TAB 2: PROJECTS MANAGER */}
        {activeTab === 'projects' && (
          <div className={styles.contentCard}>
            <div className={styles.cardSectionHeader}>
              <h2 className={styles.sectionTitle}>Projects Manager</h2>
              <button type="button" className={styles.primaryBtn} style={{ width: 'auto' }} onClick={openNewProjectForm}>
                <Plus size={16} />
                <span>ADD NEW PROJECT</span>
              </button>
            </div>

            {/* Project Edit/Add Modal Form */}
            {editingProjectId !== null && (
              <div className={styles.modalForm}>
                <h3 className={styles.modalTitle}>
                  {editingProjectId === 'new' ? 'Create New Project Card' : 'Edit Project Card'}
                </h3>
                <form onSubmit={handleSaveProject}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>PROJECT TITLE</label>
                    <input
                      type="text"
                      className={styles.input}
                      value={projectForm.title}
                      onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>SUBTITLE / ARCHITECTURE CATEGORY</label>
                    <input
                      type="text"
                      className={styles.input}
                      value={projectForm.subtitle}
                      onChange={(e) => setProjectForm({ ...projectForm, subtitle: e.target.value })}
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>DESCRIPTION</label>
                    <textarea
                      className={styles.textarea}
                      value={projectForm.description}
                      onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                      rows={3}
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>TECH STACK (Comma-Separated)</label>
                    <input
                      type="text"
                      className={styles.input}
                      value={projectForm.techStack}
                      onChange={(e) => setProjectForm({ ...projectForm, techStack: e.target.value })}
                      placeholder="e.g. Python, Flask, SQLite, Bootstrap"
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>GITHUB REPOSITORY URL</label>
                    <input
                      type="url"
                      className={styles.input}
                      value={projectForm.githubUrl}
                      onChange={(e) => setProjectForm({ ...projectForm, githubUrl: e.target.value })}
                    />
                  </div>

                  <div className={styles.buttonRow}>
                    <button type="submit" className={styles.primaryBtn}>
                      <Save size={16} />
                      <span>{editingProjectId === 'new' ? 'CREATE PROJECT' : 'UPDATE PROJECT'}</span>
                    </button>
                    <button type="button" className={styles.secondaryBtn} onClick={() => setEditingProjectId(null)}>
                      CANCEL
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* List of existing projects */}
            <div className={styles.itemsGrid}>
              {portfolioData.projects.map((project, idx) => (
                <div key={project.id} className={styles.itemBox}>
                  <div>
                    <h3 className={styles.itemTitle}>{project.title}</h3>
                    <p className={styles.itemSubtitle}>{project.subtitle}</p>
                  </div>

                  <div className={styles.itemActions}>
                    <button
                      type="button"
                      className={styles.secondaryBtn}
                      disabled={idx === 0}
                      onClick={() => {
                        moveProject(idx, 'up');
                        triggerStatus('Project moved up!');
                      }}
                      title="Move Up"
                    >
                      <ArrowUp size={14} />
                    </button>
                    <button
                      type="button"
                      className={styles.secondaryBtn}
                      disabled={idx === portfolioData.projects.length - 1}
                      onClick={() => {
                        moveProject(idx, 'down');
                        triggerStatus('Project moved down!');
                      }}
                      title="Move Down"
                    >
                      <ArrowDown size={14} />
                    </button>
                    <button type="button" className={styles.secondaryBtn} onClick={() => openEditProjectForm(project)}>
                      <Edit2 size={14} />
                      <span>Edit</span>
                    </button>
                    <button
                      type="button"
                      className={styles.dangerBtn}
                      onClick={() => {
                        if (confirm(`Delete project "${project.title}"?`)) {
                          deleteProject(project.id);
                          triggerStatus('Project deleted.');
                        }
                      }}
                    >
                      <Trash2 size={14} />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: EXPERIENCE MANAGER */}
        {activeTab === 'experience' && (
          <div className={styles.contentCard}>
            <div className={styles.cardSectionHeader}>
              <h2 className={styles.sectionTitle}>Experience & Leadership Manager</h2>
              <button type="button" className={styles.primaryBtn} style={{ width: 'auto' }} onClick={openNewExpForm}>
                <Plus size={16} />
                <span>ADD EXPERIENCE</span>
              </button>
            </div>

            {/* Experience Form */}
            {editingExpId !== null && (
              <div className={styles.modalForm}>
                <h3 className={styles.modalTitle}>
                  {editingExpId === 'new' ? 'Create Experience Landmark' : 'Edit Experience Landmark'}
                </h3>
                <form onSubmit={handleSaveExp}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>ROLE / POSITION TITLE</label>
                    <input
                      type="text"
                      className={styles.input}
                      value={expForm.role}
                      onChange={(e) => setExpForm({ ...expForm, role: e.target.value })}
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>ORGANIZATION / COMPANY</label>
                    <input
                      type="text"
                      className={styles.input}
                      value={expForm.organization}
                      onChange={(e) => setExpForm({ ...expForm, organization: e.target.value })}
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>PERIOD / TIMELINE</label>
                    <input
                      type="text"
                      className={styles.input}
                      value={expForm.period}
                      onChange={(e) => setExpForm({ ...expForm, period: e.target.value })}
                      placeholder="e.g. 2024 — PRESENT"
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>LOCATION (Optional)</label>
                    <input
                      type="text"
                      className={styles.input}
                      value={expForm.location}
                      onChange={(e) => setExpForm({ ...expForm, location: e.target.value })}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>SUMMARY</label>
                    <textarea
                      className={styles.textarea}
                      value={expForm.summary}
                      onChange={(e) => setExpForm({ ...expForm, summary: e.target.value })}
                      rows={2}
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>HIGHLIGHT BULLETS (One per line)</label>
                    <textarea
                      className={styles.textarea}
                      value={expForm.highlights}
                      onChange={(e) => setExpForm({ ...expForm, highlights: e.target.value })}
                      rows={4}
                      placeholder="Bullet 1&#10;Bullet 2"
                      required
                    />
                  </div>

                  <div className={styles.buttonRow}>
                    <button type="submit" className={styles.primaryBtn}>
                      <Save size={16} />
                      <span>{editingExpId === 'new' ? 'SAVE EXPERIENCE' : 'UPDATE EXPERIENCE'}</span>
                    </button>
                    <button type="button" className={styles.secondaryBtn} onClick={() => setEditingExpId(null)}>
                      CANCEL
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* List of existing experiences */}
            <div className={styles.itemsGrid}>
              {portfolioData.experience.map((exp, idx) => (
                <div key={exp.id} className={styles.itemBox}>
                  <div>
                    <h3 className={styles.itemTitle}>{exp.role}</h3>
                    <p className={styles.itemSubtitle}>@ {exp.organization} ({exp.period})</p>
                  </div>

                  <div className={styles.itemActions}>
                    <button
                      type="button"
                      className={styles.secondaryBtn}
                      disabled={idx === 0}
                      onClick={() => {
                        moveExperience(idx, 'up');
                        triggerStatus('Experience moved up!');
                      }}
                      title="Move Up"
                    >
                      <ArrowUp size={14} />
                    </button>
                    <button
                      type="button"
                      className={styles.secondaryBtn}
                      disabled={idx === portfolioData.experience.length - 1}
                      onClick={() => {
                        moveExperience(idx, 'down');
                        triggerStatus('Experience moved down!');
                      }}
                      title="Move Down"
                    >
                      <ArrowDown size={14} />
                    </button>
                    <button type="button" className={styles.secondaryBtn} onClick={() => openEditExpForm(exp)}>
                      <Edit2 size={14} />
                      <span>Edit</span>
                    </button>
                    <button
                      type="button"
                      className={styles.dangerBtn}
                      onClick={() => {
                        if (confirm(`Delete experience "${exp.role}"?`)) {
                          deleteExperience(exp.id);
                          triggerStatus('Experience record deleted.');
                        }
                      }}
                    >
                      <Trash2 size={14} />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: SKILLS MATRIX */}
        {activeTab === 'skills' && (
          <div className={styles.contentCard}>
            <div className={styles.cardSectionHeader}>
              <h2 className={styles.sectionTitle}>Skills Constellation Manager</h2>
              <button type="button" className={styles.primaryBtn} style={{ width: 'auto' }} onClick={openNewSkillForm}>
                <Plus size={16} />
                <span>ADD SKILL NODE</span>
              </button>
            </div>

            {/* Skill Form */}
            {editingSkillId !== null && (
              <div className={styles.modalForm}>
                <h3 className={styles.modalTitle}>
                  {editingSkillId === 'new' ? 'Create Skill Node' : 'Edit Skill Node'}
                </h3>
                <form onSubmit={handleSaveSkill}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>SKILL NAME</label>
                    <input
                      type="text"
                      className={styles.input}
                      value={skillForm.name}
                      onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>CUSTOM SKILL CATEGORY (Write any category name)</label>
                    <input
                      type="text"
                      className={styles.input}
                      value={skillForm.category}
                      onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value })}
                      placeholder="e.g. AI & ML, Cloud Infrastructure, Framework..."
                      required
                    />
                    {/* Quick Category Suggestion Chips */}
                    <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                      <span style={{ fontSize: '0.75rem', color: '#888', alignSelf: 'center' }}>Suggestions:</span>
                      {SUGGESTED_SKILL_CATEGORIES.map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          className={styles.secondaryBtn}
                          style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem' }}
                          onClick={() => setSkillForm({ ...skillForm, category: cat })}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>PROFICIENCY LEVEL (1 to 5)</label>
                    <select
                      className={styles.select}
                      value={skillForm.level}
                      onChange={(e) => setSkillForm({ ...skillForm, level: Number(e.target.value) as SkillNode['level'] })}
                    >
                      <option value={1}>Level 1</option>
                      <option value={2}>Level 2</option>
                      <option value={3}>Level 3</option>
                      <option value={4}>Level 4</option>
                      <option value={5}>Level 5</option>
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>DESCRIPTION</label>
                    <textarea
                      className={styles.textarea}
                      value={skillForm.description}
                      onChange={(e) => setSkillForm({ ...skillForm, description: e.target.value })}
                      rows={2}
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>COLOR HEX CODE</label>
                    <input
                      type="text"
                      className={styles.input}
                      value={skillForm.color}
                      onChange={(e) => setSkillForm({ ...skillForm, color: e.target.value })}
                      placeholder="#00f0ff"
                      required
                    />
                  </div>

                  <div className={styles.buttonRow}>
                    <button type="submit" className={styles.primaryBtn}>
                      <Save size={16} />
                      <span>{editingSkillId === 'new' ? 'SAVE SKILL' : 'UPDATE SKILL'}</span>
                    </button>
                    <button type="button" className={styles.secondaryBtn} onClick={() => setEditingSkillId(null)}>
                      CANCEL
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* List of existing skills */}
            <div className={styles.itemsGrid}>
              {portfolioData.skills.map((skill) => (
                <div key={skill.id} className={styles.itemBox}>
                  <div>
                    <h3 className={styles.itemTitle}>{skill.name}</h3>
                    <p className={styles.itemSubtitle}>
                      Category: {skill.category.toUpperCase()} | Color: {skill.color}
                    </p>
                  </div>

                  <div className={styles.itemActions}>
                    <button type="button" className={styles.secondaryBtn} onClick={() => openEditSkillForm(skill)}>
                      <Edit2 size={14} />
                      <span>Edit</span>
                    </button>
                    <button
                      type="button"
                      className={styles.dangerBtn}
                      onClick={() => {
                        if (confirm(`Delete skill "${skill.name}"?`)) {
                          deleteSkill(skill.id);
                          triggerStatus('Skill node deleted.');
                        }
                      }}
                    >
                      <Trash2 size={14} />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: CONTACT DETAILS */}
        {activeTab === 'contact' && (
          <div className={styles.contentCard}>
            <div className={styles.cardSectionHeader}>
              <h2 className={styles.sectionTitle}>Edit Contact Details</h2>
            </div>

            <form onSubmit={handleSaveContact}>
              <div className={styles.formGroup}>
                <label className={styles.label}>EMAIL ADDRESS</label>
                <input
                  type="email"
                  className={styles.input}
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>GITHUB PROFILE URL</label>
                <input
                  type="url"
                  className={styles.input}
                  value={contactForm.github}
                  onChange={(e) => setContactForm({ ...contactForm, github: e.target.value })}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>LINKEDIN PROFILE URL</label>
                <input
                  type="url"
                  className={styles.input}
                  value={contactForm.linkedin}
                  onChange={(e) => setContactForm({ ...contactForm, linkedin: e.target.value })}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>LOCATION TAG</label>
                <input
                  type="text"
                  className={styles.input}
                  value={contactForm.location}
                  onChange={(e) => setContactForm({ ...contactForm, location: e.target.value })}
                  required
                />
              </div>

              <button type="submit" className={styles.primaryBtn}>
                <Save size={16} />
                <span>SAVE CONTACT INFORMATION</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
