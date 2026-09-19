import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import EmbroideredCountdown from "../../../components/embroidered/EmbroideredCountdown";
import EmbroideredSchedule from "../../../components/embroidered/EmbroideredSchedule";
import RSVPForm from "../../../components/shared/RSVPForm";
import "./embroidered.css";

export const metadata: Metadata = {
  title: "Embroidered Garden at Sedona — Event Elite",
  description: "A tactile embroidered wedding invitation inspired by Sedona Hotel.",
};

export default function EmbroideredDesignPage() {
  return (
    <main className="embroidered-theme">
      <section className="embroidered-hero" aria-label="Wedding invitation for Camille and Antoine">
        <Image
          className="embroidered-hero-curtain"
          src="/embroidered/hero-curtain-short.png"
          alt="Ivory embroidered curtains with pearl trim"
          width={1104}
          height={1090}
          sizes="(min-width: 600px) 430px, 100vw"
          priority
        />
        <div className="embroidered-hero-copy">
          <h1>
            <span>Camille</span>
            <i>&amp;</i>
            <span>Antoine</span>
          </h1>
          <p>June 12, 2027</p>
        </div>
        <Image
          className="embroidered-hero-scene"
          src="/embroidered/hero-sedona-transparent.png"
          alt="Sedona Hotel, its swimming pool and garden roses rendered as raised embroidery"
          width={1140}
          height={1380}
          sizes="(min-width: 600px) 430px, 100vw"
          priority
        />
      </section>

      <section className="embroidered-story" aria-labelledby="embroidered-story-heading">
        <Image
          className="embroidered-story-art"
          src="/embroidered/our-story-arch-swans-clean.png"
          alt="An embroidered floral arch with two swans forming a heart above pearl bands and a rose border"
          width={980}
          height={1605}
          sizes="(min-width: 600px) 430px, 100vw"
        />
        <div className="embroidered-story-copy">
          <h2 id="embroidered-story-heading">Our Story</h2>
          <i aria-hidden="true" />
          <p>
            We met in Burgundy and fell in love over long dinners and walks
            through the vines. Now we return to where it began, ready for our
            next chapter together.
          </p>
        </div>
      </section>

      <EmbroideredSchedule />

      <section className="embroidered-dress-code">
        <p className="embroidered-kicker">Dress code</p>
        <h2>Garden formal</h2>
        <p className="embroidered-dress-copy">
          Join us in refined evening attire inspired by the garden: soft sage,
          dusty rose, plum, warm coral, and classic black are warmly welcomed.
        </p>
        <Image
          className="embroidered-dress-art"
          src="/embroidered/dress-code-transparent.png"
          alt="Six wedding guests in formal attire rendered as dimensional embroidery"
          width={1254}
          height={1254}
          sizes="(min-width: 600px) 390px, 92vw"
        />
        <div className="embroidered-swatches" aria-label="Suggested dress-code colors">
          <i />
          <i />
          <i />
          <i />
          <i />
        </div>
      </section>

      <EmbroideredCountdown />

      <section className="embroidered-rsvp">
        <p className="embroidered-kicker">Kindly reply by May 12</p>
        <h2>Will you celebrate with us?</h2>
        <RSVPForm />
      </section>

      <footer className="embroidered-footer">
        <Link href="/">Explore all designs</Link>
        <p>©2027 EVENT ELITE. ALL RIGHTS RESERVED.</p>
      </footer>
    </main>
  );
}
