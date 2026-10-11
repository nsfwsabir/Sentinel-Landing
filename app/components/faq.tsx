"use client";

import { useState } from "react";

const FAQS = [
  {
    q: "What if the model goes down?",
    a: "Sentinel plays it safe. Dangerous stuff gets blocked, the rest waits for a person. A failed answer is never taken as a yes, and the stumble gets logged.",
  },
  {
    q: "Do you keep what my agents send?",
    a: "As little as possible. The decision, which rules matched, and redacted notes. Full payloads with sensitive bits stay out by default.",
  },
  {
    q: "What does “review” actually mean?",
    a: "It means waiting on a person. It sits in the queue until someone approves or rejects it. Nothing continues on its own, and the call gets logged.",
  },
  {
    q: "What do I need to go live?",
    a: "Real passwords and secrets instead of the dev ones, encrypted traffic in front, and backups of the database. The app refuses to run properly until the dev defaults are gone.",
  },
  {
    q: "What isn’t Sentinel?",
    a: "Not an agent, not a cure-all dashboard, not a safety guarantee. It is the checkpoint between your agent and the tools it wants to use.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number>(0);
  return (
    <div className="divide-y divide-neutral-200 rounded-xl border border-neutral-200 bg-white dark:divide-neutral-800 dark:border-neutral-800 dark:bg-neutral-900">
      {FAQS.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q}>
            <button
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <span className="text-[15px] font-bold tracking-tight text-ink dark:text-neutral-50">{f.q}</span>
              <span
                aria-hidden="true"
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-neutral-300 text-lg leading-none transition-transform duration-300 dark:border-neutral-700 ${
                  isOpen ? "rotate-45" : ""
                }`}
              >
                +
              </span>
            </button>
            <div
              className={`grid transition-all duration-300 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">{f.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
