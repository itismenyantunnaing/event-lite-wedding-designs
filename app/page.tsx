import Link from "next/link";

const designs = [
  { href: "/designs/european", name: "European Vintage Garden", className: "catalogue-card-european" },
  { href: "/designs/chinese", name: "Chinese Celebration", className: "catalogue-card-chinese" },
  { href: "/designs/myanmar", name: "Myanmar Heritage Celebration", className: "catalogue-card-myanmar" },
  { href: "/designs/embroidered", name: "Embroidered Garden at Sedona", className: "catalogue-card-embroidered" },
];

export default function DesignCatalogue() {
  return (
    <main className="catalogue-page">
      <header className="catalogue-header">
        <p className="catalogue-eyebrow">Event Elite presents</p>
        <h1>Wedding invitation designs</h1>
        <p>Choose a style to explore the full mobile invitation experience.</p>
      </header>
      <section className="catalogue-grid" aria-label="Wedding invitation designs">
        {designs.map((design) => (
          <Link
            className={`catalogue-card ${design.className}`}
            href={design.href}
            key={design.href}
            aria-label={`View design: ${design.name}`}
          >
            <span className="catalogue-card-status">Available design</span>
            <h2>{design.name}</h2>
            <span className="catalogue-card-action">
              View design <span aria-hidden="true">→</span>
            </span>
          </Link>
        ))}
      </section>
      <footer className="catalogue-footer">©2026 EVENT ELITE. ALL RIGHTS RESERVED.</footer>
    </main>
  );
}
