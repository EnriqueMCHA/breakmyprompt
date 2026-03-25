"use client";

import { Badge } from "@/app/_ui/Badge";
import { Button } from "@/app/_ui/Button";
import { GlassCard } from "@/app/_ui/GlassCard";
import { useTranslation } from "@/lib/i18n/provider";
import type { Difficulty } from "@/lib/levels/types";
import type { Ref } from "react";

interface TechniqueCardProps {
  level: number;
  difficulty: Difficulty;
  ref?: Ref<HTMLDivElement>;
}

export function TechniqueCard({ level, difficulty, ref }: TechniqueCardProps) {
  const { t } = useTranslation();

  return (
    <div id={`level-${level}`} ref={ref} className="scroll-mt-28">
      <GlassCard className="p-6 overflow-hidden">
        <div className="flex items-center gap-3 mb-5">
          <Badge difficulty={difficulty}>Level {level}</Badge>
          <h3 className="font-display font-semibold text-lg text-foreground">
            {t(`levels.${level}.name`)}
          </h3>
          <span className="text-xs font-mono text-muted ml-auto">
            {t(`levels.${level}.bot`)}
          </span>
        </div>

        <p className="text-sm text-muted mb-5">{t(`levels.${level}.desc`)}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Vulnerable */}
          <div>
            <span className="block text-xs font-display font-semibold uppercase tracking-wider text-error mb-2">
              {t("theory.vulnerable")}
            </span>
            <div className="p-3 rounded-lg bg-error/5 border border-error/10 font-mono text-xs leading-relaxed text-foreground/80 whitespace-pre-wrap">
              {t(`theory-examples.${level}.vulnerableSnippet`)}
            </div>
          </div>

          {/* Guard */}
          <div>
            <span className="block text-xs font-display font-semibold uppercase tracking-wider text-success mb-2">
              {t("theory.guarded")}
            </span>
            <div className="p-3 rounded-lg bg-success/5 border border-success/10 font-mono text-xs leading-relaxed text-foreground/80 whitespace-pre-wrap">
              {t(`theory-examples.${level}.guardSnippet`)}
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => (window.location.href = `/?level=${level}`)}
          >
            {t("theory.try_it")} →
          </Button>
        </div>
      </GlassCard>
    </div>
  );
}
