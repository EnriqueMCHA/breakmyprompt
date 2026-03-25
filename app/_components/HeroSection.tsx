"use client";

import { Button } from "@/app/_ui/Button";
import { useTranslation } from "@/lib/i18n/provider";

interface HeroSectionProps {
  onStartClick: () => void;
}

export function HeroSection({ onStartClick }: HeroSectionProps) {
  const { t } = useTranslation();

  return (
    <section className="relative flex flex-col items-center justify-center min-h-dvh px-4 sm:px-6 overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[100px]" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-primary) 1px, transparent 1px), linear-gradient(90deg, var(--color-primary) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-8 max-w-3xl text-center">
        {/* Terminal-style label */}
        <div className="animate-fade-up stagger-1 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-surface-border bg-primary-soft">
          <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <span className="text-xs font-mono text-muted tracking-wider uppercase">
            Prompt Injection Lab
          </span>
        </div>

        {/* Main title */}
        <h1 className="animate-fade-up stagger-2 font-display font-bold text-5xl sm:text-6xl lg:text-7xl tracking-tight text-foreground">
          Break<span className="text-primary text-glow">My</span>Prompt
        </h1>

        {/* Subtitle */}
        <p className="animate-fade-up stagger-3 text-lg sm:text-xl text-muted max-w-xl leading-relaxed">
          {t("hero.subtitle")}
        </p>

        {/* CTAs */}
        <div className="animate-fade-up stagger-4 flex flex-col sm:flex-row items-center gap-4">
          <Button size="lg" onClick={onStartClick}>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="4 17 10 11 4 5" />
              <line x1="12" y1="19" x2="20" y2="19" />
            </svg>
            {t("hero.cta_start")}
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => (window.location.href = "/theory")}
          >
            {t("hero.cta_theory")}
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={onStartClick}
        className="absolute bottom-8 animate-bounce-slow text-muted hover:text-primary transition-colors cursor-pointer"
        aria-label="Scroll down"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
    </section>
  );
}
