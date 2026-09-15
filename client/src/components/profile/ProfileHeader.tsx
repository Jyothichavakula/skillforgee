import { User } from "lucide-react";
import type { UserProfile } from "../../api/user.api";

interface ProfileHeaderProps {
  user: UserProfile;
}

function ProfileHeader({ user }: ProfileHeaderProps) {
  const initials =
    `${user.firstName?.charAt(0) || ""}${user.lastName?.charAt(0) || ""}`
      .toUpperCase();

  return (
    <div className="rounded-2xl border border-neutral-800/90 bg-[#121215] p-6 shadow-sm md:p-8 relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/5 rounded-full blur-3xl -mr-20 -mt-20"></div>

      <div className="flex flex-col items-center gap-6 sm:flex-row relative z-10">
        <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-yellow-500/10 border border-yellow-500/20 text-3xl font-black text-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.2)]">
          {initials || <User size={40} />}
        </div>

        <div className="text-center sm:text-left">
          <h1 className="text-3xl font-extrabold text-white">
            {user.firstName} {user.lastName}
          </h1>

          <p className="mt-1 text-base text-neutral-400">
            {user.email}
          </p>

          <span className="mt-4 inline-block rounded-lg bg-neutral-900 border border-neutral-700 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-neutral-300">
            {user.role}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;