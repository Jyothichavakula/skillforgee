import { useState } from "react";
import { Users } from "lucide-react";
import CreateDiscussion from "../../components/community/CreateDiscussion";
import DiscussionCard from "../../components/community/DiscussionCard";
import { useDiscussions } from "../../hooks/useDiscussions";

const Community = () => {
  const [category, setCategory] = useState("");

  const {
    data: discussions = [],
    isLoading,
    isError,
  } = useDiscussions(category || undefined);

  return (
    <div className="space-y-8 max-w-5xl mx-auto p-4 pb-20 md:p-6 lg:p-8">
      {/* Header */}
      <div className="border-b border-neutral-800 pb-6">
        <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-yellow-500 mb-2">
          <Users className="h-4 w-4" />
          Student Community
        </p>

        <h1 className="text-3xl font-extrabold tracking-tight text-white">
          Community
        </h1>

        <p className="mt-2 max-w-2xl text-lg text-neutral-400">
          Ask questions, share experiences, and connect with other students preparing for their careers.
        </p>
      </div>

      {/* Create Discussion */}
      <CreateDiscussion />

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        {[
          ["", "All Discussions"],
          ["GENERAL", "General"],
          ["CAREER", "Career"],
          ["CODING", "Coding"],
          ["INTERVIEW", "Interview"],
          ["PLACEMENT", "Placement"],
        ].map(([value, label]) => (
          <button
            key={value}
            type="button"
            onClick={() => setCategory(value)}
            className={`rounded-full px-5 py-2 text-sm font-bold transition ${
              category === value
                ? "bg-yellow-500 text-black shadow-[0_0_15px_rgba(234,179,8,0.4)]"
                : "bg-neutral-900 border border-neutral-800 text-neutral-400 hover:border-yellow-500/50 hover:text-yellow-400"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Discussions */}
      {isLoading && (
        <div className="py-12 flex flex-col items-center justify-center space-y-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-neutral-800 border-t-yellow-500"></div>
          <div className="text-sm font-bold text-neutral-500">
            Loading discussions...
          </div>
        </div>
      )}

      {isError && (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-6 text-center text-sm font-bold text-red-500">
          Failed to load discussions.
        </div>
      )}

      {!isLoading && !isError && discussions.length === 0 && (
        <div className="rounded-2xl border border-neutral-800/90 bg-[#121215] p-16 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-900 border border-neutral-800 text-neutral-500">
            <Users className="h-8 w-8" />
          </div>
          <p className="text-xl font-bold text-white">
            No discussions found.
          </p>

          <p className="mt-2 text-sm text-neutral-400">
            Be the first to start a discussion!
          </p>
        </div>
      )}

      <div className="space-y-5">
        {discussions.map((discussion) => (
          <DiscussionCard
            key={discussion._id}
            discussion={discussion}
          />
        ))}
      </div>
    </div>
  );
};

export default Community;