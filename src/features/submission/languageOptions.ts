import type { LanguageOption } from "@/types/submission";

export const languageOptions: LanguageOption[] = [
  {
    label: "C",
    value: "c",
    snippet:
      "// Write your C solution here\n// Note: You must include necessary headers (e.g., #include <stdio.h>)\n// and define an int main() function to execute your code.\n\n",
  },
  {
    label: "C++",
    value: "cpp",
    snippet:
      "// Write your C++ solution here\n// Note: You must include necessary headers (e.g., #include <iostream>)\n// and define an int main() function to execute your code.\n\n",
  },
  {
    label: "Java",
    value: "java",
    snippet:
      "// Write your Java solution here\n// Note: You must define a public class named Main\n// containing a public static void main(String[] args) method.\n\n",
  },
  {
    label: "Python",
    value: "python",
    snippet: "# Write your Python solution here\n",
  },
];

/** Language options for the preferred language picker. */
export const PREFERRED_LANGUAGE_OPTIONS: {
  label: string;
  value: string;
  comingSoon?: boolean;
}[] = [
  { label: "C", value: "c" },
  { label: "C++", value: "cpp" },
  { label: "Java", value: "java" },
  { label: "Python", value: "python" },
];
