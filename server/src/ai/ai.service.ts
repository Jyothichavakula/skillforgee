import { GoogleGenAI } from "@google/genai";

export interface AIMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface AIResponse {
  content: string;
}

const getGeminiClient = (): GoogleGenAI => {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error(
      "GEMINI_API_KEY is not defined"
    );
  }

  return new GoogleGenAI({
    apiKey,
  });
};

export const generateAIResponse = async (
  messages: AIMessage[]
): Promise<AIResponse> => {
  const client = getGeminiClient();

  const systemMessage = messages.find(
    (message) => message.role === "system"
  );

  const conversationMessages = messages
    .filter(
      (message) => message.role !== "system"
    )
    .map(
      (message) =>
        `${message.role.toUpperCase()}: ${message.content}`
    )
    .join("\n\n");

  const prompt = `
${systemMessage?.content ?? ""}

${conversationMessages}
`;

  const response =
    await client.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents: prompt,
    });

  return {
    content: response.text ?? "",
  };
};