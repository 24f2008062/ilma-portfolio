import { create } from 'zustand';
import { PORTFOLIO_DATA, PortfolioData, ProjectItem, ExperienceItem, SkillNode, ContactInfo } from './content';

export type ChapterNumber = 1 | 2 | 3 | 4 | 5;

const STORAGE_KEY = 'ilma_portfolio_data_v1';

function getInitialPortfolioData(): PortfolioData {
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.identity && parsed.projects && parsed.experience && parsed.skills) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to load portfolio data from localStorage:', e);
    }
  }
  return PORTFOLIO_DATA;
}

function savePortfolioData(data: PortfolioData) {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      // Async sync to Upstash Redis database
      fetch('/api/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data })
      }).catch((err) => {
        console.warn('Remote sync failed:', err);
      });
    } catch (e) {
      console.warn('Failed to save portfolio data to localStorage:', e);
    }
  }
}

interface SpatialState {
  activeChapter: ChapterNumber;
  scrollProgress: number;
  selectedSkillId: string | null;
  selectedProjectId: string | null;
  reducedMotion: boolean;
  portfolioData: PortfolioData;

  setActiveChapter: (chapter: ChapterNumber) => void;
  setScrollProgress: (progress: number) => void;
  setSelectedSkillId: (skillId: string | null) => void;
  setSelectedProjectId: (projectId: string | null) => void;
  setReducedMotion: (reduced: boolean) => void;

  // Remote Sync Action
  fetchRemotePortfolioData: () => Promise<void>;

  // Admin CMS Actions
  updateIdentity: (identity: PortfolioData['identity']) => void;
  updateContact: (contact: ContactInfo) => void;

  addProject: (project: Omit<ProjectItem, 'id' | 'position'>) => void;
  updateProject: (id: string, project: Partial<ProjectItem>) => void;
  deleteProject: (id: string) => void;
  moveProject: (index: number, direction: 'up' | 'down') => void;

  addExperience: (exp: Omit<ExperienceItem, 'id' | 'position'>) => void;
  updateExperience: (id: string, exp: Partial<ExperienceItem>) => void;
  deleteExperience: (id: string) => void;
  moveExperience: (index: number, direction: 'up' | 'down') => void;

  addSkill: (skill: Omit<SkillNode, 'id' | 'position'>) => void;
  updateSkill: (id: string, skill: Partial<SkillNode>) => void;
  deleteSkill: (id: string) => void;

  resetToDefaults: () => void;
}

export const useSpatialStore = create<SpatialState>((set, get) => ({
  activeChapter: 1,
  scrollProgress: 0,
  selectedSkillId: null,
  selectedProjectId: null,
  reducedMotion: false,
  portfolioData: getInitialPortfolioData(),

  setActiveChapter: (chapter) => set({ activeChapter: chapter }),
  setScrollProgress: (progress) => set({ scrollProgress: progress }),
  setSelectedSkillId: (skillId) => set({ selectedSkillId: skillId }),
  setSelectedProjectId: (projectId) => set({ selectedProjectId: projectId }),
  setReducedMotion: (reduced) => set({ reducedMotion: reduced }),

  fetchRemotePortfolioData: async () => {
    try {
      const res = await fetch('/api/portfolio');
      if (!res.ok) return;
      const json = await res.json();
      if (json.success && json.data) {
        set({ portfolioData: json.data });
        if (typeof window !== 'undefined') {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(json.data));
        }
      }
    } catch (err) {
      console.warn('Failed to fetch remote portfolio data:', err);
    }
  },

  updateIdentity: (identity) => {
    const newData = { ...get().portfolioData, identity };
    savePortfolioData(newData);
    set({ portfolioData: newData });
  },

  updateContact: (contact) => {
    const newData = { ...get().portfolioData, contact };
    savePortfolioData(newData);
    set({ portfolioData: newData });
  },

  addProject: (projectInput) => {
    const newId = `project-${Date.now()}`;
    const newProject: ProjectItem = {
      ...projectInput,
      id: newId,
      position: [0, 0, -38]
    };
    const newData = {
      ...get().portfolioData,
      projects: [newProject, ...get().portfolioData.projects]
    };
    savePortfolioData(newData);
    set({ portfolioData: newData });
  },

  updateProject: (id, updatedFields) => {
    const newData = {
      ...get().portfolioData,
      projects: get().portfolioData.projects.map((p) => (p.id === id ? { ...p, ...updatedFields } : p))
    };
    savePortfolioData(newData);
    set({ portfolioData: newData });
  },

  deleteProject: (id) => {
    const newData = {
      ...get().portfolioData,
      projects: get().portfolioData.projects.filter((p) => p.id !== id)
    };
    savePortfolioData(newData);
    set({ portfolioData: newData });
  },

  moveProject: (index, direction) => {
    const projects = [...get().portfolioData.projects];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= projects.length) return;
    const temp = projects[index];
    projects[index] = projects[targetIndex];
    projects[targetIndex] = temp;
    const newData = { ...get().portfolioData, projects };
    savePortfolioData(newData);
    set({ portfolioData: newData });
  },

  addExperience: (expInput) => {
    const newId = `exp-${Date.now()}`;
    const newExp: ExperienceItem = {
      ...expInput,
      id: newId,
      position: [0, 0, -18]
    };
    const newData = {
      ...get().portfolioData,
      experience: [newExp, ...get().portfolioData.experience]
    };
    savePortfolioData(newData);
    set({ portfolioData: newData });
  },

  updateExperience: (id, updatedFields) => {
    const newData = {
      ...get().portfolioData,
      experience: get().portfolioData.experience.map((e) => (e.id === id ? { ...e, ...updatedFields } : e))
    };
    savePortfolioData(newData);
    set({ portfolioData: newData });
  },

  deleteExperience: (id) => {
    const newData = {
      ...get().portfolioData,
      experience: get().portfolioData.experience.filter((e) => e.id !== id)
    };
    savePortfolioData(newData);
    set({ portfolioData: newData });
  },

  moveExperience: (index, direction) => {
    const experience = [...get().portfolioData.experience];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= experience.length) return;
    const temp = experience[index];
    experience[index] = experience[targetIndex];
    experience[targetIndex] = temp;
    const newData = { ...get().portfolioData, experience };
    savePortfolioData(newData);
    set({ portfolioData: newData });
  },

  addSkill: (skillInput) => {
    const newId = `skill-${Date.now()}`;
    const newSkill: SkillNode = {
      ...skillInput,
      id: newId,
      position: [0, 0, 0]
    };
    const newData = {
      ...get().portfolioData,
      skills: [newSkill, ...get().portfolioData.skills]
    };
    savePortfolioData(newData);
    set({ portfolioData: newData });
  },

  updateSkill: (id, updatedFields) => {
    const newData = {
      ...get().portfolioData,
      skills: get().portfolioData.skills.map((s) => (s.id === id ? { ...s, ...updatedFields } : s))
    };
    savePortfolioData(newData);
    set({ portfolioData: newData });
  },

  deleteSkill: (id) => {
    const newData = {
      ...get().portfolioData,
      skills: get().portfolioData.skills.filter((s) => s.id !== id)
    };
    savePortfolioData(newData);
    set({ portfolioData: newData });
  },

  resetToDefaults: () => {
    savePortfolioData(PORTFOLIO_DATA);
    set({ portfolioData: PORTFOLIO_DATA });
  }
}));
