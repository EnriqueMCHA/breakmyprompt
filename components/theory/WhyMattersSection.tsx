"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { useTranslation } from "@/lib/i18n/provider";
import type { Ref } from "react";

interface WhyMattersSectionProps {
  ref?: Ref<HTMLElement>;
}

const risks = [
  { key: "data", icon: "🔓" },
  { key: "rce", icon: "⚡" },
  { key: "misinfo", icon: "📡" },
  { key: "trust", icon: "🛡️" },
] as const;

export function WhyMattersSection({ ref }: WhyMattersSectionProps) {
  const { t } = useTranslation();

  return (
    <section
      id="why-matters"
      ref={ref}
      className="px-4 sm:px-6 mb-16 scroll-mt-28"
    >
      <div className="max-w-3xl mx-auto">
        <GlassCard className="p-6 sm:p-8">
          <h2 className="font-display font-semibold text-2xl text-foreground mb-4">
            {t("theory.why_matters")}
          </h2>
          <p className="text-muted leading-relaxed mb-8">
            {t("theory.why_matters_desc")}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {risks.map((risk) => (
              <div
                key={risk.key}
                className="rounded-lg border border-surface-border p-4"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{risk.icon}</span>
                  <h3 className="font-display font-semibold text-sm text-foreground">
                    {t(`theory.why_matters_risk_${risk.key}_title`)}
                  </h3>
                </div>
                <p className="text-xs text-muted leading-relaxed">
                  {t(`theory.why_matters_risk_${risk.key}_desc`)}
                </p>
              </div>
            ))}
          </div>

          <blockquote className="border-l-2 border-primary pl-4 py-2">
            <p className="text-sm text-foreground/90 italic leading-relaxed mb-2">
              {t("theory.why_matters_callout")}
            </p>
            <cite className="text-xs text-muted not-italic">
              — {t("theory.why_matters_callout_author")}
            </cite>
          </blockquote>
        </GlassCard>
      </div>
    </section>
  );
}
