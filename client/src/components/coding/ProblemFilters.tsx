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
    <div className="rounded-2xl border border-neutral-800/90 bg-[#121215] p-5 shadow-sm">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Search */}
        <div>
          <label
            htmlFor="problem-search"
            className="mb-2 block text-xs font-semibold uppercase tracking-wider text-neutral-400"
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
            className="w-full rounded-xl border border-neutral-800 bg-neutral-900/90 px-4 py-3 text-sm text-white placeholder-neutral-500 outline-none transition focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/20"
          />
        </div>

        {/* Difficulty */}
        <div>
          <label
            htmlFor="problem-difficulty"
            className="mb-2 block text-xs font-semibold uppercase tracking-wider text-neutral-400"
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
            className="w-full rounded-xl border border-neutral-800 bg-neutral-900/90 px-4 py-3 text-sm text-white outline-none transition focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/20"
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
            className="mb-2 block text-xs font-semibold uppercase tracking-wider text-neutral-400"
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
            className="w-full rounded-xl border border-neutral-800 bg-neutral-900/90 px-4 py-3 text-sm text-white uppercase placeholder-neutral-500 outline-none transition focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/20"
          />
        </div>

        {/* Company */}
        <div>
          <label
            htmlFor="problem-company"
            className="mb-2 block text-xs font-semibold uppercase tracking-wider text-neutral-400"
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
            placeholder="e.g. Google"
            className="w-full rounded-xl border border-neutral-800 bg-neutral-900/90 px-4 py-3 text-sm text-white placeholder-neutral-500 outline-none transition focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/20"
          />
        </div>
      </div>
    </div>
  );
}

export default ProblemFilters;