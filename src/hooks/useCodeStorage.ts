import { useState, useEffect, useRef, useCallback } from "react";
import type { Language, ISubmissionResponse } from "@/types/submission";
import { touchLocalStorageKey } from "@/utils/storageCleanup";

const DRAFT_PREFIX = "bytebox_draft_";
const SOLVED_PREFIX = "bytebox_solved_";
const LANG_PREF_KEY = "bytebox_preferred_lang";
const DEBOUNCE_MS = 1000;

interface StoredCodeState {
  codeByLang: Record<string, string>;
  language: Language;
}

/**
 * Two-tier code persistence per problem:
 *
 * ── UNSOLVED problems ──
 *   localStorage (debounced 2s) stores draft code per language.
 *   Persists across reloads & navigation. Cleared on ACCEPTED.
 *
 * ── SOLVED problems ──
 *   sessionStorage stores the accepted code (survives reload).
 *   On navigation away → sessionStorage is cleared automatically by the browser
 *   when the tab closes, or explicitly on unmount. On next visit, the latest
 *   accepted submission code is loaded from the `submissions` data.
 */
export function useCodeStorage(
  problemId: string | undefined,
  defaultSnippets: Record<Language, string>,
  defaultLanguage: Language,
  /** Pass the submissions list so we can pick the latest ACCEPTED code */
  submissions?: ISubmissionResponse[],
) {
  const draftKey = problemId ? `${DRAFT_PREFIX}${problemId}` : null;
  const solvedKey = problemId ? `${SOLVED_PREFIX}${problemId}` : null;

  /* ── Helpers to find latest accepted submission ── */
  const getAcceptedCode = useCallback((): StoredCodeState | null => {
    if (!submissions?.length) return null;
    const accepted = submissions.find((s) => s.status === "ACCEPTED");
    if (!accepted) return null;
    // Normalize language: API may return "c++" but our UI uses "cpp"
    const lang = (
      accepted.language === "c++" ? "cpp" : accepted.language
    ) as Language;
    return {
      codeByLang: { [lang]: accepted.code },
      language: lang,
    };
  }, [submissions]);

  /* ── Determine if this problem is solved ── */
  const isSolved = useCallback((): boolean => {
    if (!submissions?.length) return false;
    return submissions.some((s) => s.status === "ACCEPTED");
  }, [submissions]);

  /* ── Read initial state ── */
  const getInitialState = useCallback((): StoredCodeState => {
    // Use session-persisted language preference if available
    let preferredLang = defaultLanguage;
    try {
      const stored = sessionStorage.getItem(LANG_PREF_KEY);
      if (stored) preferredLang = stored as Language;
    } catch {
      /* ignore */
    }

    const defaults: StoredCodeState = {
      codeByLang: { ...defaultSnippets },
      language: preferredLang,
    };

    if (!problemId) return defaults;

    // 1. For solved: try sessionStorage first (survives reload)
    if (isSolved() && solvedKey) {
      try {
        const raw = sessionStorage.getItem(solvedKey);
        if (raw) {
          const parsed = JSON.parse(raw) as StoredCodeState;
          if (parsed.codeByLang && parsed.language) return parsed;
        }
      } catch {
        /* ignore */
      }

      // 2. Fall back to latest accepted submission code
      const accepted = getAcceptedCode();
      if (accepted) return accepted;
    }

    // 3. For unsolved: try localStorage draft
    if (draftKey) {
      try {
        const raw = localStorage.getItem(draftKey);
        if (raw) {
          const parsed = JSON.parse(raw) as StoredCodeState;
          if (parsed.codeByLang && parsed.language) return parsed;
        }
      } catch {
        /* ignore */
      }
    }

    return defaults;
  }, [
    problemId,
    draftKey,
    solvedKey,
    defaultSnippets,
    defaultLanguage,
    isSolved,
    getAcceptedCode,
  ]);

  const initial = getInitialState();
  const [codeByLang, setCodeByLang] = useState<Record<string, string>>(
    initial.codeByLang,
  );
  const [language, setLanguage] = useState<Language>(initial.language);
  const [solved, setSolved] = useState<boolean>(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">(
    "idle",
  );

  // The active code for the current language
  const code = codeByLang[language] ?? defaultSnippets[language] ?? "";

  const setCode = useCallback(
    (newCode: string) => {
      setCodeByLang((prev) => ({ ...prev, [language]: newCode }));
    },
    [language],
  );

  const changeLanguage = useCallback(
    (newLang: Language) => {
      setLanguage(newLang);
      // Persist preference across problems for this session
      try {
        sessionStorage.setItem(LANG_PREF_KEY, newLang);
      } catch {
        /* ignore */
      }
      setCodeByLang((prev) => {
        if (prev[newLang] !== undefined) return prev;
        return { ...prev, [newLang]: defaultSnippets[newLang] ?? "" };
      });
    },
    [defaultSnippets],
  );

  // Re-initialize when problemId changes
  useEffect(() => {
    const state = getInitialState();
    setCodeByLang(state.codeByLang);
    setLanguage(state.language);
    setSolved(isSolved());
  }, [problemId]); // eslint-disable-line react-hooks/exhaustive-deps

  // When submissions load (async), re-check solved state and load accepted code if needed
  useEffect(() => {
    const nowSolved = isSolved();
    if (nowSolved && !solved) {
      // Problem just became solved (e.g. submissions loaded showing an accepted one)
      setSolved(true);
      const accepted = getAcceptedCode();
      if (accepted && solvedKey) {
        // Only set from accepted code if there's no sessionStorage entry yet
        try {
          const existing = sessionStorage.getItem(solvedKey);
          if (!existing) {
            setCodeByLang(accepted.codeByLang);
            setLanguage(accepted.language);
            sessionStorage.setItem(solvedKey, JSON.stringify(accepted));
          }
        } catch {
          /* ignore */
        }
      }
    }
    if (!nowSolved && solved) {
      setSolved(false);
    }
  }, [submissions]); // eslint-disable-line react-hooks/exhaustive-deps

  /* ── Debounced persistence ── */
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const savedTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!problemId) return;

    setSaveStatus("saving");
    if (timerRef.current) clearTimeout(timerRef.current);
    if (savedTimerRef.current) clearTimeout(savedTimerRef.current);

    timerRef.current = setTimeout(() => {
      const state: StoredCodeState = { codeByLang, language };
      try {
        if (solved && solvedKey) {
          // Solved → persist to sessionStorage (clears on navigation/tab close)
          sessionStorage.setItem(solvedKey, JSON.stringify(state));
        } else if (draftKey) {
          // Unsolved → persist to localStorage (durable draft)
          localStorage.setItem(draftKey, JSON.stringify(state));
          touchLocalStorageKey(draftKey);
        }
      } catch {
        /* storage full — ignore */
      }
      setSaveStatus("saved");
      savedTimerRef.current = setTimeout(() => setSaveStatus("idle"), 1500);
    }, DEBOUNCE_MS);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [codeByLang, language, problemId, draftKey, solvedKey, solved]);

  /* ── Mark as solved: called when submission is ACCEPTED ── */
  const markSolved = useCallback(
    (acceptedCode: string, acceptedLang: Language) => {
      setSolved(true);
      // Clear the draft from localStorage
      if (draftKey) {
        try {
          localStorage.removeItem(draftKey);
        } catch {
          /* ignore */
        }
      }
      // Save accepted code to sessionStorage
      const lang = (acceptedLang === "c++" ? "cpp" : acceptedLang) as Language;
      const state: StoredCodeState = {
        codeByLang: { ...codeByLang, [lang]: acceptedCode },
        language: lang,
      };
      if (solvedKey) {
        try {
          sessionStorage.setItem(solvedKey, JSON.stringify(state));
        } catch {
          /* ignore */
        }
      }
    },
    [draftKey, solvedKey, codeByLang],
  );
  return {
    code,
    setCode,
    language,
    changeLanguage,
    markSolved,
    isSolved: solved,
    saveStatus,
  };
}
