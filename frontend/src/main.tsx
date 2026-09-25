import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './context/AuthContext'
import { AdminLogin } from './pages/admin/AdminLogin'
import { AdminLayout } from './components/admin/AdminLayout'
import { AdminDashboard } from './pages/admin/AdminDashboard'
import { ProtectedAdminRoute } from './components/admin/ProtectedAdminRoute'

import { ProjectsManager } from './pages/admin/ProjectsManager'
import { SkillsManager } from './pages/admin/SkillsManager'
import { HackathonsManager } from './pages/admin/HackathonsManager'
import { AchievementsManager } from './pages/admin/AchievementsManager'
import { CertificationsManager } from './pages/admin/CertificationsManager'
import { EducationManager } from './pages/admin/EducationManager'
import { ExperienceManager } from './pages/admin/ExperienceManager'
import { GalleryManager } from './pages/admin/GalleryManager'
import { HomeManager } from './pages/admin/HomeManager'
import { AboutManager } from './pages/admin/AboutManager'
import { ContactManager } from './pages/admin/ContactManager'
import { ResumeManager } from './pages/admin/ResumeManager'
import { SettingsManager } from './pages/admin/SettingsManager'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },
  {
    path: "/admin",
    element: (
      <ProtectedAdminRoute>
        <AdminLayout />
      </ProtectedAdminRoute>
    ),
    children: [
      {
        index: true,
        element: <AdminDashboard />,
      },
      { path: "home", element: <HomeManager /> },
      { path: "about", element: <AboutManager /> },
      { path: "skills", element: <SkillsManager /> },
      { path: "projects", element: <ProjectsManager /> },
      { path: "hackathons", element: <HackathonsManager /> },
      { path: "achievements", element: <AchievementsManager /> },
      { path: "certifications", element: <CertificationsManager /> },
      { path: "education", element: <EducationManager /> },
      { path: "experience", element: <ExperienceManager /> },
      { path: "gallery", element: <GalleryManager /> },
      { path: "contact", element: <ContactManager /> },
      { path: "resume", element: <ResumeManager /> },
      { path: "settings", element: <SettingsManager /> },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
