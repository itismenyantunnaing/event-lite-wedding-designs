"use client";

import Image from "next/image";
import { memo, useCallback, useEffect, useRef, useState } from "react";

const CountdownBird = memo(function CountdownBird() {
  const [failed, setFailed] = useState(false);
  const showFallback = useCallback(() => setFailed(true), []);

  return (
    <Image
      src={failed
        ? "/botanical-hummingbird/countdown-bird-reference-v1.png"
        : "/botanical-hummingbird/countdown-bird-loop-transparent-v2.apng"}
      alt=""
      width={320}
      height={346}
      unoptimized
      onError={failed ? undefined : showFallback}
    />
  );
});

const weddingTime = new Date("2026-11-14T09:00:00+06:30").getTime();
function remaining() {
  const d = Math.max(0, weddingTime - Date.now());
  return {
    days: Math.floor(d / 86400000),
    hours: Math.floor(d / 3600000) % 24,
    minutes: Math.floor(d / 60000) % 60,
  };
}

export default function BotanicalHummingbirdCountdown() {
  const sectionRef = useRef<HTMLElement>(null);
  const [entered, setEntered] = useState(false);
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0 });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)) {
      setEntered(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setEntered(true);
      observer.disconnect();
    }, { threshold: 0.25 });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setTime(remaining());
    const timer = window.setInterval(() => setTime(remaining()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section ref={sectionRef} className="mm-section mm-countdown">
      <div className="bh-countdown-scene" data-entered={entered}>
        <div className="bh-countdown-bird bh-countdown-bird-left" aria-hidden="true">
          <CountdownBird />
        </div>
        <div className="bh-countdown-bird bh-countdown-bird-right" aria-hidden="true">
          <CountdownBird />
        </div>
        <div className="bh-countdown-plaque">
          <Image
            className="bh-countdown-border"
            src="/botanical-hummingbird/countdown-simple-banner-with-strings-v2.png"
            alt=""
            fill
            sizes="(min-width: 600px) 430px, 100vw"
          />
          <div className="bh-countdown-content">
            <h2>Countdown</h2>
            <p className="mm-kicker">Until 14 November 2026</p>
            <div className="mm-countdown-grid" aria-label="Wedding countdown">
              {Object.entries(time).map(([label, value]) => (
                <div key={label}>
                  <span className="mm-countdown-unit">
                    <strong>{String(value).padStart(2, "0")}</strong>
                  </span>
                  <small>{label}</small>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
