import type { ITopic } from "./topics";

export type Difficulty = "EASY" | "MEDIUM" | "HARD";

export interface IProblem {
  id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  topics: ITopic;
  constraints?: string[];
  inputFormat?: string[];
  outputFormat?: string[];
  createdAt?: string;
}
