"use client";

import { useEffect, useRef, type ReactNode } from "react";

// Tilt: perspective showcase with mouse parallax. Entrance runs on the outer
// wrapper (CSS), interactive tilt on the inner element (rAF + lerp) so the
// two never fight over `transform`. Straight and static when reduced-motion
// is set, on touch layouts, or below lg.
const BASE_X = 7;
const BASE_Y = -10;

export function Tilt({ children, className = "" }: { children: ReactNode; className?: string }) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const box = outer.current;
    const el = inner.current;
    if (!box || !el) return;
    const interactive =
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
      window.matchMedia("(hover: hover)").matches &&
      window.matchMedia("(min-width: 1024px)").matches;
    if (!interactive) return;

    el.style.transform = `perspective(1600px) rotateX(${BASE_X}deg) rotateY(${BASE_Y}deg)`;
    const target = { x: 0, y: 0 };
    const cur = { x: 0, y: 0 };
    let raf = 0;
    let running = false;

    const tick = () => {
      cur.x += (target.x - cur.x) * 0.12;
      cur.y += (target.y - cur.y) * 0.12;
      el.style.transform = `perspective(1600px) rotateX(${(BASE_X - cur.y * 6).toFixed(2)}deg) rotateY(${(BASE_Y + cur.x * 8).toFixed(2)}deg)`;
      const settled = Math.abs(target.x - cur.x) < 0.002 && Math.abs(target.y - cur.y) < 0.002;
      if (settled) {
        running = false;
      } else {
        raf = requestAnimationFrame(tick);
      }
    };
    const kick = () => {
      if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };
    const onMove = (e: MouseEvent) => {
      const r = box.getBoundingClientRect();
      target.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      target.y = ((e.clientY - r.top) / r.height) * 2 - 1;
      kick();
    };
    const onLeave = () => {
      target.x = 0;
      target.y = 0;
      kick();
    };

    box.addEventListener("mousemove", onMove);
    box.addEventListener("mouseleave", onLeave);
    return () => {
      box.removeEventListener("mousemove", onMove);
      box.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={outer} className={className}>
      <div ref={inner} className="tilt-enter will-change-transform" style={{ transformStyle: "preserve-3d" }}>
        {children}
      </div>
    </div>
  );
}
