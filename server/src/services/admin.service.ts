import User from "../models/User.js";
import Company from "../models/Company.js";
import Job from "../models/Job.js";
import Application from "../models/Application.js";
import Problem from "../models/Problem.js";

export const getAdminDashboard = async () => {
  // ========================================
  // USER STATISTICS
  // ========================================

  const totalUsers = await User.countDocuments();

  const totalStudents = await User.countDocuments({
    role: "STUDENT",
  });

  const totalRecruiters = await User.countDocuments({
    role: "RECRUITER",
  });

  const totalAdmins = await User.countDocuments({
    role: "ADMIN",
  });

  const activeUsers = await User.countDocuments({
    isActive: true,
  });

  const inactiveUsers = await User.countDocuments({
    isActive: false,
  });

  // ========================================
  // COMPANY STATISTICS
  // ========================================

  const totalCompanies =
    await Company.countDocuments();

  // ========================================
  // JOB STATISTICS
  // ========================================

  const totalJobs =
    await Job.countDocuments();

  const openJobs = await Job.countDocuments({
    status: "OPEN",
  });

  const closedJobs = await Job.countDocuments({
    status: "CLOSED",
  });

  // ========================================
  // APPLICATION STATISTICS
  // ========================================

  const totalApplications =
    await Application.countDocuments();

  const applied = await Application.countDocuments({
    status: "APPLIED",
  });

  const shortlisted =
    await Application.countDocuments({
      status: "SHORTLISTED",
    });

  const interviews =
    await Application.countDocuments({
      status: "INTERVIEW",
    });

  const selected =
    await Application.countDocuments({
      status: "SELECTED",
    });

  const rejected =
    await Application.countDocuments({
      status: "REJECTED",
    });

  // ========================================
  // CODING PROBLEM STATISTICS
  // ========================================

  const totalProblems =
    await Problem.countDocuments();

  const activeProblems =
    await Problem.countDocuments({
      isActive: true,
    });

  const inactiveProblems =
    await Problem.countDocuments({
      isActive: false,
    });

  // ========================================
  // RECENT USERS
  // ========================================

  const recentUsers = await User.find()
    .select(
      "firstName lastName email role university isActive createdAt"
    )
    .sort({
      createdAt: -1,
    })
    .limit(10)
    .lean();

  // ========================================
  // RECENT JOBS
  // ========================================

  const recentJobs = await Job.find()
    .populate(
      "companyId",
      "name logo industry location"
    )
    .populate(
      "createdBy",
      "firstName lastName email"
    )
    .sort({
      createdAt: -1,
    })
    .limit(10)
    .lean();

  // ========================================
  // RETURN DASHBOARD
  // ========================================

  return {
    overview: {
      users: {
        total: totalUsers,
        students: totalStudents,
        recruiters: totalRecruiters,
        admins: totalAdmins,
        active: activeUsers,
        inactive: inactiveUsers,
      },

      companies: {
        total: totalCompanies,
      },

      jobs: {
        total: totalJobs,
        open: openJobs,
        closed: closedJobs,
      },

      applications: {
        total: totalApplications,
        applied,
        shortlisted,
        interviews,
        selected,
        rejected,
      },

      problems: {
        total: totalProblems,
        active: activeProblems,
        inactive: inactiveProblems,
      },
    },

    recentUsers,
    recentJobs,
  };
};