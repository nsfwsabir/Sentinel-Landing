"use client";

import { useEffect, useRef, useState } from "react";

// Gutter texture for ultra-wide viewports: etched dot grid outside the
// content column. Asleep by default; hovering a gutter wakes only that side
// into flowing drift plus a soft glow that trails the cursor loosely.
// Static when reduced-motion is set or on touch layouts.
export function GutterSides() {
  const [hover, setHover] = useState<"left" | "right" | null>(null);
  const leftGlow = useRef<HTMLDivElement>(null);
  const rightGlow = useRef<HTMLDivElement>(null);
  const hoverRef = useRef<typeof hover>(null);
  hoverRef.current = hover;

  useEffect(() => {
    if (!window.matchMedia("(hover: hover)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let yL = -400;
    let yR = -400;
    let raf = 0;
    let running = false;
    const tick = () => {
      const h = hoverRef.current;
      // Only the hovered side trails the cursor; the other holds still.
      if (h === "left" && leftGlow.current) {
        yL += (targetY - yL) * 0.08;
        leftGlow.current.style.transform = `translate(-50%, ${yL.toFixed(1)}px)`;
        if (Math.abs(targetY - yL) < 0.5) {
          running = false;
          return;
        }
      }
      if (h === "right" && rightGlow.current) {
        yR += (targetY - yR) * 0.08;
        rightGlow.current.style.transform = `translate(-50%, ${yR.toFixed(1)}px)`;
        if (Math.abs(targetY - yR) < 0.5) {
          running = false;
          return;
        }
      }
      if (h) {
        raf = requestAnimationFrame(tick);
      } else {
        running = false;
      }
    };
    let targetY = -400;
    const onMove = (e: MouseEvent) => {
      const vw = window.innerWidth;
      if (vw < 1440) {
        if (hoverRef.current) setHover(null);
        return;
      }
      const edge = (vw - 1440) / 2;
      const side = e.clientX < edge ? "left" : e.clientX > vw - edge ? "right" : null;
      if (side !== hoverRef.current) setHover(side);
      if (side) {
        targetY = e.clientY - 150;
        if (!running) {
          running = true;
          raf = requestAnimationFrame(tick);
        }
      }
    };

    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  const strip =
    "pointer-events-none fixed inset-y-0 z-0 hidden w-[max(0px,calc((100vw-1440px)/2))] overflow-hidden min-[1440px]:block";

  return (
    <>
      <div aria-hidden="true" className={`${strip} left-0`}>
        <div
          className="gutter-dots gutter-drift absolute inset-x-0 -top-[44px] bottom-0 [mask-image:linear-gradient(to_right,black_55%,transparent)]"
          style={{ animationPlayState: hover === "left" ? "running" : "paused" }}
        />
        <div
          ref={leftGlow}
          className="gutter-glow absolute left-1/2 top-0 h-[300px] w-[300px] transition-opacity duration-700"
          style={{ transform: "translate(-50%, -400px)", opacity: hover === "left" ? 1 : 0 }}
        />
      </div>
      <div aria-hidden="true" className={`${strip} right-0`}>
        <div
          className="gutter-dots gutter-drift absolute inset-x-0 -top-[44px] bottom-0 [mask-image:linear-gradient(to_left,black_55%,transparent)]"
          style={{ animationPlayState: hover === "right" ? "running" : "paused" }}
        />
        <div
          ref={rightGlow}
          className="gutter-glow absolute left-1/2 top-0 h-[300px] w-[300px] transition-opacity duration-700"
          style={{ transform: "translate(-50%, -400px)", opacity: hover === "right" ? 1 : 0 }}
        />
      </div>
    </>
  );
}
