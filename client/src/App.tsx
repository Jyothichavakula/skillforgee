import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import { useAuthInitializer } from "./hooks/useAuthInitializer";
import ErrorBoundary from "./components/common/ErrorBoundary";

// ==================== AUTH PAGES ====================

import Landing from "./pages/auth/Landing";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// ==================== STUDENT PAGES ====================

import StudentDashboard from "./pages/student/StudentDashboard";
import Jobs from "./pages/student/Jobs";
import JobDetails from "./pages/student/JobDetails";
import ApplyJob from "./pages/student/ApplyJob";
import Applications from "./pages/student/Applications";
import Coding from "./pages/student/Coding";
import ProblemDetails from "./pages/student/ProblemDetails";
import Roadmap from "./pages/student/Roadmap";
import CareerCoach from "./pages/student/CareerCoach";
import Resume from "./pages/student/Resume";
import Analytics from "./pages/student/Analytics";
import Gamification from "./pages/student/Gamification";
import Community from "./pages/student/Community";
import DiscussionDetails from "./pages/student/DiscussionDetails";
import Notifications from "./pages/student/Notifications";
import Profile from "./pages/student/Profile";
import AdminUsers from "./pages/admin/AdminUsers";
// ==================== STUDENT LAYOUT ====================

import StudentLayout from "./layouts/StudentLayout";

// ==================== RECRUITER PAGES ====================

import RecruiterDashboard from "./pages/recruiter/RecruiterDashboard";
import RecruiterJobs from "./pages/recruiter/RecruiterJobs";
import CreateJob from "./pages/recruiter/CreateJob";
import Applicants from "./pages/recruiter/Applicants";
import ApplicantDetails from "./pages/recruiter/ApplicantDetails";

// ==================== ADMIN PAGES ====================

import AdminDashboard from "./pages/admin/AdminDashboard";

// ==================== ADMIN LAYOUT ====================

import AdminLayout from "./layouts/AdminLayout";

// ==================== ROUTE PROTECTION ====================

import ProtectedRoute from "./routes/ProtectedRoute";
import RoleRoute from "./routes/RoleRoute";


function App() {
  const { isInitializing } =
    useAuthInitializer();

  // ==================== AUTH INITIALIZATION ====================

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
    <ErrorBoundary>
      <Routes>

      {/* ================================================== */}
      {/* PUBLIC ROUTES */}
      {/* ================================================== */}

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


      {/* ================================================== */}
      {/* PROTECTED ROUTES */}
      {/* ================================================== */}

      <Route element={<ProtectedRoute />}>


        {/* ================================================== */}
        {/* STUDENT */}
        {/* ================================================== */}

        <Route
          element={
            <RoleRoute
              allowedRoles={["STUDENT"]}
            />
          }
        >

          <Route
            element={<StudentLayout />}
          >

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

            <Route
              path="/student/career-coach"
              element={<CareerCoach />}
            />

            <Route
              path="/student/resume"
              element={<Resume />}
            />

            <Route
              path="/student/analytics"
              element={<Analytics />}
            />

            <Route
              path="/student/gamification"
              element={<Gamification />}
            />

            <Route
              path="/student/community"
              element={<Community />}
            />

            <Route
              path="/student/community/:id"
              element={<DiscussionDetails />}
            />

            <Route
              path="/student/notifications"
              element={<Notifications />}
            />

            <Route
              path="/student/profile"
              element={<Profile />}
            />

          </Route>

        </Route>


        {/* ================================================== */}
        {/* RECRUITER */}
        {/* ================================================== */}

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

          <Route
            path="/recruiter/jobs"
            element={<RecruiterJobs />}
          />

          <Route
            path="/recruiter/jobs/create"
            element={<CreateJob />}
          />

          <Route
            path="/recruiter/jobs/:id/applicants"
            element={<Applicants />}
          />

          <Route
            path="/recruiter/applicants/:id"
            element={<ApplicantDetails />}
          />

        </Route>


        {/* ================================================== */}
        {/* ADMIN */}
        {/* ================================================== */}

        <Route
          element={
            <RoleRoute
              allowedRoles={["ADMIN"]}
            />
          }
        >

          <Route
            path="/admin"
            element={<AdminLayout />}
          >

            <Route
              path="dashboard"
              element={<AdminDashboard />}
            />

            <Route
              path="users"
              element={<AdminUsers />}
            />

          </Route>

        </Route>


      </Route>


      {/* ================================================== */}
      {/* UNKNOWN ROUTES */}
      {/* ================================================== */}

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
    </ErrorBoundary>
  );
}


export default App;