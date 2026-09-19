"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const weddingTime = new Date("2027-06-12T17:00:00").getTime();
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

export default function EmbroideredCountdown() {
  const [remaining, setRemaining] = useState(initialRemaining);

  useEffect(() => {
    setRemaining(getRemainingTime());
    const timer = window.setInterval(
      () => setRemaining(getRemainingTime()),
      1_000,
    );

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section
      className="embroidered-countdown"
      aria-labelledby="embroidered-countdown-heading"
    >
      <Image
        className="embroidered-countdown-ornament"
        src="/embroidered/countdown-flower-basket-divider.png"
        alt="Embroidered rose vine with pearl garlands and hanging flower baskets"
        width={2170}
        height={725}
        sizes="(min-width: 600px) 430px, 100vw"
      />
      <p className="embroidered-kicker">Counting every lovely moment</p>
      <h2 id="embroidered-countdown-heading">Until we say “I do”</h2>
      <div
        className="embroidered-countdown-grid"
        aria-label={`${remaining.days} days, ${remaining.hours} hours, ${remaining.minutes} minutes and ${remaining.seconds} seconds remaining`}
      >
        {Object.entries(remaining).map(([label, value]) => (
          <div className="embroidered-countdown-item" key={label}>
            <div className="embroidered-countdown-flower">
              <strong>{String(value).padStart(2, "0")}</strong>
            </div>
            <span>{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
