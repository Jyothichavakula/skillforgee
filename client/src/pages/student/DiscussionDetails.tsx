import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Heart,
  MessageCircle,
  Send,
  Trash2,
} from "lucide-react";

import {
  useAddComment,
  useDeleteComment,
  useDiscussion,
  useDeleteDiscussion,
  useToggleDiscussionLike,
} from "../../hooks/useDiscussions";

const DiscussionDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [comment, setComment] = useState("");

  const {
    data: discussion,
    isLoading,
    isError,
  } = useDiscussion(id || "");

  const likeMutation = useToggleDiscussionLike();
  const commentMutation = useAddComment();
  const deleteCommentMutation = useDeleteComment();
  const deleteDiscussionMutation = useDeleteDiscussion();

  if (isLoading) {
    return (
      <div className="mx-auto max-w-4xl space-y-6 p-4 md:p-6 lg:p-8">
        <div className="h-8 w-32 animate-pulse rounded bg-neutral-800" />
        <div className="h-64 animate-pulse rounded-2xl bg-[#121215]" />
        <div className="h-48 animate-pulse rounded-2xl bg-[#121215]" />
      </div>
    );
  }

  if (isError || !discussion) {
    return (
      <div className="mx-auto max-w-4xl space-y-6 p-4 md:p-6 lg:p-8">
        <button
          type="button"
          onClick={() => navigate("/student/community")}
          className="flex items-center gap-2 text-sm font-bold text-neutral-400 hover:text-yellow-400 transition"
        >
          <ArrowLeft size={17} />
          Back to Community
        </button>

        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-10 text-center">
          <p className="text-sm font-bold text-red-500">
            Failed to load this discussion.
          </p>
        </div>
      </div>
    );
  }

  const author =
    typeof discussion.authorId === "object"
      ? discussion.authorId.name
      : "Student";

  const likesCount = discussion.likes?.length || 0;
  const comments = discussion.comments || [];

  const handleLike = () => {
    likeMutation.mutate(discussion._id);
  };

  const handleComment = (event: FormEvent) => {
    event.preventDefault();

    if (!comment.trim()) return;

    commentMutation.mutate(
      {
        id: discussion._id,
        data: {
          content: comment.trim(),
        },
      },
      {
        onSuccess: () => {
          setComment("");
        },
      }
    );
  };

  const handleDeleteComment = (commentId: string) => {
    deleteCommentMutation.mutate(commentId);
  };

  const handleDeleteDiscussion = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this discussion?"
    );

    if (!confirmed) return;

    deleteDiscussionMutation.mutate(discussion._id, {
      onSuccess: () => {
        navigate("/student/community");
      },
    });
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-4 pb-20 md:p-6 lg:p-8">
      {/* Back */}
      <button
        type="button"
        onClick={() => navigate("/student/community")}
        className="flex items-center gap-2 text-sm font-bold text-neutral-400 transition hover:text-yellow-400"
      >
        <ArrowLeft size={17} />
        Back to Community
      </button>

      {/* Discussion */}
      <div className="rounded-2xl border border-neutral-800/90 bg-[#121215] p-6 shadow-sm md:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="inline-block rounded-lg bg-neutral-900 border border-neutral-800 px-3 py-1 text-xs font-bold uppercase tracking-wide text-neutral-400">
              {discussion.category}
            </span>

            <h1 className="mt-4 text-3xl font-extrabold text-white">
              {discussion.title}
            </h1>

            <div className="mt-4 flex items-center gap-3 text-sm font-bold text-neutral-500">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-800 text-white">
                {author?.charAt(0).toUpperCase() || "S"}
              </span>
              <span>
                By <span className="text-neutral-300">{author || "Student"}</span> ·{" "}
                {new Date(
                  discussion.createdAt
                ).toLocaleDateString()}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleDeleteDiscussion}
            disabled={deleteDiscussionMutation.isPending}
            className="rounded-xl p-2.5 text-neutral-500 transition hover:bg-red-500/10 hover:text-red-500"
            title="Delete discussion"
          >
            <Trash2 size={18} />
          </button>
        </div>

        <div className="mt-8 whitespace-pre-wrap text-base leading-relaxed text-neutral-300">
          {discussion.content}
        </div>

        {/* Actions */}
        <div className="mt-8 flex items-center gap-6 border-t border-neutral-800 pt-6">
          <button
            type="button"
            onClick={handleLike}
            disabled={likeMutation.isPending}
            className="flex items-center gap-2 text-sm font-bold text-neutral-400 transition hover:text-pink-500"
          >
            <Heart size={20} />
            {likesCount} Likes
          </button>

          <div className="flex items-center gap-2 text-sm font-bold text-neutral-400">
            <MessageCircle size={20} />
            {comments.length} Comments
          </div>
        </div>
      </div>

      {/* Comments */}
      <div className="rounded-2xl border border-neutral-800/90 bg-[#121215] p-6 shadow-sm md:p-8">
        <h2 className="text-xl font-bold text-white mb-6 border-b border-neutral-800 pb-3">
          Comments
        </h2>

        {/* Add Comment */}
        <form
          onSubmit={handleComment}
          className="mb-8 flex gap-3"
        >
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write a comment..."
            className="flex-1 rounded-xl border border-neutral-800 bg-neutral-900/90 px-4 py-3 text-sm text-white placeholder-neutral-500 outline-none transition focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/20"
          />

          <button
            type="submit"
            disabled={
              commentMutation.isPending ||
              !comment.trim()
            }
            className="flex items-center gap-2 rounded-xl bg-yellow-500 px-6 py-3 text-sm font-extrabold text-black transition hover:bg-yellow-400 disabled:cursor-not-allowed disabled:opacity-40 hover:shadow-[0_0_15px_rgba(234,179,8,0.3)]"
          >
            <Send size={16} />
            {commentMutation.isPending
              ? "Posting..."
              : "Post"}
          </button>
        </form>

        {/* Comment List */}
        <div className="space-y-4">
          {comments.length === 0 ? (
            <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-8 text-center">
              <p className="text-sm font-bold text-neutral-500">
                No comments yet. Be the first to comment.
              </p>
            </div>
          ) : (
            comments.map((item) => {
              const commentAuthor =
                typeof item.authorId === "object"
                  ? item.authorId.name
                  : "Student";

              return (
                <div
                  key={item._id}
                  className="rounded-xl border border-neutral-800/50 bg-neutral-900/50 p-5 transition hover:border-neutral-700"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-800 text-xs font-bold text-white">
                        {commentAuthor?.charAt(0).toUpperCase() || "S"}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">
                          {commentAuthor || "Student"}
                        </p>
                        <p className="text-xs font-medium text-neutral-500 mt-0.5">
                          {new Date(
                            item.createdAt
                          ).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        handleDeleteComment(item._id)
                      }
                      className="text-neutral-500 transition hover:text-red-500"
                      title="Delete comment"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <p className="mt-4 text-sm leading-6 text-neutral-300">
                    {item.content}
                  </p>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default DiscussionDetails;