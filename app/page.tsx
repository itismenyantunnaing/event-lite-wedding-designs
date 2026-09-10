import Link from "next/link";

const designs = [
  { href: "/designs/european", number: "01", name: "European Vintage Garden", description: "Ivory paper, romantic serif type, and hand-drawn blue details.", status: "View design", available: true, className: "catalogue-card-european" },
  { href: "/designs/chinese", number: "02", name: "Chinese Celebration", description: "Warm ivory paper, ceremonial red details, and joyful Chinese wedding illustrations.", status: "View design", available: true, className: "catalogue-card-chinese" },
  { href: "/designs/myanmar", number: "03", name: "Myanmar Traditional", description: "A culturally rooted Myanmar wedding direction for a future release.", status: "Coming soon", available: false, className: "catalogue-card-myanmar" },
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
          <article className={`catalogue-card ${design.className}`} key={design.href}>
            <div className="catalogue-card-art" aria-hidden="true"><span>{design.number}</span></div>
            <div className="catalogue-card-copy">
              <p>{design.available ? "Available design" : "Future design"}</p>
              <h2>{design.name}</h2>
              <p>{design.description}</p>
              <Link href={design.href} aria-label={`${design.status}: ${design.name}`}>
                {design.status}<span aria-hidden="true"> →</span>
              </Link>
            </div>
          </article>
        ))}
      </section>
      <footer className="catalogue-footer">©2026 EVENT ELITE. ALL RIGHTS RESERVED.</footer>
    </main>
  );
}
