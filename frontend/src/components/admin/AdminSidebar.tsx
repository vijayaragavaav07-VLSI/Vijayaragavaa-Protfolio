import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { supabase } from "../../lib/supabase";
import {
  LayoutDashboard,
  Home,
  User,
  Code,
  Briefcase,
  Cpu,
  Trophy,
  Award,
  GraduationCap,
  Clock,
  Image as ImageIcon,
  Mail,
  MessageSquare,
  FileText,
  Settings,
  LogOut,
  X,
} from "lucide-react";

export const AdminSidebar = ({ onClose }: { onClose?: () => void }) => {
  const { user, signOut } = useAuth();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchUnread = async () => {
      const { count } = await supabase
        .from("contact_messages")
        .select("*", { count: "exact", head: true })
        .eq("is_read", false);
      setUnreadCount(count || 0);
    };
    fetchUnread();

    // Refresh every 60 seconds
    const interval = setInterval(fetchUnread, 60000);
    return () => clearInterval(interval);
  }, []);

  const NAV_ITEMS = [
    { path: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
    { path: "/admin/home", label: "Home", icon: Home },
    { path: "/admin/about", label: "About", icon: User },
    { path: "/admin/skills", label: "Skills", icon: Code },
    { path: "/admin/projects", label: "Projects", icon: Briefcase },
    { path: "/admin/hackathons", label: "Hackathons", icon: Cpu },
    { path: "/admin/achievements", label: "Achievements", icon: Trophy },
    { path: "/admin/certifications", label: "Certifications", icon: Award },
    { path: "/admin/education", label: "Education", icon: GraduationCap },
    { path: "/admin/experience", label: "Experience", icon: Clock },
    { path: "/admin/gallery", label: "Gallery", icon: ImageIcon },
    { path: "/admin/contact", label: "Contact", icon: Mail },
    { path: "/admin/messages", label: "Messages", icon: MessageSquare, badge: unreadCount },
    { path: "/admin/resume", label: "Resume", icon: FileText },
    { path: "/admin/settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="w-64 h-full bg-[#07111f] border-r border-[#1a2b44] flex flex-col">
      {/* Sidebar Header */}
      <div className="p-6 border-b border-[#1a2b44] flex items-center justify-between">
        <div>
          <div className="text-xl font-bold tracking-[0.2em] text-[#00d9ff]">VV</div>
          <div className="text-[10px] font-mono tracking-widest text-[#8ea3bd] mt-1">ADMIN PANEL</div>
        </div>
        {onClose && (
          <button onClick={onClose} className="md:hidden text-[#8ea3bd] hover:text-[#00d9ff]">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-3">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.exact}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center justify-between px-3 py-2.5 rounded text-sm font-mono tracking-wider transition-colors ${
                  isActive
                    ? "bg-[#00d9ff]/10 text-[#00d9ff] border border-[#00d9ff]/30"
                    : "text-[#8ea3bd] hover:bg-[#1a2b44] hover:text-white border border-transparent"
                }`
              }
            >
              <span className="flex items-center">
                <item.icon className="w-4 h-4 mr-3" />
                {item.label}
              </span>
              {"badge" in item && (item.badge ?? 0) > 0 && (
                <span className="bg-[#00d9ff] text-[#030609] text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                  {item.badge}
                </span>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-[#1a2b44] bg-[#040810]">
        <div className="text-[10px] font-mono text-[#4a5f78] mb-2 truncate" title={user?.email || ""}>
          {user?.email}
        </div>
        <button
          onClick={signOut}
          className="flex items-center w-full px-3 py-2 text-sm font-mono text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded transition-colors"
        >
          <LogOut className="w-4 h-4 mr-3" />
          LOGOUT
        </button>
      </div>
    </div>
  );
};