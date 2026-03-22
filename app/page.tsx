"use client";

import { ChatSandbox } from "@/components/chat/ChatSandbox";
import { DifficultyGrid } from "@/components/home/DifficultyGrid";
import { HeroSection } from "@/components/home/HeroSection";
import { LevelPicker } from "@/components/home/LevelPicker";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { useTranslation } from "@/lib/i18n/provider";
import type { Difficulty } from "@/lib/levels/types";
import { useCallback, useRef, useState } from "react";

export default function Home() {
  const { t } = useTranslation();
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<Difficulty | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const difficultyRef = useRef<HTMLDivElement>(null);
  const levelPickerRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  const scrollToDifficulty = useCallback(() => {
    difficultyRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const scrollToLevel = useCallback(() => {
    levelPickerRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleDifficultySelect = useCallback(
    (difficulty: Difficulty) => {
      setSelectedDifficulty(difficulty);
      setSelectedLevel(null);

      setTimeout(() => {
        scrollToLevel();
      }, 100);
    },
    [scrollToLevel],
  );

  const handleLevelSelect = useCallback((level: number) => {
    setSelectedLevel(level);
    setTimeout(() => {
      chatRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, []);

  const getLevelMeta = (level: number) => ({
    name: t(`levels.${level}.name`),
    bot: t(`levels.${level}.bot`),
    difficulty:
      level <= 3 ? "easy" : level <= 6 ? "medium" : ("hard" as Difficulty),
  });

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <HeroSection onStartClick={scrollToDifficulty} />

        <div ref={difficultyRef}>
          <DifficultyGrid
            selectedDifficulty={selectedDifficulty}
            onSelect={handleDifficultySelect}
          />
        </div>

        {selectedDifficulty && (
          <LevelPicker
            difficulty={selectedDifficulty}
            ref={levelPickerRef}
            onSelectLevel={handleLevelSelect}
          />
        )}

        {selectedLevel && (
          <div ref={chatRef}>
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
