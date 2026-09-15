import { Link } from "react-router-dom";
import { MessageCircle, Heart } from "lucide-react";
import type { Discussion } from "../../api/discussion.api";

interface DiscussionCardProps {
  discussion: Discussion;
}

const DiscussionCard = ({
  discussion,
}: DiscussionCardProps) => {
  const author =
    typeof discussion.authorId === "object"
      ? discussion.authorId.name
      : "Student";

  const likesCount = discussion.likes?.length || 0;
  const commentsCount = discussion.comments?.length || 0;

  return (
    <Link
      to={`/student/community/${discussion._id}`}
      className="group block rounded-2xl border border-neutral-800/90 bg-[#121215] p-6 shadow-sm transition duration-300 hover:border-yellow-500/30 hover:bg-neutral-900/50 hover:shadow-[0_4px_20px_rgba(234,179,8,0.05)]"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <span className="inline-block rounded-lg bg-neutral-900 border border-neutral-800 px-3 py-1 text-xs font-bold uppercase tracking-wide text-neutral-400 group-hover:border-yellow-500/20 group-hover:text-yellow-500/70 transition">
            {discussion.category}
          </span>

          <h3 className="mt-4 text-xl font-bold text-white group-hover:text-yellow-400 transition">
            {discussion.title}
          </h3>

          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-neutral-400">
            {discussion.content}
          </p>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-neutral-800/60 pt-4 text-xs font-bold text-neutral-500">
        <span className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-neutral-800 text-white">
            {author?.charAt(0).toUpperCase() || "S"}
          </span>
          By {author || "Student"}
        </span>

        <div className="flex items-center gap-5">
          <span className="flex items-center gap-1.5 transition group-hover:text-pink-500">
            <Heart size={16} />
            {likesCount}
          </span>

          <span className="flex items-center gap-1.5 transition group-hover:text-blue-400">
            <MessageCircle size={16} />
            {commentsCount}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default DiscussionCard;