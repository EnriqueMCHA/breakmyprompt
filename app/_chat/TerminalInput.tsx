"use client";

import { Button } from "@/app/_ui/Button";
import { useTranslation } from "@/lib/i18n/provider";
import { useCallback, useRef, useState } from "react";

interface TerminalInputProps {
  onSubmit: (message: string) => void;
  disabled?: boolean;
}

export function TerminalInput({
  onSubmit,
  disabled = false,
}: TerminalInputProps) {
  const { t } = useTranslation();
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = useCallback(() => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSubmit(trimmed);
    setValue("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  }, [value, disabled, onSubmit]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    const el = e.target;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
  };

  return (
    <div className="relative glass-lg p-3">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        placeholder={t("chat.placeholder")}
        rows={2}
        className="w-full bg-transparent text-foreground font-mono text-sm resize-none outline-none placeholder:text-muted/50 pr-24 min-h-[56px]"
      />
      <div className="absolute right-3 bottom-3">
        <Button
          size="sm"
          onClick={handleSubmit}
          disabled={disabled || !value.trim()}
        >
          {disabled ? (
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span
                className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"
                style={{ animationDelay: "150ms" }}
              />
              <span
                className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"
                style={{ animationDelay: "300ms" }}
              />
            </span>
          ) : (
            t("chat.execute")
          )}
        </Button>
      </div>
    </div>
  );
}
