import type { ITopic } from "./topics";
import type { TestCase } from "./submission";

export type Difficulty = "EASY" | "MEDIUM" | "HARD";

export interface IProblem {
  id: string;
  title: string;
  constraints: string;
  description: string;
  difficulty: Difficulty;
  topic: ITopic;
  createdAt?: string;
  requiredKeywords?: string;
  orderIndex?: number;
  isActive?: boolean;
  testCases?: TestCase[];
  sampleTestCases?: TestCase[];
}
