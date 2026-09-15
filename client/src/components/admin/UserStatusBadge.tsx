interface UserStatusBadgeProps {
  isActive: boolean;
}

function UserStatusBadge({
  isActive,
}: UserStatusBadgeProps) {
  return (
    <span
      className={`rounded-lg px-2.5 py-1.5 text-xs font-semibold ${
        isActive
          ? "bg-emerald-50 text-emerald-600"
          : "bg-red-50 text-red-600"
      }`}
    >
      {isActive
        ? "Active"
        : "Inactive"}
    </span>
  );
}

export default UserStatusBadge;