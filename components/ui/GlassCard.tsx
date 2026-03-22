interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

export function GlassCard({
  children,
  className = "",
  hover = false,
  glow = false,
}: GlassCardProps) {
  return (
    <div
      className={`
        glass-lg
        ${hover ? "transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_0_24px_var(--color-primary-glow)] hover:border-primary/30" : ""}
        ${glow ? "animate-pulse-glow" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
