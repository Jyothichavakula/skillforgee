import {
  CalendarDays,
  Mail,
  GraduationCap,
  ChevronRight,
} from "lucide-react";

import { Link } from "react-router-dom";

import ApplicantStatusBadge from "./ApplicantStatusBadge";

import type {
  RecruiterApplication,
} from "../../api/recruiterApplication.api";

interface ApplicantCardProps {
  application: RecruiterApplication;
}

function ApplicantCard({
  application,
}: ApplicantCardProps) {
  const student =
    typeof application.studentId === "object"
      ? application.studentId
      : null;

  if (!student) {
    return null;
  }

  const fullName =
    `${student.firstName} ${student.lastName}`;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        {/* Student information */}
        <div className="flex items-start gap-4">

          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-lg font-semibold text-indigo-600">
            {student.firstName
              ?.charAt(0)
              .toUpperCase()}
          </div>

          <div>
            <h3 className="font-semibold text-slate-900">
              {fullName}
            </h3>

            <div className="mt-1 flex items-center gap-2 text-sm text-slate-500">
              <Mail size={14} />
              {student.email}
            </div>

            {student.degree && (
              <div className="mt-1 flex items-center gap-2 text-sm text-slate-500">
                <GraduationCap size={14} />
                {student.degree}
              </div>
            )}

            <div className="mt-1 flex items-center gap-2 text-sm text-slate-500">
              <CalendarDays size={14} />
              Applied{" "}
              {new Date(
                application.appliedAt
              ).toLocaleDateString()}
            </div>
          </div>
        </div>

        {/* Status + details */}
        <div className="flex items-center gap-3">
          <ApplicantStatusBadge
            status={application.status}
          />

          <Link
            to={`/recruiter/applicants/${application._id}`}
            state={{ jobId: typeof application.jobId === "object"
            ? application.jobId._id
            : application.jobId 
        }}           
             className="inline-flex items-center gap-1 rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            View
            <ChevronRight size={16} />
          </Link>
        </div>

      </div>

      {/* Skills */}
      {student.skills &&
        student.skills.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2 border-t border-slate-100 pt-4">
            {student.skills
              .slice(0, 6)
              .map((skill) => (
                <span
                  key={skill}
                  className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs text-slate-600"
                >
                  {skill}
                </span>
              ))}
          </div>
        )}
    </div>
  );
}

export default ApplicantCard;