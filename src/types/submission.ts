export interface TestCase {
  input: string;
  expectedOutput: string;
  explanation?: string;
  comparison?: "exact" | "contains";
}

export interface Question {
  id: number;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  points: number;
  isCompleted: boolean;
  description: string; // HTML or Markdown string if needed, currently plain text in existing code
  inputFormat?: string[];
  outputFormat?: string[];
  constraints?: string[];
  testCases: TestCase[];
  tips?: string[];
  tags?: string[];
}

export type Language = "java" | "cpp";

export interface LanguageOption {
  label: string;
  value: Language;
  snippet: string;
}
