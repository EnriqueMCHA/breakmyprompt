interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
}

export function ChatMessage({ role, content }: ChatMessageProps) {
  const isUser = role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      <div
        className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
          isUser
            ? "bg-primary/10 border border-primary/20 text-foreground rounded-br-md"
            : "glass text-foreground rounded-bl-md"
        }`}
      >
        {!isUser && (
          <span className="block text-xs font-mono text-accent mb-1 opacity-70">
            AI Agent
          </span>
        )}
        <p className="whitespace-pre-wrap">{content}</p>
      </div>
    </div>
  );
}
