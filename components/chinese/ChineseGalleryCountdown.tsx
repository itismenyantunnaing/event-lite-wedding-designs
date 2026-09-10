"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft02Icon, ArrowRight02Icon } from "@hugeicons/core-free-icons";

const photos = [
  "/gallery-optimized/pexels-vdre-2157049615-34521824.webp",
  "/gallery-optimized/pexels-toan-van-1745332-13706291.webp",
  "/gallery-optimized/pexels-vdre-2157049615-34521888.webp",
  "/gallery-optimized/pexels-vdre-2157049615-34521965.webp",
  "/gallery-optimized/pexels-vdre-2157049615-34521934.webp",
];

const weddingTime = new Date("2027-05-18T10:00:00+08:00").getTime();
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

export default function ChineseGalleryCountdown() {
  const [activePhoto, setActivePhoto] = useState(0);
  const [remaining, setRemaining] = useState(initialRemaining);

  useEffect(() => {
    setRemaining(getRemainingTime());
    const timer = window.setInterval(() => setRemaining(getRemainingTime()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <>
      <section className="cn-section cn-gallery" aria-labelledby="cn-gallery-heading">
        <p className="cn-kicker">A collection of moments</p>
        <h2 id="cn-gallery-heading">Our story</h2>
        <div className="cn-gallery-control">
          <button type="button" className="cn-gallery-arrow cn-previous" onClick={() => setActivePhoto((current) => (current - 1 + photos.length) % photos.length)} aria-label="Show previous photo">
            <HugeiconsIcon icon={ArrowLeft02Icon} size={18} strokeWidth={1.5} />
          </button>
          <div className="cn-gallery-frame">
            <svg className="cn-gallery-border" viewBox="0 0 300 410" preserveAspectRatio="none" aria-hidden="true">
              <path d="M28 9 C62 3 103 11 149 6 C194 2 240 5 274 12 C291 17 294 34 291 67 C287 116 295 165 290 207 C286 251 295 302 288 353 C285 385 274 400 246 401 C203 404 178 396 148 401 C109 406 68 401 34 399 C13 397 7 381 9 354 C13 311 6 266 11 210 C15 164 5 111 10 61 C13 29 15 15 28 9 Z" />
            </svg>
            <div className="cn-gallery-photo">
              <Image
                key={photos[activePhoto]}
                src={photos[activePhoto]}
                alt={`Mei and Jun, photo ${activePhoto + 1} of ${photos.length}`}
                fill
                sizes="(max-width: 599px) 76vw, 320px"
              />
            </div>
          </div>
          <button type="button" className="cn-gallery-arrow cn-next" onClick={() => setActivePhoto((current) => (current + 1) % photos.length)} aria-label="Show next photo">
            <HugeiconsIcon icon={ArrowRight02Icon} size={18} strokeWidth={1.5} />
          </button>
        </div>
        <p className="cn-gallery-count" aria-live="polite">{activePhoto + 1} / {photos.length}</p>
      </section>

      <section className="cn-section cn-countdown" aria-labelledby="cn-countdown-heading">
        <p className="cn-kicker">Until our celebration</p>
        <h2 id="cn-countdown-heading">Counting every blessing</h2>
        <div className="cn-countdown-grid" aria-label={`${remaining.days} days, ${remaining.hours} hours, ${remaining.minutes} minutes and ${remaining.seconds} seconds remaining`}>
          {Object.entries(remaining).map(([label, value]) => (
            <div className="cn-countdown-item" key={label}>
              <div className="cn-countdown-seal"><strong>{String(value).padStart(2, "0")}</strong></div>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
