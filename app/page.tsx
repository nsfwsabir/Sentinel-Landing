import { StatusPill } from "./components/ui";
import { Reveal } from "./components/reveal";
import { Showcase } from "./components/showcase";
import { Tilt } from "./components/tilt";
import { Faq } from "./components/faq";

const GITHUB = "https://github.com/nsfwsabir/Sentinel";

function ShotFrame({ src, alt, caption, eager = false }: { src: string; alt: string; caption?: string; eager?: boolean }) {
  return (
    <figure className="shot-frame overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-xl shadow-neutral-950/5 dark:border-neutral-800 dark:bg-neutral-900 dark:shadow-black/40">
      <div className="flex items-center gap-2 border-b border-neutral-200 px-4 py-2.5 dark:border-neutral-800" aria-hidden="true">
        <span className="h-2.5 w-2.5 rounded-full bg-neutral-300 dark:bg-neutral-700" />
        <span className="h-2.5 w-2.5 rounded-full bg-neutral-300 dark:bg-neutral-700" />
        <span className="h-2.5 w-2.5 rounded-full bg-neutral-300 dark:bg-neutral-700" />
      </div>
      <img src={src} alt={alt} className="h-auto w-full" loading={eager ? "eager" : "lazy"} />
      {caption && (
        <figcaption className="border-t border-neutral-200 px-4 py-2.5 font-mono text-[11px] leading-relaxed text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

const TICKER = [
  "pol_exfil · block",
  "pol_creds · block",
  "pol_prod · review",
  "pol_pay · review",
  "send_email · high",
  "delete_resource · critical",
  "refund · high",
  "query_database · medium",
  "BLOCK > REVIEW > ALLOW",
  "fail-closed",
];

export default function Landing() {
  return (
    <div className="flex flex-col">
      {/* ---------- HERO ---------- */}
      <section aria-label="Sentinel overview" className="mt-6 overflow-hidden rounded-2xl bg-ink text-white dark:bg-neutral-900 dark:ring-1 dark:ring-neutral-800">
        <div className="flex flex-col gap-8 p-7 sm:p-10 xl:p-12">
          <div className="grid items-end gap-8 xl:grid-cols-[1.3fr_1fr]">
            <div className="max-w-3xl">
              <p className="hero-rise hero-rise-1 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-neutral-400">
                <span className="live-dot inline-block h-1.5 w-1.5 rounded-full bg-green-500" />
                A gate in front of your agents
              </p>
              <h1 className="hero-rise hero-rise-2 mt-4 text-[42px] font-bold leading-[0.98] tracking-tight sm:text-6xl xl:text-7xl">
                Every agent action, ruled before it runs.
              </h1>
              <p className="hero-rise hero-rise-3 mt-5 max-w-2xl text-[15px] leading-relaxed text-neutral-300">
                Your agent says what it wants to do. Sentinel checks your rules first and answers: allow, review, or
                block. When in doubt, it says no.
              </p>
              <div className="hero-rise hero-rise-4 mt-7 flex flex-wrap items-center gap-3">
                <a href={GITHUB} className="rounded-lg bg-white px-5 py-3 text-sm font-bold text-black transition-transform hover:-translate-y-0.5">
                  Self-host in 5 minutes
                </a>
                <a
                  href={GITHUB}
                  className="rounded-lg border border-neutral-700 px-5 py-3 text-sm font-medium text-white transition-colors hover:border-neutral-400"
                >
                  View GitHub
                </a>
              </div>
            </div>
            <div className="hero-rise hero-rise-4 rounded-lg border border-neutral-800 bg-neutral-950 px-4 py-3">
              <p className="break-all font-mono text-xs leading-relaxed text-neutral-300">
                git clone https://github.com/nsfwsabir/Sentinel.git && cd Sentinel
                <br />
                docker compose up --build -d
              </p>
              <p className="mt-2 font-mono text-[11px] text-neutral-500">
                Dashboard :3000 · API :3001 · wire a judgment provider to judge
              </p>
            </div>
          </div>
          <div className="hero-rise hero-rise-3 flex flex-col justify-center">
            <Tilt className="px-1 py-5 sm:px-4">
              <div className="shadow-[0_50px_100px_-24px_rgba(0,0,0,0.65)]">
                <Showcase />
              </div>
            </Tilt>
            <p className="mt-3 font-mono text-[11px] text-neutral-500">
              Real screens from our own test setup. It cycles through them on its own. Hover to pause, pick a tab,
              tap the stamp to slam it again, tap the picture to zoom.
            </p>
          </div>
        </div>
      </section>

      {/* ---------- TICKER ---------- */}
      <div aria-hidden="true" className="ticker-mask mt-6 overflow-hidden border-y border-neutral-200 py-2.5 dark:border-neutral-800">
        <div className="ticker-track flex w-max gap-8 whitespace-nowrap font-mono text-[11px] uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
          {[...TICKER, ...TICKER].map((t, i) => (
            <span key={i} className="flex items-center gap-8">
              {t} <span className="text-neutral-300 dark:text-neutral-700">/</span>
            </span>
          ))}
        </div>
      </div>

      {/* ---------- DEMO / SIMULATE ---------- */}
      <section id="demo" aria-label="Try a ruling" className="scroll-mt-24 pt-16 sm:pt-20">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.14em] text-neutral-500">Try it</p>
          <h2 className="mt-2 max-w-2xl text-3xl font-bold tracking-tight text-ink sm:text-4xl dark:text-neutral-50">
            Try the exact decision your agent would get.
          </h2>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-400">
            The same examples as inside the product. Pick one, press Evaluate, open the ruling. Nothing really runs.
          </p>
        </Reveal>
        <div className="mt-8 grid items-start gap-8 xl:grid-cols-[1fr_1.4fr]">
          <Reveal delayMs={100} className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              {[
                { t: "Clean database read", d: "Reads ten rows, nothing sensitive", p: "allow" as const },
                { t: "Routine email", d: "A note to a teammate", p: "allow" as const },
                { t: "Small refund $25", d: "Too small to bother a person", p: "allow" as const },
                { t: "Customer data exfil", d: "Customer file, outside address. Stopped.", p: "block" as const },
              ].map((r) => (
                <div
                  key={r.t}
                  className="flex items-center justify-between gap-3 rounded-xl border border-neutral-200 bg-white px-4 py-3 transition-transform hover:-translate-y-0.5 dark:border-neutral-800 dark:bg-neutral-900"
                >
                  <span>
                    <span className="block text-sm font-bold text-ink dark:text-neutral-50">{r.t}</span>
                    <span className="block font-mono text-[11px] text-neutral-500 dark:text-neutral-400">{r.d}</span>
                  </span>
                  <StatusPill value={r.p} />
                </div>
              ))}
            </div>
            <p className="font-mono text-[11px] leading-relaxed text-neutral-500">
              Checked against the code: the first three pass, the last one gets blocked. No model needed for that call.
            </p>
          </Reveal>
          <Reveal delayMs={200}>
            <ShotFrame
              src="/shots/simulate-light.png"
              alt="Simulate page with four preset buttons, agent and tool selectors, arguments editor, Evaluate button, and an ALLOW result at 100% confidence"
              caption="Dashboard, Simulate, Evaluate, open the ruling. Real screenshot, light mode."
            />
          </Reveal>
        </div>
      </section>

      {/* ---------- HOW IT WORKS ---------- */}
      <section id="how" aria-label="How Sentinel decides" className="scroll-mt-24 pt-16 sm:pt-24">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.14em] text-neutral-500">How it decides</p>
          <h2 className="mt-2 max-w-2xl text-3xl font-bold tracking-tight text-ink sm:text-4xl dark:text-neutral-50">
            How a ruling gets made.
          </h2>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-neutral-500 dark:text-neutral-400">
            Same four steps, every single time.
          </p>
        </Reveal>
        <div className="mt-8 grid items-start gap-8 xl:grid-cols-[1.4fr_1fr]">
          <Reveal delayMs={150}>
            <ShotFrame
              src="/shots/settings-light.png"
              alt="Settings page showing a connected judgment provider with five yes-or-no questions"
              caption="Settings, judgment provider, test connection. The model answers questions. It never allows or blocks."
            />
          </Reveal>
          <ol className="flex flex-col gap-0">
            {[
              { n: "01", t: "Your agent asks first", d: "Before it sends, deletes, or pays anything, it tells Sentinel who it is and what it wants to do." },
              { n: "02", t: "Your hard rules run first", d: "Customer files going outside? Deleting production? Over the $100 limit? Plain code settles those on the spot. A block here ends it." },
              { n: "03", t: "A model weighs the gray areas", d: "For the rest, the provider you wired in answers five plain yes-or-no questions. It advises. It never decides." },
              { n: "04", t: "You get an answer with reasons", d: "Allow, review, or block, with the why attached. Reviews sit tight until a person rules. It all lands in a log nobody can quietly rewrite." },
            ].map((s, i) => (
              <Reveal key={s.n} delayMs={i * 80}>
                <li className="flex gap-4 border-t border-neutral-200 py-5 last:border-b dark:border-neutral-800">
                  <span className="font-mono text-xs font-semibold text-neutral-400">{s.n}</span>
                  <span>
                    <span className="block text-[15px] font-bold text-ink dark:text-neutral-50">{s.t}</span>
                    <span className="mt-1 block max-w-lg text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">{s.d}</span>
                  </span>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
        <Reveal delayMs={200}>
          <div className="mt-6 rounded-lg border border-neutral-200 bg-folio px-4 py-3 dark:border-neutral-800 dark:bg-neutral-900">
            <p className="font-mono text-xs text-neutral-700 dark:text-neutral-300">
              JUDGMENT_PROVIDER=laya <span className="text-neutral-500">· LAYA_API_KEY stays on your server</span>
            </p>
          </div>
        </Reveal>
      </section>

      {/* ---------- REVIEW QUEUE ---------- */}
      <section id="review" aria-label="Human review queue" className="scroll-mt-24 pt-16 sm:pt-24">
        <div className="grid items-center gap-8 xl:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <p className="font-mono text-xs tracking-[0.14em] text-neutral-500">A human breaks ties</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl dark:text-neutral-50">
              Unsure means a person decides. Never an auto-yes.
            </h2>
            <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-400">
              A $250 refund beats the $100 limit, so it waits its turn. Someone you trust presses Approve or Reject.
              That press gets logged too.
            </p>
            <div className="mt-5 flex items-center gap-2">
              <StatusPill value="review" />
              <span className="font-mono text-xs text-neutral-500">dec_f88f9ccd · $250 over a $100 limit</span>
            </div>
          </Reveal>
          <Reveal delayMs={150}>
            <ShotFrame
              src="/shots/approvals-light.png"
              alt="Approvals queue with one pending decision for a $250 payment exceeding the $100 threshold, with Approve and Reject buttons"
              caption="The approvals queue. Real screenshot. Somebody still has to rule on dec_f88f9ccd."
            />
          </Reveal>
        </div>
      </section>

      {/* ---------- AUDIT ---------- */}
      <section id="audit" aria-label="Auditability" className="scroll-mt-24 pt-16 sm:pt-24">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.14em] text-neutral-500">Proof</p>
          <h2 className="mt-2 max-w-2xl text-3xl font-bold tracking-tight text-ink sm:text-4xl dark:text-neutral-50">
            Every ruling leaves a trail you can check.
          </h2>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-400">
            Real numbers from our test setup: 24 rulings, 7 blocked, 1 waiting, 16 allowed. And anyone can ask
            Sentinel to re-check its own log, top to bottom.
          </p>
        </Reveal>
        <Reveal delayMs={150} className="mt-8">
          <ShotFrame
            src="/shots/overview-light.png"
            alt="Overview page with Blocked 7, Waiting 1, Allowed 16 metrics, audit chain verified badge, queue banner, and latest rulings tape with allow, review, block and approved stamps"
            caption="The overview. Real screenshot. Counts, queue banner, and the latest rulings."
          />
        </Reveal>
        <Reveal delayMs={220}>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-neutral-200 bg-folio p-5 dark:border-neutral-800 dark:bg-neutral-900">
              <p className="text-[15px] font-bold text-ink dark:text-neutral-50">The why, spelled out</p>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                What it tried, which rules matched, what the model said, and the reason. The whole story on one screen.
              </p>
            </div>
            <div className="rounded-xl border border-neutral-200 bg-folio p-5 dark:border-neutral-800 dark:bg-neutral-900">
              <p className="text-[15px] font-bold text-ink dark:text-neutral-50">A log you can check</p>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                Ask for a verification any time. Even after old entries are cleaned up, signed checkpoints still prove
                the chain.
              </p>
            </div>
            <div className="rounded-xl border border-neutral-200 bg-folio p-5 dark:border-neutral-800 dark:bg-neutral-900">
              <p className="text-[15px] font-bold text-ink dark:text-neutral-50">Quiet when it matters</p>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                Can&apos;t reach the model? Risky stuff gets blocked, the rest waits. A broken answer is never treated
                as a yes.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ---------- DECISION DETAIL BAND ---------- */}
      <section aria-label="Blocked decision" className="pt-16 sm:pt-24">
        <div className="grid items-center gap-8 overflow-hidden rounded-2xl bg-ink p-7 text-white sm:p-10 xl:grid-cols-[1fr_1.4fr] dark:bg-neutral-900 dark:ring-1 dark:ring-neutral-800">
          <Reveal>
            <div className="flex items-center gap-3">
              <StatusPill value="block" />
              <span className="rounded-full border border-neutral-700 px-2.5 py-0.5 font-mono text-[11px] text-neutral-300">
                RISK 80 · CRITICAL
              </span>
            </div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">The exfil that never sent.</h2>
            <p className="mt-3 max-w-md font-mono text-[13px] leading-relaxed text-neutral-300">
              send_email {"{ to: external@example.com, attachment: customers.csv }"}
            </p>
            <p className="mt-3 max-w-md text-[15px] leading-relaxed text-neutral-400">
              It tried to mail the customer file outside. Two of your rules caught it, so nothing sent. The reason
              sits on the record.
            </p>
          </Reveal>
          <Reveal delayMs={150}>
            <div className="shot-frame overflow-hidden rounded-xl border border-neutral-800">
              <img
                src="/shots/decision-dark.png"
                alt="Decision detail for blocked send_email showing action JSON, policies pol_creds and pol_exfil, and final BLOCK decision"
                className="h-auto w-full"
                loading="lazy"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section id="faq" aria-label="FAQ" className="scroll-mt-24 pt-16 sm:pt-24">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.14em] text-neutral-500">Questions</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl dark:text-neutral-50">
            Answers before you self-host.
          </h2>
        </Reveal>
        <Reveal delayMs={120} className="mt-8">
          <Faq />
        </Reveal>
      </section>

      {/* ---------- FINAL CTA ---------- */}
      <section aria-label="Get started" className="pt-16 sm:pt-24">
        <Reveal>
          <div className="grid overflow-hidden rounded-2xl bg-ink text-white lg:grid-cols-[1.25fr_1fr]">
            <div className="p-8 sm:p-12">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-neutral-400">
                MIT · your infra · your keys
              </p>
              <h2 className="mt-3 max-w-xl text-4xl font-bold tracking-tight sm:text-5xl">
                Put a gate in front of your agents.
              </h2>
              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-neutral-300">
                Clone it, start it, open Simulate. Plug in Laya, OpenAI, Decision-1, or Jev when ready. The models
                advise. Your rules decide.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href={GITHUB} className="rounded-lg bg-white px-5 py-3 text-sm font-bold text-black transition-transform hover:-translate-y-0.5">
                  Self-host in 5 minutes
                </a>
                <a href={GITHUB} className="rounded-lg border border-neutral-600 px-5 py-3 text-sm font-medium text-white transition-colors hover:border-neutral-300">
                  View GitHub
                </a>
              </div>
              <p className="mt-5 font-mono text-[11px] text-neutral-400">
                docker compose up --build -d → localhost:3000 → Simulate → Evaluate
              </p>
            </div>
            {/* Brand cell: everything in-flow with padding. Nothing bleeds,
                nothing clips at any width. */}
            <div className="flex flex-col items-center justify-center gap-5 border-t border-neutral-800 bg-neutral-950 p-8 sm:p-10 lg:border-l lg:border-t-0">
              <img src="/brand/logo.png" alt="" aria-hidden="true" loading="lazy"
                className="h-36 w-36 mix-blend-screen sm:h-44 sm:w-44" />
              <div className="flex items-center gap-2">
                <StatusPill value="allow" />
                <StatusPill value="review" />
                <StatusPill value="block" />
              </div>
              <p className="font-mono text-[11px] text-neutral-500">every action, before execution</p>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
