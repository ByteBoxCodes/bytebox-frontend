interface Question {
  id: number;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  points: number;
  isCompleted: boolean;
}

interface Topic {
  title: string;
  description: string;
  questions: Question[];
}

export const practiceData: Topic[] = [
  {
    title: "If-Else Statements",
    description: "Master conditional logic and decision making in your code.",
    questions: [
      {
        id: 1,
        title: "Check if a number is positive or negative",
        difficulty: "Easy" as const,
        points: 10,
        isCompleted: true,
      },
      {
        id: 2,
        title: "Find the largest of three numbers",
        difficulty: "Easy" as const,
        points: 15,
        isCompleted: false,
      },
    ],
  },
  {
    title: "Loops (For, While)",
    description: "Learn to repeat tasks efficiently using loops.",
    questions: [
      {
        id: 5,
        title: "Print numbers from 1 to 100",
        difficulty: "Easy" as const,
        points: 10,
        isCompleted: false,
      },
      {
        id: 6,
        title: "Calculate Factorial of a number",
        difficulty: "Medium" as const,
        points: 20,
        isCompleted: false,
      },
      {
        id: 7,
        title: "Check if a number is Prime",
        difficulty: "Medium" as const,
        points: 25,
        isCompleted: false,
      },
      {
        id: 8,
        title: "Print Fibonacci Sequence",
        difficulty: "Hard" as const,
        points: 35,
        isCompleted: false,
      },
    ],
  },
  {
    title: "Functions",
    description: "Organize your code into reusable blocks.",
    questions: [
      {
        id: 9,
        title: "Function to add two numbers",
        difficulty: "Easy" as const,
        points: 10,
        isCompleted: false,
      },
      {
        id: 10,
        title: "Function to check Palindrome",
        difficulty: "Medium" as const,
        points: 20,
        isCompleted: false,
      },
      {
        id: 11,
        title: "Recursive function for Factorial",
        difficulty: "Hard" as const,
        points: 30,
        isCompleted: false,
      },
    ],
  },
];
