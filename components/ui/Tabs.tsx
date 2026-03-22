"use client";

import { useState } from "react";

interface Tab {
  id: string;
  label: string;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  onChange?: (tabId: string) => void;
  className?: string;
}

export function Tabs({
  tabs,
  defaultTab,
  onChange,
  className = "",
}: TabsProps) {
  const [active, setActive] = useState(defaultTab || tabs[0]?.id || "");

  const handleClick = (tabId: string) => {
    setActive(tabId);
    onChange?.(tabId);
  };

  return (
    <div
      className={`inline-flex items-center gap-1 p-1 rounded-lg bg-(--color-bg-alt) border border-surface-border ${className}`}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => handleClick(tab.id)}
          className={`
            px-4 py-2 rounded-md text-sm font-medium font-display uppercase tracking-wider transition-all duration-200 cursor-pointer
            ${
              active === tab.id
                ? "bg-primary text-white shadow-[0_0_16px_var(--color-primary-glow)]"
                : "text-muted hover:text-foreground"
            }
          `}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
