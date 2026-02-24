export interface TestCase {
  input: string;
  expectedOutput: string;
  explanation?: string;
  comparison?: "exact" | "contains";
}

export interface ISubmission {
  problemId: string;
  language: string;
  code: string;
}

export type Language = "java" | "c++";

export interface LanguageOption {
  label: string;
  value: Language;
  snippet: string;
}
