import { useState } from "react";
import type { FormEvent } from "react";
import {
  Bot,
  Send,
  Sparkles,
} from "lucide-react";

import {
  useCareerCoach,
} from "../../hooks/useCareerCoach";

import ChatMessage from "../../components/careerCoach/ChatMessage";

import type {
  CareerCoachMessage,
} from "../../types/careerCoach";

function CareerCoach() {
  const [message, setMessage] =
    useState("");

  const [targetCompany, setTargetCompany] =
    useState("");

  const [messages, setMessages] =
    useState<CareerCoachMessage[]>([]);

  const {
    mutateAsync,
    isPending,
  } = useCareerCoach();

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const trimmedMessage =
      message.trim();

    if (!trimmedMessage || isPending) {
      return;
    }

    const userMessage: CareerCoachMessage = {
      id: crypto.randomUUID(),
      role: "USER",
      content: trimmedMessage,
      createdAt:
        new Date().toISOString(),
    };

    setMessages((previous) => [
      ...previous,
      userMessage,
    ]);

    setMessage("");

    try {
      const response =
        await mutateAsync({
          message: trimmedMessage,
          targetCompany:
            targetCompany.trim() ||
            undefined,
        });

      const assistantMessage: CareerCoachMessage =
        {
          id: crypto.randomUUID(),
          role: "ASSISTANT",
          content: response.reply && response.reply.trim()
            ? response.reply
            : "I'm unable to provide a response at the moment. Please try again.",
          createdAt:
            new Date().toISOString(),
        };

      setMessages((previous) => [
        ...previous,
        assistantMessage,
      ]);
    } catch (error: unknown) {
      const axiosError = error as { response?: { data?: { message?: string } } };
      const errorMessage: CareerCoachMessage =
        {
          id: crypto.randomUUID(),
          role: "ASSISTANT",
          content:
            axiosError?.response?.data?.message ||
            "I couldn't process your request right now. Please try again.",
          createdAt:
            new Date().toISOString(),
        };

      setMessages((previous) => [
        ...previous,
        errorMessage,
      ]);
    }
  };

  const suggestions = [
    "How should I prepare for technical interviews?",
    "What coding topics should I focus on?",
    "How can I improve my resume?",
    "Create a study plan for my placement preparation.",
  ];

  return (
    <div className="flex min-h-[calc(100vh-120px)] flex-col gap-6">
      {/* Header */}
      <section>
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-400/10 text-yellow-400 border border-yellow-400/20 shadow-sm shadow-yellow-500/10">
            <Sparkles size={24} />
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-yellow-400">
              AI-Powered Guidance
            </p>

            <h1 className="text-3xl font-extrabold tracking-tight text-white">
              Career Coach
            </h1>
          </div>
        </div>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-400">
          Get personalized career guidance based on your profile, coding progress, roadmap, applications, and placement goals.
        </p>
      </section>

      {/* Main */}
      <div className="grid flex-1 gap-6 lg:grid-cols-4">
        {/* Settings / Suggestions */}
        <aside className="space-y-5 lg:col-span-1">
          <div className="rounded-2xl border border-neutral-800/90 bg-[#121215] p-5 shadow-sm">
            <label
              htmlFor="target-company"
              className="text-xs font-semibold uppercase tracking-wider text-neutral-300"
            >
              Target Company
            </label>

            <input
              id="target-company"
              value={targetCompany}
              onChange={(event) =>
                setTargetCompany(
                  event.target.value
                )
              }
              placeholder="e.g. Google, Amazon, HSBC"
              className="mt-2 w-full rounded-xl border border-neutral-800 bg-neutral-900/90 px-3 py-2.5 text-sm text-white placeholder-neutral-500 outline-none transition focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/20"
            />
          </div>

          <div className="rounded-2xl border border-neutral-800/90 bg-[#121215] p-5 shadow-sm">
            <div className="flex items-center gap-2">
              <Bot
                size={18}
                className="text-yellow-400"
              />

              <h2 className="text-sm font-bold text-white">
                Ask me about
              </h2>
            </div>

            <div className="mt-4 space-y-2">
              {suggestions.map(
                (suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() =>
                      setMessage(
                        suggestion
                      )
                    }
                    className="w-full rounded-xl border border-neutral-800/70 bg-neutral-900/60 px-3 py-2.5 text-left text-xs leading-5 text-neutral-300 transition hover:border-yellow-400/40 hover:bg-neutral-900 hover:text-yellow-400"
                  >
                    {suggestion}
                  </button>
                )
              )}
            </div>
          </div>
        </aside>

        {/* Chat */}
        <section className="flex min-h-[600px] flex-col overflow-hidden rounded-2xl border border-neutral-800/90 bg-[#121215] shadow-sm lg:col-span-3">
          {/* Chat Header */}
          <div className="border-b border-neutral-800 p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-400 to-amber-500 text-black font-bold shadow-md shadow-yellow-500/20">
                <Bot size={20} />
              </div>

              <div>
                <h2 className="font-bold text-white">
                  SkillForge AI Coach
                </h2>

                <p className="text-xs text-neutral-400">
                  Personalized career guidance
                </p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-5 overflow-y-auto p-5 md:p-6">
            {messages.length === 0 ? (
              <div className="flex h-full min-h-[400px] flex-col items-center justify-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-400/10 text-yellow-400 border border-yellow-400/20">
                  <Sparkles size={30} />
                </div>

                <h2 className="mt-5 text-xl font-bold text-white">
                  How can I help you today?
                </h2>

                <p className="mt-2 max-w-md text-sm leading-6 text-neutral-400">
                  Ask me about interview preparation, coding practice, career planning, resume improvement, or your target company.
                </p>
              </div>
            ) : (
              messages.map((item) => (
                <ChatMessage
                  key={item.id}
                  message={item}
                />
              ))
            )}

            {isPending && (
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-yellow-400/10 text-yellow-400 border border-yellow-400/20">
                  <Bot size={18} />
                </div>

                <div className="rounded-2xl border border-neutral-800 bg-neutral-900 px-4 py-3">
                  <div className="flex gap-1.5">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-yellow-400" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-yellow-400 [animation-delay:150ms]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-yellow-400 [animation-delay:300ms]" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="border-t border-neutral-800 p-4"
          >
            <div className="flex items-end gap-3">
              <textarea
                value={message}
                onChange={(event) =>
                  setMessage(
                    event.target.value
                  )
                }
                onKeyDown={(event) => {
                  if (
                    event.key === "Enter" &&
                    !event.shiftKey
                  ) {
                    event.preventDefault();

                    event.currentTarget.form?.requestSubmit();
                  }
                }}
                rows={2}
                placeholder="Ask your career coach anything..."
                className="min-h-[52px] flex-1 resize-none rounded-xl border border-neutral-800 bg-neutral-900/90 px-4 py-3 text-sm text-white placeholder-neutral-500 outline-none transition focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/20"
              />

              <button
                type="submit"
                disabled={
                  isPending ||
                  !message.trim()
                }
                className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-xl bg-yellow-400 text-black font-bold shadow-md shadow-yellow-500/20 transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Send size={19} />
              </button>
            </div>

            <p className="mt-2 text-center text-xs text-neutral-500">
              Press Enter to send • Shift + Enter for a new line
            </p>
          </form>
        </section>
      </div>
    </div>
  );
}

export default CareerCoach;