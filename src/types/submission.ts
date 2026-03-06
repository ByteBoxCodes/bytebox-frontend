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

export interface SubmissionTestCase {
  input: string;
  expectedOutput: string;
  userOutput: string | null;
  status: "PASSED" | "WRONG_ANSWER" | "RUNTIME_ERROR" | "TIME_LIMIT_EXCEEDED";
}

export interface ISubmissionResponse {
  id: string;
  submissionId?: string;
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
  testCases?: SubmissionTestCase[];
  problemId: string;
  problemTitle: string;
  userId: string;
  submittedAt: string;
}

export type Language = "java" | "cpp" | "c++" | "c";

export interface LanguageOption {
  label: string;
  value: Language;
  snippet: string;
}
