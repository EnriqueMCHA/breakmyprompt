"use client";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
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

type SectionEntry = { id: string; label: string; level?: number };

const difficultyColor: Record<Difficulty, string> = {
  easy: "bg-success",
  medium: "bg-accent",
  hard: "bg-error",
};

export default function TheoryPage() {
  const { t } = useTranslation();
  const [activeId, setActiveId] = useState<string>("what-is");
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());

  const sections: SectionEntry[] = [
    { id: "what-is", label: t("theory.what_is") },
    ...techniques.map((tech) => ({
      id: `level-${tech.level}`,
      label: `${tech.level}. ${t(`levels.${tech.level}.name`)}`,
      level: tech.level,
    })),
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

  const scrollTo = (id: string) => {
    const el = sectionRefs.current.get(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        {/* Hero */}
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

        <div className="relative max-w-6xl mx-auto flex">
          {/* Scrollspy sidebar */}
          <nav className="hidden lg:block sticky top-28 self-start w-56 shrink-0 pr-6 max-h-[calc(100vh-8rem)] overflow-y-auto">
            <span className="block text-[10px] font-display font-semibold uppercase tracking-widest text-muted mb-4 pl-4">
              Index
            </span>
            <ul className="relative space-y-1">
              {/* Vertical track line */}
              <div className="absolute left-[5px] top-0 bottom-0 w-px bg-surface-border" />

              {sections.map((section) => {
                const isActive = activeId === section.id;
                const tech = section.level
                  ? techniques.find((t) => t.level === section.level)
                  : null;

                return (
                  <li key={section.id} className="relative">
                    {/* Dot indicator */}
                    <span
                      className={`absolute left-0 top-1/2 -translate-y-1/2 w-[11px] h-[11px] rounded-full border-2 transition-all duration-200 ${
                        isActive
                          ? `${tech ? difficultyColor[tech.difficulty] : "bg-primary"} border-transparent scale-110 shadow-[0_0_8px_var(--color-primary-glow)]`
                          : "bg-transparent border-surface-border"
                      }`}
                    />
                    <button
                      onClick={() => scrollTo(section.id)}
                      className={`block w-full text-left pl-6 py-1.5 text-xs font-mono leading-snug rounded-r-md transition-all duration-200 ${
                        isActive
                          ? "text-foreground font-semibold bg-primary-soft"
                          : "text-muted hover:text-foreground hover:bg-primary-soft/50"
                      }`}
                    >
                      {section.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* What is Prompt Injection */}
            <section
              id="what-is"
              ref={registerRef("what-is")}
              className="px-4 sm:px-6 mb-16 scroll-mt-28"
            >
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

            {/* Techniques */}
            <section className="px-4 sm:px-6">
              <div className="max-w-3xl mx-auto">
                <h2 className="font-display font-semibold text-2xl text-foreground mb-8 text-center">
                  {t("theory.techniques")}
                </h2>

                <div className="space-y-8">
                  {techniques.map((tech) => (
                    <div
                      key={tech.level}
                      id={`level-${tech.level}`}
                      ref={registerRef(`level-${tech.level}`)}
                      className="scroll-mt-28"
                    >
                      <GlassCard className="p-6 overflow-hidden">
                        <div className="flex items-center gap-3 mb-5">
                          <Badge difficulty={tech.difficulty}>
                            Level {tech.level}
                          </Badge>
                          <h3 className="font-display font-semibold text-lg text-foreground">
                            {t(`levels.${tech.level}.name`)}
                          </h3>
                          <span className="text-xs font-mono text-muted ml-auto">
                            {t(`levels.${tech.level}.bot`)}
                          </span>
                        </div>

                        <p className="text-sm text-muted mb-5">
                          {t(`levels.${tech.level}.desc`)}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* Vulnerable */}
                          <div>
                            <span className="block text-xs font-display font-semibold uppercase tracking-wider text-error mb-2">
                              {t("theory.vulnerable")}
                            </span>
                            <div className="p-3 rounded-lg bg-error/5 border border-error/10 font-mono text-xs leading-relaxed text-foreground/80 whitespace-pre-wrap">
                              {t(
                                `theory-examples.${tech.level}.vulnerableSnippet`,
                              )}
                            </div>
                          </div>

                          {/* Guard */}
                          <div>
                            <span className="block text-xs font-display font-semibold uppercase tracking-wider text-success mb-2">
                              {t("theory.guarded")}
                            </span>
                            <div className="p-3 rounded-lg bg-success/5 border border-success/10 font-mono text-xs leading-relaxed text-foreground/80 whitespace-pre-wrap">
                              {t(`theory-examples.${tech.level}.guardSnippet`)}
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 flex justify-end">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              (window.location.href = `/?level=${tech.level}`)
                            }
                          >
                            {t("theory.try_it")} →
                          </Button>
                        </div>
                      </GlassCard>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
