"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const schedule = [
  {
    time: "4:45 PM",
    title: "Guest arrival",
    image: "/embroidered/schedule-arrival.png",
    width: 1536,
    height: 1024,
    alt: "An embroidered ballroom prepared for arriving wedding guests",
    className: "embroidered-schedule-arrival",
  },
  {
    time: "5:00 PM",
    title: "Ceremony begins",
    image: "/embroidered/schedule-rings.png",
    width: 1416,
    height: 1111,
    alt: "Two embroidered wedding rings with flowers and pearls",
    className: "",
  },
  {
    time: "7:00 PM",
    title: "Dinner & dancing",
    image: "/embroidered/schedule-dinner.png",
    width: 1374,
    height: 1145,
    alt: "An embroidered wedding dinner table for two",
    className: "",
  },
  {
    time: "8:30 PM",
    title: "Cake cutting",
    image: "/embroidered/schedule-cake.png",
    width: 1111,
    height: 1415,
    alt: "An embroidered three-tier wedding cake with roses and pearls",
    className: "embroidered-schedule-cake",
  },
  {
    time: "11:00 PM",
    title: "Farewell",
    image: "/embroidered/schedule-farewell.png",
    width: 1024,
    height: 1536,
    alt: "Two embroidered champagne glasses raised for a farewell toast",
    className: "embroidered-schedule-farewell",
  },
];

export default function EmbroideredSchedule() {
  const routeRef = useRef<HTMLDivElement>(null);
  const pearlRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let animationFrame = 0;
    let stableViewportHeight = window.innerHeight;
    let viewportWidth = window.innerWidth;

    const updatePearl = () => {
      animationFrame = 0;
      const route = routeRef.current;
      const pearl = pearlRef.current;

      if (!route || !pearl) return;

      const pearlSize = pearl.offsetHeight;
      const routeRect = route.getBoundingClientRect();
      const viewportAnchor = stableViewportHeight * 0.5;
      const position = Math.min(
        Math.max(viewportAnchor - routeRect.top - pearlSize / 2, 0),
        routeRect.height - pearlSize,
      );

      pearl.style.transform = `translate3d(0, ${position}px, 0)`;
    };

    const requestUpdate = () => {
      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(updatePearl);
      }
    };

    const handleResize = () => {
      const nextWidth = window.innerWidth;

      // Mobile browser chrome frequently changes only the viewport height.
      // Keep the anchor stable unless the width/orientation actually changes.
      if (Math.abs(nextWidth - viewportWidth) > 24) {
        viewportWidth = nextWidth;
        stableViewportHeight = window.innerHeight;
        requestUpdate();
      }
    };

    const routeObserver = new ResizeObserver(requestUpdate);
    if (routeRef.current) routeObserver.observe(routeRef.current);

    updatePearl();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      routeObserver.disconnect();
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", handleResize);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <section className="embroidered-schedule" aria-labelledby="embroidered-schedule-heading">
      <p className="embroidered-kicker">The order of the day</p>
      <h2 id="embroidered-schedule-heading">Wedding Schedule</h2>

      <div className="embroidered-schedule-route" ref={routeRef}>
        <div className="embroidered-schedule-axis" aria-hidden="true">
          <i className="embroidered-schedule-pearl" ref={pearlRef} />
        </div>

        <ol>
          {schedule.map((item) => (
            <li key={item.time}>
              <div className={`embroidered-schedule-art ${item.className}`}>
                <Image
                  src={item.image}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  sizes="(max-width: 599px) 38vw, 170px"
                />
              </div>
              <div className="embroidered-schedule-copy">
                <strong>{item.time}</strong>
                <span>{item.title}</span>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
