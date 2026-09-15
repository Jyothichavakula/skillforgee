import {
  Bot,
  User,
} from "lucide-react";

import type {
  CareerCoachMessage as CareerCoachMessageType,
} from "../../types/careerCoach";

interface ChatMessageProps {
  message: CareerCoachMessageType;
}

function ChatMessage({
  message,
}: ChatMessageProps) {
  const isUser =
    message.role === "USER";

  return (
    <div
      className={`flex gap-3 ${
        isUser
          ? "justify-end"
          : "justify-start"
      }`}
    >
      {!isUser && (
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-yellow-400/10 text-yellow-400 border border-yellow-400/30">
          <Bot size={18} />
        </div>
      )}

      <div
        className={`max-w-[80%] rounded-2xl px-4.5 py-3 text-sm leading-6 ${
          isUser
            ? "bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-medium shadow-md shadow-yellow-500/10"
            : "bg-neutral-900/90 border border-neutral-800 text-neutral-200"
        }`}
      >
        <p className="whitespace-pre-line">
          {message.content}
        </p>
      </div>

      {isUser && (
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-neutral-800 text-white border border-neutral-700">
          <User size={18} />
        </div>
      )}
    </div>
  );
}

export default ChatMessage;