
import {
  LayoutDashboard,
  Users,
  Building2,
  BriefcaseBusiness,
  Code2,
  UserCircle,
  LogOut,

  X,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import { useAppDispatch } from "../../hooks/redux";
import { clearCredentials } from "../../store/authSlice";


interface AdminSidebarProps {
  onClose?: () => void;
}


function AdminSidebar({
  onClose,
}: AdminSidebarProps) {
  const location = useLocation();
  const dispatch = useAppDispatch();

  const navigation = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: Users,
    },
    {
      name: "Companies",
      path: "/admin/companies",
      icon: Building2,
    },
    {
      name: "Jobs",
      path: "/admin/jobs",
      icon: BriefcaseBusiness,
    },
    {
      name: "Problems",
      path: "/admin/problems",
      icon: Code2,
    },
    {
      name: "Profile",
      path: "/admin/profile",
      icon: UserCircle,
    },
  ];


  const handleLogout = () => {
    dispatch(clearCredentials());
    window.location.href = "/login";
  };


  return (
    <aside className="flex h-full w-72 flex-col bg-slate-950 text-white">

      {/* Logo */}
      <div className="flex h-20 items-center justify-between border-b border-slate-800 px-6">

        <Link
          to="/admin/dashboard"
          className="flex items-center gap-3"
          onClick={onClose}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 font-bold">
            SF
          </div>

          <div>
            <h1 className="text-lg font-bold">
              SkillForge
            </h1>

            <p className="text-xs text-slate-400">
              Admin Portal
            </p>
          </div>
        </Link>


        {/* Mobile close */}
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white lg:hidden"
          >
            <X size={20} />
          </button>
        )}

      </div>


      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-6">

        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
          Administration
        </p>

        {navigation.map((item) => {
          const Icon = item.icon;

          const isActive =
            location.pathname === item.path ||
            location.pathname.startsWith(
              `${item.path}/`
            );

          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                isActive
                  ? "bg-indigo-600 text-white"
                  : "text-slate-400 hover:bg-slate-900 hover:text-white"
              }`}
            >
              <Icon size={19} />

              <span>
                {item.name}
              </span>
            </Link>
          );
        })}

      </nav>


      {/* Logout */}
      <div className="border-t border-slate-800 p-4">

        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-400 transition hover:bg-red-500/10 hover:text-red-400"
        >
          <LogOut size={19} />

          Logout
        </button>

      </div>

    </aside>
  );
}

export default AdminSidebar;