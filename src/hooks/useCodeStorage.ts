import { useState, useEffect, useRef, useCallback } from "react";
import type { Language, ISubmissionResponse } from "@/types/submission";
import { touchLocalStorageKey } from "@/utils/storageCleanup";

const DRAFT_PREFIX = "bytebox_draft_";
const SAVE_DEBOUNCE_MS = 800;

interface StoredDraft {
  codeByLang: Record<string, string>;
  language: Language;
}

/* ── localStorage helpers ── */
function readDraft(key: string): StoredDraft | null {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredDraft;
    if (parsed?.codeByLang && parsed?.language) return parsed;
  } catch {
    /* corrupted */
  }
  return null;
}

function writeDraft(key: string, draft: StoredDraft) {
  try {
    localStorage.setItem(key, JSON.stringify(draft));
    touchLocalStorageKey(key);
  } catch {
    /* storage full */
  }
}

/**
 * Robust code persistence per problem.
 *
 * Stores { codeByLang, language } in localStorage under `bytebox_draft_<problemId>`.
 * - Debounced save (800ms) on every code/language change
 * - Synchronous flush on `beforeunload` (survives page reload)
 * - Synchronous flush on component unmount (survives SPA navigation)
 * - Guards against saving default/stale state on initial mount
 * - Language selection persists per problem (falls back to preferred language)
 * - Code per language persists (switching languages preserves each language's code)
 */
export function useCodeStorage(
  problemId: string | undefined,
  defaultSnippets: Record<Language, string>,
  defaultLanguage: Language,
  submissions?: ISubmissionResponse[],
) {
  const draftKey = problemId ? `${DRAFT_PREFIX}${problemId}` : null;

  /* ── Compute initial state (runs once per mount) ── */
  const [state, setState] = useState<StoredDraft>(() => {
    const defaults: StoredDraft = {
      codeByLang: { ...defaultSnippets },
      language: defaultLanguage,
    };
    if (!draftKey) return defaults;

    // Try reading saved draft from localStorage
    const saved = readDraft(draftKey);
    if (saved) {
      // Merge saved code with default snippets (so new languages have defaults)
      return {
        codeByLang: { ...defaultSnippets, ...saved.codeByLang },
        language: saved.language,
      };
    }

    return defaults;
  });

  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle");

  // Track whether we've loaded from storage for this problem (prevents overwriting on mount)
  const hasInitialized = useRef(false);

  // Keep latest state in refs for synchronous access in event handlers
  const stateRef = useRef(state);
  stateRef.current = state;
  const draftKeyRef = useRef(draftKey);
  draftKeyRef.current = draftKey;

  /* ── Derived values ── */
  const language = state.language;
  const code = state.codeByLang[language] ?? defaultSnippets[language] ?? "";

  /* ── State updaters ── */
  const setCode = useCallback(
    (newCode: string) => {
      setState((prev) => ({
        ...prev,
        codeByLang: { ...prev.codeByLang, [prev.language]: newCode },
      }));
    },
    [],
  );

  const changeLanguage = useCallback(
    (newLang: Language) => {
      setState((prev) => ({
        ...prev,
        language: newLang,
        codeByLang: {
          ...prev.codeByLang,
          // Only add default snippet if this language has no existing code
          [newLang]: prev.codeByLang[newLang] ?? defaultSnippets[newLang] ?? "",
        },
      }));
    },
    [defaultSnippets],
  );

  /* ── Re-initialize when problemId changes ── */
  useEffect(() => {
    if (!draftKey) return;
    const saved = readDraft(draftKey);
    if (saved) {
      setState({
        codeByLang: { ...defaultSnippets, ...saved.codeByLang },
        language: saved.language,
      });
    } else {
      setState({
        codeByLang: { ...defaultSnippets },
        language: defaultLanguage,
      });
    }
    // Mark as initialized after a tick (so the first save effect is skipped)
    hasInitialized.current = false;
    requestAnimationFrame(() => {
      hasInitialized.current = true;
    });
  }, [draftKey]); // eslint-disable-line react-hooks/exhaustive-deps

  /* ── Initial mount: mark initialized after first render ── */
  useEffect(() => {
    // Use rAF to ensure we skip the save triggered by the initial state
    requestAnimationFrame(() => {
      hasInitialized.current = true;
    });
  }, []);

  /* ── Synchronous flush (for beforeunload & unmount) ── */
  const flushToStorage = useCallback(() => {
    const key = draftKeyRef.current;
    if (!key) return;
    writeDraft(key, stateRef.current);
  }, []);

  /* ── beforeunload: save synchronously before page unloads ── */
  useEffect(() => {
    const handleBeforeUnload = () => {
      flushToStorage();
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [flushToStorage]);

  /* ── Unmount: flush on SPA navigation away ── */
  useEffect(() => {
    return () => {
      // Only flush if we were initialized (prevents StrictMode double-mount from saving defaults)
      if (hasInitialized.current) {
        flushToStorage();
      }
    };
  }, [flushToStorage]);

  /* ── Debounced save on state changes ── */
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const savedTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!draftKey || !hasInitialized.current) return;

    setSaveStatus("saving");
    if (timerRef.current) clearTimeout(timerRef.current);
    if (savedTimerRef.current) clearTimeout(savedTimerRef.current);

    timerRef.current = setTimeout(() => {
      writeDraft(draftKey, state);
      setSaveStatus("saved");
      savedTimerRef.current = setTimeout(() => setSaveStatus("idle"), 1500);
    }, SAVE_DEBOUNCE_MS);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [state, draftKey]);

  /* ── Mark as solved: clear draft, keep code in memory ── */
  const isSolvedNow = submissions?.some((s) => s.status === "ACCEPTED") ?? false;

  const markSolved = useCallback(
    (acceptedCode: string, acceptedLang: Language) => {
      const lang = (acceptedLang === "c++" ? "cpp" : acceptedLang) as Language;
      // Update in-memory state with accepted code
      setState((prev) => ({
        ...prev,
        language: lang,
        codeByLang: { ...prev.codeByLang, [lang]: acceptedCode },
      }));
      // Save immediately (the accepted version)
      if (draftKey) {
        const updatedState: StoredDraft = {
          codeByLang: { ...stateRef.current.codeByLang, [lang]: acceptedCode },
          language: lang,
        };
        writeDraft(draftKey, updatedState);
      }
    },
    [draftKey],
  );

  return {
    code,
    setCode,
    language,
    changeLanguage,
    markSolved,
    isSolved: isSolvedNow,
    saveStatus,
  };
}
