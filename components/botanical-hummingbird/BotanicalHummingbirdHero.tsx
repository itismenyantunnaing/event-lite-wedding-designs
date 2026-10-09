"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Phase = "closed" | "playing" | "revealing" | "open";

export default function BotanicalHummingbirdHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [phase, setPhase] = useState<Phase>("closed");
  const [videoReady, setVideoReady] = useState(false);

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
    <section className="mm-hero bh-hero" data-phase={phase} aria-label="Wedding invitation cover">
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
          <span>Han Su Mon</span>
          <span className="bh-hero-ampersand">&amp;</span>
          <span>Wai Phyo Tun</span>
        </h1>
        <time className="bh-hero-date" dateTime="2026-11-14">14 Nov 2026</time>
      </div>

      {phase !== "open" && (
        <div className="bh-intro" aria-hidden={phase !== "closed"}>
          {/* The poster matches the first frame while mobile video initializes. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="bh-intro-poster"
            src="/botanical-hummingbird/envelope-closed-start-frame-v3-green-paper.png"
            alt=""
          />
          <video
            ref={videoRef}
            className="bh-intro-video"
            data-ready={videoReady}
            src="/botanical-hummingbird/envelope-opening-test.mp4"
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
