import { languageOptions } from "@/features/submission/languageOptions";

const getSnippet = (lang: string) => languageOptions.find((l) => l.value === lang)?.snippet || "";

export const BOILERPLATES: Record<string, string> = {
  c: `${getSnippet("c")}#include <stdio.h>\n\nint main() {\n    // Add your logic here\n    \n    return 0;\n}\n`,
  cpp: `${getSnippet("cpp")}#include <iostream>\nusing namespace std;\n\nint main() {\n    // Add your logic here\n    \n    return 0;\n}\n`,
  java: `${getSnippet("java")}import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        // Add your logic here\n        \n    }\n}\n`,
  python: `${getSnippet("python")}def main():\n    # Add your logic here\n    pass\n\nif __name__ == "__main__":\n    main()\n`,
};
