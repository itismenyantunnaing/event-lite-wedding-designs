import Image from "next/image";
import ChineseGalleryCountdown from "./ChineseGalleryCountdown";
import RSVPForm from "../shared/RSVPForm";
import { chineseDemo } from "../../data/chinese-demo";

function KnotDivider() {
  return <Image className="cn-knot-divider" src="/chinese/knot-divider-transparent.webp" alt="" width={1000} height={500} sizes="280px" />;
}

export default function ChineseInvitation() {
  const { couple, date, venue, schedule } = chineseDemo;

  return (
    <main className="chinese-theme">
      <section className="cn-hero">
        <div className="cn-hero-frame" aria-hidden="true"><i /><i /><i /><i /></div>
        <div className="cn-hero-seal" aria-hidden="true">囍</div>
        <p className="cn-eyebrow">Together with their families</p>
        <div className="cn-moon-window">
          <Image src="/chinese/hero-couple-transparent.webp" alt="Hand-drawn Chinese newlywed couple" width={1000} height={1211} sizes="280px" priority />
        </div>
        <h1>{couple.partnerOne}<i>&amp;</i>{couple.partnerTwo}</h1>
        <p className="cn-invitation">{chineseDemo.invitation}</p>
        <div className="cn-date" aria-label={date.label}>
          <span>{date.day}</span><div><b>{date.month}</b><small>{date.weekday}</small></div><span>{date.year}</span>
        </div>
        <p className="cn-venue-name">{venue.name}</p>
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
        <p>{venue.address.map((line, index) => <span key={line}>{line}{index < venue.address.length - 1 && <br />}</span>)}</p>
        <p className="cn-small">{venue.note}</p>
        <a className="cn-button" href={venue.mapUrl} target="_blank" rel="noreferrer">Open map</a>
      </section>

      <section className="cn-section cn-schedule">
        <p className="cn-kicker">The order of our day</p>
        <h2>Wedding schedule</h2>
        <div className="cn-schedule-list">
          {schedule.map((item, index) => (
            <article className="cn-schedule-item" key={item.time}>
              <div className="cn-schedule-image">
                <Image src={item.image} alt="" width={1000} height={1000} sizes="130px" />
              </div>
              <span className="cn-schedule-number">0{index + 1}</span>
              <div className="cn-schedule-copy"><strong>{item.time}</strong><span>{item.title}</span></div>
            </article>
          ))}
        </div>
      </section>

      <section className="cn-section cn-details">
        <Image className="cn-gifts-art" src="/chinese/gifts-transparent.webp" alt="Red envelopes, wedding gifts, sweets and peonies" width={1000} height={833} sizes="340px" />
        <div className="cn-detail-card">
          <p className="cn-kicker">A little note</p><h2>Your presence is our blessing</h2><p>{chineseDemo.giftNote}</p>
        </div>
        <div className="cn-detail-card cn-dress-card">
          <p className="cn-kicker">Dress code</p><h2>Celebration formal</h2><p>{chineseDemo.dressCode}</p>
          <div className="cn-swatches" aria-label="Suggested colors"><i /><i /><i /><i /><i /></div>
        </div>
      </section>

      <ChineseGalleryCountdown />

      <section className="cn-section rsvp cn-rsvp">
        <p className="cn-kicker">Kindly reply by April 1</p><h2>Will you celebrate with us?</h2><RSVPForm />
      </section>

      <footer className="cn-footer">
        <KnotDivider />
        <Image className="agency-logo" src="/eventElite-logo.svg" alt="Event Elite" width={1600} height={1600} />
        <p>©2027 EVENT ELITE. ALL RIGHTS RESERVED.</p>
      </footer>
    </main>
  );
}
