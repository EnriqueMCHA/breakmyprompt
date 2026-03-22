"use client";

import { useTranslation } from "@/lib/i18n/provider";
import Link from "next/link";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  const { t } = useTranslation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-surface-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="font-display font-bold text-xl tracking-tight text-foreground hover:text-primary transition-colors"
          >
            Break<span className="text-primary">My</span>Prompt
          </Link>

          <div className="hidden sm:flex items-center gap-6">
            <Link
              href="/"
              className="text-sm text-muted hover:text-foreground transition-colors"
            >
              {t("nav.home")}
            </Link>
            <Link
              href="/theory"
              className="text-sm text-muted hover:text-foreground transition-colors"
            >
              {t("nav.theory")}
            </Link>
            <Link
              href="/leaderboard"
              className="text-sm text-muted hover:text-foreground transition-colors"
            >
              {t("nav.leaderboard")}
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
