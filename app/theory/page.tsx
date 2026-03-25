"use client";

import { Footer } from "@/app/_layout/Footer";
import { Navbar } from "@/app/_layout/Navbar";
import { FinalRecommendationsSection } from "@/app/theory/_components/FinalRecommendationsSection";
import { TechniqueCard } from "@/app/theory/_components/TechniqueCard";
import { TheoryHero } from "@/app/theory/_components/TheoryHero";
import {
  TheoryScrollspy,
  type SectionEntry,
} from "@/app/theory/_components/TheoryScrollspy";
import { TypesSection } from "@/app/theory/_components/TypesSection";
import { WhatIsSection } from "@/app/theory/_components/WhatIsSection";
import { WhyMattersSection } from "@/app/theory/_components/WhyMattersSection";
import { useTranslation } from "@/lib/i18n/provider";
import type { Difficulty } from "@/lib/levels/types";
import { useCallback, useEffect, useRef, useState } from "react";

const techniques: {
  level: number;
  difficulty: Difficulty;
}[] = [
  { level: 1, difficulty: "easy" },
  { level: 2, difficulty: "easy" },
  { level: 3, difficulty: "easy" },
  { level: 4, difficulty: "medium" },
  { level: 5, difficulty: "medium" },
  { level: 6, difficulty: "medium" },
  { level: 7, difficulty: "hard" },
  { level: 8, difficulty: "hard" },
  { level: 9, difficulty: "hard" },
];

export default function TheoryPage() {
  const { t } = useTranslation();
  const [activeId, setActiveId] = useState<string>("what-is");
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());

  const sections: SectionEntry[] = [
    { id: "what-is", label: t("theory.what_is") },
    { id: "why-matters", label: t("theory.why_matters") },
    { id: "types", label: t("theory.types") },
    ...techniques.map((tech) => ({
      id: `level-${tech.level}`,
      label: `${tech.level}. ${t(`levels.${tech.level}.name`)}`,
      level: tech.level,
    })),
    { id: "final-recommendations", label: t("theory.final_recommendations") },
  ];

  const registerRef = useCallback(
    (id: string) => (el: HTMLElement | null) => {
      if (el) sectionRefs.current.set(id, el);
      else sectionRefs.current.delete(id);
    },
    [],
  );

  useEffect(() => {
    const elements = Array.from(sectionRefs.current.values());
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollTo = useCallback((id: string) => {
    const el = sectionRefs.current.get(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <TheoryHero />

        <div className="relative max-w-6xl mx-auto flex">
          <TheoryScrollspy
            sections={sections}
            techniques={techniques}
            activeId={activeId}
            onScrollTo={scrollTo}
          />

          {/* Main content */}
          <div className="flex-1 min-w-0">
            <WhatIsSection ref={registerRef("what-is")} />
            <WhyMattersSection ref={registerRef("why-matters")} />
            <TypesSection ref={registerRef("types")} />

            {/* Techniques */}
            <section className="px-4 sm:px-6">
              <div className="max-w-3xl mx-auto">
                <h2 className="font-display font-semibold text-2xl text-foreground mb-8 text-center">
                  {t("theory.techniques")}
                </h2>

                <div className="space-y-8">
                  {techniques.map((tech) => (
                    <TechniqueCard
                      key={tech.level}
                      level={tech.level}
                      difficulty={tech.difficulty}
                      ref={registerRef(`level-${tech.level}`)}
                    />
                  ))}
                </div>
              </div>
            </section>

            <FinalRecommendationsSection
              ref={registerRef("final-recommendations")}
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
