export interface HomeData {
  name1: string;
  name2: string;
  badge: string;
  sub: string;
  role: string;
  desc: string;
  tags: string;
  eda: string;
  photo?: string;
  die?: string;
  cap: string;
}

export interface AboutData {
  name: string;
  role: string;
  inst: string;
  spec: string;
  focus: string;
  hw: string;
  status: string;
  disc: string;
  ptitle: string;
  bio: string;
  pr: string;
  profile_icon_url?: string;
}

export interface SkillCategory {
  name: string;
  tag: string;
  desc: string;
  items: string; // "Skill | detail\nSkill | detail"
  foot: string;
  hide?: boolean;
  prototype_label?: string;
  sprint_label?: string;
}

export interface Project {
  title: string;
  subtitle: string;
  tags: string;
  desc: string;
  role: string;
  status: string;
  link?: string;
  img?: string;
  hide?: boolean;
  prototype_label?: string;
  sprint_label?: string;
}

export interface Hackathon {
  award: string;
  level: string;
  title: string;
  desc: string;
  role: string;
  team: string;
  outcome: string;
  img?: string;
  hide?: boolean;
  prototype_label?: string;
  sprint_label?: string;
}

export interface Achievement {
  title: string;
  org: string;
  date?: string;
  desc: string;
  link?: string;
  img?: string;
  hide?: boolean;
  prototype_label?: string;
  sprint_label?: string;
}

export interface Certification {
  org: string;
  title: string;
  desc: string;
  year: string;
  cid: string;
  link?: string;
  hide?: boolean;
  prototype_label?: string;
  sprint_label?: string;
}

export interface Education {
  inst: string;
  degree: string;
  dept: string;
  dur: string;
  score?: string;
  desc: string;
  hide?: boolean;
  prototype_label?: string;
  sprint_label?: string;
}

export interface Experience {
  org: string;
  role: string;
  dur: string;
  desc: string;
  tech: string;
  hide?: boolean;
  prototype_label?: string;
  sprint_label?: string;
}

export interface GalleryItem {
  cap: string;
  cat?: string;
  img: string;
  hide?: boolean;
  prototype_label?: string;
  sprint_label?: string;
}

export interface ContactData {
  cta1: string;
  cta2: string;
  cdesc: string;
  email: string;
  linkedin: string;
  github: string;
  youtube: string;
}

export interface ResumeData {
  fname: string;
  desc: string;
  file?: string;
}

export interface PortfolioData {
  home: HomeData;
  about: AboutData;
  skills: SkillCategory[];
  projects: Project[];
  hackathons: Hackathon[];
  achievements: Achievement[];
  certs: Certification[];
  education: Education[];
  experience: Experience[];
  gallery: GalleryItem[];
  contact: ContactData;
  resume: ResumeData;
}
