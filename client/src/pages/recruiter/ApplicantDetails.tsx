import { useState } from "react";
import {
  ArrowLeft,
  BriefcaseBusiness,
  CalendarDays,
  Download,
  GraduationCap,
  Loader2,
  Mail,
  Phone,
} from "lucide-react";
import {
  Link,
  useLocation,
  useParams,
} from "react-router-dom";

import {
  useRecruiterApplications,
  useUpdateApplicationStatus,
} from "../../hooks/useRecruiterApplications";

import ApplicantStatusBadge from "../../components/recruiter/ApplicantStatusBadge";

import type {
  RecruiterApplicationStatus,
} from "../../api/recruiterApplication.api";


const statuses: RecruiterApplicationStatus[] = [
  "APPLIED",
  "SHORTLISTED",
  "INTERVIEW",
  "SELECTED",
  "REJECTED",
];


function ApplicantDetails() {
  const { id } =
    useParams<{ id: string }>();

  const location = useLocation();

  // Get the job ID passed from ApplicantCard
  const jobId =
    location.state?.jobId as string | undefined;

  const [selectedStatus, setSelectedStatus] =
    useState<
      RecruiterApplicationStatus | ""
    >("");

  const {
    data: applications = [],
    isLoading,
    isError,
  } = useRecruiterApplications(
    jobId || ""
  );

  const updateMutation =
    useUpdateApplicationStatus();

  // Find the selected application
  const application =
    applications.find(
      (item) => item._id === id
    );

  // Loading state
  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex items-center gap-3 text-slate-600">
          <Loader2
            size={22}
            className="animate-spin"
          />

          <span>
            Loading applicant...
          </span>
        </div>
      </div>
    );
  }

  // Error / missing application
  if (
    isError ||
    !application
  ) {
    return (
      <div className="p-4 md:p-8">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6">

          <h2 className="text-lg font-semibold text-red-800">
            Applicant not found
          </h2>

          <p className="mt-2 text-sm text-red-600">
            The applicant information could not
            be loaded.
          </p>

          <Link
            to="/recruiter/jobs"
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            <ArrowLeft size={16} />
            Back to Jobs
          </Link>

        </div>
      </div>
    );
  }

  const student =
    typeof application.studentId ===
    "object"
      ? application.studentId
      : null;

  const job =
    typeof application.jobId ===
    "object"
      ? application.jobId
      : null;

  if (!student) {
    return (
      <div className="p-8 text-center text-slate-500">
        Student information is unavailable.
      </div>
    );
  }

  // Update application status
  const handleStatusUpdate = () => {
    if (!selectedStatus) {
      return;
    }

    updateMutation.mutate({
      applicationId:
        application._id,

      status: selectedStatus,
    });
  };

  return (
    <div className="space-y-6 p-4 md:p-8">

      {/* Back button */}
      <Link
        to={
          job
            ? `/recruiter/jobs/${job._id}/applicants`
            : "/recruiter/jobs"
        }
        className="inline-flex items-center gap-2 text-sm text-slate-500 transition hover:text-slate-900"
      >
        <ArrowLeft size={16} />

        Back to Applicants
      </Link>


      {/* Applicant Header */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-center gap-4">

            {/* Avatar */}
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-xl font-bold text-indigo-600">
              {student.firstName
                ?.charAt(0)
                .toUpperCase()}
            </div>

            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                {student.firstName}{" "}
                {student.lastName}
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Job Applicant
              </p>
            </div>

          </div>

          <ApplicantStatusBadge
            status={
              application.status
            }
          />

        </div>
      </div>


      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-3">

        {/* Left Section */}
        <div className="space-y-6 lg:col-span-2">

          {/* Student Information */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <h2 className="text-lg font-semibold text-slate-900">
              Student Information
            </h2>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">

              {/* Email */}
              <div className="flex items-center gap-3">

                <Mail
                  size={18}
                  className="text-slate-400"
                />

                <div>
                  <p className="text-xs text-slate-400">
                    Email
                  </p>

                  <p className="text-sm font-medium text-slate-700">
                    {student.email}
                  </p>
                </div>

              </div>


              {/* Phone */}
              {student.phone && (
                <div className="flex items-center gap-3">

                  <Phone
                    size={18}
                    className="text-slate-400"
                  />

                  <div>
                    <p className="text-xs text-slate-400">
                      Phone
                    </p>

                    <p className="text-sm font-medium text-slate-700">
                      {student.phone}
                    </p>
                  </div>

                </div>
              )}


              {/* Degree */}
              {student.degree && (
                <div className="flex items-center gap-3">

                  <GraduationCap
                    size={18}
                    className="text-slate-400"
                  />

                  <div>
                    <p className="text-xs text-slate-400">
                      Degree
                    </p>

                    <p className="text-sm font-medium text-slate-700">
                      {student.degree}
                    </p>
                  </div>

                </div>
              )}


              {/* University */}
              {student.university && (
                <div className="flex items-center gap-3">

                  <BriefcaseBusiness
                    size={18}
                    className="text-slate-400"
                  />

                  <div>
                    <p className="text-xs text-slate-400">
                      University
                    </p>

                    <p className="text-sm font-medium text-slate-700">
                      {student.university}
                    </p>
                  </div>

                </div>
              )}


              {/* Graduation Year */}
              {student.graduationYear && (
                <div className="flex items-center gap-3">

                  <CalendarDays
                    size={18}
                    className="text-slate-400"
                  />

                  <div>
                    <p className="text-xs text-slate-400">
                      Graduation Year
                    </p>

                    <p className="text-sm font-medium text-slate-700">
                      {student.graduationYear}
                    </p>
                  </div>

                </div>
              )}

            </div>
          </div>


          {/* Skills */}
          {student.skills &&
            student.skills.length > 0 && (
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                <h2 className="text-lg font-semibold text-slate-900">
                  Skills
                </h2>

                <div className="mt-4 flex flex-wrap gap-2">

                  {student.skills.map(
                    (skill) => (
                      <span
                        key={skill}
                        className="rounded-lg bg-indigo-50 px-3 py-1.5 text-sm font-medium text-indigo-600"
                      >
                        {skill}
                      </span>
                    )
                  )}

                </div>
              </div>
            )}


          {/* Cover Letter */}
          {application.coverLetter && (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              <h2 className="text-lg font-semibold text-slate-900">
                Cover Letter
              </h2>

              <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-slate-600">
                {application.coverLetter}
              </p>

            </div>
          )}

        </div>


        {/* Right Section */}
        <div className="space-y-6">

          {/* Application Information */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <h2 className="text-lg font-semibold text-slate-900">
              Application
            </h2>

            <div className="mt-5 space-y-4">

              {/* Position */}
              <div>
                <p className="text-xs text-slate-400">
                  Position
                </p>

                <p className="mt-1 text-sm font-medium text-slate-700">
                  {job?.title ||
                    "Job"}
                </p>
              </div>


              {/* Applied Date */}
              <div>
                <p className="text-xs text-slate-400">
                  Applied On
                </p>

                <p className="mt-1 text-sm font-medium text-slate-700">
                  {new Date(
                    application.appliedAt
                  ).toLocaleDateString()}
                </p>
              </div>


              {/* Current Status */}
              <div>
                <p className="text-xs text-slate-400">
                  Current Status
                </p>

                <div className="mt-2">
                  <ApplicantStatusBadge
                    status={
                      application.status
                    }
                  />
                </div>
              </div>

            </div>
          </div>


          {/* Update Status */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <h2 className="text-lg font-semibold text-slate-900">
              Update Status
            </h2>

            <select
              value={
                selectedStatus
              }
              onChange={(event) =>
                setSelectedStatus(
                  event.target.value as
                    | RecruiterApplicationStatus
                    | ""
                )
              }
              className="mt-4 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            >

              <option value="">
                Select status
              </option>

              {statuses.map(
                (status) => (
                  <option
                    key={status}
                    value={status}
                  >
                    {status}
                  </option>
                )
              )}

            </select>


            <button
              type="button"
              onClick={
                handleStatusUpdate
              }
              disabled={
                !selectedStatus ||
                updateMutation.isPending
              }
              className="mt-3 w-full rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {updateMutation.isPending
                ? "Updating..."
                : "Update Status"}
            </button>


            {updateMutation.isSuccess && (
              <p className="mt-3 text-center text-sm text-emerald-600">
                Status updated successfully.
              </p>
            )}


            {updateMutation.isError && (
              <p className="mt-3 text-center text-sm text-red-600">
                Failed to update status.
              </p>
            )}

          </div>


          {/* Resume */}
          {application.resumeUrl && (
            <a
              href={
                application.resumeUrl
              }
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              <Download size={17} />

              View Resume
            </a>
          )}

        </div>

      </div>
    </div>
  );
}


export default ApplicantDetails;