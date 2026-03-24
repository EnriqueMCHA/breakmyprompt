"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { useTranslation } from "@/lib/i18n/provider";
import type { Ref } from "react";

interface TypesSectionProps {
  ref?: Ref<HTMLElement>;
}

export function TypesSection({ ref }: TypesSectionProps) {
  const { t } = useTranslation();

  return (
    <section id="types" ref={ref} className="px-4 sm:px-6 mb-16 scroll-mt-28">
      <div className="max-w-3xl mx-auto">
        <GlassCard className="p-6 sm:p-8">
          <h2 className="font-display font-semibold text-2xl text-foreground mb-1">
            {t("theory.types")}
          </h2>
          <p className="text-sm text-muted font-mono mb-4">
            {t("theory.types_subtitle")}
          </p>
          <p className="text-muted leading-relaxed mb-8">
            {t("theory.types_desc")}
          </p>

          <div className="space-y-6">
            {/* Direct */}
            <div className="rounded-lg border border-surface-border p-5">
              <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                {t("theory.types_direct")}
              </h3>
              <p className="text-sm text-muted leading-relaxed mb-3">
                {t("theory.types_direct_desc")}
              </p>
              <div className="p-3 rounded-lg bg-(--color-bg-alt) border border-surface-border font-mono text-xs text-accent leading-relaxed">
                <span className="text-muted">$</span>{" "}
                {t("theory.types_direct_example")}
              </div>
            </div>

            {/* Indirect */}
            <div className="rounded-lg border border-surface-border p-5">
              <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                {t("theory.types_indirect")}
              </h3>
              <p className="text-sm text-muted leading-relaxed mb-3">
                {t("theory.types_indirect_desc")}
              </p>
              <div className="p-3 rounded-lg bg-(--color-bg-alt) border border-surface-border font-mono text-xs text-accent leading-relaxed">
                <span className="text-muted">$</span>{" "}
                {t("theory.types_indirect_example")}
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
