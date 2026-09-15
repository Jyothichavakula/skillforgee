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
    throw new Error("GEMINI_API_KEY is not defined");
  }

  return new GoogleGenAI({ apiKey });
};

export const generateAIResponse = async (
  messages: AIMessage[]
): Promise<AIResponse> => {
  const client = getGeminiClient();

  // Extract system message to use as systemInstruction
  const systemMessage = messages.find((m) => m.role === "system");

  // Build the conversation contents — only user/assistant turns
  const conversationTurns = messages.filter((m) => m.role !== "system");

  // Map to the SDK's Content format (role: "user" | "model")
  const contents = conversationTurns.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

  const response = await client.models.generateContent({
    // Updated to the currently available model
    model: "gemini-3.6-flash",
    contents,
    config: systemMessage?.content
      ? {
          systemInstruction: systemMessage.content,
        }
      : undefined,
  });

  return {
    content: response.text ?? "",
  };
};