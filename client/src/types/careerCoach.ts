export type CareerCoachMessageRole =
  | "USER"
  | "ASSISTANT";

export interface CareerCoachMessage {
  id: string;
  role: CareerCoachMessageRole;
  content: string;
  createdAt: string;
}