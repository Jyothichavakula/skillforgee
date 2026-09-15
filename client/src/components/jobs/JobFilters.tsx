import type { JobType } from "../../api/job.api";

interface JobFiltersProps {
  search: string;
  location: string;
  jobType: JobType | "";
  onSearchChange: (value: string) => void;
  onLocationChange: (value: string) => void;
  onJobTypeChange: (value: JobType | "") => void;
}

function JobFilters({
  search,
  location,
  jobType,
  onSearchChange,
  onLocationChange,
  onJobTypeChange,
}: JobFiltersProps) {
  return (
    <div className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-5 md:grid-cols-3">
      {/* Search */}
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Search
        </label>

        <input
          type="text"
          value={search}
          onChange={(e) =>
            onSearchChange(e.target.value)
          }
          placeholder="Search jobs..."
          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500"
        />
      </div>

      {/* Location */}
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Location
        </label>

        <input
          type="text"
          value={location}
          onChange={(e) =>
            onLocationChange(e.target.value)
          }
          placeholder="e.g. Hyderabad"
          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500"
        />
      </div>

      {/* Job Type */}
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Job Type
        </label>

        <select
          value={jobType}
          onChange={(e) =>
            onJobTypeChange(
              e.target.value as JobType | ""
            )
          }
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500"
        >
          <option value="">All Types</option>
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
    </div>
  );
}

export default JobFilters;