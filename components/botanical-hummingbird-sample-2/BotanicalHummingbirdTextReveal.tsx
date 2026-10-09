"use client";

import { useEffect, useRef, type ReactNode } from "react";

const textSelector = "h1, h2, h3, p, time, a, button, label, legend, strong, span";

export default function BotanicalHummingbirdTextReveal({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !window.IntersectionObserver || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const registered = new Set<HTMLElement>();
    const reveal = (element: HTMLElement) => {
      element.classList.add("s2-bh-scroll-text-visible");
      observer.unobserve(element);
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) reveal(entry.target as HTMLElement);
      });
    }, { threshold: 0.1 });

    const registerText = () => {
      root.querySelectorAll<HTMLElement>(textSelector).forEach((element) => {
        // The cover already reveals after its video. Countdown stays static.
        if (registered.has(element) || element.closest(".s2-bh-hero, .s2-mm-countdown, .s2-bh-hidden-section")) return;
        if (element.parentElement?.closest(textSelector) || !element.textContent?.trim()) return;
        registered.add(element);
        element.classList.add("s2-bh-scroll-text");
        observer.observe(element);
      });
      registered.forEach((element) => {
        if (!root.contains(element)) {
          observer.unobserve(element);
          registered.delete(element);
        }
      });
    };
    registerText();

    // RSVP tabs can add new labels after the initial page render.
    const mutations = new MutationObserver(registerText);
    mutations.observe(root, { childList: true, subtree: true });
    const onFocus = (event: FocusEvent) => {
      const element = (event.target as HTMLElement).closest<HTMLElement>(".s2-bh-scroll-text");
      if (element) reveal(element);
    };
    root.addEventListener("focusin", onFocus);

    return () => {
      mutations.disconnect();
      observer.disconnect();
      root.removeEventListener("focusin", onFocus);
      registered.forEach((element) => element.classList.remove("s2-bh-scroll-text", "s2-bh-scroll-text-visible"));
    };
  }, []);

  return <main ref={rootRef} className="botanical-sample-2-theme">{children}</main>;
}
