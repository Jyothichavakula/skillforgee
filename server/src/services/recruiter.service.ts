import Job from "../models/Job.js";
import Application from "../models/Application.js";

export const getRecruiterDashboard = async (
  userId: string
) => {
  // ========================================
  // RECRUITER JOBS
  // ========================================

  const jobs = await Job.find({
    createdBy: userId,
  })
    .populate(
      "companyId",
      "name logo industry location"
    )
    .sort({
      createdAt: -1,
    })
    .lean();

  const totalJobs = jobs.length;

  const activeJobs = jobs.filter(
    (job) => job.status === "OPEN"
  ).length;

  const closedJobs = jobs.filter(
    (job) => job.status === "CLOSED"
  ).length;

  // ========================================
  // APPLICATIONS
  // ========================================

  const jobIds = jobs.map(
    (job) => job._id
  );

  const applications =
    await Application.find({
      jobId: {
        $in: jobIds,
      },
    })
      .populate(
        "studentId",
        "firstName lastName email university degree graduationYear skills"
      )
      .populate(
        "jobId",
        "title location jobType"
      )
      .sort({
        appliedAt: -1,
      })
      .lean();

  const totalApplicants =
    applications.length;

  const shortlisted =
    applications.filter(
      (application) =>
        application.status ===
        "SHORTLISTED"
    ).length;

  const interviews =
    applications.filter(
      (application) =>
        application.status ===
        "INTERVIEW"
    ).length;

  const selected =
    applications.filter(
      (application) =>
        application.status ===
        "SELECTED"
    ).length;

  const rejected =
    applications.filter(
      (application) =>
        application.status ===
        "REJECTED"
    ).length;

  const applied =
    applications.filter(
      (application) =>
        application.status ===
        "APPLIED"
    ).length;

  // ========================================
  // RECENT APPLICANTS
  // ========================================

  const recentApplicants =
    applications.slice(0, 10);

  // ========================================
  // JOB APPLICATION COUNTS
  // ========================================

  const jobApplicationCounts =
    new Map<string, number>();

  for (const application of applications) {
    const jobId =
      application.jobId?._id?.toString();

    if (!jobId) {
      continue;
    }

    const current =
      jobApplicationCounts.get(jobId) ?? 0;

    jobApplicationCounts.set(
      jobId,
      current + 1
    );
  }

  const jobSummary = jobs.map((job) => ({
    _id: job._id,

    title: job.title,

    status: job.status,

    location: job.location,

    jobType: job.jobType,

    applicationDeadline:
      job.applicationDeadline,

    company: job.companyId,

    applicants:
      jobApplicationCounts.get(
        job._id.toString()
      ) ?? 0,

    createdAt: job.createdAt,
  }));

  return {
    overview: {
      totalJobs,

      activeJobs,

      closedJobs,

      totalApplicants,

      applied,

      shortlisted,

      interviews,

      selected,

      rejected,
    },

    recentApplicants,

    jobs: jobSummary,
  };
};