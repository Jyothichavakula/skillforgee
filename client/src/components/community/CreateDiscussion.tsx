import { useState } from "react";
import type { FormEvent } from "react";
import { useCreateDiscussion } from "../../hooks/useDiscussions";

interface CreateDiscussionProps {
  onCreated?: () => void;
}

const CreateDiscussion = ({
  onCreated,
}: CreateDiscussionProps) => {
  const createMutation = useCreateDiscussion();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("GENERAL");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!title.trim() || !content.trim()) {
      return;
    }

    createMutation.mutate(
      {
        title: title.trim(),
        content: content.trim(),
        category,
      },
      {
        onSuccess: () => {
          setTitle("");
          setContent("");
          setCategory("GENERAL");
          onCreated?.();
        },
      }
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-neutral-800/90 bg-[#121215] p-6 shadow-sm md:p-8"
    >
      <div className="border-b border-neutral-800 pb-4 mb-6">
        <h2 className="text-xl font-bold text-white">
          Start a Discussion
        </h2>
      </div>

      <div className="space-y-6">
        <div>
          <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-neutral-400">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full rounded-xl border border-neutral-800 bg-neutral-900/90 px-4 py-3 text-sm text-white placeholder-neutral-500 outline-none transition focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/20"
          />
        </div>

        <div>
          <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-neutral-400">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-xl border border-neutral-800 bg-neutral-900/90 px-4 py-3 text-sm text-white outline-none transition focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/20"
          >
            <option value="GENERAL">General</option>
            <option value="CAREER">Career</option>
            <option value="CODING">Coding</option>
            <option value="INTERVIEW">Interview</option>
            <option value="PLACEMENT">Placement</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-neutral-400">
            Content
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share your question or idea in detail..."
            rows={5}
            className="w-full resize-none rounded-xl border border-neutral-800 bg-neutral-900/90 px-4 py-3 text-sm text-white placeholder-neutral-500 outline-none transition focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/20"
          />
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={
              createMutation.isPending ||
              !title.trim() ||
              !content.trim()
            }
            className="rounded-xl bg-yellow-500 px-6 py-3.5 text-sm font-extrabold text-black transition hover:bg-yellow-400 hover:shadow-[0_0_15px_rgba(234,179,8,0.3)] disabled:cursor-not-allowed disabled:opacity-40"
          >
            {createMutation.isPending
              ? "Posting..."
              : "Post Discussion"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default CreateDiscussion;