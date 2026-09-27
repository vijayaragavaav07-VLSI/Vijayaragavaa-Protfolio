import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import {
  Briefcase,
  Cpu,
  Code,
  Trophy,
  Award,
  GraduationCap,
  Clock,
  Image as ImageIcon,
  MessageSquare,
} from "lucide-react";

interface Stats {
  projects: number;
  hackathons: number;
  skills: number;
  achievements: number;
  certifications: number;
  education: number;
  experience: number;
  gallery: number;
  messages: number;
}

export const AdminDashboard = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const tables = [
          "projects", "hackathons", "skills", "achievements",
          "certifications", "education", "experience", "gallery",
        ];

        const counts = await Promise.all(
          tables.map((table) =>
            supabase.from(table).select("*", { count: "exact", head: true })
          )
        );

        // Unread messages count
        const { count: msgCount } = await supabase
          .from("contact_messages")
          .select("*", { count: "exact", head: true })
          .eq("is_read", false);

        const newStats = tables.reduce((acc, table, index) => {
          acc[table as keyof Stats] = counts[index].count || 0;
          return acc;
        }, {} as Stats);

        newStats.messages = msgCount || 0;
        setStats(newStats);
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    { label: "PROJECTS", count: stats?.projects, icon: Briefcase, color: "text-blue-400", link: "/admin/projects" },
    { label: "HACKATHONS", count: stats?.hackathons, icon: Cpu, color: "text-purple-400", link: "/admin/hackathons" },
    { label: "SKILLS", count: stats?.skills, icon: Code, color: "text-green-400", link: "/admin/skills" },
    { label: "ACHIEVEMENTS", count: stats?.achievements, icon: Trophy, color: "text-yellow-400", link: "/admin/achievements" },
    { label: "CERTIFICATIONS", count: stats?.certifications, icon: Award, color: "text-orange-400", link: "/admin/certifications" },
    { label: "EDUCATION", count: stats?.education, icon: GraduationCap, color: "text-indigo-400", link: "/admin/education" },
    { label: "EXPERIENCE", count: stats?.experience, icon: Clock, color: "text-teal-400", link: "/admin/experience" },
    { label: "GALLERY", count: stats?.gallery, icon: ImageIcon, color: "text-pink-400", link: "/admin/gallery" },
    { label: "UNREAD MSG", count: stats?.messages, icon: MessageSquare, color: "text-cyan-400", link: "/admin/messages", highlight: (stats?.messages ?? 0) > 0 },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-widest text-white mb-2">PORTFOLIO CONTROL CENTER</h1>
        <p className="text-[#8ea3bd] font-mono text-sm tracking-wider">Manage your engineering portfolio content</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, idx) => (
          <a
            key={idx}
            href={card.link}
            className={`block bg-[#07111f] border ${(card as {highlight?: boolean}).highlight ? "border-[#00d9ff]/40 shadow-[0_0_15px_rgba(0,217,255,0.15)]" : "border-[#1a2b44]"} hover:border-[#00d9ff]/50 p-6 rounded transition-all hover:shadow-[0_0_15px_rgba(0,217,255,0.1)] group`}
          >
            <div className="flex items-center justify-between mb-4">
              <card.icon className={`w-6 h-6 ${card.color} opacity-80 group-hover:opacity-100 transition-opacity`} />
              <div className="text-2xl font-bold text-white group-hover:text-[#00d9ff] transition-colors">
                {loading ? "-" : card.count}
              </div>
            </div>
            <div className="text-xs font-mono text-[#8ea3bd] tracking-widest uppercase">{card.label}</div>
            <div className="text-[10px] text-[#4a5f78] mt-1">{loading ? "Loading..." : `${card.count} items`}</div>
          </a>
        ))}
      </div>

      <div className="mt-12 bg-[#07111f] border border-[#1a2b44] p-6 rounded">
        <h2 className="text-lg font-bold tracking-widest text-white mb-4">QUICK ACTIONS</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <a href="/admin/projects" className="flex items-center justify-center py-3 px-4 bg-[#1a2b44] hover:bg-[#253959] border border-transparent hover:border-[#00d9ff]/30 text-white text-xs font-mono tracking-wider rounded transition-all">+ Add Project</a>
          <a href="/admin/certifications" className="flex items-center justify-center py-3 px-4 bg-[#1a2b44] hover:bg-[#253959] border border-transparent hover:border-[#00d9ff]/30 text-white text-xs font-mono tracking-wider rounded transition-all">+ Add Certificate</a>
          <a href="/admin/achievements" className="flex items-center justify-center py-3 px-4 bg-[#1a2b44] hover:bg-[#253959] border border-transparent hover:border-[#00d9ff]/30 text-white text-xs font-mono tracking-wider rounded transition-all">+ Add Achievement</a>
          <a href="/admin/messages" className="flex items-center justify-center py-3 px-4 bg-[#1a2b44] hover:bg-[#253959] border border-transparent hover:border-[#00d9ff]/30 text-white text-xs font-mono tracking-wider rounded transition-all">ðŸ“¬ View Messages</a>
        </div>
      </div>
    </div>
  );
};