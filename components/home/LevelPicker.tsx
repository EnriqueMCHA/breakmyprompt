"use client";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { useTranslation } from "@/lib/i18n/provider";
import type { Difficulty } from "@/lib/levels/types";
import { DIFFICULTY_LEVELS } from "@/lib/levels/types";
import { RefObject } from "react";

interface LevelPickerProps {
  difficulty: Difficulty;
  ref?: RefObject<HTMLDivElement | null>;
  onSelectLevel: (level: number) => void;
}

export function LevelPicker({
  difficulty,
  onSelectLevel,
  ref,
}: LevelPickerProps) {
  const { t } = useTranslation();
  const levels = DIFFICULTY_LEVELS[difficulty];

  return (
    <section ref={ref} className="pb-16 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Badge difficulty={difficulty}>{t(`difficulty.${difficulty}`)}</Badge>
          <h3 className="font-display font-semibold text-xl text-foreground">
            {t("difficulty.levels")}
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {levels.map((levelNum) => {
            const levelData = t(`levels.${levelNum}.name`);
            const botName = t(`levels.${levelNum}.bot`);
            const desc = t(`levels.${levelNum}.desc`);

            return (
              <GlassCard key={levelNum} hover className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary-soft text-primary font-display font-bold text-sm">
                    {levelNum}
                  </span>
                  <div>
                    <h4 className="font-display font-semibold text-sm text-foreground">
                      {levelData}
                    </h4>
                    <p className="text-xs text-muted font-mono">{botName}</p>
                  </div>
                </div>

                <p className="text-sm text-muted leading-relaxed mb-4">
                  {desc}
                </p>

                <Button
                  size="sm"
                  className="w-full"
                  onClick={() => onSelectLevel(levelNum)}
                >
                  {t("difficulty.start_level")}
                </Button>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
