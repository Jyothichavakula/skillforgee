import Application from "../models/Application.js";
import Job from "../models/Job.js";

import {
  createNotification,
} from "./notification.service.js";

interface CreateApplicationInput {
  jobId: string;
  studentId: string;
  coverLetter?: string;
  resumeUrl?: string;
}

type RecruiterOrAdmin = "RECRUITER" | "ADMIN";

// Check whether the recruiter is allowed to manage the job
const getJobAndCheckOwnership = async (
  jobId: string,
  userId: string,
  userRole: RecruiterOrAdmin
) => {
  const job = await Job.findById(jobId);

  if (!job) {
    throw new Error("Job not found");
  }

  // Recruiters can manage only their own jobs
  if (
    userRole === "RECRUITER" &&
    job.createdBy.toString() !== userId
  ) {
    throw new Error("You do not have permission to manage this job");
  }

  // Admins can manage any job
  return job;
};

// Student applies for a job
export const createApplication = async (
  data: CreateApplicationInput
) => {
  // Check whether the job exists
  const job = await Job.findById(data.jobId);

  if (!job) {
    throw new Error("Job not found");
  }

  // Check whether the job is still open
  if (job.status !== "OPEN") {
    throw new Error(
      "This job is no longer accepting applications"
    );
  }

  // Check application deadline
  if (new Date() > job.applicationDeadline) {
    throw new Error("Application deadline has passed");
  }

  // Check whether the student has already applied
  const existingApplication = await Application.findOne({
    jobId: data.jobId,
    studentId: data.studentId,
  });

  if (existingApplication) {
    throw new Error(
      "You have already applied for this job"
    );
  }

  // Create the application
  const application = await Application.create({
    jobId: data.jobId,
    studentId: data.studentId,
    coverLetter: data.coverLetter,
    resumeUrl: data.resumeUrl,
  });

  return application;
};

// Student views all their applications
export const getMyApplications = async (
  studentId: string
) => {
  return Application.find({ studentId })
    .populate({
      path: "jobId",
      populate: {
        path: "companyId",
        select: "name logo industry location",
      },
    })
    .sort({ appliedAt: -1 });
};

// Student views one of their applications
export const getApplicationById = async (
  applicationId: string,
  studentId: string
) => {
  const application = await Application.findOne({
    _id: applicationId,
    studentId,
  }).populate({
    path: "jobId",
    populate: {
      path: "companyId",
      select: "name logo industry location",
    },
  });

  if (!application) {
    throw new Error("Application not found");
  }

  return application;
};

// Recruiter/Admin views applicants for a job
export const getJobApplicants = async (
  jobId: string,
  userId: string,
  userRole: RecruiterOrAdmin
) => {
  // Check job ownership
  await getJobAndCheckOwnership(
    jobId,
    userId,
    userRole
  );

  return Application.find({ jobId })
    .populate(
      "studentId",
      "firstName lastName email university degree graduationYear skills"
    )
    .sort({ appliedAt: -1 });
};

// Recruiter/Admin updates application status
export const updateApplicationStatus = async (
  applicationId: string,
  status:
    | "APPLIED"
    | "SHORTLISTED"
    | "INTERVIEW"
    | "SELECTED"
    | "REJECTED",
  userId: string,
  userRole: RecruiterOrAdmin
) => {
  // Find application
  const application = await Application.findById(
    applicationId
  );

  if (!application) {
    throw new Error("Application not found");
  }

  // Find the job associated with this application
  const job = await Job.findById(application.jobId);

  if (!job) {
    throw new Error("Job not found");
  }

  // Recruiter can manage only applications
  // belonging to their own jobs
  if (
    userRole === "RECRUITER" &&
    job.createdBy.toString() !== userId
  ) {
    throw new Error(
      "You do not have permission to manage this application"
    );
  }

  // Update status
  application.status = status;

  await application.save();

  await createNotification({
  userId: application.studentId.toString(),

  type: "APPLICATION_STATUS",

  title: "Application Status Updated",

  message:
    `Your application status has been updated to ${status}.`,

  relatedId: application._id.toString(),
});

  // Return updated application
  return Application.findById(applicationId)
    .populate(
      "studentId",
      "firstName lastName email university degree graduationYear skills"
    )
    .populate(
      "jobId",
      "title location jobType"
    );
};