"use client";

import { useEffect, useRef, useState } from "react";

export default function EmbroideredCurtain() {
  const video = useRef<HTMLVideoElement>(null);
  const [hasFrame, setHasFrame] = useState(false);
  const [phase, setPhase] = useState<"closed" | "opening" | "open">("closed");

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const respectMotion = () => {
      if (motion.matches) {
        video.current?.pause();
        setPhase("open");
      }
    };
    respectMotion();
    motion.addEventListener("change", respectMotion);
    return () => motion.removeEventListener("change", respectMotion);
  }, []);

  useEffect(() => {
    if (phase !== "opening") return;
    const player = video.current;
    if (!player) {
      setPhase("open");
      return;
    }

    // Transparency and intermediate frames are baked into the video. Native
    // playback avoids synchronous pixel reads and CPU keying on every frame.
    // A stalled connection must not leave the invitation covered indefinitely.
    const timeout = window.setTimeout(() => setPhase("open"), 12000);
    return () => {
      window.clearTimeout(timeout);
      player.pause();
    };
  }, [phase]);

  const open = () => {
    const player = video.current;
    if (!player) return setPhase("open");
    setPhase("opening");
    player.play().catch(() => setPhase("open"));
  };

  return (
    <div className="embroidered-curtain" data-phase={phase}>
      {/* Plain images retain their alpha and match the video frame exactly. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="embroidered-curtain-poster"
        src="/embroidered/curtain-closed-poster.png"
        width={720}
        height={830}
        alt=""
        aria-hidden="true"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="embroidered-curtain-open-poster" src="/embroidered/curtain-open-poster.png" width={720} height={830} alt="" aria-hidden="true" />
      <video
        ref={video}
        className="embroidered-curtain-video"
        data-ready={hasFrame}
        src="/embroidered/curtain-opening-smooth.webm"
        preload="auto"
        muted
        playsInline
        onPlaying={() => setHasFrame(true)}
        onEnded={() => setPhase("open")}
        onError={() => setPhase("open")}
        aria-hidden="true"
      />
      {phase === "closed" && (
        <button className="embroidered-curtain-trigger" type="button" onClick={open} aria-label="Open the wedding invitation curtains">
          <span>C <i>&amp;</i> A</span>
          <small>Tap to open</small>
        </button>
      )}
      <noscript><style>{`.embroidered-curtain { display: none; }`}</style></noscript>
    </div>
  );
}
