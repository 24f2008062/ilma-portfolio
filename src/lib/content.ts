export interface SkillNode {
  id: string;
  name: string;
  category: string;
  level: 1 | 2 | 3 | 4 | 5;
  description: string;
  position: [number, number, number];
  color: string;
  isFeatured?: boolean;
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  location?: string;
  summary: string;
  highlights: string[];
  position: [number, number, number];
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  position: [number, number, number];
}

export interface ContactInfo {
  email: string;
  phone?: string;
  github?: string;
  linkedin: string;
  location: string;
  portfolioUrl?: string;
}

export interface StatBadgeItem {
  id: string;
  value: string;
  label: string;
}

export interface IdentityData {
  name: string;
  title: string;
  tagline: string;
  summary: string;
  education?: string;
  resumeUrl?: string;
  
  // Dynamic Badges
  featureChips: string[];
  statBadges: StatBadgeItem[];
}

export interface PortfolioData {
  identity: IdentityData;
  skills: SkillNode[];
  experience: ExperienceItem[];
  projects: ProjectItem[];
  contact: ContactInfo;
}

export const PORTFOLIO_DATA: PortfolioData = {
  identity: {
    name: "ILMA SIDDIQUI",
    title: "UI/UX DESIGNER & VISUAL DESIGNER",
    tagline: "CSE // UI/UX DESIGN & CREATIVE LEADERSHIP",
    summary: "Results-driven Computer Science & Engineering professional with hands-on experience in UI/UX design, visual design, team coordination, and event operations. Skilled in building web/social-media design assets, leading cross-functional design teams, and driving client and campus projects under tight deadlines.",
    education: "B.Tech in Computer Science and Engineering | Dr. A.P.J. Abdul Kalam Technical University (2023 – 2027)",
    resumeUrl: "",

    featureChips: [
      "UI/UX & Visual Design",
      "Web & Graphic Design",
      "Creative Team Leadership",
      "Event Planning & Operations"
    ],

    statBadges: [
      { id: "stat-1", value: "4+", label: "Designers Directed (GDG)" },
      { id: "stat-2", value: "50+", label: "Creative Assets Built" },
      { id: "stat-3", value: "2ND", label: "Creative Verse Award" }
    ]
  },
  skills: [
    {
      id: "figma",
      name: "Figma",
      category: "Design Tool",
      level: 5,
      description: "UI/UX design, design systems, wireframing, high-fidelity prototypes, interactive user flows, and design handoff.",
      position: [0, 0, 0],
      color: "#f24e1e",
      isFeatured: true
    },
    {
      id: "canva",
      name: "Canva",
      category: "Design Tool",
      level: 5,
      description: "Rapid visual asset generation, social media creative design, promotional marketing graphics, and presentation decks.",
      position: [-2.2, 1.4, -0.5],
      color: "#00c4cc"
    },
    {
      id: "adobe-xd",
      name: "Adobe XD (Basic)",
      category: "Design Tool",
      level: 3,
      description: "Vector-based user experience design, screen layouts, basic wireframing, and interactive web/mobile prototyping.",
      position: [2.2, 1.2, -0.5],
      color: "#ff61f6"
    },
    {
      id: "ui-ux-design",
      name: "UI/UX Design",
      category: "Design & Creative",
      level: 5,
      description: "Creating intuitive user interfaces, mapping user journey flows, conducting user research, and optimizing digital interactions.",
      position: [-2.0, -1.5, -0.5],
      color: "#00f0ff"
    },
    {
      id: "web-design",
      name: "Web Design",
      category: "Design & Creative",
      level: 4,
      description: "Designing responsive, clean, and visually compelling web page structures for client and internal web applications.",
      position: [2.0, -1.4, -0.5],
      color: "#38bdf8"
    },
    {
      id: "graphic-design",
      name: "Graphic Design",
      category: "Design & Creative",
      level: 5,
      description: "Visual composition, typography, color theory, digital illustrations, posters, banners, and marketing creatives.",
      position: [0, 2.2, -0.8],
      color: "#a855f7"
    },
    {
      id: "branding-identity",
      name: "Branding",
      category: "Design & Creative",
      level: 4,
      description: "Developing end-to-end visual branding guidelines, brand consistency rules, color palettes, and identity kits.",
      position: [-3.2, 0.5, -1.2],
      color: "#ec4899"
    },
    {
      id: "social-creatives",
      name: "Social Media Creatives",
      category: "Design & Creative",
      level: 5,
      description: "Producing 50+ high-engagement social assets including YouTube thumbnails, Instagram cover graphics, and event posters.",
      position: [3.2, 0.4, -1.2],
      color: "#f59e0b"
    },
    {
      id: "c-lang",
      name: "C Programming",
      category: "Programming Language",
      level: 4,
      description: "Algorithmic thinking, data structures, procedural logic, memory models, and core computer science fundamentals.",
      position: [-1.2, -2.4, -1.0],
      color: "#6366f1"
    },
    {
      id: "java-lang",
      name: "Java (Basic)",
      category: "Programming Language",
      level: 3,
      description: "Object-oriented programming concepts, classes, control structures, and engineering problem-solving.",
      position: [1.2, -2.5, -1.0],
      color: "#ef4444"
    },
    {
      id: "team-leadership",
      name: "Team Leadership",
      category: "Professional Skill",
      level: 5,
      description: "Leading GDG design initiatives, directing a 4-designer team, recruiting and onboarding talent via structured interviews.",
      position: [-3.0, -0.8, -1.4],
      color: "#10b981"
    },
    {
      id: "event-planning",
      name: "Event Planning",
      category: "Professional Skill",
      level: 5,
      description: "Yuvaan-certified event management, organizing GDG workshops, coordinating freshers' welcome, and campus-wide events.",
      position: [2.8, 2.0, -1.5],
      color: "#06b6d4"
    },
    {
      id: "budget-management",
      name: "Budget Management",
      category: "Professional Skill",
      level: 4,
      description: "Managing event budgets, financial planning, and resource allocation as Finance Lead for Samanvay Student Club.",
      position: [-2.5, -2.2, -1.2],
      color: "#8b5cf6"
    },
    {
      id: "strategic-comm",
      name: "Strategic Communication",
      category: "Professional Skill",
      level: 5,
      description: "Public speaking and presenting to 50+ participants, cross-functional team coordination, and student mentoring.",
      position: [1.0, 2.6, -1.2],
      color: "#14b8a6"
    },
    {
      id: "english-lang",
      name: "English",
      category: "Language",
      level: 5,
      description: "Fluent professional communication, presentation delivery, documentation, and client coordination.",
      position: [-1.2, 2.6, -1.2],
      color: "#f8fafc"
    }
  ],
  experience: [
    {
      id: "aranious",
      role: "Visual Design & UI/UX Intern",
      organization: "Aranious",
      period: "JUL 2026 — PRESENT",
      location: "Remote",
      summary: "Designing intuitive UI/UX for client and internal web applications while developing end-to-end visual assets.",
      highlights: [
        "Design intuitive UI/UX for client and internal websites and web applications.",
        "Develop end-to-end visual assets, including branding guidelines, YouTube thumbnails, and Instagram cover graphics.",
        "Collaborate remotely with cross-functional teams to deliver design deliverables on schedule."
      ],
      position: [-2.0, 0, -18]
    },
    {
      id: "gdg-lead",
      role: "UI/UX Lead",
      organization: "Google Developer Group (GDG)",
      period: "2025 — PRESENT",
      location: "Campus Chapter",
      summary: "Leading UI/UX initiatives for the GDG chapter, directing 4 student designers, and driving creative campus outreach.",
      highlights: [
        "Lead UI/UX design initiatives for the college GDG chapter, directing a team of 4 student designers.",
        "Recruited and onboarded top design talent through structured interviewing processes.",
        "Spearheaded and presented at 'She Designs Her Destiny: The Art of Becoming She,' engaging over 50 participants.",
        "Designed participant journey flows and created 50+ promotional marketing assets for campus outreach."
      ],
      position: [2.0, 0, -18]
    },
    {
      id: "samanvay",
      role: "Finance Lead",
      organization: "Samanvay Student Club",
      period: "2025 — PRESENT",
      location: "Campus Chapter",
      summary: "Managing event budgets, financial planning, and resource allocation across major student organization programs.",
      highlights: [
        "Manage event budgets, financial planning, and resource allocation across major student organization events.",
        "Partner with organizing teams to oversee financial operations for freshers' welcome and flagship campus programs."
      ],
      position: [-2.0, 0, -26]
    },
    {
      id: "academic-tutor",
      role: "Academic Tutor",
      organization: "Self-Employed",
      period: "2021 — PRESENT",
      location: "Lucknow, India",
      summary: "Providing concept-focused, personalized instruction in Mathematics and Science for students in Grades 6–10.",
      highlights: [
        "Provide concept-focused, personalized instruction in Mathematics and Science for students in Grades 6–10.",
        "Foster student confidence and maintain transparent progress communication with parents and learners."
      ],
      position: [2.0, 0, -26]
    }
  ],
  projects: [
    {
      id: "aranious-visual-design",
      title: "Aranious UI/UX & Brand Design System",
      subtitle: "Web App UI/UX & Visual Asset Suite",
      description: "Designed intuitive UI/UX for client and internal web applications, created comprehensive visual branding guidelines, and developed YouTube thumbnails and Instagram cover graphics.",
      techStack: ["Figma", "Canva", "UI/UX Design", "Branding Guidelines", "Web Design"],
      position: [-2.0, 0, -38]
    },
    {
      id: "she-designs-her-destiny",
      title: "She Designs Her Destiny Campaign",
      subtitle: "Journey Flows & 50+ Marketing Assets",
      description: "Spearheaded and presented at 'She Designs Her Destiny: The Art of Becoming She,' engaging 50+ attendees; mapped participant journey flows and produced 50+ promotional marketing assets for campus outreach.",
      techStack: ["Figma", "Journey Flows", "Graphic Design", "GDG Outreach", "Presentation"],
      position: [2.0, 0, -38]
    },
    {
      id: "creative-verse",
      title: "Creative Verse Concept",
      subtitle: "2nd Place Winner — Idea Competition",
      description: "Awarded 2nd Place in the Creative Verse Idea Competition for developing an innovative design and conceptual framework combining design thinking and strategic ideation.",
      techStack: ["Design Thinking", "Creative Ideation", "Presentation", "Strategic Pitch"],
      position: [-2.0, 0, -44]
    },
    {
      id: "samanvay-yuvaan-ops",
      title: "Yuvaan Event Management & Operations",
      subtitle: "Certified Campus Event Operations & Finance",
      description: "Awarded Event Management Certificate by Yuvaan for successfully organizing flagship campus programs, managing freshers' activities, and overseeing financial planning and budget execution.",
      techStack: ["Event Management", "Budget Allocation", "Operations", "Team Coordination"],
      position: [2.0, 0, -44]
    }
  ],
  contact: {
    email: "siddiquiilma679@gmail.com",
    phone: "+91 9580303121",
    linkedin: "https://www.linkedin.com/in/ilma-siddiqui",
    location: "Lucknow, Uttar Pradesh, India"
  }
};
