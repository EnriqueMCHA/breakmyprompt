"use client";

import { GlassCard } from "@/app/_ui/GlassCard";
import { useTranslation } from "@/lib/i18n/provider";
import type { Ref } from "react";

interface FinalRecommendationsSectionProps {
  ref?: Ref<HTMLElement>;
}

const recommendations = [
  { key: "input", icon: "🧹" },
  { key: "prompt", icon: "🔒" },
  { key: "guardrails", icon: "🛡️" },
  { key: "privilege", icon: "🔑" },
  { key: "human", icon: "👤" },
  { key: "education", icon: "📚" },
] as const;

export function FinalRecommendationsSection({
  ref,
}: FinalRecommendationsSectionProps) {
  const { t } = useTranslation();

  return (
    <section
      id="final-recommendations"
      ref={ref}
      className="px-4 sm:px-6 mt-16 scroll-mt-28"
    >
      <div className="max-w-3xl mx-auto">
        <GlassCard className="p-6 sm:p-8">
          <h2 className="font-display font-semibold text-2xl text-foreground mb-4">
            {t("theory.final_recommendations")}
          </h2>
          <p className="text-muted leading-relaxed mb-8">
            {t("theory.final_recommendations_desc")}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {recommendations.map((rec) => (
              <div
                key={rec.key}
                className="rounded-lg border border-surface-border p-4"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{rec.icon}</span>
                  <h3 className="font-display font-semibold text-sm text-foreground">
                    {t(`theory.final_rec_${rec.key}_title`)}
                  </h3>
                </div>
                <p className="text-xs text-muted leading-relaxed">
                  {t(`theory.final_rec_${rec.key}_desc`)}
                </p>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
