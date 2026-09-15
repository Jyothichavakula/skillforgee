import type {
  ProblemDifficulty,
} from "../../api/problem.api";

interface ProblemFiltersProps {
  search: string;
  difficulty: ProblemDifficulty | "";
  topic: string;
  company: string;

  onSearchChange: (value: string) => void;
  onDifficultyChange: (
    value: ProblemDifficulty | ""
  ) => void;
  onTopicChange: (value: string) => void;
  onCompanyChange: (value: string) => void;
}

function ProblemFilters({
  search,
  difficulty,
  topic,
  company,
  onSearchChange,
  onDifficultyChange,
  onTopicChange,
  onCompanyChange,
}: ProblemFiltersProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Search */}
        <div>
          <label
            htmlFor="problem-search"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Search
          </label>

          <input
            id="problem-search"
            type="text"
            value={search}
            onChange={(event) =>
              onSearchChange(event.target.value)
            }
            placeholder="Search problems..."
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        {/* Difficulty */}
        <div>
          <label
            htmlFor="problem-difficulty"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Difficulty
          </label>

          <select
            id="problem-difficulty"
            value={difficulty}
            onChange={(event) =>
              onDifficultyChange(
                event.target.value as
                  | ProblemDifficulty
                  | ""
              )
            }
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          >
            <option value="">
              All Difficulties
            </option>

            <option value="EASY">
              Easy
            </option>

            <option value="MEDIUM">
              Medium
            </option>

            <option value="HARD">
              Hard
            </option>
          </select>
        </div>

        {/* Topic */}
        <div>
          <label
            htmlFor="problem-topic"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Topic
          </label>

          <input
            id="problem-topic"
            type="text"
            value={topic}
            onChange={(event) =>
              onTopicChange(event.target.value)
            }
            placeholder="e.g. ARRAY"
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm uppercase outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        {/* Company */}
        <div>
          <label
            htmlFor="problem-company"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Company
          </label>

          <input
            id="problem-company"
            type="text"
            value={company}
            onChange={(event) =>
              onCompanyChange(event.target.value)
            }
            placeholder="e.g. HSBC"
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </div>
      </div>
    </div>
  );
}

export default ProblemFilters;