import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { I18nProvider } from "@/lib/i18n/provider";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const sora = localFont({
  src: "../public/fonts/Sora/Sora-VariableFont_wght.ttf",
  variable: "--font-clash",
  display: "swap",
});

const outfit = localFont({
  src: "../public/fonts/Outfit/Outfit-VariableFont_wght.ttf",
  variable: "--font-general",
  display: "swap",
});

const jetbrainsMono = localFont({
  src: "../public/fonts/JetBrains_Mono/JetBrainsMono-VariableFont_wght.ttf",
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "BreakMyPrompt — Learn Prompt Injection",
  description:
    "A gamified sandbox to learn, practice, and prevent prompt injection attacks. Master AI security through hands-on challenges.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sora.variable} ${outfit.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <I18nProvider>{children}</I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
