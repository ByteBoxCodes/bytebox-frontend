/**
 * Auto-cleanup for localStorage items older than 7 days.
 *
 * How it works:
 * - A metadata key `_ls_timestamps` stores the last-updated time for each key.
 * - On every app start, we scan all localStorage keys.
 * - Keys older than 7 days (and not in the whitelist) are removed.
 * - Whitelisted keys: token, theme (and the metadata key itself).
 *
 * To track timestamps, call `touchLocalStorageKey(key)` whenever you write
 * to localStorage. The `useCodeStorage` hook already debounces writes, so
 * we hook into those writes automatically by patching this in.
 */

const TIMESTAMPS_KEY = "_ls_timestamps";
const MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

/** Keys that should NEVER be auto-deleted */
const WHITELIST = new Set([
  "token",
  "theme",
  "preferredLanguage",
  TIMESTAMPS_KEY,
]);

type Timestamps = Record<string, number>;

function getTimestamps(): Timestamps {
  try {
    const raw = localStorage.getItem(TIMESTAMPS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveTimestamps(ts: Timestamps) {
  try {
    localStorage.setItem(TIMESTAMPS_KEY, JSON.stringify(ts));
  } catch {
    /* storage full — ignore */
  }
}

/** Call this whenever you write to a localStorage key to refresh its timestamp. */
export function touchLocalStorageKey(key: string) {
  if (WHITELIST.has(key)) return;
  const ts = getTimestamps();
  ts[key] = Date.now();
  saveTimestamps(ts);
}

/**
 * Run once on app startup.
 * Removes any localStorage key that:
 *  1. Is NOT in the whitelist
 *  2. Was last touched more than 7 days ago (or has no timestamp)
 */
export function cleanupExpiredStorage() {
  try {
    const ts = getTimestamps();
    const now = Date.now();
    const keysToRemove: string[] = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key || WHITELIST.has(key)) continue;

      const lastTouched = ts[key];
      if (!lastTouched || now - lastTouched > MAX_AGE_MS) {
        keysToRemove.push(key);
      }
    }

    // Remove expired keys
    for (const key of keysToRemove) {
      localStorage.removeItem(key);
      delete ts[key];
    }

    // Clean up timestamps for keys that no longer exist
    for (const key of Object.keys(ts)) {
      if (localStorage.getItem(key) === null) {
        delete ts[key];
      }
    }

    saveTimestamps(ts);
  } catch {
    /* ignore errors */
  }
}
