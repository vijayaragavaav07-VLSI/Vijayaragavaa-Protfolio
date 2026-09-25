import { useState, useEffect, useCallback } from 'react';
import { getHomeContent } from '../services/homeService';
import { getAboutContent } from '../services/aboutService';
import { getSkills } from '../services/skillsService';
import { getProjects } from '../services/projectService';
import { getHackathons } from '../services/hackathonService';
import { getAchievements } from '../services/achievementService';
import { getCertifications } from '../services/certificationService';
import { getEducation } from '../services/educationService';
import { getExperience } from '../services/experienceService';
import { getGallery } from '../services/galleryService';
import { getContactSettings } from '../services/contactService';
import { getActiveResume } from '../services/resumeService';

import type {
  HomeContent,
  AboutContent,
  Skill,
  Project,
  Hackathon,
  Achievement,
  Certification,
  Education,
  Experience,
  GalleryItem,
  ContactSettings,
  Resume,
} from '../types/database';

// ============================================================
// usePortfolioData — Central Supabase data-loading hook
//
// Fetches all portfolio sections in parallel.
// Falls back gracefully if Supabase is not configured or returns
// empty results. Never throws raw errors to the UI.
// ============================================================

export interface PortfolioSectionState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export interface PortfolioListState<T> {
  data: T[];
  loading: boolean;
  error: string | null;
}

export interface UsePortfolioDataReturn {
  home: PortfolioSectionState<HomeContent>;
  about: PortfolioSectionState<AboutContent>;
  skills: PortfolioListState<Skill>;
  projects: PortfolioListState<Project>;
  hackathons: PortfolioListState<Hackathon>;
  achievements: PortfolioListState<Achievement>;
  certifications: PortfolioListState<Certification>;
  education: PortfolioListState<Education>;
  experience: PortfolioListState<Experience>;
  gallery: PortfolioListState<GalleryItem>;
  contact: PortfolioSectionState<ContactSettings>;
  resume: PortfolioSectionState<Resume>;
  isSupabaseConfigured: boolean;
  refetch: () => void;
}

function makeSection<T>(loading = true): PortfolioSectionState<T> {
  return { data: null, loading, error: null };
}

function makeList<T>(loading = true): PortfolioListState<T> {
  return { data: [], loading, error: null };
}

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined;

export function usePortfolioData(): UsePortfolioDataReturn {
  const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_KEY);

  const [home, setHome] = useState<PortfolioSectionState<HomeContent>>(makeSection());
  const [about, setAbout] = useState<PortfolioSectionState<AboutContent>>(makeSection());
  const [skills, setSkills] = useState<PortfolioListState<Skill>>(makeList());
  const [projects, setProjects] = useState<PortfolioListState<Project>>(makeList());
  const [hackathons, setHackathons] = useState<PortfolioListState<Hackathon>>(makeList());
  const [achievements, setAchievements] = useState<PortfolioListState<Achievement>>(makeList());
  const [certifications, setCertifications] = useState<PortfolioListState<Certification>>(makeList());
  const [education, setEducation] = useState<PortfolioListState<Education>>(makeList());
  const [experience, setExperience] = useState<PortfolioListState<Experience>>(makeList());
  const [gallery, setGallery] = useState<PortfolioListState<GalleryItem>>(makeList());
  const [contact, setContact] = useState<PortfolioSectionState<ContactSettings>>(makeSection());
  const [resume, setResume] = useState<PortfolioSectionState<Resume>>(makeSection());

  const fetchAll = useCallback(async () => {
    if (!isSupabaseConfigured) {
      // Mark all as done loading (no data, no error) — frontend falls back to static data
      setHome({ data: null, loading: false, error: null });
      setAbout({ data: null, loading: false, error: null });
      setSkills({ data: [], loading: false, error: null });
      setProjects({ data: [], loading: false, error: null });
      setHackathons({ data: [], loading: false, error: null });
      setAchievements({ data: [], loading: false, error: null });
      setCertifications({ data: [], loading: false, error: null });
      setEducation({ data: [], loading: false, error: null });
      setExperience({ data: [], loading: false, error: null });
      setGallery({ data: [], loading: false, error: null });
      setContact({ data: null, loading: false, error: null });
      setResume({ data: null, loading: false, error: null });
      return;
    }

    // Fetch all sections in parallel
    const [
      homeData,
      aboutData,
      skillsData,
      projectsData,
      hackathonsData,
      achievementsData,
      certificationsData,
      educationData,
      experienceData,
      galleryData,
      contactData,
      resumeData,
    ] = await Promise.allSettled([
      getHomeContent(),
      getAboutContent(),
      getSkills(),
      getProjects(),
      getHackathons(),
      getAchievements(),
      getCertifications(),
      getEducation(),
      getExperience(),
      getGallery(),
      getContactSettings(),
      getActiveResume(),
    ]);

    const resolve = <T>(result: PromiseSettledResult<T | null>): PortfolioSectionState<T> => ({
      data: result.status === 'fulfilled' ? result.value : null,
      loading: false,
      error: result.status === 'rejected' ? 'Unable to load content.' : null,
    });

    const resolveList = <T>(result: PromiseSettledResult<T[]>): PortfolioListState<T> => ({
      data: result.status === 'fulfilled' ? result.value : [],
      loading: false,
      error: result.status === 'rejected' ? 'Unable to load content.' : null,
    });

    setHome(resolve(homeData));
    setAbout(resolve(aboutData));
    setSkills(resolveList(skillsData as PromiseSettledResult<Skill[]>));
    setProjects(resolveList(projectsData as PromiseSettledResult<Project[]>));
    setHackathons(resolveList(hackathonsData as PromiseSettledResult<Hackathon[]>));
    setAchievements(resolveList(achievementsData as PromiseSettledResult<Achievement[]>));
    setCertifications(resolveList(certificationsData as PromiseSettledResult<Certification[]>));
    setEducation(resolveList(educationData as PromiseSettledResult<Education[]>));
    setExperience(resolveList(experienceData as PromiseSettledResult<Experience[]>));
    setGallery(resolveList(galleryData as PromiseSettledResult<GalleryItem[]>));
    setContact(resolve(contactData));
    setResume(resolve(resumeData));
  }, [isSupabaseConfigured]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return {
    home,
    about,
    skills,
    projects,
    hackathons,
    achievements,
    certifications,
    education,
    experience,
    gallery,
    contact,
    resume,
    isSupabaseConfigured,
    refetch: fetchAll,
  };
}
