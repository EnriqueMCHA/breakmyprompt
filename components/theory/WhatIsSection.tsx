"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { useTranslation } from "@/lib/i18n/provider";
import type { Ref } from "react";

interface WhatIsSectionProps {
  ref?: Ref<HTMLElement>;
}

export function WhatIsSection({ ref }: WhatIsSectionProps) {
  const { t } = useTranslation();

  return (
    <section id="what-is" ref={ref} className="px-4 sm:px-6 mb-16 scroll-mt-28">
      <div className="max-w-3xl mx-auto">
        <GlassCard className="p-6 sm:p-8">
          <h2 className="font-display font-semibold text-2xl text-foreground mb-4">
            {t("theory.what_is")}
          </h2>
          <p className="text-muted leading-relaxed mb-6">
            {t("theory.what_is_desc")}
          </p>
          <div className="p-4 rounded-lg bg-(--color-bg-alt) border border-surface-border font-mono text-sm text-accent leading-relaxed">
            <span className="text-muted">$</span>{" "}
            {t("theory.example_injection")}
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
