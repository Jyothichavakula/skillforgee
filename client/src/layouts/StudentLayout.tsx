import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

function StudentLayout() {
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() =>
          setSidebarOpen(false)
        }
      />

      {/* Main Area */}
      <div className="lg:pl-72">
        {/* Navbar */}
        <Navbar
          onMenuClick={() =>
            setSidebarOpen(true)
          }
        />

        {/* Page Content */}
        <main className="min-h-[calc(100vh-5rem)] p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default StudentLayout;