"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft02Icon, ArrowRight02Icon } from "@hugeicons/core-free-icons";

const photos = [
  "/pexels-nudethephotographer-37828118.jpg",
  "/pexels-rebornfilmes-36725399.jpg",
  "/pexels-rebornfilmes-36725406.jpg",
  "/pexels-rebornfilmes-36725417.jpg",
  "/pexels-thisismcpeter-38703046.jpg",
];

const weddingTime = new Date("2026-09-12T15:00:00").getTime();
const initialRemaining = { days: 0, hours: 0, minutes: 0, seconds: 0 };

function getRemainingTime() {
  const distance = Math.max(0, weddingTime - Date.now());
  return {
    days: Math.floor(distance / 86_400_000),
    hours: Math.floor((distance / 3_600_000) % 24),
    minutes: Math.floor((distance / 60_000) % 60),
    seconds: Math.floor((distance / 1_000) % 60),
  };
}

export default function GalleryCountdown() {
  const [activePhoto, setActivePhoto] = useState(0);
  const [remaining, setRemaining] = useState(initialRemaining);

  useEffect(() => {
    setRemaining(getRemainingTime());
    const timer = window.setInterval(() => setRemaining(getRemainingTime()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const showPrevious = () => {
    setActivePhoto((current) => (current - 1 + photos.length) % photos.length);
  };

  const showNext = () => {
    setActivePhoto((current) => (current + 1) % photos.length);
  };

  return (
    <>
      <section className="section gallery" aria-labelledby="gallery-heading">
        <p className="section-kicker">A few favorite moments</p>
        <h2 id="gallery-heading">Our story</h2>
        <div className="gallery-control">
          <button className="gallery-arrow previous" type="button" onClick={showPrevious} aria-label="Show previous photo">
            <HugeiconsIcon icon={ArrowLeft02Icon} size={18} strokeWidth={1.5} />
          </button>
          <div className="gallery-frame">
            <svg className="gallery-border" viewBox="0 0 300 410" preserveAspectRatio="none" aria-hidden="true">
              <path d="M28 9 C62 3 103 11 149 6 C194 2 240 5 274 12 C291 17 294 34 291 67 C287 116 295 165 290 207 C286 251 295 302 288 353 C285 385 274 400 246 401 C203 404 178 396 148 401 C109 406 68 401 34 399 C13 397 7 381 9 354 C13 311 6 266 11 210 C15 164 5 111 10 61 C13 29 15 15 28 9 Z" />
            </svg>
            <div className="gallery-photo">
              <Image
                key={photos[activePhoto]}
                src={photos[activePhoto]}
                alt={`Olivia and James, photo ${activePhoto + 1} of ${photos.length}`}
                fill
                sizes="(max-width: 599px) 76vw, 320px"
                priority={activePhoto === 0}
              />
            </div>
          </div>
          <button className="gallery-arrow next" type="button" onClick={showNext} aria-label="Show next photo">
            <HugeiconsIcon icon={ArrowRight02Icon} size={18} strokeWidth={1.5} />
          </button>
        </div>
        <p className="gallery-count" aria-live="polite">{activePhoto + 1} / {photos.length}</p>
      </section>

      <section className="section countdown" aria-labelledby="countdown-heading">
        <p className="section-kicker">We are counting the moments</p>
        <h2 id="countdown-heading">Until we say “I do”</h2>
        <div className="countdown-grid" aria-label={`${remaining.days} days, ${remaining.hours} hours, ${remaining.minutes} minutes and ${remaining.seconds} seconds remaining`}>
          {Object.entries(remaining).map(([label, value]) => (
            <div className="countdown-item" key={label}>
              <div className="heart">
                <svg viewBox="0 0 64 58" aria-hidden="true">
                  <path d="M32 55.5C27.7 50.8 7 35.2 4 20.7 1.6 9.1 8.1 2.5 16.6 2.5c6.1 0 11.3 3.6 15.4 9.2 4.1-5.6 9.3-9.2 15.4-9.2 8.5 0 15 6.6 12.6 18.2-3 14.5-23.7 30.1-28 34.8Z" />
                </svg>
                <strong>{String(value).padStart(2, "0")}</strong>
              </div>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
