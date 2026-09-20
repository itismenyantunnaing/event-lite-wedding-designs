"use client";

import { type ReactNode, useLayoutEffect, useRef } from "react";

const revealSelectors = [
  ".embroidered-hero-copy h1", ".embroidered-hero-copy p",
  ".embroidered-story-copy h2", ".embroidered-story-copy p",
  ".embroidered-schedule h2", ".embroidered-schedule-copy",
  ".embroidered-schedule-art",
  ".embroidered-dress-code > p", ".embroidered-dress-code > h2",
  ".embroidered-dress-art",
  ".embroidered-countdown > p", ".embroidered-countdown > h2",
  ".embroidered-countdown-item strong", ".embroidered-countdown-item > span",
  ".embroidered-rsvp > p", ".embroidered-rsvp > h2",
  ".embroidered-footer > p",
].join(",");

export default function EmbroideredTextReveal({ children }: { children: ReactNode }) {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches || !root.current || !("IntersectionObserver" in window)) return;

    const elements = Array.from(root.current.querySelectorAll<HTMLElement>(revealSelectors));
    const observer = new IntersectionObserver((entries) => {
      let stagger = 0;
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const element = entry.target as HTMLElement;
        element.style.setProperty("--text-reveal-delay", `${Math.min(stagger++, 3) * 100}ms`);
        element.dataset.textReveal = "visible";
        observer.unobserve(element);
      }
    }, { threshold: 0.15 });

    for (const element of elements) {
      element.dataset.textReveal = "pending";
      observer.observe(element);
    }

    const showAll = () => {
      if (!motion.matches) return;
      observer.disconnect();
      elements.forEach((element) => { delete element.dataset.textReveal; });
    };
    motion.addEventListener("change", showAll);
    return () => {
      observer.disconnect();
      motion.removeEventListener("change", showAll);
      elements.forEach((element) => {
        delete element.dataset.textReveal;
        element.style.removeProperty("--text-reveal-delay");
      });
    };
  }, []);

  return <main ref={root} className="embroidered-theme">{children}</main>;
}
