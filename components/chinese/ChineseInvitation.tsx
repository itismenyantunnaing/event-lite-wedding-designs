import Image from "next/image";
import ChineseGalleryCountdown from "./ChineseGalleryCountdown";
import RSVPForm from "../shared/RSVPForm";
import { chineseDemo } from "../../data/chinese-demo";

function KnotDivider() {
  return (
    <Image
      className="cn-knot-divider"
      src="/chinese/knot-divider-transparent.webp"
      alt=""
      width={1000}
      height={500}
      sizes="280px"
    />
  );
}

export default function ChineseInvitation() {
  const { couple, date, venue, schedule } = chineseDemo;

  return (
    <main className="chinese-theme">
      <section className="cn-hero">
        <p className="cn-eyebrow">Together with their families</p>
        <span className="cn-title-ornament" aria-hidden="true">
          ❀
        </span>
        <h1>
          {couple.partnerOne}
          <i>&amp;</i>
          {couple.partnerTwo}
        </h1>
        <p className="cn-invitation">{chineseDemo.invitation}</p>
        <span className="cn-title-ornament cn-title-ornament-second" aria-hidden="true">
          ❀
        </span>
        <div className="cn-date" aria-label={date.label}>
          <span>{date.day}</span>
          <b>· {date.month} ·</b>
          <span>{date.year}</span>
        </div>
        <p className="cn-venue-name">{venue.name}</p>
        <Image
          className="cn-hero-couple"
          src="/chinese/hero-couple-characters.webp"
          alt="Hand-drawn Chinese newlywed couple"
          width={794}
          height={960}
          sizes="205px"
          priority
        />
      </section>

      <section className="cn-section cn-welcome">
        <p className="cn-kicker">A joyful beginning</p>
        <h2>Dear family &amp; friends</h2>
        <p>{chineseDemo.introduction}</p>
        <KnotDivider />
      </section>

      <section className="cn-section cn-venue">
        <p className="cn-kicker">Where to find us</p>
        <h2>{venue.name}</h2>
        <p>
          {venue.address.map((line, index) => (
            <span key={line}>
              {line}
              {index < venue.address.length - 1 && <br />}
            </span>
          ))}
        </p>
        <p className="cn-small">{venue.note}</p>
        <a
          className="cn-button"
          href={venue.mapUrl}
          target="_blank"
          rel="noreferrer"
        >
          Open map
        </a>
      </section>

      <section className="cn-section cn-schedule">
        <p className="cn-kicker">The order of our day</p>
        <h2>Wedding schedule</h2>
        <div className="cn-schedule-route">
          <svg
            className="cn-schedule-path"
            viewBox="0 0 390 720"
            aria-hidden="true"
          >
            <path
              className="cn-route-line"
              d="M196 28 C320 74 310 148 196 178 C76 210 76 290 196 330 C318 371 310 445 196 486 C82 526 84 606 196 696"
            />
            {/* <path
              className="cn-route-heart"
              d="M196 22 C190 13 177 18 180 28 C183 36 196 43 196 43 C196 43 209 36 212 28 C215 18 202 13 196 22Z"
            />
            <path
              className="cn-route-heart"
              d="M196 690 C190 681 177 686 180 696 C183 704 196 711 196 711 C196 711 209 704 212 696 C215 686 202 681 196 690Z"
            /> */}
            <text x="190" y="27">
              ♥
            </text>
            <text x="190" y="700">
              ♥
            </text>
          </svg>
          <ol>
            {schedule.map((item) => (
              <li className="cn-schedule-item" key={item.time}>
                <div className="cn-schedule-card">
                  <Image
                    src={item.image}
                    alt=""
                    width={1000}
                    height={1000}
                    sizes="160px"
                  />
                  <div className="cn-schedule-copy">
                    <strong>{item.time}</strong>
                    <span>{item.title}</span>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="cn-section cn-details">
        <Image
          className="cn-gifts-art"
          src="/chinese/gifts-transparent.webp"
          alt="Red envelopes, wedding gifts, sweets and peonies"
          width={1000}
          height={833}
          sizes="340px"
        />
        <div className="cn-detail-card">
          <p className="cn-kicker">A little note</p>
          <h2>Your presence is our blessing</h2>
          <p>{chineseDemo.giftNote}</p>
        </div>
        <div className="cn-detail-card cn-dress-card">
          <p className="cn-kicker">Dress code</p>
          <h2>Celebration formal</h2>
          <p>{chineseDemo.dressCode}</p>
          <div className="cn-swatches" aria-label="Suggested colors">
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
        </div>
      </section>

      <ChineseGalleryCountdown />

      <section className="cn-section rsvp cn-rsvp">
        <p className="cn-kicker">Kindly reply by April 1</p>
        <h2>Will you celebrate with us?</h2>
        <RSVPForm />
      </section>

      <footer className="cn-footer">
        {/* <KnotDivider /> */}
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
