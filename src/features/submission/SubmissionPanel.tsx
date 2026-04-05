import { useState, useEffect, useCallback, useMemo } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { cpp } from "@codemirror/lang-cpp";
import { java } from "@codemirror/lang-java";
import { python } from "@codemirror/lang-python";
import { EditorView } from "@codemirror/view";
import { closeBrackets } from "@codemirror/autocomplete";
import type { Language, ISubmissionResponse } from "@/types/submission";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { TerminalSquare } from "lucide-react";

import type { IProblem } from "@/types/problems";
import { languageOptions } from "./languageOptions";
import { BOILERPLATES } from "@/constants/boilerplates";
import { useCodeStorage } from "@/hooks/useCodeStorage";
import EditorToolbar from "./EditorToolbar";
import TestCasesTab from "./TestCasesTab";
import TestResultTab from "./TestResultTab";
import { useTheme } from "@/context/ThemeContext";
import { useMediaQuery } from "@/hooks/useMediaQuery";

/* ── language → CodeMirror extension mapping ── */
function getLanguageExtension(lang: Language) {
  switch (lang) {
    case "c":
    case "cpp":
      return cpp();
    case "java":
      return java();
    case "python":
      return python();
    default:
      return cpp();
  }
}

/* ── custom light theme (matches VS Code light feel) ── */
const lightTheme = EditorView.theme(
  {
    "&": {
      backgroundColor: "var(--bg-secondary)",
      color: "var(--text-primary)",
    },
    ".cm-gutters": {
      backgroundColor: "var(--bg-secondary)",
      color: "var(--text-tertiary)",
      border: "none",
    },
    ".cm-activeLineGutter": {
      backgroundColor: "transparent",
    },
  },
  { dark: false },
);

interface SubmissionPanelProps {
  problemId?: string;
  question?: IProblem;
  defaultCode?: string;
  onRunTest: (language: Language, code: string) => Promise<void>;
  onSubmit: (language: Language, code: string) => Promise<void>;
  isRunning: boolean;
  isSubmitting: boolean;
  submissionResult?: any;
  submissionError?: any;
  submissions?: ISubmissionResponse[];
}

const defaultSnippets = Object.fromEntries(
  languageOptions.map((opt) => [opt.value, opt.snippet]),
) as Record<Language, string>;

export default function SubmissionPanel({
  problemId,
  question,
  onRunTest,
  onSubmit,
  isRunning,
  isSubmitting,
  submissionResult,
  submissionError,
  submissions,
}: SubmissionPanelProps) {
  // Derive default language from localStorage, fallback to cpp if none or invalid
  const [initialLang] = useState<Language>(() => {
    try {
      const raw = localStorage.getItem("preferredLanguage");
      if (!raw) return "cpp";

      let normalized = raw.toLowerCase().trim();
      // Handle common "c++" vs "cpp" mismatch
      if (normalized === "c++") normalized = "cpp";

      // Verify the computed language is supported
      const isValid = languageOptions.some((opt) => opt.value === normalized);
      return isValid ? (normalized as Language) : "cpp";
    } catch {
      return "cpp";
    }
  });

  const { code, setCode, language, changeLanguage, markSolved, saveStatus } =
    useCodeStorage(problemId, defaultSnippets, initialLang, submissions);
  const [activeTab, setActiveTab] = useState<"testcases" | "test-result">(
    "testcases",
  );
  const isMobile = useMediaQuery("(max-width: 1023px)");
  const { theme } = useTheme();

  const handleCodeChange = useCallback(
    (value: string) => {
      setCode(value || "");
    },
    [setCode],
  );

  // Mark as solved when submission is ACCEPTED
  useEffect(() => {
    if (
      submissionResult &&
      (submissionResult.status === "ACCEPTED" ||
        (submissionResult.passedTestCases !== undefined &&
          Number(submissionResult.passedTestCases) ===
            Number(submissionResult.totalTestCases)))
    ) {
      markSolved(code, language);
    }
  }, [submissionResult]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleRunTestClick = () => {
    setActiveTab("test-result");
    onRunTest(language === "cpp" ? "c++" : language, code);
  };

  const handleSubmitClick = () => {
    setActiveTab("test-result");
    onSubmit(language === "cpp" ? "c++" : language, code);
  };

  const handleLanguageChange = (value: Language) => {
    changeLanguage(value);
    const newCode = defaultSnippets[value];
    setCode(newCode);
  };

  const displayTestCases = question?.sampleTestCases?.length
    ? question.sampleTestCases
    : question?.testCases?.length
      ? question.testCases
      : [];

  const handleInsertBoilerplate = () => {
    const newCode = BOILERPLATES[language];
    setCode(newCode);
  };

  const handleResetCode = () => {
    const newCode = defaultSnippets[language];
    setCode(newCode);
  };

  /* ── Shared editor extensions (memoized to prevent re-init) ── */
  const editorFontSize = isMobile ? 13 : 14;
  const editorPadding = isMobile ? 12 : 16;

  const extensions = useMemo(
    () => [
      getLanguageExtension(language),
      closeBrackets(),
      EditorView.lineWrapping,
      EditorView.theme({
        "&": { fontSize: `${editorFontSize}px` },
        ".cm-content": {
          fontFamily:
            "'JetBrains Mono', 'Fira Code', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
          padding: `${editorPadding}px 0`,
        },
        ".cm-scroller": { overflow: "auto" },
      }),
    ],
    [language, editorFontSize, editorPadding],
  );

  const editorTheme = theme === "light" ? lightTheme : vscodeDark;

  const basicSetup = useMemo(
    () => ({
      lineNumbers: true,
      highlightActiveLineGutter: true,
      highlightActiveLine: true,
      foldGutter: true,
      autocompletion: true,
      bracketMatching: true,
      indentOnInput: true,
      tabSize: 4,
    }),
    [],
  );

  /* ── Reusable editor component ── */
  const renderEditor = () => (
    <CodeMirror
      value={code}
      onChange={handleCodeChange}
      theme={editorTheme}
      extensions={extensions}
      basicSetup={basicSetup}
      style={{ height: "100%", overflow: "auto" }}
      autoFocus
    />
  );

  return (
    <div className="flex flex-col h-full bg-(--bg-secondary)">
      {/* Top Bar */}
      <EditorToolbar
        language={language}
        onLanguageChange={handleLanguageChange}
        onSubmit={handleSubmitClick}
        onRunTest={handleRunTestClick}
        onInsertBoilerplate={handleInsertBoilerplate}
        onResetCode={handleResetCode}
        isRunning={isRunning}
        isSubmitting={isSubmitting}
        saveStatus={saveStatus}
      />

      {/* Editor & Bottom Panel */}
      <div
        className={`${isMobile ? "" : "flex-1 min-h-0"} relative flex flex-col bg-(--bg-secondary)`}
      >
        {isMobile ? (
          /* ── Mobile: stacked layout with fixed editor height ── */
          <>
            {/* Code Editor */}
            <div className="h-[50vh] relative border-b border-(--dk-border) bg-(--bg-secondary)">
              {renderEditor()}
            </div>

            {/* Bottom Panel: Test Cases / Results */}
            <div className="bg-(--bg-secondary) flex flex-col font-pj">
              {/* Tab Header */}
              <div className="px-2 sm:px-4 py-[6px] border-b border-(--border-primary) flex items-center gap-4 bg-(--bg-tertiary)/30">
                <button
                  onClick={() => setActiveTab("testcases")}
                  className={`text-[13px] font-bold tracking-wide pb-1.5 -mb-[7px] flex items-center gap-2 transition-colors ${
                    activeTab === "testcases"
                      ? "text-(--text-primary) border-b-2 border-emerald-500"
                      : "text-(--text-tertiary) hover:text-(--text-secondary) border-b-2 border-transparent"
                  }`}
                >
                  <TerminalSquare className="w-4 h-4" />
                  Testcases
                </button>
                <button
                  onClick={() => setActiveTab("test-result")}
                  className={`text-[13px] font-bold tracking-wide pb-1.5 -mb-[7px] transition-colors ${
                    activeTab === "test-result"
                      ? "text-(--text-primary) border-b-2 border-emerald-500"
                      : "text-(--text-tertiary) hover:text-(--text-secondary) border-b-2 border-transparent"
                  }`}
                >
                  Test Result
                </button>
              </div>

              {/* Tab Body */}
              <div className="overflow-auto p-3 min-h-[120px]">
                {activeTab === "testcases" ? (
                  displayTestCases.length > 0 ? (
                    <TestCasesTab testCases={displayTestCases} />
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm font-medium text-(--text-tertiary)">
                      No test cases available for this
                    </div>
                  )
                ) : (
                  <div>
                    <TestResultTab
                      isSubmitting={isSubmitting}
                      isRunning={isRunning}
                      submissionResult={submissionResult}
                      submissionError={submissionError}
                    />
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          /* ── Desktop: resizable vertical split ── */
          <ResizablePanelGroup orientation="vertical">
            {/* Code Editor */}
            <ResizablePanel defaultSize={60} minSize={30}>
              <div className="h-full relative border-b border-(--dk-border) bg-(--bg-secondary)">
                {renderEditor()}
              </div>
            </ResizablePanel>

            <ResizableHandle
              withHandle
              className="bg-(--border-primary) hover:bg-(--text-tertiary)/30 transition-colors h-1.5 flex items-center justify-center"
            />

            {/* Bottom Panel: Test Cases / Results */}
            <ResizablePanel defaultSize={40} minSize={15}>
              <div className="h-full bg-(--bg-secondary) flex flex-col font-pj">
                {/* Tab Header */}
                <div className="px-4 py-[6px] border-b border-(--border-primary) flex items-center gap-4 bg-(--bg-tertiary)/30">
                  <button
                    onClick={() => setActiveTab("testcases")}
                    className={`text-[13px] font-bold tracking-wide pb-1.5 -mb-[7px] flex items-center gap-2 transition-colors ${
                      activeTab === "testcases"
                        ? "text-(--text-primary) border-b-2 border-emerald-500"
                        : "text-(--text-tertiary) hover:text-(--text-secondary) border-b-2 border-transparent"
                    }`}
                  >
                    <TerminalSquare className="w-4 h-4" />
                    Testcases
                  </button>
                  <button
                    onClick={() => setActiveTab("test-result")}
                    className={`text-[13px] font-bold tracking-wide pb-1.5 -mb-[7px] transition-colors ${
                      activeTab === "test-result"
                        ? "text-(--text-primary) border-b-2 border-emerald-500"
                        : "text-(--text-tertiary) hover:text-(--text-secondary) border-b-2 border-transparent"
                    }`}
                  >
                    Test Result
                  </button>
                </div>

                {/* Tab Body */}
                <div className="flex-1 overflow-auto p-5">
                  {activeTab === "testcases" ? (
                    displayTestCases.length > 0 ? (
                      <TestCasesTab testCases={displayTestCases} />
                    ) : (
                      <div className="flex h-full items-center justify-center text-sm font-medium text-(--text-tertiary)">
                        No test cases available for this
                      </div>
                    )
                  ) : (
                    <div className="h-full">
                      <TestResultTab
                        isSubmitting={isSubmitting}
                        isRunning={isRunning}
                        submissionResult={submissionResult}
                        submissionError={submissionError}
                      />
                    </div>
                  )}
                </div>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        )}
      </div>
    </div>
  );
}
