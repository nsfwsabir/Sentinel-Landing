const STAMP_TONES: Record<string, string> = {
  allow: "border-allow/60 text-allow dark:border-green-500/60 dark:text-green-400",
  approved: "border-allow/60 text-allow dark:border-green-500/60 dark:text-green-400",
  review: "border-review/60 text-review dark:border-amber-500/60 dark:text-amber-400",
  block: "border-block/70 text-block dark:border-red-500/70 dark:text-red-400",
  rejected: "border-block/70 text-block dark:border-red-500/70 dark:text-red-400",
};

// Verdict stamp: square rubber-stamp voice. Caps here are the subject's
// vernacular (a stamp reads ALLOW), not a label treatment.
export function StatusPill({ value }: { value: string }) {
  const tone = STAMP_TONES[value.toLowerCase()] ?? "border-neutral-300 text-neutral-500 dark:border-neutral-700 dark:text-neutral-400";
  return (
    <span className={`inline-block rounded-[3px] border-2 px-1.5 py-px font-mono text-[11px] font-semibold uppercase tracking-wide ${tone}`}>
      {value}
    </span>
  );
}
