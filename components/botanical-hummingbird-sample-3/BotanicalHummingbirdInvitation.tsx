import Image from "next/image";
import BotanicalHummingbirdHero from "./BotanicalHummingbirdHero";
import BotanicalHummingbirdCountdown from "./BotanicalHummingbirdCountdown";
import BotanicalHummingbirdRSVPForm from "./BotanicalHummingbirdRSVPForm";
import BotanicalHummingbirdMoments from "./BotanicalHummingbirdMoments";
import BotanicalHummingbirdTextReveal from "./BotanicalHummingbirdTextReveal";
import { botanicalHummingbirdDemo } from "../../data/botanical-hummingbird-sample-3-demo";

export default function BotanicalHummingbirdInvitation() {
  const { venue } = botanicalHummingbirdDemo;

  return (
    <BotanicalHummingbirdTextReveal>
      <BotanicalHummingbirdHero />
      <BotanicalHummingbirdCountdown />

      <section className="s3-mm-section s3-mm-welcome">
        <Image
          className="s3-bh-welcome-topper"
          src="/botanical-hummingbird-sample-3/welcome-landing-matched-lily-v4.png"
          alt="A bird flying beneath a garland of Lily of the Valley"
          width={1774}
          height={887}
          sizes="(max-width: 599px) 100vw, 430px"
        />
        <p className="s3-mm-kicker">A joyful beginning</p>
        <h2>Dear family &amp; friends</h2>
        <p>{botanicalHummingbirdDemo.introduction}</p>
      </section>

      <section className="s3-mm-section s3-mm-venue">
        <p className="s3-mm-kicker">Where to find us</p>
        <h2>
          {venue.name}
          <span className="s3-bh-venue-ballrooms">
            <span>{venue.ballrooms[0]}</span>
            <span className="s3-bh-venue-ballrooms-ampersand">&amp;</span>
            <span>{venue.ballrooms[1]}</span>
          </span>
        </h2>
        <Image
          className="s3-bh-venue-art"
          src="/botanical-hummingbird-sample-3/lotte-hotel-watercolor-v2-ivory.png"
          alt="Watercolor illustration of Lotte Hotel Yangon"
          width={1086}
          height={1448}
          sizes="(max-width: 599px) 100vw, 430px"
          unoptimized
        />
        <a
          className="s3-mm-button"
          href={venue.mapUrl}
          target="_blank"
          rel="noreferrer"
        >
          Open map
        </a>
      </section>

      <section id="schedule" className="s3-mm-section s3-bh-schedule">
        <div className="s3-bh-schedule-card">
          <Image
            className="s3-bh-schedule-art"
            src="/botanical-hummingbird-sample-3/schedule-landing-matched-lily-v4.png"
            alt=""
            fill
            sizes="(max-width: 599px) 100vw, 430px"
            aria-hidden="true"
            unoptimized
          />
          <div className="s3-bh-schedule-copy">
            <p className="s3-mm-kicker s3-bh-schedule-eyebrow">A day to remember</p>
            <h2>Wedding schedule</h2>
            <p className="s3-bh-schedule-date">14 November 2026</p>
            <h3 className="s3-bh-schedule-time">10:00 AM – 12:00 PM</h3>
            <p className="s3-bh-schedule-description">
              Join us for our wedding ceremony and a joyful celebration with family and friends.
            </p>
          </div>
        </div>
      </section>

      <section className="s3-mm-section s3-mm-details">
        <Image
          className="s3-mm-gifts-art s3-bh-hidden-section"
          src="/myanmar/doodle-gifts.png"
          alt="Myanmar wedding gifts with traditional textiles, jasmine and lotus flowers"
          width={1536}
          height={1024}
          sizes="340px"
        />
        <article className="s3-bh-hidden-section">
          <p className="s3-mm-kicker">A little note</p>
          <h2>Your blessing is our gift</h2>
          <p>{botanicalHummingbirdDemo.giftNote}</p>
        </article>
        <article className="s3-bh-dress-code">
          <div className="s3-bh-dress-copy">
            <p className="s3-mm-kicker">Dress code</p>
            <h2>Myanmar Formal Attire</h2>
          </div>
          <Image
            className="s3-bh-dress-guests"
            src="/botanical-hummingbird-sample-3/myanmar-formal-guests.png"
            alt="Eight wedding guests wearing elegant Myanmar formal attire"
            width={1920}
            height={819}
            sizes="(max-width: 599px) 88vw, 410px"
          />
        </article>
      </section>

      <BotanicalHummingbirdMoments />

      <section className="s3-mm-section s3-mm-rsvp">
        <h2>Will you celebrate with us?</h2>
        <BotanicalHummingbirdRSVPForm />
      </section>
      <footer className="s3-mm-footer">
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
