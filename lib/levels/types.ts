export type Difficulty = "easy" | "medium" | "hard";

export interface Level {
  id: number;
  difficulty: Difficulty;
  flag: string;
  technique: string;
  botName: string;
  systemPromptVulnerable: string;
  systemPromptSecure: string;
  promptGuard: string;
  exampleInjection: string;
}

export interface Score {
  id: string;
  alias: string;
  email: string;
  level: number;
  difficulty: Difficulty;
  tokens: number;
  turns: number;
  timeSeconds: number;
  timestamp: number;
}

export const DIFFICULTY_LEVELS: Record<Difficulty, number[]> = {
  easy: [1, 2, 3],
  medium: [4, 5, 6],
  hard: [7, 8, 9],
};

export const DIFFICULTY_COLORS: Record<Difficulty, { bg: string; text: string; border: string }> = {
  easy: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-500 dark:text-emerald-400",
    border: "border-emerald-500/20",
  },
  medium: {
    bg: "bg-amber-500/10",
    text: "text-amber-500 dark:text-amber-400",
    border: "border-amber-500/20",
  },
  hard: {
    bg: "bg-rose-500/10",
    text: "text-rose-500 dark:text-rose-400",
    border: "border-rose-500/20",
  },
};
