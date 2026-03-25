"use client";

import { Footer } from "@/app/_layout/Footer";
import { Navbar } from "@/app/_layout/Navbar";
import { Button } from "@/app/_ui/Button";
import { GlassCard } from "@/app/_ui/GlassCard";
import { Tabs } from "@/app/_ui/Tabs";
import { useTranslation } from "@/lib/i18n/provider";
import type { Difficulty, Score } from "@/lib/levels/types";
import { useState } from "react";

const mockScores: Score[] = [
  {
    id: "1",
    alias: "z3r0day",
    email: "z@h.com",
    level: 1,
    difficulty: "easy",
    tokens: 24,
    turns: 1,
    timeSeconds: 15,
    timestamp: Date.now(),
  },
  {
    id: "2",
    alias: "ph4ntom",
    email: "p@h.com",
    level: 3,
    difficulty: "easy",
    tokens: 48,
    turns: 2,
    timeSeconds: 32,
    timestamp: Date.now(),
  },
  {
    id: "3",
    alias: "n0x_sh4dow",
    email: "n@h.com",
    level: 5,
    difficulty: "medium",
    tokens: 120,
    turns: 4,
    timeSeconds: 95,
    timestamp: Date.now(),
  },
  {
    id: "4",
    alias: "cyb3rw1z",
    email: "c@h.com",
    level: 7,
    difficulty: "hard",
    tokens: 210,
    turns: 6,
    timeSeconds: 180,
    timestamp: Date.now(),
  },
  {
    id: "5",
    alias: "d4rk_m4tter",
    email: "d@h.com",
    level: 9,
    difficulty: "hard",
    tokens: 340,
    turns: 8,
    timeSeconds: 300,
    timestamp: Date.now(),
  },
];

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return m > 0 ? `${m}m ${s}s` : `${s}s`;
}

export default function LeaderboardPage() {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<"all" | Difficulty>("all");
  const [alias, setAlias] = useState("");
  const [email, setEmail] = useState("");
  const [showForm, setShowForm] = useState(false);

  const filteredScores =
    filter === "all"
      ? mockScores
      : mockScores.filter((s) => s.difficulty === filter);

  const tabs = [
    { id: "all", label: t("leaderboard.all") },
    { id: "easy", label: t("difficulty.easy") },
    { id: "medium", label: t("difficulty.medium") },
    { id: "hard", label: t("difficulty.hard") },
  ];

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <section className="px-4 sm:px-6 mb-12">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="animate-fade-up font-display font-bold text-4xl sm:text-5xl text-foreground mb-4">
              {t("leaderboard.title")}
            </h1>
            <p className="animate-fade-up stagger-2 text-lg text-muted">
              {t("leaderboard.subtitle")}
            </p>
          </div>
        </section>

        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          {/* Score Form (toggleable for demo) */}
          {showForm && (
            <GlassCard className="p-6 mb-8 animate-fade-up">
              <h3 className="font-display font-semibold text-lg text-foreground mb-4">
                Save Your Score
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-display font-semibold uppercase tracking-wider text-muted mb-1.5">
                    {t("leaderboard.alias")}
                  </label>
                  <input
                    type="text"
                    value={alias}
                    onChange={(e) => setAlias(e.target.value)}
                    placeholder={t("leaderboard.alias_placeholder")}
                    className="w-full px-4 py-2.5 rounded-lg bg-(--color-bg-alt) border border-surface-border text-foreground text-sm font-mono outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all placeholder:text-muted/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-display font-semibold uppercase tracking-wider text-muted mb-1.5">
                    {t("leaderboard.email")}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t("leaderboard.email_placeholder")}
                    className="w-full px-4 py-2.5 rounded-lg bg-(--color-bg-alt) border border-surface-border text-foreground text-sm font-mono outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all placeholder:text-muted/50"
                  />
                </div>
              </div>
              <Button className="w-full sm:w-auto">
                {t("leaderboard.submit")}
              </Button>
            </GlassCard>
          )}

          {/* Toggle form button for demo */}
          <div className="mb-6 flex justify-end">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? "Hide Form" : "Show Score Form"}
            </Button>
          </div>

          {/* Difficulty filter tabs */}
          <div className="flex justify-center mb-8">
            <Tabs
              tabs={tabs}
              defaultTab="all"
              onChange={(id) => setFilter(id as "all" | Difficulty)}
            />
          </div>

          {/* Leaderboard table */}
          <GlassCard className="overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-[60px_1fr_80px_80px_80px] gap-2 px-4 py-3 border-b border-surface-border text-xs font-display font-semibold uppercase tracking-wider text-muted">
              <span>{t("leaderboard.rank")}</span>
              <span>{t("leaderboard.hacker")}</span>
              <span className="text-right">{t("leaderboard.level")}</span>
              <span className="text-right">{t("leaderboard.tokens")}</span>
              <span className="text-right">{t("leaderboard.time")}</span>
            </div>

            {/* Rows */}
            {filteredScores.length === 0 ? (
              <div className="px-4 py-12 text-center text-sm text-muted">
                {t("leaderboard.no_scores")}
              </div>
            ) : (
              filteredScores.map((score, i) => (
                <div
                  key={score.id}
                  className={`grid grid-cols-[60px_1fr_80px_80px_80px] gap-2 px-4 py-3 items-center transition-colors ${
                    i < 3 ? "bg-primary-soft" : ""
                  } ${i !== filteredScores.length - 1 ? "border-b border-surface-border" : ""}`}
                >
                  <span
                    className={`font-display font-bold text-lg ${
                      i === 0
                        ? "text-primary"
                        : i === 1
                          ? "text-accent"
                          : i === 2
                            ? "text-amber-400"
                            : "text-muted"
                    }`}
                  >
                    #{i + 1}
                  </span>
                  <span className="text-sm text-foreground font-medium truncate">
                    {score.alias}
                  </span>
                  <span className="text-right text-xs font-mono text-muted">
                    Lv.{score.level}
                  </span>
                  <span className="text-right text-xs font-mono text-accent">
                    {score.tokens}
                  </span>
                  <span className="text-right text-xs font-mono text-muted">
                    {formatTime(score.timeSeconds)}
                  </span>
                </div>
              ))
            )}
          </GlassCard>
        </div>
      </main>
      <Footer />
    </>
  );
}
