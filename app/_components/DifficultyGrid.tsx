"use client";

import { Badge } from "@/app/_ui/Badge";
import { GlassCard } from "@/app/_ui/GlassCard";
import { useTranslation } from "@/lib/i18n/provider";
import type { Difficulty } from "@/lib/levels/types";
import { DIFFICULTY_LEVELS } from "@/lib/levels/types";

interface DifficultyGridProps {
  selectedDifficulty: Difficulty | null;
  onSelect: (difficulty: Difficulty) => void;
}

const difficulties: { id: Difficulty; icon: string; levels: number[] }[] = [
  { id: "easy", icon: "🟢", levels: DIFFICULTY_LEVELS.easy },
  { id: "medium", icon: "🟡", levels: DIFFICULTY_LEVELS.medium },
  { id: "hard", icon: "🔴", levels: DIFFICULTY_LEVELS.hard },
];

export function DifficultyGrid({
  selectedDifficulty,
  onSelect,
}: DifficultyGridProps) {
  const { t } = useTranslation();

  return (
    <section className="py-24 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="animate-fade-up font-display font-bold text-3xl sm:text-4xl text-center text-foreground mb-4">
          {t("difficulty.title")}
        </h2>
        <p className="text-center text-muted mb-12 max-w-lg mx-auto">
          9 levels across 3 difficulty tiers. Each teaches a different prompt
          injection technique.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {difficulties.map((diff) => {
            const isSelected = selectedDifficulty === diff.id;
            return (
              <button
                key={diff.id}
                onClick={() => onSelect(diff.id)}
                className="text-left cursor-pointer group"
              >
                <GlassCard
                  hover
                  className={`p-6 h-full transition-all duration-200 ${
                    isSelected
                      ? "ring-2 ring-primary shadow-[0_0_32px_var(--color-primary-glow)]"
                      : ""
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-2xl">{diff.icon}</span>
                    <Badge difficulty={diff.id}>
                      {diff.levels.length} {t("difficulty.levels")}
                    </Badge>
                  </div>

                  <h3 className="font-display font-semibold text-xl text-foreground mb-2">
                    {t(`difficulty.${diff.id}`)}
                  </h3>

                  <p className="text-sm text-muted leading-relaxed">
                    {t(`difficulty.${diff.id}_desc`)}
                  </p>

                  <div className="mt-4 flex items-center gap-2 text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="font-display font-semibold uppercase tracking-wider">
                      Select
                    </span>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </div>
                </GlassCard>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
