import "./globals.css";
import { Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { ThemeToggle } from "./components/theme-toggle";
import { GutterSides } from "./components/gutter-sides";
import { IntroOverlay } from "./components/intro-overlay";

const voice = Space_Grotesk({ subsets: ["latin"], display: "swap", variable: "--font-voice" });
const evidence = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500", "600"], display: "swap", variable: "--font-evidence" });

export const metadata = {
  title: "Sentinel: Runtime policy enforcement for AI agents",
  description: "Every agent action evaluated before execution. ALLOW | REVIEW | BLOCK. Deterministic policy decides, models only advise, outages fail closed.",
};

const GITHUB = "https://github.com/nsfwsabir/Sentinel";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${voice.variable} ${evidence.variable}`} suppressHydrationWarning>
      <body className="bg-paper font-voice text-neutral-800 antialiased dark:bg-neutral-950 dark:text-neutral-200">
        <Script
          id="sentinel-theme"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("sentinel-theme");if(t==="dark"||(!t&&matchMedia("(prefers-color-scheme: dark)").matches)){document.documentElement.classList.add("dark")}}catch(e){}})()`,
          }}
        />
        <div className="min-h-screen">
          <header className="sticky top-0 z-50 border-b border-neutral-200 bg-paper/85 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-950/85">
            <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between gap-3 px-5 py-3 lg:px-8">
              <a href="#top" className="flex items-center gap-2.5">
                <img src="/brand/logo-sm.png" alt="Sentinel logo" width={28} height={28} className="h-7 w-7 rounded-md" />
                <span className="text-[16px] font-bold tracking-tight text-ink dark:text-neutral-50">Sentinel</span>
              </a>
              <nav aria-label="Sections" className="hidden items-center gap-1 text-[13px] lg:flex">
                {[
                  ["Demo", "#demo"],
                  ["How it works", "#how"],
                  ["Review queue", "#review"],
                  ["Audit", "#audit"],
                  ["FAQ", "#faq"],
                ].map(([label, href]) => (
                  <a
                    key={href}
                    href={href}
                    className="rounded-md px-2.5 py-1.5 font-medium text-neutral-500 hover:bg-neutral-100 hover:text-ink dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
                  >
                    {label}
                  </a>
                ))}
              </nav>
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <a
                  href={GITHUB}
                  className="hidden rounded-md px-2.5 py-1.5 text-[13px] font-medium text-neutral-500 hover:bg-neutral-100 hover:text-ink sm:inline dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
                >
                  GitHub
                </a>
                <a
                  href={GITHUB}
                  className="rounded-md bg-ink px-3 py-1.5 text-[13px] font-bold text-white dark:bg-neutral-100 dark:text-ink"
                >
                  Self-host
                </a>
              </div>
            </div>
          </header>
          <main id="top" className="mx-auto w-full max-w-[1440px] px-5 lg:px-8">
            {children}
          </main>
          {/* Gutter texture for ultra-wide viewports: etched dot grid outside
              the content column. Asleep until hovered. */}
          <GutterSides />
          <IntroOverlay />
          <Analytics />
          <footer className="mt-20 border-t border-neutral-200 dark:border-neutral-800">
            <div className="mx-auto flex w-full max-w-[1440px] flex-wrap items-center justify-between gap-3 px-5 py-6 text-xs text-neutral-500 lg:px-8 dark:text-neutral-400">
              <span className="flex items-center gap-2">
                <img src="/brand/logo-sm.png" alt="" width={18} height={18} className="h-[18px] w-[18px] rounded" />
                <span className="font-mono">Sentinel is a runtime gate for AI agents. MIT.</span>
              </span>
              <span className="flex gap-4">
                <a href={GITHUB} className="underline decoration-neutral-300 underline-offset-2 hover:text-ink dark:decoration-neutral-600 dark:hover:text-white">
                  GitHub
                </a>
                <a href="#demo" className="underline decoration-neutral-300 underline-offset-2 hover:text-ink dark:decoration-neutral-600 dark:hover:text-white">
                  Live demo
                </a>
                <a href="#faq" className="underline decoration-neutral-300 underline-offset-2 hover:text-ink dark:decoration-neutral-600 dark:hover:text-white">
                  FAQ
                </a>
              </span>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
