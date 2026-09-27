import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { initialPortfolioData } from './data/portfolioData';
import { usePortfolioData } from './hooks/usePortfolioData';
import type {
  Hackathon,
  GalleryItem,
  SkillCategory,
  Project,
  Achievement,
  Certification,
  Education as EducationType,
  Experience as ExperienceType,
} from './types/portfolio';

// Components
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Hackathons } from './components/Hackathons';
import { Achievements } from './components/Achievements';
import { Certifications } from './components/Certifications';
import { Education } from './components/Education';
import { Experience } from './components/Experience';
import { Gallery } from './components/Gallery';
import { Contact } from './components/Contact';
import { Resume } from './components/Resume';
import { Footer } from './components/Footer';

// Modals
import { ImageLightbox } from './components/ImageLightbox';
import { DocumentViewer } from './components/DocumentViewer';

export function App() {
  const navigate = useNavigate();
  // Static fallback data (Phase 1 / Stitch data)
  const staticData = initialPortfolioData;

  // Supabase live data (Phase 2). Falls back to static when not configured or empty.
  const db = usePortfolioData();

  // ── Effective data helpers (Supabase > static fallback) ─────────────────────
  // Home
  const effectiveHomeName1 = staticData.home.name1;
  const effectiveHomeName2 = staticData.home.name2;
  const effectiveHome = db.home.data ? {
    ...staticData.home,
    badge: db.home.data.badge_text || staticData.home.badge,
    desc: db.home.data.hero_description || staticData.home.desc,
    role: db.home.data.hero_title || staticData.home.role,
    sub: db.home.data.hero_highlight || staticData.home.sub,
    tags: (db.home.data as any).tags || staticData.home.tags,
    photo: db.home.data.profile_image_url || staticData.home.photo,
    cap: (db.home.data as any).status_cap || staticData.home.cap,
    eda: (db.home.data as any).eda_tools || staticData.home.eda,
    die: (db.home.data as any).die_specimen_url || staticData.home.die,
  } : staticData.home;

  // About
  const effectiveAbout = db.about.data ? {
    ...staticData.about,
    bio: db.about.data.short_bio || staticData.about.bio,
    inst: db.about.data.institution || staticData.about.inst,
    spec: db.about.data.specialization || staticData.about.spec,
    focus: db.about.data.primary_focus || staticData.about.focus,
    hw: db.about.data.target_hardware || staticData.about.hw,
    ptitle: (db.about.data as any).philosophy_title || staticData.about.ptitle,
    pr: ((db.about.data as any).principle_1_title || (db.about.data as any).principle_2_title || (db.about.data as any).principle_3_title)
      ? [
          `${(db.about.data as any).principle_1_title || ""} | ${(db.about.data as any).principle_1_desc || ""}`,
          `${(db.about.data as any).principle_2_title || ""} | ${(db.about.data as any).principle_2_desc || ""}`,
          `${(db.about.data as any).principle_3_title || ""} | ${(db.about.data as any).principle_3_desc || ""}`,
        ].filter((l) => l.trim() !== "|").join("\n")
      : staticData.about.pr,
    profile_icon_url: (db.about.data as any).profile_icon_url || undefined,
  } : staticData.about;

  // Skills
  const effectiveSkills: SkillCategory[] = db.skills.data.length > 0
    ? (() => {
        const grouped = new Map<string, typeof db.skills.data>();
        db.skills.data.forEach((s) => {
          if (!grouped.has(s.category)) grouped.set(s.category, []);
          grouped.get(s.category)!.push(s);
        });
        return Array.from(grouped.entries()).map(([cat, items]) => ({
          name: cat,
          tag: cat.toUpperCase(),
          desc: items[0]?.description || '',
          items: items.map((i) => `${i.name}${i.technology ? ' | ' + i.technology : ''}`).join('\n'),
          foot: '',
        }));
      })()
    : staticData.skills;

  // Projects
  const effectiveProjects: Project[] = db.projects.data.length > 0
    ? db.projects.data
        .filter((p) => p.published)
        .map((p) => ({
          title: p.title,
          subtitle: p.short_description,
          tags: Array.isArray(p.technologies) ? p.technologies.join(', ') : '',
          desc: p.description,
          role: p.role,
          status: p.status,
          link: p.github_url || p.project_url || undefined,
          img: p.image_url || undefined,
        }))
    : staticData.projects;

  // Hackathons
  const effectiveHackathons: Hackathon[] = db.hackathons.data.length > 0
    ? db.hackathons.data
        .filter((h) => h.published)
        .map((h) => ({
          award: h.award,
          level: h.level,
          title: h.title,
          desc: h.description,
          role: h.role,
          team: h.team_size || '',
          outcome: h.outcome || '',
          img: h.image_url || undefined,
          prototype_label: (h as any).prototype_label || undefined,
          sprint_label: (h as any).sprint_label || undefined,
        }))
    : staticData.hackathons;

  // Achievements
  const effectiveAchievements: Achievement[] = db.achievements.data.length > 0
    ? db.achievements.data
        .filter((a) => a.published)
        .map((a) => ({
          title: a.title,
          org: a.organization,
          date: a.achievement_date || undefined,
          desc: a.description,
          link: a.verification_url || undefined,
          img: a.image_url || undefined,
        }))
    : staticData.achievements;

  // Certifications
  const effectiveCerts: Certification[] = db.certifications.data.length > 0
    ? db.certifications.data
        .filter((c) => c.published)
        .map((c) => ({
          org: c.organization,
          title: c.title,
          desc: c.description,
          year: c.issued_date,
          cid: c.certificate_id || '',
          link: c.verification_url || undefined,
        }))
    : staticData.certs;

  // Education
  const effectiveEducation: EducationType[] = db.education.data.length > 0
    ? db.education.data
        .filter((e) => e.published)
        .map((e) => ({
          inst: e.institution,
          degree: e.degree,
          dept: e.department,
          dur: [e.start_date, e.end_date].filter(Boolean).join(' – ') || '',
          desc: e.description || '',
        }))
    : staticData.education;

  // Experience
  const effectiveExperience: ExperienceType[] = db.experience.data.length > 0
    ? db.experience.data
        .filter((e) => e.published)
        .map((e) => ({
          org: e.organization,
          role: e.position,
          dur: [e.start_date, e.end_date].filter(Boolean).join(' – ') || '',
          desc: e.description,
          tech: Array.isArray(e.technologies) ? e.technologies.join(', ') : '',
        }))
    : staticData.experience;

  // Gallery
  const effectiveGallery: GalleryItem[] = db.gallery.data.length > 0
    ? db.gallery.data
        .filter((g) => g.published)
        .map((g) => ({
          cap: g.caption || g.title,
          cat: g.category || undefined,
          img: g.image_url,
        }))
    : staticData.gallery;

  // Contact
  const effectiveContact = db.contact.data ? {
    ...staticData.contact,
    email: db.contact.data.email || staticData.contact.email,
    linkedin: db.contact.data.linkedin_url || staticData.contact.linkedin,
    github: db.contact.data.github_url || staticData.contact.github,
    youtube: db.contact.data.youtube_url || staticData.contact.youtube,
  } : staticData.contact;

  // Resume
  const effectiveResume = db.resume.data ? {
    ...staticData.resume,
    fname: db.resume.data.file_name || staticData.resume.fname,
    file: db.resume.data.file_url || staticData.resume.file,
  } : staticData.resume;

  // Modal states
  const [lightbox, setLightbox] = useState<{
    isOpen: boolean;
    imageUrl: string;
    caption: string;
    subcaption?: string;
  }>({
    isOpen: false,
    imageUrl: '',
    caption: '',
  });

  const [viewer, setViewer] = useState<{
    isOpen: boolean;
    documentUrl: string;
    filename: string;
  }>({
    isOpen: false,
    documentUrl: '',
    filename: '',
  });

  // Smooth scroll handler
  const handleNavigate = (sectionId: string) => {
    const targetId = sectionId === 'certs' ? 'certificates' : sectionId;
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Hackathon examine architecture handler
  const handleExamineArchitecture = (hackathon: Hackathon) => {
    if (hackathon.img) {
      setLightbox({
        isOpen: true,
        imageUrl: hackathon.img,
        caption: hackathon.title,
        subcaption: `${hackathon.award} • LIVE PROTOTYPE BENCH (36-HR SPRINT)`,
      });
    }
  };

  // Gallery image preview handler
  const handleOpenGallery = (item: GalleryItem) => {
    setLightbox({
      isOpen: true,
      imageUrl: item.img,
      caption: item.cap,
      subcaption: item.cat ? `Category: ${item.cat}` : undefined,
    });
  };

  // Resume document viewer handler
  const handleOpenViewer = () => {
    setViewer({
      isOpen: true,
      documentUrl: effectiveResume.file || '/resume.pdf',
      filename: effectiveResume.fname,
    });
  };

  return (
    <div className="min-h-screen bg-[#030609] text-[#e8f1fb] flex flex-col selection:bg-[#00d9ff]/30 selection:text-white">
      {/* Fixed Sticky Header */}
      <Header
        name1={effectiveHomeName1}
        name2={effectiveHomeName2}
        onNavigate={handleNavigate}
      />

      {/* Supabase connection status banner (dev-mode only) */}
      {!db.isSupabaseConfigured && import.meta.env.DEV && (
        <div className="fixed bottom-4 right-4 z-50 bg-[#07111f] border border-[#fbbf24] rounded px-4 py-2 text-xs font-mono text-[#fbbf24] max-w-xs shadow-lg">
          ⚠️ Supabase not configured — using static data.
          <br />
          <span className="text-[#8ea3bd]">Copy .env.example → .env and add credentials.</span>
        </div>
      )}

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. HOME SECTION */}
        <Hero
          data={effectiveHome}
          onNavigate={handleNavigate}
        />

        {/* 2. ABOUT SECTION */}
        <About data={effectiveAbout} />

        {/* 3. SKILLS SECTION */}
        <Skills skills={effectiveSkills} />

        {/* 4. PROJECTS SECTION */}
        <Projects projects={effectiveProjects} />

        {/* 5. HACKATHONS SECTION */}
        <Hackathons
          hackathons={effectiveHackathons}
          onExamineArchitecture={handleExamineArchitecture}
        />

        {/* 6. ACHIEVEMENTS SECTION */}
        <Achievements achievements={effectiveAchievements} />

        {/* 7. CERTIFICATIONS SECTION */}
        <Certifications certs={effectiveCerts} />

        {/* 8. EDUCATION SECTION */}
        <Education education={effectiveEducation} />

        {/* 9. EXPERIENCE SECTION */}
        <Experience experience={effectiveExperience} />

        {/* 10. GALLERY SECTION */}
        <Gallery
          gallery={effectiveGallery}
          onOpenLightbox={handleOpenGallery}
        />

        {/* 11. CONTACT SECTION */}
        <Contact data={effectiveContact} />

        {/* 12. RESUME SECTION */}
        <Resume
          data={effectiveResume}
          onViewViewer={handleOpenViewer}
        />
      </main>

      {/* FOOTER & DISCREET ADMIN LOGIN */}
      <Footer
        name1={staticData.home.name1}
        name2={staticData.home.name2}
        onAdminClick={() => navigate('/admin/login')}
      />

      {/* Lightbox Modal */}
      <ImageLightbox
        isOpen={lightbox.isOpen}
        onClose={() => setLightbox((prev) => ({ ...prev, isOpen: false }))}
        imageUrl={lightbox.imageUrl}
        caption={lightbox.caption}
        subcaption={lightbox.subcaption}
      />

      {/* Document Viewer Modal */}
      <DocumentViewer
        isOpen={viewer.isOpen}
        onClose={() => setViewer((prev) => ({ ...prev, isOpen: false }))}
        documentUrl={viewer.documentUrl}
        filename={viewer.filename}
      />
    </div>
  );
}

export default App;
