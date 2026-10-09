"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

type Phase = "closed" | "playing" | "revealing" | "open";

export default function BotanicalHummingbirdHero() {
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [phase, setPhase] = useState<Phase>("closed");
  const [videoReady, setVideoReady] = useState(false);
  const scrollLocked = phase !== "open";

  useLayoutEffect(() => {
    if (!scrollLocked) return;
    const body = document.body;
    const root = document.documentElement;
    const properties = ["position", "top", "left", "width", "overflow", "overscroll-behavior"] as const;
    const saved = properties.map((property) => ({
      property,
      value: body.style.getPropertyValue(property),
      priority: body.style.getPropertyPriority(property),
    }));
    const rootOverflow = root.style.getPropertyValue("overflow");
    const rootPriority = root.style.getPropertyPriority("overflow");
    // A fixed body also prevents iOS Safari's touch scrolling.
    window.scrollTo(0, 0);
    body.style.setProperty("position", "fixed");
    body.style.setProperty("top", "0");
    body.style.setProperty("left", "0");
    body.style.setProperty("width", "100%");
    body.style.setProperty("overflow", "hidden");
    body.style.setProperty("overscroll-behavior", "none");
    root.style.setProperty("overflow", "hidden");

    // Prevent keyboard focus from jumping to sections behind the envelope.
    const siblings = Array.from(heroRef.current?.parentElement?.children ?? [])
      .filter((element): element is HTMLElement => element instanceof HTMLElement && element !== heroRef.current)
      .map((element) => ({ element, inert: element.inert }));
    siblings.forEach(({ element }) => { element.inert = true; });

    const preventScroll = (event: Event) => event.preventDefault();
    const preventKeys = (event: KeyboardEvent) => {
      const keys = ["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "];
      // Space must still activate the invitation's button.
      if (event.key === " " && event.target instanceof HTMLButtonElement) return;
      if (keys.includes(event.key)) event.preventDefault();
    };
    window.addEventListener("wheel", preventScroll, { passive: false });
    window.addEventListener("touchmove", preventScroll, { passive: false });
    window.addEventListener("keydown", preventKeys);

    return () => {
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
      window.removeEventListener("keydown", preventKeys);
      siblings.forEach(({ element, inert }) => { element.inert = inert; });
      saved.forEach(({ property, value, priority }) => {
        if (value) body.style.setProperty(property, value, priority);
        else body.style.removeProperty(property);
      });
      if (rootOverflow) root.style.setProperty("overflow", rootOverflow, rootPriority);
      else root.style.removeProperty("overflow");
      window.scrollTo(0, 0);
    };
  }, [scrollLocked]);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      if (preference.matches) {
        videoRef.current?.pause();
        setPhase("open");
      }
    };
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (phase !== "revealing") return;
    const timeout = window.setTimeout(() => setPhase("open"), 900);
    return () => window.clearTimeout(timeout);
  }, [phase]);

  useEffect(() => {
    if (phase !== "playing") return;
    // A failed or stalled download must not trap guests behind the envelope.
    const timeout = window.setTimeout(() => setPhase("revealing"), 12000);
    return () => window.clearTimeout(timeout);
  }, [phase]);

  const openInvitation = () => {
    if (phase !== "closed") return;
    const video = videoRef.current;
    if (!video) return setPhase("open");
    setPhase("playing");
    video.play().catch(() => setPhase("revealing"));
  };

  return (
    <section ref={heroRef} className="mm-hero bh-hero" data-phase={phase} aria-label="Wedding invitation cover">
      <Image
        className="bh-hero-art"
        src="/botanical-hummingbird/hero-lily-of-the-valley-cover-v2.png"
        alt=""
        fill
        sizes="(min-width: 600px) 430px, 100vw"
        priority
      />
      <div className="bh-hero-copy">
        <p className="bh-hero-eyebrow">We are getting married</p>
        <h1 className="bh-hero-names">
          <span>Wai Phyo Tun</span>
          <span className="bh-hero-ampersand">&amp;</span>
          <span>Han Su Mon</span>
        </h1>
        <time className="bh-hero-date" dateTime="2026-11-14" aria-label="Saturday, 14 November 2026">
          <span className="bh-hero-weekday">Saturday</span>
          <span className="bh-hero-date-row" aria-hidden="true">
            <span className="bh-hero-month">Nov</span>
            <span className="bh-hero-day">14</span>
            <span className="bh-hero-year">2026</span>
          </span>
        </time>
      </div>

      {phase !== "open" && (
        <div className="bh-intro" aria-hidden={phase !== "closed"}>
          {/* The poster matches the first frame while mobile video initializes. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="bh-intro-poster"
            src="/botanical-hummingbird/envelope-opening-wh-poster-v1.png"
            alt=""
          />
          <video
            ref={videoRef}
            className="bh-intro-video"
            data-ready={videoReady}
            src="/botanical-hummingbird/envelope-opening-wh-v1.mp4"
            preload="auto"
            playsInline
            muted
            onPlaying={() => setVideoReady(true)}
            onEnded={() => setPhase("revealing")}
            onError={() => setPhase("revealing")}
            aria-hidden="true"
          />
          {phase === "closed" && (
            <button
              className="bh-intro-trigger"
              type="button"
              onClick={openInvitation}
              aria-label="Open the wedding invitation"
            >
              <span>Tap to open</span>
            </button>
          )}
        </div>
      )}
    </section>
  );
}
