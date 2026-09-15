import { useState } from "react";
import {
  Bell,
  Menu,
} from "lucide-react";

import {
  Outlet,
  Link,
} from "react-router-dom";

import { useAppSelector } from "../hooks/redux";

import AdminSidebar from "../components/layout/AdminSidebar";


function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const user = useAppSelector(
    (state) => state.auth.user
  );


  return (
    <div className="min-h-screen bg-slate-50">

      {/* Desktop Sidebar */}
      <div className="fixed inset-y-0 left-0 z-40 hidden lg:block">

        <AdminSidebar />

      </div>


      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-slate-950/50 lg:hidden"
            onClick={() =>
              setSidebarOpen(false)
            }
          />

          <div className="fixed inset-y-0 left-0 z-50 lg:hidden">

            <AdminSidebar
              onClose={() =>
                setSidebarOpen(false)
              }
            />

          </div>
        </>
      )}


      {/* Main Area */}
      <div className="lg:pl-72">

        {/* Navbar */}
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur md:px-8">

          {/* Left */}
          <div className="flex items-center gap-4">

            <button
              type="button"
              onClick={() =>
                setSidebarOpen(true)
              }
              className="rounded-xl p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
            >
              <Menu size={22} />
            </button>


            <div>

              <p className="text-sm text-slate-500">
                Admin Portal
              </p>

              <h2 className="text-lg font-semibold text-slate-900">
                Welcome back,{" "}
                {user?.firstName ||
                  "Admin"}{" "}
                👋
              </h2>

            </div>

          </div>


          {/* Right */}
          <div className="flex items-center gap-4">

            <Link
              to="/admin/notifications"
              className="relative rounded-xl p-2.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
              title="Notifications"
            >
              <Bell size={21} />

              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-indigo-500" />
            </Link>


            <div className="hidden h-8 w-px bg-slate-200 sm:block" />


            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-600">
                {user?.firstName
                  ?.charAt(0)
                  .toUpperCase() ||
                  "A"}
              </div>

              <div className="hidden sm:block">

                <p className="text-sm font-semibold text-slate-900">
                  {user?.firstName}{" "}
                  {user?.lastName}
                </p>

                <p className="text-xs text-slate-500">
                  ADMIN
                </p>

              </div>

            </div>

          </div>

        </header>


        {/* Page Content */}
        <main>
          <Outlet />
        </main>

      </div>

    </div>
  );
}

export default AdminLayout;