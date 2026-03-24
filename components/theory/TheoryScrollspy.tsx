"use client";

import type { Difficulty } from "@/lib/levels/types";

export type SectionEntry = { id: string; label: string; level?: number };

const difficultyColor: Record<Difficulty, string> = {
  easy: "bg-success",
  medium: "bg-accent",
  hard: "bg-error",
};

interface Technique {
  level: number;
  difficulty: Difficulty;
}

interface TheoryScrollspyProps {
  sections: SectionEntry[];
  techniques: Technique[];
  activeId: string;
  onScrollTo: (id: string) => void;
}

export function TheoryScrollspy({
  sections,
  techniques,
  activeId,
  onScrollTo,
}: TheoryScrollspyProps) {
  return (
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
                onClick={() => onScrollTo(section.id)}
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
  );
}
