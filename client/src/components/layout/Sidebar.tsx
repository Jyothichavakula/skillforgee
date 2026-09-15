import {
  LayoutDashboard,
  Briefcase,
  FileText,
  Code2,
  Map,
  Bot,
  FileSearch,
  BarChart3,
  Trophy,
  MessageSquare,
  User,
  LogOut,
  X,
} from "lucide-react";

import { NavLink } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigationItems = [
  {
    name: "Dashboard",
    path: "/student/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Jobs",
    path: "/student/jobs",
    icon: Briefcase,
  },
  {
    name: "Applications",
    path: "/student/applications",
    icon: FileText,
  },
  {
    name: "Coding Practice",
    path: "/student/coding",
    icon: Code2,
  },
  {
    name: "Roadmap",
    path: "/student/roadmap",
    icon: Map,
  },
  {
    name: "AI Career Coach",
    path: "/student/career-coach",
    icon: Bot,
  },
  {
    name: "Resume Analyzer",
    path: "/student/resume",
    icon: FileSearch,
  },
  {
    name: "Analytics",
    path: "/student/analytics",
    icon: BarChart3,
  },
  {
    name: "Gamification",
    path: "/student/gamification",
    icon: Trophy,
  },
  {
    name: "Community",
    path: "/student/community",
    icon: MessageSquare,
  },
];

function Sidebar({
  isOpen,
  onClose,
}: SidebarProps) {
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 z-50 flex h-screen w-72
          flex-col border-r border-slate-800
          bg-slate-950 text-white
          transition-transform duration-300
          lg:translate-x-0
          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        {/* Logo */}
        <div className="flex h-20 items-center justify-between border-b border-slate-800 px-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Skill<span className="text-indigo-400">Forge</span>
            </h1>

            <p className="mt-1 text-xs text-slate-500">
              Career & Placement Platform
            </p>
          </div>

          {/* Mobile Close */}
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-6">
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
            Workspace
          </p>

          <div className="space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `
                    flex items-center gap-3 rounded-xl px-3 py-3
                    text-sm font-medium transition
                    ${
                      isActive
                        ? "bg-indigo-500/15 text-indigo-400"
                        : "text-slate-400 hover:bg-slate-900 hover:text-white"
                    }
                    `
                  }
                >
                  <Icon size={19} />

                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </div>
        </nav>

        {/* Bottom Section */}
        <div className="border-t border-slate-800 p-4">
          <NavLink
            to="/student/profile"
            onClick={onClose}
            className={({ isActive }) =>
              `
              flex items-center gap-3 rounded-xl px-3 py-3
              text-sm font-medium transition
              ${
                isActive
                  ? "bg-indigo-500/15 text-indigo-400"
                  : "text-slate-400 hover:bg-slate-900 hover:text-white"
              }
              `
            }
          >
            <User size={19} />

            <span>Profile</span>
          </NavLink>

          <button
            onClick={handleLogout}
            className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-400 transition hover:bg-red-500/10 hover:text-red-400"
          >
            <LogOut size={19} />

            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;