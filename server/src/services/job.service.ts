import Job from "../models/Job.js";
import Company from "../models/Company.js";

interface CreateJobInput {
  title: string;
  companyId: string;
  description: string;
  requirements?: string[];
  skills?: string[];
  location: string;
  jobType:
    | "FULL_TIME"
    | "PART_TIME"
    | "INTERNSHIP";
  salaryMin?: number;
  salaryMax?: number;
  applicationDeadline: Date;
  createdBy: string;
}

interface UpdateJobInput {
  title?: string;
  description?: string;
  requirements?: string[];
  skills?: string[];
  location?: string;
  jobType?:
    | "FULL_TIME"
    | "PART_TIME"
    | "INTERNSHIP";
  salaryMin?: number;
  salaryMax?: number;
  applicationDeadline?: Date;
  status?: "OPEN" | "CLOSED";
}

type JobManagerRole =
  | "RECRUITER"
  | "ADMIN";

// ========================================
// CREATE JOB
// ========================================

export const createJob = async (
  data: CreateJobInput
) => {
  const company = await Company.findById(
    data.companyId
  );

  if (!company) {
    throw new Error("Company not found");
  }

  if (
    data.salaryMin !== undefined &&
    data.salaryMax !== undefined &&
    data.salaryMin > data.salaryMax
  ) {
    throw new Error(
      "Minimum salary cannot be greater than maximum salary"
    );
  }

  const job = await Job.create(data);

  return job;
};

// ========================================
// GET ALL JOBS
// ========================================

export const getJobs = async () => {
  return Job.find()
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
    });
};

export const getMyJobs = async (userId: string) => {
  return Job.find({ createdBy: userId })
    .populate(
      "companyId",
      "name logo industry location"
    )
    .populate(
      "createdBy",
      "firstName lastName email"
    )
    .sort({ createdAt: -1 });
};

// ========================================
// GET JOB BY ID
// ========================================

export const getJobById = async (
  jobId: string
) => {
  const job = await Job.findById(jobId)
    .populate(
      "companyId",
      "name logo industry location"
    )
    .populate(
      "createdBy",
      "firstName lastName email"
    );

  if (!job) {
    throw new Error("Job not found");
  }

  return job;
};

// ========================================
// UPDATE JOB
// ========================================

export const updateJob = async (
  jobId: string,
  userId: string,
  userRole: JobManagerRole,
  data: UpdateJobInput
) => {
  const job = await Job.findById(jobId);

  if (!job) {
    throw new Error("Job not found");
  }

  // ----------------------------------------
  // RECRUITER OWNERSHIP CHECK
  // ----------------------------------------

  if (
    userRole === "RECRUITER" &&
    job.createdBy.toString() !== userId
  ) {
    throw new Error(
      "You do not have permission to update this job"
    );
  }

  // ----------------------------------------
  // SALARY VALIDATION
  // ----------------------------------------

  if (
    data.salaryMin !== undefined &&
    data.salaryMax !== undefined &&
    data.salaryMin > data.salaryMax
  ) {
    throw new Error(
      "Minimum salary cannot be greater than maximum salary"
    );
  }

  // ----------------------------------------
  // UPDATE JOB
  // ----------------------------------------

  Object.assign(job, data);

  await job.save();

  return Job.findById(jobId)
    .populate(
      "companyId",
      "name logo industry location"
    )
    .populate(
      "createdBy",
      "firstName lastName email"
    );
};

// ========================================
// DELETE JOB
// ========================================

export const deleteJob = async (
  jobId: string,
  userId: string,
  userRole: JobManagerRole
) => {
  const job = await Job.findById(jobId);

  if (!job) {
    throw new Error("Job not found");
  }

  // ----------------------------------------
  // RECRUITER OWNERSHIP CHECK
  // ----------------------------------------

  if (
    userRole === "RECRUITER" &&
    job.createdBy.toString() !== userId
  ) {
    throw new Error(
      "You do not have permission to delete this job"
    );
  }

  // ----------------------------------------
  // DELETE JOB
  // ----------------------------------------

  await Job.findByIdAndDelete(jobId);

  return job;
};


