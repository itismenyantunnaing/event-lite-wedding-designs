import Image from "next/image";
import GalleryCountdown from "./GalleryCountdown";
import RSVPForm from "./RSVPForm";

const schedule = [
  { time: "3:00 PM", title: "Welcome drinks", icon: "rings" },
  { time: "4:00 PM", title: "Ceremony", icon: "glasses" },
  { time: "6:00 PM", title: "Dinner & dancing", icon: "cake" },
  { time: "10:30 PM", title: "Send-off", icon: "car" },
];

export default function Home() {
  return (
    <main>
      <section className="hero section">
        <p className="eyebrow">Together with their families</p>
        <h1><span>Olivia</span><i>&amp;</i><span>James</span></h1>
        <p className="invitation">joyfully invite you to celebrate their wedding</p>
        <div className="date" aria-label="September 12, 2026">
          <span>12</span><span className="date-rule">Saturday</span><span>09</span><span>2026</span>
        </div>
        <Image className="hero-art" src="/doodles/dinner-table.png" alt="A hand-drawn wedding table for two" width={1536} height={1024} priority unoptimized />
        <p className="quote">“The best thing to <span>hold onto in life</span>  is each other.”</p>
      </section>

      <section className="section intro">
        <p className="ornament">✦</p>
        <h2>Dear friends &amp; family</h2>
        <p>We cannot imagine our day without you. Please join us for an afternoon of happy tears, warm embraces, dinner, and dancing under the stars.</p>
      </section>

      <section className="section venue">
        <p className="section-kicker">Where to find us</p>
        <h2>The Willow Garden</h2>
        <p>24 Meadow Lane<br />Greenfield, California</p>
        <p className="small">Please arrive by 2:45 PM. Garden-party attire is encouraged.</p>
        <a className="button" href="https://maps.google.com" target="_blank" rel="noreferrer">Open map</a>
      </section>

      <section className="section timeline">
        <p className="section-kicker">The order of the day</p>
        <h2>Wedding schedule</h2>
        <div className="schedule-route">
          <svg className="schedule-path" viewBox="0 0 390 720" aria-hidden="true">
            <path d="M196 28 C320 74 310 148 196 178 C76 210 76 290 196 330 C318 371 310 445 196 486 C82 526 84 606 196 696" />
            <text x="196" y="27">♥</text>
            <text x="196" y="708">♥</text>
          </svg>
          <ol>
            {schedule.map((item) => (
              <li key={item.time} className={`schedule-item schedule-${item.icon}`}>
                <div className="schedule-card">
                  <Image src={`/doodles/schedule-${item.icon}.png`} alt="" width={320} height={260} unoptimized />
                  <div className="schedule-copy"><strong>{item.time}</strong><span>{item.title}</span></div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section details">
        <Image className="details-art" src="/doodles/gifts-only.png" alt="Hand-drawn flowers, gifts and envelopes" width={485} height={934} unoptimized />
        <div className="detail-copy gifts-copy">
          <p className="section-kicker">A little note</p>
          <h2>Your presence is our present</h2>
          <p>Should you wish to give a gift, a contribution toward our new chapter would be sincerely appreciated.</p>
        </div>
        <div className="detail-copy dress-copy">
          <p className="section-kicker">Dress code</p>
          <h2>Garden formal</h2>
          <p>Think soft colors, light fabrics, and shoes made for a little dancing.</p>
          <div className="swatches" aria-label="Suggested colors"><i /><i /><i /><i /><i /></div>
        </div>
      </section>

      <GalleryCountdown />

      <section className="section rsvp">
        <p className="section-kicker">Kindly reply by August 1</p>
        <h2>Will you join us?</h2>
        <RSVPForm />
      </section>

      <footer className="site-footer">
        <Image className="agency-logo" src="/eventElite-logo.svg" alt="Event Elite" width={1600} height={1600} />
        <p>©2026 EVENT ELITE. ALL RIGHTS RESERVED.</p>
      </footer>
    </main>
  );
}
