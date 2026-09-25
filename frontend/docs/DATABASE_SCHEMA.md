# Database Schema Reference
**Portfolio: VIJAYARAGAVAA V — RTL / VLSI Engineer**

All tables live in the Supabase `public` schema.
Every table has: `id` (UUID PK), `created_at` (timestamptz), `updated_at` (auto-updated timestamptz).

---

## Table Overview

| Table | Purpose | Visibility Filter |
|---|---|---|
| `profiles` | Portfolio owner's identity | Public read (no filter) |
| `site_settings` | SEO, branding, global links | Public read (no filter) |
| `home_content` | Hero section data | `visible = true` |
| `about_content` | About section bio and philosophy | `visible = true` |
| `skills` | Skill categories and items | `visible = true` |
| `projects` | Technical project showcase | `published = true` |
| `hackathons` | Hackathon entries and awards | `published = true` |
| `achievements` | Honours and awards | `published = true` |
| `certifications` | Industry credentials | `published = true` |
| `education` | Academic history | `published = true` |
| `experience` | Work / research experience | `published = true` |
| `gallery` | Lab photos and hardware images | `published = true` |
| `contact_settings` | Contact details | `contact_enabled = true` |
| `resume` | Uploaded CV/Resume file | `is_active = true` |

---

## Detailed Table Schemas

### `profiles`
| Column | Type | Notes |
|---|---|---|
| `id` | uuid | Primary key |
| `full_name` | text | Portfolio owner's full name |
| `role` | text | Professional title |
| `institution` | text | College / employer |
| `specialization` | text | Domain (e.g. Electronics – VLSI) |
| `profile_image_url` | text | URL to profile photo (nullable) |
| `bio` | text | Short biography (nullable) |
| `created_at` | timestamptz | |
| `updated_at` | timestamptz | Auto-updated on change |

---

### `site_settings`
| Column | Type | Notes |
|---|---|---|
| `id` | uuid | Primary key |
| `site_title` | text | HTML `<title>` tag value |
| `site_description` | text | Meta description |
| `logo_url` | text | Logo image URL (nullable) |
| `favicon_url` | text | Favicon URL (nullable) |
| `primary_email` | text | Main contact email |
| `linkedin_url` | text | LinkedIn profile URL (nullable) |
| `github_url` | text | GitHub profile URL (nullable) |
| `youtube_url` | text | YouTube channel URL (nullable) |

---

### `home_content`
| Column | Type | Notes |
|---|---|---|
| `id` | uuid | Primary key |
| `badge_text` | text | Hero badge label |
| `hero_title` | text | Main heading |
| `hero_highlight` | text | Highlighted part of heading |
| `hero_description` | text | Hero paragraph |
| `profile_image_url` | text | Profile photo URL (nullable) |
| `email` | text | Contact email shown in hero |
| `linkedin_url` | text | LinkedIn URL (nullable) |
| `github_url` | text | GitHub URL (nullable) |
| `youtube_url` | text | YouTube URL (nullable) |
| `resume_url` | text | Direct resume download URL (nullable) |
| `visible` | boolean | Show/hide control |

---

### `about_content`
| Column | Type | Notes |
|---|---|---|
| `id` | uuid | Primary key |
| `section_title` | text | Section heading text |
| `short_bio` | text | Multi-paragraph biography |
| `engineering_philosophy` | text | Philosophy principles block |
| `institution` | text | College name |
| `specialization` | text | Academic specialization |
| `primary_focus` | text | e.g. "Front-End Digital Design" |
| `target_hardware` | text | e.g. "Xilinx Artix-7 / Spartan FPGA" |
| `visible` | boolean | Show/hide control |

---

### `skills`
| Column | Type | Notes |
|---|---|---|
| `id` | uuid | Primary key |
| `category` | text | Group name (e.g. "Digital & RTL Design") |
| `name` | text | Individual skill name |
| `description` | text | Brief description |
| `technology` | text | Full display string with detail (nullable) |
| `sort_order` | integer | Display order within category |
| `visible` | boolean | Show/hide control |

---

### `projects`
| Column | Type | Notes |
|---|---|---|
| `id` | uuid | Primary key |
| `title` | text | Project name |
| `short_description` | text | One-line subtitle |
| `description` | text | Full description |
| `image_url` | text | Cover image URL (nullable) |
| `technologies` | text[] | Array of tech tags |
| `role` | text | e.g. "RTL Design Lead" |
| `status` | text | "Completed" / "In Development" / etc. |
| `github_url` | text | Repository link (nullable) |
| `project_url` | text | Live demo link (nullable) |
| `sort_order` | integer | Display order |
| `published` | boolean | Publish/hide control |

---

### `hackathons`
| Column | Type | Notes |
|---|---|---|
| `id` | uuid | Primary key |
| `title` | text | Project/idea name |
| `award` | text | Award received |
| `level` | text | e.g. "NATIONAL LEVEL HACKATHON" |
| `description` | text | Full description |
| `role` | text | Team role |
| `team_size` | text | e.g. "4 Engineers" (nullable) |
| `outcome` | text | e.g. "Gold Trophy & Grant" (nullable) |
| `image_url` | text | Prototype photo URL (nullable) |
| `architecture_url` | text | Architecture diagram URL (nullable) |
| `sort_order` | integer | Display order |
| `published` | boolean | Publish/hide control |

---

### `achievements`
| Column | Type | Notes |
|---|---|---|
| `id` | uuid | Primary key |
| `title` | text | Achievement name |
| `organization` | text | Awarding body |
| `description` | text | Description |
| `achievement_date` | text | Year or date string (nullable) |
| `verification_url` | text | Proof link (nullable) |
| `image_url` | text | Badge or photo URL (nullable) |
| `sort_order` | integer | Display order |
| `published` | boolean | Publish/hide control |

---

### `certifications`
| Column | Type | Notes |
|---|---|---|
| `id` | uuid | Primary key |
| `organization` | text | Issuing body (e.g. "IEEE / VLSI ACADEMY") |
| `title` | text | Certification name |
| `certificate_id` | text | Credential ID (nullable) |
| `description` | text | Course / scope description |
| `issued_date` | text | Year or date string |
| `verification_url` | text | Verification link (nullable) |
| `image_url` | text | Certificate image URL (nullable) |
| `sort_order` | integer | Display order |
| `published` | boolean | Publish/hide control |

---

### `education`
| Column | Type | Notes |
|---|---|---|
| `id` | uuid | Primary key |
| `institution` | text | College / university name |
| `degree` | text | Degree name |
| `department` | text | Department name |
| `specialization` | text | e.g. "VLSI" (nullable) |
| `start_date` | text | e.g. "2021" (nullable) |
| `end_date` | text | e.g. "Final Year" (nullable) |
| `description` | text | Coursework / CGPA / notes (nullable) |
| `sort_order` | integer | Display order |
| `published` | boolean | Publish/hide control |

---

### `experience`
| Column | Type | Notes |
|---|---|---|
| `id` | uuid | Primary key |
| `organization` | text | Employer / lab name |
| `position` | text | Job / role title |
| `description` | text | Responsibilities |
| `start_date` | text | e.g. "2023" (nullable) |
| `end_date` | text | e.g. "Present" (nullable) |
| `technologies` | text[] | Tools and technologies used |
| `sort_order` | integer | Display order |
| `published` | boolean | Publish/hide control |

---

### `gallery`
| Column | Type | Notes |
|---|---|---|
| `id` | uuid | Primary key |
| `title` | text | Image title |
| `caption` | text | Display caption |
| `image_url` | text | Image URL |
| `category` | text | e.g. "Hackathon", "Lab" (nullable) |
| `sort_order` | integer | Display order |
| `published` | boolean | Publish/hide control |

---

### `contact_settings`
| Column | Type | Notes |
|---|---|---|
| `id` | uuid | Primary key |
| `email` | text | Contact email |
| `linkedin_url` | text | LinkedIn URL (nullable) |
| `github_url` | text | GitHub URL (nullable) |
| `youtube_url` | text | YouTube URL (nullable) |
| `contact_enabled` | boolean | Enable/disable contact section |

---

### `resume`
| Column | Type | Notes |
|---|---|---|
| `id` | uuid | Primary key |
| `file_name` | text | Display filename |
| `file_url` | text | Download URL (Supabase Storage or public path) |
| `file_size` | integer | File size in bytes (nullable) |
| `uploaded_at` | timestamptz | Upload timestamp |
| `is_active` | boolean | Only one active resume shown publicly |

---

## Row Level Security Summary

| Table | Public SELECT | Admin ALL |
|---|---|---|
| `profiles` | ✅ (anon) | ✅ (authenticated) |
| `site_settings` | ✅ (anon) | ✅ (authenticated) |
| `home_content` | ✅ visible=true | ✅ (authenticated) |
| `about_content` | ✅ visible=true | ✅ (authenticated) |
| `skills` | ✅ visible=true | ✅ (authenticated) |
| `projects` | ✅ published=true | ✅ (authenticated) |
| `hackathons` | ✅ published=true | ✅ (authenticated) |
| `achievements` | ✅ published=true | ✅ (authenticated) |
| `certifications` | ✅ published=true | ✅ (authenticated) |
| `education` | ✅ published=true | ✅ (authenticated) |
| `experience` | ✅ published=true | ✅ (authenticated) |
| `gallery` | ✅ published=true | ✅ (authenticated) |
| `contact_settings` | ✅ contact_enabled=true | ✅ (authenticated) |
| `resume` | ✅ is_active=true | ✅ (authenticated) |

> Public users (anon role) can only SELECT. They cannot INSERT, UPDATE, or DELETE.
> Admin (authenticated role) is set up for full CRUD — managed via Supabase Auth in Step 3.
