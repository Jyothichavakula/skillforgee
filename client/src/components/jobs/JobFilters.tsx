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
    <div className="grid gap-6 rounded-2xl border border-neutral-800/90 bg-[#121215] p-6 shadow-sm md:grid-cols-3">
      {/* Search */}
      <div>
        <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-neutral-400">
          Search
        </label>

        <input
          type="text"
          value={search}
          onChange={(e) =>
            onSearchChange(e.target.value)
          }
          placeholder="Search jobs..."
          className="w-full rounded-xl border border-neutral-800 bg-neutral-900/90 px-4 py-3 text-sm text-white placeholder-neutral-500 outline-none transition focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/20"
        />
      </div>

      {/* Location */}
      <div>
        <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-neutral-400">
          Location
        </label>

        <input
          type="text"
          value={location}
          onChange={(e) =>
            onLocationChange(e.target.value)
          }
          placeholder="e.g. Hyderabad"
          className="w-full rounded-xl border border-neutral-800 bg-neutral-900/90 px-4 py-3 text-sm text-white placeholder-neutral-500 outline-none transition focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/20"
        />
      </div>

      {/* Job Type */}
      <div>
        <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-neutral-400">
          Job Type
        </label>

        <select
          value={jobType}
          onChange={(e) =>
            onJobTypeChange(
              e.target.value as JobType | ""
            )
          }
          className="w-full rounded-xl border border-neutral-800 bg-neutral-900/90 px-4 py-3 text-sm text-white outline-none transition focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/20"
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