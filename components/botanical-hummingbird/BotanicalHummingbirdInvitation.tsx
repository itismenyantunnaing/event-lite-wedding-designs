import Image from "next/image";
import BotanicalHummingbirdHero from "./BotanicalHummingbirdHero";
import BotanicalHummingbirdCountdown from "./BotanicalHummingbirdCountdown";
import BotanicalHummingbirdRSVPForm from "./BotanicalHummingbirdRSVPForm";
import BotanicalHummingbirdMoments from "./BotanicalHummingbirdMoments";
import BotanicalHummingbirdTextReveal from "./BotanicalHummingbirdTextReveal";
import { botanicalHummingbirdDemo } from "../../data/botanical-hummingbird-demo";

export default function BotanicalHummingbirdInvitation() {
  const { venue } = botanicalHummingbirdDemo;

  return (
    <BotanicalHummingbirdTextReveal>
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
      </section>

      <section className="mm-section mm-venue">
        <p className="mm-kicker">Where to find us</p>
        <h2>{venue.name}</h2>
        <Image
          className="bh-venue-art"
          src="/botanical-hummingbird/lotte-hotel-watercolor-v2-ivory.png"
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

      <section id="schedule" className="mm-section bh-schedule">
        <div className="bh-schedule-card">
          <Image
            className="bh-schedule-art"
            src="/botanical-hummingbird/schedule-botanical-birds-v5.png"
            alt=""
            fill
            sizes="(max-width: 599px) 100vw, 430px"
            aria-hidden="true"
            unoptimized
          />
          <div className="bh-schedule-copy">
            <p className="mm-kicker bh-schedule-eyebrow">A day to remember</p>
            <h2>Wedding schedule</h2>
            <p className="bh-schedule-date">14 November 2026</p>
            <h3 className="bh-schedule-time">10:00 AM – 12:00 PM</h3>
            <p className="bh-schedule-description">
              Join us for our wedding ceremony and a joyful celebration with family and friends.
            </p>
            <p className="bh-schedule-location">Lotte Hotel Yangon Crystal Ballroom</p>
          </div>
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
          <div className="bh-dress-copy">
            <p className="mm-kicker">Dress code</p>
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
    </BotanicalHummingbirdTextReveal>
  );
}
