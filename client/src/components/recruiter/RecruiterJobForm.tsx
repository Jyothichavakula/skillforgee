import { useEffect, useState } from "react";
import type {
  FormEvent,
  ChangeEvent,
} from "react";
import { BriefcaseBusiness } from "lucide-react";

import type {
  CreateJobData,
  RecruiterJob,
  UpdateJobData,
} from "../../api/recruiterJob.api";
import type { Company } from "../../api/company.api";

interface RecruiterJobFormProps {
  companies: Company[];
  initialData?: RecruiterJob;
  onSubmit: (data: CreateJobData) => void;
  onUpdate?: (data: UpdateJobData) => void;
  isSaving: boolean;
  submitLabel: string;
}

function RecruiterJobForm({
  companies,
  initialData,
  onSubmit,
  onUpdate,
  isSaving,
  submitLabel,
}: RecruiterJobFormProps) {
  let companyId = "";

if (initialData) {
  if (typeof initialData.companyId === "object") {
    companyId = initialData.companyId._id;
  } else {
    companyId = initialData.companyId;
  }
}

  const [form, setForm] = useState({
    title: initialData?.title || "",
    companyId,
    description: initialData?.description || "",
    requirements:
      initialData?.requirements?.join(", ") || "",
    skills:
      initialData?.skills?.join(", ") || "",
    location: initialData?.location || "",
    jobType: initialData?.jobType || "FULL_TIME",
    salaryMin:
      initialData?.salaryMin !== undefined
        ? String(initialData.salaryMin)
        : "",
    salaryMax:
      initialData?.salaryMax !== undefined
        ? String(initialData.salaryMax)
        : "",
    applicationDeadline: initialData?.applicationDeadline
      ? new Date(initialData.applicationDeadline)
          .toISOString()
          .split("T")[0]
      : "",
    status: initialData?.status || "OPEN",
  });

  useEffect(() => {
    if (!initialData) return;

    const initialCompanyId =
      typeof initialData.companyId === "object"
        ? initialData.companyId._id
        : initialData.companyId;

    setForm({
      title: initialData.title || "",
      companyId: initialCompanyId || "",
      description: initialData.description || "",
      requirements:
        initialData.requirements?.join(", ") || "",
      skills:
        initialData.skills?.join(", ") || "",
      location: initialData.location || "",
      jobType: initialData.jobType || "FULL_TIME",
      salaryMin:
        initialData.salaryMin !== undefined
          ? String(initialData.salaryMin)
          : "",
      salaryMax:
        initialData.salaryMax !== undefined
          ? String(initialData.salaryMax)
          : "",
      applicationDeadline:
        initialData.applicationDeadline
          ? new Date(initialData.applicationDeadline)
              .toISOString()
              .split("T")[0]
          : "",
      status: initialData.status || "OPEN",
    });
  }, [initialData]);

  const handleChange = (
    e: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const convertToArray = (value: string) => {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const data = {
      title: form.title.trim(),
      companyId: form.companyId,
      description: form.description.trim(),
      requirements: convertToArray(form.requirements),
      skills: convertToArray(form.skills),
      location: form.location.trim(),
      jobType: form.jobType as
        | "FULL_TIME"
        | "PART_TIME"
        | "INTERNSHIP",
      salaryMin: form.salaryMin
        ? Number(form.salaryMin)
        : undefined,
      salaryMax: form.salaryMax
        ? Number(form.salaryMax)
        : undefined,
      applicationDeadline:
        form.applicationDeadline,
    };

   if (initialData) {
  onUpdate?.({
    ...data,
    status: form.status as "OPEN" | "CLOSED",
  });
} else {
  onSubmit(data);
}
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* Basic Information */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
            <BriefcaseBusiness size={20} />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Basic Information
            </h2>

            <p className="text-sm text-slate-500">
              Enter the main details of the job.
            </p>
          </div>
        </div>

        <div className="space-y-5">

          {/* Job Title */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Job Title
            </label>

            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              placeholder="e.g. Software Engineer"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          {/* Company */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Company
            </label>

            <select
              name="companyId"
              value={form.companyId}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            >
              <option value="">
                Select a company
              </option>

              {companies.map((company) => (
                <option
                  key={company._id}
                  value={company._id}
                >
                  {company.name}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Job Description
            </label>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              rows={6}
              placeholder="Describe the role, responsibilities and expectations..."
              className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

        </div>
      </div>

      {/* Requirements & Skills */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">
          Requirements & Skills
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Separate multiple items using commas.
        </p>

        <div className="mt-5 space-y-5">

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Requirements
            </label>

            <textarea
              name="requirements"
              value={form.requirements}
              onChange={handleChange}
              rows={4}
              placeholder="B.Tech degree, Good communication, Problem solving"
              className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Skills
            </label>

            <textarea
              name="skills"
              value={form.skills}
              onChange={handleChange}
              rows={3}
              placeholder="Java, React, Node.js, MongoDB"
              className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

        </div>
      </div>

      {/* Job Details */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">
          Job Details
        </h2>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">

          {/* Location */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Location
            </label>

            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              required
              placeholder="e.g. Hyderabad"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          {/* Job Type */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Job Type
            </label>

            <select
              name="jobType"
              value={form.jobType}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            >
              <option value="FULL_TIME">
                Full Time
              </option>

              <option value="PART_TIME">
                Part Time
              </option>

              <option value="INTERNSHIP">
                Internship
              </option>
            </select>
          </div>

          {/* Minimum Salary */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Minimum Salary
            </label>

            <input
              name="salaryMin"
              type="number"
              min="0"
              value={form.salaryMin}
              onChange={handleChange}
              placeholder="e.g. 500000"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          {/* Maximum Salary */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Maximum Salary
            </label>

            <input
              name="salaryMax"
              type="number"
              min="0"
              value={form.salaryMax}
              onChange={handleChange}
              placeholder="e.g. 900000"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          {/* Deadline */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Application Deadline
            </label>

            <input
              name="applicationDeadline"
              type="date"
              value={form.applicationDeadline}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          {/* Status - Edit only */}
          {initialData && (
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Status
              </label>

              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              >
                <option value="OPEN">
                  Open
                </option>

                <option value="CLOSED">
                  Closed
                </option>
              </select>
            </div>
          )}

        </div>
      </div>

      {/* Submit */}
      <div className="flex justify-end gap-3">
        <button
          type="submit"
          disabled={isSaving}
          className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSaving
            ? "Saving..."
            : submitLabel}
        </button>
      </div>
    </form>
  );
}

export default RecruiterJobForm;