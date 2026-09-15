import {
  Menu,
  Bell,
  ChevronDown,
} from "lucide-react";

import { useAppSelector } from "../../hooks/redux";

interface NavbarProps {
  onMenuClick: () => void;
}

function Navbar({
  onMenuClick,
}: NavbarProps) {
  const user =
    useAppSelector(
      (state) => state.auth.user
    );

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur md:px-8">
      {/* Left */}
      <div className="flex items-center gap-4">
        {/* Mobile Menu */}
        <button
          onClick={onMenuClick}
          className="rounded-xl p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
        >
          <Menu size={22} />
        </button>

        <div>
          <p className="text-sm text-slate-500">
            Welcome back,
          </p>

          <h2 className="text-lg font-semibold text-slate-900">
            {user?.firstName || "Student"} 👋
          </h2>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <button
          className="relative rounded-xl p-2.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
          title="Notifications"
        >
          <Bell size={21} />

          {/* Notification indicator */}
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-indigo-500" />
        </button>

        {/* Divider */}
        <div className="hidden h-8 w-px bg-slate-200 sm:block" />

        {/* User */}
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-600">
            {user?.firstName?.charAt(0).toUpperCase() || "S"}
          </div>

          {/* User Information */}
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-slate-900">
              {user?.firstName} {user?.lastName}
            </p>

            <p className="text-xs text-slate-500">
              {user?.role || "STUDENT"}
            </p>
          </div>

          <ChevronDown
            size={17}
            className="hidden text-slate-400 sm:block"
          />
        </div>
      </div>
    </header>
  );
}

export default Navbar;