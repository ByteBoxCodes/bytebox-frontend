import type { LanguageOption } from "@/types/submission";

export const languageOptions: LanguageOption[] = [
  {
    label: "C++",
    value: "cpp",
    snippet:
      "// Write your C++ solution here\n#include <iostream>\n\nusing namespace std;\n\nint main() {\n    // code here\n    return 0;\n}\n",
  },
  {
    label: "Java",
    value: "java",
    snippet:
      "// Write your Java solution here\nimport java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        // code here\n    }\n}\n",
  },
];
