"use client";

import { useEffect, useState } from "react";

// First-load intro: shield expands center-screen, then the curtain lifts.
// Client-only (renders nothing on the server) so no-JS visitors never get
// stuck behind it. Skipped entirely under reduced-motion.
export function IntroOverlay() {
  const [phase, setPhase] = useState<"hide" | "in" | "out">("hide");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setPhase("in");
    document.body.style.overflow = "hidden";
    const t1 = setTimeout(() => setPhase("out"), 950);
    const t2 = setTimeout(() => {
      setPhase("hide");
      document.body.style.overflow = "";
    }, 1350);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      document.body.style.overflow = "";
    };
  }, []);

  if (phase === "hide") return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center gap-5 bg-ink ${phase === "out" ? "intro-overlay-exit" : ""}`}
    >
      <img src="/brand/logo-sm.png" alt="" width={80} height={80} className="intro-logo h-20 w-20 rounded-2xl" />
      <p className="intro-word font-mono text-xs uppercase text-neutral-400">Sentinel</p>
    </div>
  );
}
