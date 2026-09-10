import Image from "next/image";
import GalleryCountdown from "../shared/GalleryCountdown";
import RSVPForm from "../shared/RSVPForm";
import { europeanDemo } from "../../data/european-demo";

export default function EuropeanInvitation() {
  const { couple, date, venue, schedule } = europeanDemo;

  return (
    <main className="european-theme">
      <section className="hero section">
        <p className="eyebrow">Together with their families</p>
        <h1>
          <span>{couple.partnerOne}</span>
          <i>&amp;</i>
          <span>{couple.partnerTwo}</span>
        </h1>
        <p className="invitation">{europeanDemo.invitation}</p>
        <div className="date" aria-label={date.label}>
          <span>{date.day}</span>
          <span className="date-rule">{date.weekday}</span>
          <span>{date.month}</span>
          <span>{date.year}</span>
        </div>
        <Image
          className="hero-art"
          src="/doodles-optimized/dinner-table.webp"
          alt="A hand-drawn wedding table for two"
          width={1536}
          height={1024}
          sizes="(max-width: 599px) 88vw, 520px"
          priority
        />
        <p className="quote">
          “The best thing to <span>hold onto in life</span> is each other.”
        </p>
      </section>

      <section className="section intro">
        <p className="ornament">✦</p>
        <h2>Dear friends &amp; family</h2>
        <p>{europeanDemo.introduction}</p>
      </section>

      <section className="section venue">
        <p className="section-kicker">Where to find us</p>
        <h2>{venue.name}</h2>
        <p>
          {venue.address.map((line, index) => (
            <span key={line}>
              {line}
              {index < venue.address.length - 1 && <br />}
            </span>
          ))}
        </p>
        <p className="small">{venue.note}</p>
        <a
          className="button"
          href={venue.mapUrl}
          target="_blank"
          rel="noreferrer"
        >
          Open map
        </a>
      </section>

      <section className="section timeline">
        <p className="section-kicker">The order of the day</p>
        <h2>Wedding schedule</h2>
        <div className="schedule-route">
          <svg
            className="schedule-path"
            viewBox="0 0 390 720"
            aria-hidden="true"
          >
            <path d="M196 28 C320 74 310 148 196 178 C76 210 76 290 196 330 C318 371 310 445 196 486 C82 526 84 606 196 696" />
            <text x="196" y="27">
              ♥
            </text>
            <text x="196" y="708">
              ♥
            </text>
          </svg>
          <ol>
            {schedule.map((item) => (
              <li
                key={item.time}
                className={`schedule-item schedule-${item.icon}`}
              >
                <div className="schedule-card">
                  <Image
                    src={`/doodles-optimized/schedule-${item.icon}.webp`}
                    alt=""
                    width={320}
                    height={260}
                    sizes="140px"
                  />
                  <div className="schedule-copy">
                    <strong>{item.time}</strong>
                    <span>{item.title}</span>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section details">
        <Image
          className="details-art"
          src="/doodles-optimized/gifts-only.webp"
          alt="Hand-drawn flowers, gifts and envelopes"
          width={485}
          height={934}
          sizes="(max-width: 599px) 72vw, 360px"
        />
        <div className="detail-copy gifts-copy">
          <p className="section-kicker">A little note</p>
          <h2>Your presence is our present</h2>
          <p>{europeanDemo.giftNote}</p>
        </div>
        <div className="detail-copy dress-copy">
          <p className="section-kicker">Dress code</p>
          <h2>Garden formal</h2>
          <p>{europeanDemo.dressCode}</p>
          <div className="swatches" aria-label="Suggested colors">
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
        </div>
      </section>

      <GalleryCountdown />

      <section className="section rsvp">
        <p className="section-kicker">Kindly reply by August 1</p>
        <h2>Will you join us?</h2>
        <RSVPForm />
      </section>

      <footer className="site-footer">
        <Image
          className="agency-logo"
          src="/eventElite-logo.svg"
          alt="Event Elite"
          width={1600}
          height={1600}
        />
        <p>©2026 EVENT ELITE. ALL RIGHTS RESERVED.</p>
      </footer>
    </main>
  );
}
