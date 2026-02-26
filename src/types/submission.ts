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

export interface ISubmissionResponse {
  id: string;
  code: string;
  language: string;
  status:
    | "ACCEPTED"
    | "WRONG_ANSWER"
    | "RUNTIME_ERROR"
    | "COMPILATION_ERROR"
    | "TIME_LIMIT_EXCEEDED";
  passedTestCases: number;
  totalTestCases: number;
  problemId: string;
  problemTitle: string;
  userId: string;
  submittedAt: string;
}

export type Language = "java" | "cpp" | "c++";

export interface LanguageOption {
  label: string;
  value: Language;
  snippet: string;
}
