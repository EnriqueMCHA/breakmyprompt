export function Footer() {
  return (
    <footer className="border-t border-surface-border py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted">
            <span className="font-display font-semibold text-foreground">
              Break<span className="text-primary">My</span>Prompt
            </span>{" "}
            &mdash; Learn AI Security
          </p>
          <p className="text-xs text-muted">
            Built for the Hackathon &middot; 2025
          </p>
        </div>
      </div>
    </footer>
  );
}
