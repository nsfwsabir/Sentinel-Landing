"use client";

import { useEffect, useRef, useState } from "react";

type DemoKey = "block" | "allow" | "review";

const DEMOS: Record<
  DemoKey,
  {
    tab: string;
    shot: string;
    alt: string;
    pill: string;
    caption: string;
    steps: { label: string; detail: string }[];
  }
> = {
  block: {
    tab: "Exfil → BLOCK",
    shot: "/shots/decision-dark.png",
    alt: "Decision Detail showing BLOCK for send_email with customers.csv to an external recipient, RISK 80 CRITICAL, policies pol_creds and pol_exfil",
    pill: "block",
    caption: "research-agent · send_email { to: external@example.com, attachment: customers.csv } → dec_e1bf234d",
    steps: [
      { label: "Propose", detail: "Agent asks first" },
      { label: "Deterministic", detail: "pol_exfil and pol_creds match. Stopped here, no model needed." },
      { label: "Rule", detail: "BLOCK · RISK 80 · CRITICAL" },
    ],
  },
  allow: {
    tab: "Routine → ALLOW",
    shot: "/shots/simulate-dark.png",
    alt: "Simulate page evaluating a routine teammate email, result ALLOW with 100% confidence and no policy violation",
    pill: "allow",
    caption: "research-agent · send_email { to: teammate@example.com } → 100% · no policy violation",
    steps: [
      { label: "Propose", detail: "Picked from the examples" },
      { label: "Deterministic", detail: "No rule matched" },
      { label: "Rule", detail: "ALLOW. It runs." },
    ],
  },
  review: {
    tab: "Payment → REVIEW",
    shot: "/shots/approvals-dark.png",
    alt: "Approvals queue showing pending decision dec_f88f9ccd, payment $250 exceeds $100 threshold, with Approve and Reject buttons",
    pill: "review",
    caption: "dec_f88f9ccd · $250 exceeds $100 threshold → pending human ruling",
    steps: [
      { label: "Propose", detail: "A $250 refund" },
      { label: "Deterministic", detail: "pol_pay: over the limit" },
      { label: "Rule", detail: "REVIEW. It waits for a person." },
    ],
  },
};

const ORDER: DemoKey[] = ["block", "allow", "review"];

// Rubber-stamp tones on dark glass, same as the dashboard's dark stamps.
const STAMP_TONE: Record<DemoKey, string> = {
  block: "border-red-500/90 text-red-400",
  allow: "border-green-500/90 text-green-400",
  review: "border-amber-500/90 text-amber-400",
};

export function Showcase() {
  const [active, setActive] = useState<DemoKey>("block");
  const [nonce, setNonce] = useState(0);
  const [held, setHeld] = useState(false);
  const [visible, setVisible] = useState(true);
  const [reduceMotion] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const root = useRef<HTMLDivElement>(null);
  const demo = DEMOS[active];

  // Auto-cycle only while on screen, unheld, and motion is welcome.
  useEffect(() => {
    const el = root.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (reduceMotion || held || !visible) return;
    const id = setInterval(() => {
      setActive((a) => ORDER[(ORDER.indexOf(a) + 1) % ORDER.length]);
    }, 6000);
    return () => clearInterval(id);
  }, [reduceMotion, held, visible]);

  return (
    <div
      ref={root}
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={() => setHeld(false)}
      className="overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950 shadow-2xl shadow-black/40"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-800 px-4 py-3">
        <div className="flex items-center gap-2" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-neutral-700" />
          <span className="h-2.5 w-2.5 rounded-full bg-neutral-700" />
          <span className="h-2.5 w-2.5 rounded-full bg-neutral-700" />
        </div>
        <div className="flex items-center gap-2" role="tablist" aria-label="Product demo states">
          {ORDER.map((k) => (
            <button
              key={k}
              role="tab"
              aria-selected={active === k}
              onClick={() => setActive(k)}
              className={`rounded-md px-2.5 py-1.5 font-mono text-xs transition-colors ${
                active === k
                  ? "bg-white font-semibold text-black"
                  : "text-neutral-400 hover:bg-neutral-800 hover:text-white"
              }`}
            >
              {DEMOS[k].tab}
            </button>
          ))}
        </div>
        <span className="hidden items-center gap-1.5 font-mono text-[11px] text-neutral-500 sm:flex">
          <span className="live-dot inline-block h-1.5 w-1.5 rounded-full bg-green-500" />
          {reduceMotion ? "live UI" : held ? "held" : "auto-cycling"}
        </span>
      </div>

      <div key={active}>
        <div className="relative">
          <a href={demo.shot} target="_blank" rel="noreferrer" title="Open full-resolution screenshot" className="block">
            <img src={demo.shot} alt={demo.alt} className="h-auto w-full" loading="eager" />
          </a>
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <span className="-rotate-6 transition-transform duration-300 hover:scale-105">
              <button
                type="button"
                key={nonce}
                title="Replay stamp"
                aria-label={`Replay ${demo.pill} stamp animation`}
                onClick={() => setNonce((n) => n + 1)}
                className={`stamp-slam pointer-events-auto cursor-pointer rounded-lg border-4 bg-black/55 px-5 py-2.5 font-mono text-3xl font-bold uppercase tracking-[0.2em] shadow-2xl backdrop-blur-[1px] sm:text-4xl ${STAMP_TONE[active]}`}
              >
                {demo.pill}
              </button>
            </span>
          </div>
          <span className="pointer-events-none absolute bottom-4 right-4 rounded-md bg-black/70 px-2.5 py-1 font-mono text-[11px] text-neutral-300 backdrop-blur-sm">
            Open full resolution ↗
          </span>
        </div>
        <div className="grid gap-4 border-t border-neutral-800 p-4 sm:grid-cols-3">
          {demo.steps.map((s, i) => (
            <div key={s.label} className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white font-mono text-[11px] font-bold text-black">
                {i + 1}
              </span>
              <span>
                <span className="block text-[13px] font-bold text-white">{s.label}</span>
                <span className="block font-mono text-[11px] leading-relaxed text-neutral-400">{s.detail}</span>
              </span>
            </div>
          ))}
        </div>
        <p className="border-t border-neutral-800 px-4 py-3 font-mono text-[11px] leading-relaxed text-neutral-500">
          {demo.caption}
        </p>
      </div>
    </div>
  );
}
