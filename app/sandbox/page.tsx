"use client";

import { ChatSandbox } from "@/app/_chat/ChatSandbox";
import { Footer } from "@/app/_layout/Footer";
import { Navbar } from "@/app/_layout/Navbar";
import { Badge } from "@/app/_ui/Badge";
import { Button } from "@/app/_ui/Button";
import { GlassCard } from "@/app/_ui/GlassCard";
import { useTranslation } from "@/lib/i18n/provider";
import type { Difficulty } from "@/lib/levels/types";
import { DIFFICULTY_LEVELS } from "@/lib/levels/types";
import { useState } from "react";

export default function SandboxPage() {
  const { t } = useTranslation();
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);

  const getLevelMeta = (level: number) => ({
    name: t(`levels.${level}.name`),
    bot: t(`levels.${level}.bot`),
    difficulty: (level <= 3
      ? "easy"
      : level <= 6
        ? "medium"
        : "hard") as Difficulty,
  });

  const allLevels = [
    ...DIFFICULTY_LEVELS.easy,
    ...DIFFICULTY_LEVELS.medium,
    ...DIFFICULTY_LEVELS.hard,
  ];

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        {!selectedLevel ? (
          <section className="px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
              <h1 className="animate-fade-up font-display font-bold text-4xl sm:text-5xl text-center text-foreground mb-4">
                {t("nav.sandbox")}
              </h1>
              <p className="animate-fade-up stagger-2 text-center text-muted mb-12 max-w-lg mx-auto">
                {t("chat.objective")}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {allLevels.map((levelNum) => {
                  const meta = getLevelMeta(levelNum);
                  return (
                    <GlassCard key={levelNum} hover className="p-5">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary-soft text-primary font-display font-bold text-sm">
                          {levelNum}
                        </span>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-display font-semibold text-sm text-foreground truncate">
                            {meta.name}
                          </h4>
                          <p className="text-xs text-muted font-mono">
                            {meta.bot}
                          </p>
                        </div>
                        <Badge difficulty={meta.difficulty}>
                          {t(`difficulty.${meta.difficulty}`)}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted leading-relaxed mb-4">
                        {t(`levels.${levelNum}.desc`)}
                      </p>
                      <Button
                        size="sm"
                        className="w-full"
                        onClick={() => setSelectedLevel(levelNum)}
                      >
                        {t("difficulty.start_level")}
                      </Button>
                    </GlassCard>
                  );
                })}
              </div>
            </div>
          </section>
        ) : (
          <div>
            <div className="px-4 sm:px-6 mb-4">
              <div className="max-w-3xl mx-auto">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedLevel(null)}
                >
                  ← {t("chat.back_home")}
                </Button>
              </div>
            </div>
            <ChatSandbox
              level={selectedLevel}
              difficulty={getLevelMeta(selectedLevel).difficulty}
              levelName={getLevelMeta(selectedLevel).name}
              botName={getLevelMeta(selectedLevel).bot}
            />
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
