import Image from "next/image";
import RSVPForm from "../shared/RSVPForm";
import MyanmarMoments from "./MyanmarMoments";
import { myanmarDemo } from "../../data/myanmar-demo";

export default function MyanmarInvitation() {
  const { couple, date, venue, schedule } = myanmarDemo;

  return (
    <main className="myanmar-theme">
      <section className="mm-hero">
        <Image
          className="mm-hero-background"
          src="/myanmar/doodle-hero-background-karaweik.webp"
          alt=""
          fill
          sizes="(min-width: 600px) 560px, 100vw"
          priority
        />
        <div className="mm-hero-copy">
          <p className="mm-eyebrow">Together with <br /> their families</p>
          <div className="mm-hero-couple-name">
            <span>{couple.partnerOne}</span>
            <i>&amp;</i>
            <span>{couple.partnerTwo}</span>
          </div>
          {/* <p className="mm-invitation">{myanmarDemo.invitation}</p> */}
          <div className="mm-date" aria-label={date.label}>
            <span className="mm-title-ornament" aria-hidden="true">
              ❀
            </span>
            <span>{date.day}</span>
            <span>•</span>
            <span>{date.month}</span>
            <span>•</span>
            <span>{date.year}</span>
            <span className="mm-title-ornament" aria-hidden="true">
              ❀
            </span>
          </div>
          <p className="mm-venue-name">{venue.name}</p>
        </div>
        <Image
          className="mm-hero-couple"
          src="/myanmar/doodle-hero-couple-reference-v2.png"
          alt="Hand-drawn Myanmar newlywed couple in traditional attire"
          width={1024}
          height={1536}
          sizes="(max-width: 599px) 29vw, 140px"
          priority
        />
      </section>

      <section className="mm-section mm-welcome">
        <p className="mm-kicker">A joyful beginning</p>
        <h2>Dear family &amp; friends</h2>
        <p>{myanmarDemo.introduction}</p>
        <div className="mm-doodle-divider" aria-hidden="true">
          <span>❀</span>
          <i />
          <span>❀</span>
        </div>
      </section>

      <section className="mm-section mm-venue">
        <p className="mm-kicker">Where to find us</p>
        <h2>{venue.name}</h2>
        <p>
          {venue.address.map((line, index) => (
            <span key={line}>
              {line}
              {index < venue.address.length - 1 && <br />}
            </span>
          ))}
        </p>
        <p className="mm-small">{venue.note}</p>
        <a
          className="mm-button"
          href={venue.mapUrl}
          target="_blank"
          rel="noreferrer"
        >
          Open map
        </a>
      </section>

      <section id="schedule" className="mm-section mm-schedule">
        <p className="mm-kicker">The order of our day</p>
        <h2>Wedding schedule</h2>
        <div className="mm-schedule-route">
          <svg
            className="mm-schedule-path"
            viewBox="0 0 390 720"
            aria-hidden="true"
          >
            <path d="M196 28 C320 74 310 148 196 178 C76 210 76 290 196 330 C318 371 310 445 196 486 C82 526 84 606 196 696" />
            <text x="190" y="27">
              ♥
            </text>
            <text x="190" y="700">
              ♥
            </text>
          </svg>
          <ol>
            {schedule.map((item) => (
              <li key={item.time}>
                <div className="mm-schedule-card">
                  <Image
                    src={item.image}
                    alt=""
                    width={1312}
                    height={1312}
                    sizes="170px"
                  />
                  <div>
                    <strong>{item.time}</strong>
                    <span>{item.title}</span>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mm-section mm-details">
        <Image
          className="mm-gifts-art"
          src="/myanmar/doodle-gifts.png"
          alt="Myanmar wedding gifts with traditional textiles, jasmine and lotus flowers"
          width={1536}
          height={1024}
          sizes="340px"
        />
        <article>
          <p className="mm-kicker">A little note</p>
          <h2>Your blessing is our gift</h2>
          <p>{myanmarDemo.giftNote}</p>
        </article>
        <article>
          <p className="mm-kicker">Dress code</p>
          <h2>Traditional elegance</h2>
          <p>{myanmarDemo.dressCode}</p>
          <div className="mm-swatches" aria-label="Suggested colors">
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
        </article>
      </section>

      <MyanmarMoments />

      <section className="mm-section mm-rsvp">
        <p className="mm-kicker">Kindly reply by December 20</p>
        <h2>Will you celebrate with us?</h2>
        <RSVPForm />
      </section>
      <footer className="mm-footer">
        <Image
          className="agency-logo"
          src="/eventElite-logo.svg"
          alt="Event Elite"
          width={1600}
          height={1600}
        />
        <p>©2027 EVENT ELITE. ALL RIGHTS RESERVED.</p>
      </footer>
    </main>
  );
}
