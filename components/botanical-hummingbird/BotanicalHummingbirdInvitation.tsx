import Image from "next/image";
import BotanicalHummingbirdHero from "./BotanicalHummingbirdHero";
import BotanicalHummingbirdCountdown from "./BotanicalHummingbirdCountdown";
import BotanicalHummingbirdRSVPForm from "./BotanicalHummingbirdRSVPForm";
import BotanicalHummingbirdMoments from "./BotanicalHummingbirdMoments";
import { botanicalHummingbirdDemo } from "../../data/botanical-hummingbird-demo";

type MyanmarInvitationProps = {
  scheduleOverride?: typeof botanicalHummingbirdDemo.schedule;
};

export default function BotanicalHummingbirdInvitation({
  scheduleOverride,
}: MyanmarInvitationProps = {}) {
  const { venue } = botanicalHummingbirdDemo;
  const schedule = scheduleOverride ?? botanicalHummingbirdDemo.schedule;

  return (
    <main className="myanmar-theme">
      <BotanicalHummingbirdHero />
      <BotanicalHummingbirdCountdown />

      <section className="mm-section mm-welcome">
        <Image
          className="bh-welcome-topper"
          src="/botanical-hummingbird/welcome-lily-bird-topper-v1.png"
          alt="A bird flying beneath a garland of Lily of the Valley"
          width={1774}
          height={887}
          sizes="(max-width: 599px) 100vw, 430px"
        />
        <p className="mm-kicker">A joyful beginning</p>
        <h2>Dear family &amp; friends</h2>
        <p>{botanicalHummingbirdDemo.introduction}</p>
        <div className="mm-doodle-divider" aria-hidden="true">
          <span>❀</span>
          <i />
          <span>❀</span>
        </div>
      </section>

      <section className="mm-section mm-venue">
        <p className="mm-kicker">Where to find us</p>
        <h2>{venue.name}</h2>
        <Image
          className="bh-venue-art"
          src="/botanical-hummingbird/lotte-hotel-watercolor-v1.png"
          alt="Watercolor illustration of Lotte Hotel Yangon"
          width={1086}
          height={1448}
          sizes="(max-width: 599px) 100vw, 430px"
          unoptimized
        />
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

      <section id="schedule" className="mm-section mm-schedule bh-hidden-section">
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
          className="mm-gifts-art bh-hidden-section"
          src="/myanmar/doodle-gifts.png"
          alt="Myanmar wedding gifts with traditional textiles, jasmine and lotus flowers"
          width={1536}
          height={1024}
          sizes="340px"
        />
        <article className="bh-hidden-section">
          <p className="mm-kicker">A little note</p>
          <h2>Your blessing is our gift</h2>
          <p>{botanicalHummingbirdDemo.giftNote}</p>
        </article>
        <article className="bh-dress-code">
          <Image
            className="bh-dress-frame-art"
            src="/botanical-hummingbird/dress-code-border-simple-v2.png"
            alt=""
            aria-hidden="true"
            width={1254}
            height={1254}
            sizes="(max-width: 599px) 92vw, 430px"
          />
          <Image
            className="bh-dress-ornament"
            src="/botanical-hummingbird/lily-bird-corner-matched-v2.png"
            alt="One blue-gray bird beside Lily of the Valley flowers"
            width={1536}
            height={1024}
            sizes="(max-width: 599px) 56vw, 250px"
            unoptimized
          />
          <div className="bh-dress-copy">
            <p className="mm-kicker">Dress code</p>
            <i className="bh-dress-rule" aria-hidden="true" />
            <h2>Myanmar Formal Attire</h2>
          </div>
          <Image
            className="bh-dress-guests"
            src="/botanical-hummingbird/myanmar-formal-guests.png"
            alt="Eight wedding guests wearing elegant Myanmar formal attire"
            width={1920}
            height={819}
            sizes="(max-width: 599px) 88vw, 410px"
          />
        </article>
      </section>

      <BotanicalHummingbirdMoments />

      <section className="mm-section mm-rsvp">
        <p className="mm-kicker">Kindly reply by December 20</p>
        <h2>Will you celebrate with us?</h2>
        <BotanicalHummingbirdRSVPForm />
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
