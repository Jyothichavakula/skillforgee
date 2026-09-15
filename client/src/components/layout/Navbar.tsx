import { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Bell, ChevronDown, User, LogOut } from "lucide-react";

import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { clearCredentials } from "../../store/authSlice";
import { logoutUser } from "../../api/auth.api";
import { useNotifications } from "../../hooks/useNotifications";

interface NavbarProps {
  onMenuClick: () => void;
}

function Navbar({ onMenuClick }: NavbarProps) {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fetch notifications to show real unread count
  const { data: notifications = [] } = useNotifications();
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleLogout = async () => {
    setDropdownOpen(false);
    try {
      await logoutUser();
    } catch {
      // ignore logout API errors — still clear local state
    }
    dispatch(clearCredentials());
    navigate("/login");
  };

  const handleNavigate = (path: string) => {
    setDropdownOpen(false);
    navigate(path);
  };

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-neutral-800/80 bg-[#0c0c0e]/95 px-4 backdrop-blur md:px-8">
      {/* Left */}
      <div className="flex items-center gap-4">
        {/* Mobile Menu */}
        <button
          onClick={onMenuClick}
          className="rounded-xl p-2 text-neutral-400 hover:bg-neutral-800 hover:text-white lg:hidden"
        >
          <Menu size={22} />
        </button>

        <div>
          <p className="text-xs font-medium text-neutral-400">Welcome back,</p>
          <h2 className="text-lg font-semibold tracking-tight text-white">
            {user?.firstName || "Student"} 👋
          </h2>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        {/* Notifications Bell */}
        <Link
          to="/student/notifications"
          className="relative rounded-xl p-2.5 text-neutral-400 transition hover:bg-neutral-800 hover:text-white"
          title="Notifications"
        >
          <Bell size={21} />

          {/* Only show badge when there are unread notifications */}
          {unreadCount > 0 && (
            <span className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-yellow-400 text-[10px] font-extrabold text-black shadow-xs shadow-yellow-500/40">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </Link>

        {/* Divider */}
        <div className="hidden h-8 w-px bg-neutral-800 sm:block" />

        {/* Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            id="profile-menu-button"
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="flex items-center gap-3 rounded-xl px-2 py-1.5 transition hover:bg-neutral-800/70"
          >
            {/* Avatar */}
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-400 to-amber-500 text-sm font-extrabold text-black shadow-sm shadow-yellow-500/20">
              {user?.firstName?.charAt(0).toUpperCase() || "S"}
            </div>

            {/* User Info */}
            <div className="hidden text-left sm:block">
              <p className="text-sm font-semibold text-white">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs text-neutral-400">{user?.role || "STUDENT"}</p>
            </div>

            <ChevronDown
              size={17}
              className={`hidden text-neutral-400 transition-transform sm:block ${
                dropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-52 overflow-hidden rounded-2xl border border-neutral-800 bg-[#121215] shadow-2xl">
              <div className="px-4 py-3 border-b border-neutral-800 sm:hidden">
                <p className="text-sm font-semibold text-white">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs text-neutral-400">{user?.role || "STUDENT"}</p>
              </div>

              <button
                id="profile-link"
                onClick={() => handleNavigate("/student/profile")}
                className="flex w-full items-center gap-3 px-4 py-3 text-sm text-neutral-300 transition hover:bg-neutral-800 hover:text-white"
              >
                <User size={16} className="text-yellow-400" />
                Profile
              </button>

              <div className="mx-3 border-t border-neutral-800" />

              <button
                id="logout-button"
                onClick={handleLogout}
                className="flex w-full items-center gap-3 px-4 py-3 text-sm text-red-400 transition hover:bg-red-500/10"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;