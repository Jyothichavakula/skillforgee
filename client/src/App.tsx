import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import { useAuthInitializer } from "./hooks/useAuthInitializer";

// Auth pages
import Landing from "./pages/auth/Landing";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// Student pages
import StudentDashboard from "./pages/student/StudentDashboard";
import Jobs from "./pages/student/Jobs";
import JobDetails from "./pages/student/JobDetails";
import ApplyJob from "./pages/student/ApplyJob";
import Applications from "./pages/student/Applications";

// Layouts
import StudentLayout from "./layouts/StudentLayout";

// Recruiter/Admin pages
import RecruiterDashboard from "./pages/recruiter/RecruiterDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";

// Route protection
import ProtectedRoute from "./routes/ProtectedRoute";
import RoleRoute from "./routes/RoleRoute";

import Coding from "./pages/student/Coding";

import ProblemDetails from "./pages/student/ProblemDetails";

import Roadmap from "./pages/student/Roadmap";

function App() {
  const { isInitializing } =
    useAuthInitializer();

  if (isInitializing) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        <div className="text-center">
          <div className="text-3xl font-bold">
            SkillForge
          </div>

          <p className="mt-3 text-slate-400">
            Loading your workspace...
          </p>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      {/* ==================== PUBLIC ROUTES ==================== */}

      <Route
        path="/"
        element={<Landing />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      {/* ==================== PROTECTED ROUTES ==================== */}

      <Route element={<ProtectedRoute />}>
        {/* ==================== STUDENT ==================== */}

        <Route
          element={
            <RoleRoute
              allowedRoles={["STUDENT"]}
            />
          }
        >
          <Route element={<StudentLayout />}>

            <Route
              path="/student/dashboard"
              element={<StudentDashboard />}
            />

            <Route
              path="/student/jobs"
              element={<Jobs />}
            />

            <Route
              path="/student/jobs/:id"
              element={<JobDetails />}
            />

            <Route
              path="/student/jobs/:id/apply"
              element={<ApplyJob />}
            />

            <Route
              path="/student/applications"
              element={<Applications />}
            />

            <Route
              path="/student/coding"
              element={<Coding />}
            />

            <Route
              path="/student/coding/:id"
              element={<ProblemDetails />}
            />

            <Route
              path="/student/roadmap"
              element={<Roadmap />}
            />

          </Route>
        </Route>

        {/* ==================== RECRUITER ==================== */}

        <Route
          element={
            <RoleRoute
              allowedRoles={["RECRUITER"]}
            />
          }
        >
          <Route
            path="/recruiter/dashboard"
            element={<RecruiterDashboard />}
          />
        </Route>

        {/* ==================== ADMIN ==================== */}

        <Route
          element={
            <RoleRoute
              allowedRoles={["ADMIN"]}
            />
          }
        >
          <Route
            path="/admin/dashboard"
            element={<AdminDashboard />}
          />
        </Route>
      </Route>

      {/* ==================== UNKNOWN ROUTES ==================== */}

      <Route
        path="*"
        element={
          <Navigate
            to="/"
            replace
          />
        }
      />
    </Routes>
  );
}

export default App;