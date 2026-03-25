import { type Difficulty, DIFFICULTY_COLORS } from "@/lib/levels/types";

interface BadgeProps {
  difficulty: Difficulty;
  children: React.ReactNode;
  className?: string;
}

export function Badge({ difficulty, children, className = "" }: BadgeProps) {
  const colors = DIFFICULTY_COLORS[difficulty];
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold font-display uppercase tracking-wider border ${colors.bg} ${colors.text} ${colors.border} ${className}`}
    >
      {children}
    </span>
  );
}
