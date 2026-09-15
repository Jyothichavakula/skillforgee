import {
  Navigate,
  Outlet,
} from "react-router-dom";

import { useAppSelector } from "../hooks/redux";

import type { UserRole } from "../types/user";

interface RoleRouteProps {
  allowedRoles: UserRole[];
}

function RoleRoute({
  allowedRoles,
}: RoleRouteProps) {
  const user =
    useAppSelector(
      (state) => state.auth.user
    );

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    if (user.role === "STUDENT") {
      return (
        <Navigate
          to="/student/dashboard"
          replace
        />
      );
    }

    if (user.role === "RECRUITER") {
      return (
        <Navigate
          to="/recruiter/dashboard"
          replace
        />
      );
    }

    return (
      <Navigate
        to="/admin/dashboard"
        replace
      />
    );
  }

  return <Outlet />;
}

export default RoleRoute;