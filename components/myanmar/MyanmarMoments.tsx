"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft02Icon, ArrowRight02Icon } from "@hugeicons/core-free-icons";

const photos = [
  { src: "/myanmar/gallery-optimized/1.webp", blur: "data:image/webp;base64,UklGRrYAAABXRUJQVlA4IKoAAAAQBACdASoQABgAPt1apkyopSOiMAgBEBuJQBOmUAS34wUNm0g5rXbIQAD+7mDWNXxooxGFuhCPo9/Lh7SyEotHMb0Xy1TBKiOBcw43Qr4ImmluaRiewupYhOey6u2ZJVmOcC1SD9ZsSRyKO5dKqQlT4PnPKs/aEXXVvgdZlI5VHhfjoorCf0/SBlxUh5i+VqlZzN0W7gYRqRk+1ExvYm4FJonqDbyLQOb+AA==" },
  { src: "/myanmar/gallery-optimized/2.webp", blur: "data:image/webp;base64,UklGRrIAAABXRUJQVlA4IKYAAABQBACdASoQABgAPt1apkyopSOiMAgBEBuJQBOgMYxRBbhHYpx3TurlYAo8AOJ4z1MyRu8OSTNIXtUJIB1vDfCoPWLzgzHasW5ffXRL1IXLwzqhG8rtNV8V94Ghz6ZOM5+F0CDfCSDZ2HZiP16xxJpRP8QvO8iPLm9xldF+O0DE122++sh2JmY/LiLe0F95I07LXiCvdneGs+CbW6G2VOjstuc8gAAA" },
  { src: "/myanmar/gallery-optimized/3.webp", blur: "data:image/webp;base64,UklGRsAAAABXRUJQVlA4ILQAAACwBACdASoQABgAPt1apkyopSOiMAgBEBuJYgCdMoAvQTPwpfyX1qJBfUb9QuJAAP7zNBA+bSA3X7ACt3U6VaOgKqL+hShnTetWdrRXu+LH6l9IOg5wf9eIoa6a3sMjDjaX009KBTmyRQ+nXfilTGy+WoXTf//sc33MjSIdwqRMyJdvKUX2cY8eiJ7kt+hln8tb+rx8t+MeyPv6F0ZGbIPfI+yFzIzHKi5klx3oi4tlUEt1AAA=" },
  { src: "/myanmar/gallery-optimized/4.webp", blur: "data:image/webp;base64,UklGRr4AAABXRUJQVlA4ILIAAACwBACdASoQAB0APt1apkyopSOiMAgBEBuJYwCdAYuk7Yf/QmJwn5IEKF9W6sAAAP7hkukljbbve/yNHBqulymJt5murIq9bmyOS86wOowVGKvnM8gVtAC/KlhTE1DdEFsPXIdhwU8KRlxcb4MopZwgEwdSMqZhV0m0MtMOiY7t6kdk7QoM5u/JWOYApF7slkbagZEZceZNu8ZQTY2365BAgrc7qhR0gCrK1PteX6jRNYAA" },
  { src: "/myanmar/gallery-optimized/5.webp", blur: "data:image/webp;base64,UklGRp4AAABXRUJQVlA4IJIAAADQBACdASoQABYAPt1apkyopSOiMAgBEBuJaACdMoR3CQAAcVSfDeVM3Mvx5m1LAAD+6OudHJfiztMqrumLWrFZTuyVpRZfqGFQc1HWXrbqe3OXGMUv/rcvObhna9HcFWwWA+2b9UJgt+52qu+WVMLhDSIbi8UvWZpgHNSF7QYInJvxQB6oEj6DfblwQtbgNoQAAA==" },
];
const weddingTime = new Date("2027-01-24T09:00:00+06:30").getTime();
function remaining() {
  const d = Math.max(0, weddingTime - Date.now());
  return {
    days: Math.floor(d / 86400000),
    hours: Math.floor(d / 3600000) % 24,
    minutes: Math.floor(d / 60000) % 60,
    seconds: Math.floor(d / 1000) % 60,
  };
}

export default function MyanmarMoments() {
  const [photo, setPhoto] = useState(0);
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  useEffect(() => {
    setTime(remaining());
    const timer = window.setInterval(() => setTime(remaining()), 1000);
    return () => window.clearInterval(timer);
  }, []);
  return (
    <>
      <section className="mm-section mm-gallery">
        <p className="mm-kicker">A collection of moments</p>
        <h2>Our story</h2>
        <div className="mm-gallery-control">
          <button
            onClick={() =>
              setPhoto((photo - 1 + photos.length) % photos.length)
            }
            aria-label="Previous photo"
          >
            <HugeiconsIcon icon={ArrowLeft02Icon} size={18} strokeWidth={1.5} />
          </button>
          <div className="mm-gallery-stage">
            <div className="mm-gallery-photo">
              <Image
                key={photos[photo].src}
                src={photos[photo].src}
                alt={`Couple portrait ${photo + 1} of ${photos.length}`}
                fill
                sizes="(max-width: 599px) 78vw, 420px"
                placeholder="blur"
                blurDataURL={photos[photo].blur}
              />
            </div>
            <Image
              className="mm-gallery-frame"
              src="/myanmar/doodle-gallery-border.png"
              alt=""
              fill
              sizes="(max-width: 599px) 88vw, 460px"
            />
          </div>
          <button
            onClick={() => setPhoto((photo + 1) % photos.length)}
            aria-label="Next photo"
          >
            <HugeiconsIcon
              icon={ArrowRight02Icon}
              size={18}
              strokeWidth={1.5}
            />
          </button>
        </div>
        <p className="mm-gallery-count">
          {photo + 1} / {photos.length}
        </p>
      </section>
      <section className="mm-section mm-countdown">
        <p className="mm-kicker">Until our celebration</p>
        <h2>Counting every blessing</h2>
        <div className="mm-countdown-grid" aria-label="Wedding countdown">
          {Object.entries(time).map(([label, value]) => (
            <div key={label}>
              <span className="mm-countdown-unit">
                <strong>{String(value).padStart(2, "0")}</strong>
                <Image
                  className="mm-countdown-base"
                  src="/myanmar/countdown-pedestal-flat-clean.png"
                  alt=""
                  width={440}
                  height={299}
                  sizes="110px"
                />
              </span>
              <small>{label}</small>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
