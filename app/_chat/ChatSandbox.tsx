"use client";

import { Badge } from "@/app/_ui/Badge";
import { useTranslation } from "@/lib/i18n/provider";
import type { Difficulty } from "@/lib/levels/types";
import { useEffect, useRef, useState } from "react";
import { ChatMessage } from "./ChatMessage";
import { TerminalInput } from "./TerminalInput";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatSandboxProps {
  level: number;
  difficulty: Difficulty;
  levelName: string;
  botName: string;
}

export function ChatSandbox({
  level,
  difficulty,
  levelName,
  botName,
}: ChatSandboxProps) {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [compromised, setCompromised] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (message: string) => {
    const userMsg: Message = { role: "user", content: message };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    // Placeholder: will be replaced with actual AI API calls
    setTimeout(() => {
      const aiResponse: Message = {
        role: "assistant",
        content: `[${botName}]: I received your message. (AI integration pending — this is a UI preview.)`,
      };
      setMessages((prev) => [...prev, aiResponse]);
      setLoading(false);
    }, 1200);
  };

  return (
    <section className="py-8 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        {/* Mission header */}
        <div className="glass-lg p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <Badge difficulty={difficulty}>Level {level}</Badge>
              <h3 className="font-display font-semibold text-foreground">
                {levelName}
              </h3>
            </div>
            <span className="text-xs font-mono text-muted">{botName}</span>
          </div>
          <p className="text-sm text-muted">
            <span className="text-accent font-semibold">
              {t("chat.mission")}:
            </span>{" "}
            {t("chat.objective")}
          </p>
        </div>

        {/* Chat area */}
        <div className="glass-lg p-4 mb-4 min-h-[300px] max-h-[450px] overflow-y-auto">
          {messages.length === 0 && (
            <div className="flex items-center justify-center h-[250px] text-muted text-sm">
              <div className="text-center">
                <div className="font-mono text-xs text-accent mb-2">
                  &gt; awaiting_input...
                </div>
                <p>Type your injection payload below to begin.</p>
              </div>
            </div>
          )}
          {messages.map((msg, i) => (
            <ChatMessage key={i} role={msg.role} content={msg.content} />
          ))}
          {loading && (
            <div className="flex justify-start mb-4">
              <div className="glass px-4 py-3 rounded-2xl rounded-bl-md">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  <span
                    className="w-2 h-2 rounded-full bg-accent animate-pulse"
                    style={{ animationDelay: "150ms" }}
                  />
                  <span
                    className="w-2 h-2 rounded-full bg-accent animate-pulse"
                    style={{ animationDelay: "300ms" }}
                  />
                </span>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* SYSTEM COMPROMISED overlay */}
        {compromised && (
          <div className="glass-lg p-6 mb-4 border-success/30 bg-success/5 text-center">
            <h3 className="font-display font-bold text-2xl text-success animate-glitch">
              {t("chat.system_compromised")}
            </h3>
          </div>
        )}

        {/* Terminal input */}
        <TerminalInput onSubmit={handleSubmit} disabled={loading} />
      </div>
    </section>
  );
}
