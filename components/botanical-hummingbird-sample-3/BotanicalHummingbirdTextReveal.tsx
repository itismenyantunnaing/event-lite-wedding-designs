"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

// Split only copy, leaving buttons, tabs, labels, and form fields untouched.
const textSelector = [
  ".s3-bh-hero-eyebrow", ".s3-bh-hero-names > span",
  ".s3-bh-hero-weekday", ".s3-bh-hero-date-row > span",
  "#welcome > p", "#welcome > h2",
  "#location > p", ".s3-bh-venue-name", ".s3-bh-venue-ballrooms > span",
  ".s3-bh-schedule-copy > *", ".s3-bh-dress-copy > *",
  "#rsvp > h2", ".s3-bh-rsvp-deadline",
].join(", ");

export default function BotanicalHummingbirdTextReveal({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const hero = root?.querySelector(".s3-bh-hero");
    if (!root || !hero) return;
    if (!window.IntersectionObserver || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      hero.setAttribute("data-text-ready", "true");
      return;
    }

    const splits = new Map<Element, SplitText>();
    const revealed = new Set<Element>();
    const tweens: gsap.core.Tween[] = [];
    let disposed = false;
    let fontsReady = false;
    let started = false;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting || entry.intersectionRatio < 0.01 ||
            entry.target.closest("[inert]") || revealed.has(entry.target)) return;
        const split = splits.get(entry.target);
        if (!split) return;
        revealed.add(entry.target);
        tweens.push(gsap.to(split.lines, {
          yPercent: 0, duration: 1.25, ease: "power3.out", stagger: 0.045,
        }));
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.01 });

    // Prepare masks after fonts and the envelope are ready. Visibility, not
    // page loading, triggers each individual text reveal.
    const start = () => {
      if (disposed || started || !fontsReady || hero.getAttribute("data-phase") !== "open") return;
      started = true;
      root.querySelectorAll<HTMLElement>(textSelector).forEach((element) => {
        const split = SplitText.create(element, {
          type: "lines", mask: "lines", linesClass: "s3-bh-reveal-line", autoSplit: true,
          onSplit: (instance) => {
            gsap.set(instance.lines, { yPercent: revealed.has(element) ? 0 : 110 });
          },
        });
        splits.set(element, split);
        observer.observe(element);
      });
      // Reveal the copy container only after every line is masked below it.
      hero.setAttribute("data-text-ready", "true");
    };
    const mutations = new MutationObserver(start);
    mutations.observe(hero, { attributes: true, attributeFilter: ["data-phase"] });
    document.fonts.ready.then(() => { fontsReady = true; start(); });

    return () => {
      disposed = true;
      mutations.disconnect();
      observer.disconnect();
      tweens.forEach((tween) => tween.kill());
      hero.removeAttribute("data-text-ready");
      splits.forEach((split) => split.revert());
    };
  }, []);

  return <main ref={rootRef} className="botanical-sample-3-theme">{children}</main>;
}
