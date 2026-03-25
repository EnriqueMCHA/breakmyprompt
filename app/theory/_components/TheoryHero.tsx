"use client";

import { useTranslation } from "@/lib/i18n/provider";

export function TheoryHero() {
  const { t } = useTranslation();

  return (
    <section className="px-4 sm:px-6 mb-16">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="animate-fade-up font-display font-bold text-4xl sm:text-5xl text-foreground mb-4">
          {t("theory.title")}
        </h1>
        <p className="animate-fade-up stagger-2 text-lg text-muted max-w-xl mx-auto">
          {t("theory.subtitle")}
        </p>
      </div>
    </section>
  );
}
