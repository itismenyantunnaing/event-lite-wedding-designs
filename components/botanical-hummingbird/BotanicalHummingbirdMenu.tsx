'use client';

import { useRef, useState, type ReactNode, type MouseEvent } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { CustomEase } from 'gsap/CustomEase';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

const links = [
  ['Home', 'home'], ['Countdown', 'countdown'], ['Welcome', 'welcome'],
  ['Where to Find Us', 'location'], ['Wedding Schedule', 'schedule'],
  ['Dress Code', 'dress-code'], ['RSVP', 'rsvp'],
];
const hiddenClip = 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)';
const visibleClip = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)';

gsap.registerPlugin(useGSAP, CustomEase, SplitText);

// Owns the page wrapper so the original push animation can move all page content.
export default function BotanicalHummingbirdMenu({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const controls = useRef<{ toggle: () => void; navigate: (targetId?: string) => void } | null>(null);
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const [iconActive, setIconActive] = useState(false);
  const [musicOn, setMusicOn] = useState(false);

  useGSAP((context, contextSafe) => {
    if (!contextSafe) return;
    CustomEase.create('hop', '.87,0,.13,1');
    const select = gsap.utils.selector(root);
    const page = select('.menu-page')[0];
    const overlay = select('.menu-overlay')[0];
    const content = select('.menu-overlay-content')[0];
    const media = select('.menu-media-wrapper')[0];
    const columns = select('.menu-col');
    const menuRows = select('.menu-link-row');
    gsap.set(menuRows, { yPercent: 110 });
    // Set both components explicitly: mobile transform parsing can retain a
    // pixel offset from the CSS translateY(-50%) when only yPercent changes.
    gsap.set(content, { y: 0, yPercent: -50 });
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let lenis: Lenis | undefined;
    let fontsReady = false;
    let initialized = false;
    const hero = root.current?.querySelector<HTMLElement>(".s3-bh-hero");
    let disposed = false;
    let phase = 'closed';
    let timeline: gsap.core.Timeline | undefined;
    const splits: SplitText[] = [];
    let navigationFrame: number | undefined;

    const scrollToSection = (id: string) => {
      const target = document.getElementById(id);
      if (!target) return;
      // Called only after the page transform has returned to zero.
      lenis?.scrollTo(target, {
        duration: 1.75,
        easing: (t) => (1 - Math.cos(Math.PI * t)) / 2,
        immediate: reducedMotion.matches,
        lock: true,
        onComplete: () => {
          if (disposed) return;
          window.history.replaceState(null, '', `#${id}`);
          target.focus({ preventScroll: true });
        },
      });
    };

    const closeMenu = contextSafe((targetId?: string) => {
      if (phase === 'closed' || phase === 'closing') return;
      // Allow Escape or a link to interrupt the opening animation safely.
      timeline?.kill();
      phase = 'closing';
      setIconActive(false);
      const duration = reducedMotion.matches ? 0 : 1;
      timeline = gsap.timeline({
        onComplete: contextSafe(() => {
          gsap.set(splits.flatMap((split) => split.lines), { yPercent: 110 });
          gsap.set(menuRows, { yPercent: 110 });
          gsap.set(columns, { opacity: 1 });
          gsap.set(media, { opacity: 0 });
          phase = 'closed';
          setOpen(false);
          lenis?.start();
          button.current?.focus({ preventScroll: true });
          if (targetId) {
            // Let React remove inert before scrolling and focusing the section.
            navigationFrame = requestAnimationFrame(() => {
              if (!disposed) scrollToSection(targetId);
            });
          }
        }),
      });
      timeline.to(page, { y: 0, duration, ease: 'hop' }, 0)
        .to(overlay, { clipPath: hiddenClip, duration, ease: 'hop' }, 0)
        .to(content, { y: 0, yPercent: -50, duration, ease: 'hop' }, 0)
        .to(columns, { opacity: 0.25, duration, ease: 'hop' }, 0);
    });

    const openMenu = contextSafe(() => {
      if (phase !== 'closed') return;
      phase = 'opening';
      content.scrollTop = 0;
      const menuList = content.querySelector('.menu-content-main');
      if (menuList) menuList.scrollTop = 0;
      setOpen(true);
      setIconActive(true);
      lenis?.stop();
      const duration = reducedMotion.matches ? 0 : 1;
      const openingTimeline = gsap.timeline({ onComplete: () => { phase = 'open'; } });
      timeline = openingTimeline;
      openingTimeline.to(page, { y: '100svh', duration, ease: 'hop' }, 0)
        .to(overlay, { clipPath: visibleClip, duration, ease: 'hop' }, 0)
        .to(content, { y: 0, yPercent: 0, duration, ease: 'hop' }, 0)
        .to(media, { opacity: 1, duration: reducedMotion.matches ? 0 : 0.75, ease: 'power2.out' }, reducedMotion.matches ? 0 : 0.5);
      openingTimeline.to(menuRows, {
        yPercent: 0,
        duration: reducedMotion.matches ? 0 : 1.35,
        ease: 'hop',
        stagger: reducedMotion.matches ? 0 : 0.075,
      }, 0);
      splits.forEach((split) => {
        const lines = split.lines;
        openingTimeline.to(lines, {
          yPercent: 0,
          duration: reducedMotion.matches ? 0 : 1.35,
          ease: 'hop',
          stagger: reducedMotion.matches ? 0 : 0.075,
        }, 0);
      });
    });

    const initialize = contextSafe(() => {
      if (disposed || initialized || !fontsReady || hero?.dataset.phase !== 'open') return;
      initialized = true;
      // The envelope owns scroll locking until it has finished opening.
      lenis = new Lenis({ autoRaf: true });
      // Wait for fonts before measuring line breaks; re-split on width changes.
      columns.forEach((column: HTMLElement) => {
        const paragraphs = column.querySelectorAll('p');
        if (!paragraphs.length) return;
        const split = SplitText.create(paragraphs, {
          type: 'lines', mask: 'lines', linesClass: 'line', autoSplit: true,
          onSplit: (instance) => {
            gsap.set(instance.lines, { yPercent: phase === 'closed' ? 110 : 0 });
          },
        });
        splits.push(split);
      });
      controls.current = {
        toggle: () => phase === 'closed' ? openMenu() : closeMenu(),
        navigate: closeMenu,
      };
      setReady(true);
    });
    document.fonts.ready.then(() => { fontsReady = true; initialize(); });
    const introObserver = new MutationObserver(initialize);
    if (hero) introObserver.observe(hero, { attributes: true, attributeFilter: ['data-phase'] });

    const onKeyDown = (event: KeyboardEvent) => {
      if (phase === 'closed') return;
      if (event.key === 'Escape') {
        event.preventDefault();
        closeMenu();
      }
      if (event.key === 'Tab') {
        const focusable = [button.current!, ...overlay.querySelectorAll('a[href], button:not([disabled])')] as HTMLElement[];
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault(); last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault(); first.focus();
        }
      }
    };
    const onMotionChange = () => {
      if (reducedMotion.matches) timeline?.progress(1);
    };
    document.addEventListener('keydown', onKeyDown);
    reducedMotion.addEventListener('change', onMotionChange);
    return () => {
      disposed = true;
      controls.current = null;
      timeline?.kill();
      if (navigationFrame !== undefined) cancelAnimationFrame(navigationFrame);
      introObserver.disconnect();
      splits.forEach((split) => split.revert());
      lenis?.destroy();
      document.removeEventListener('keydown', onKeyDown);
      reducedMotion.removeEventListener('change', onMotionChange);
    };
  }, { scope: root });

  const navigate = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    controls.current?.navigate(id);
  };

  return (
    <div ref={root} className="s3-push-menu">
      <nav className="s3-menu-nav" data-ready={ready} inert={!ready} aria-label="Invitation navigation">
        <div className="menu-bar">
          <button ref={button} type="button" className="menu-toggle-btn" disabled={!ready}
            aria-expanded={open} aria-controls="menu-overlay" aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => controls.current?.toggle()}>
            <span className={`menu-hamburger-icon${iconActive ? ' active' : ''}`} aria-hidden="true"><span /><span /></span>
          </button>
        </div>
        <div id="menu-overlay" className="menu-overlay" inert={!open} aria-hidden={!open}>
          <div className="menu-overlay-content" data-lenis-prevent>
            <img className="menu-monogram" src="/botanical-hummingbird/menu-monogram-gold-v1.png" alt="Wedding monogram" width={80} height={80} />
            <div className="menu-media-wrapper"><img src="/botanical-hummingbird/hero-forest-arch-lily-v2.png" alt="" /></div>
            <div className="menu-content-wrapper">
              <div className="menu-content-main">
                <div className="menu-col">
                  {links.map(([title, id]) => <div className="menu-link" key={id}>
                    <a href={`#${id}`} onClick={(event) => navigate(event, id)}>
                      <span className="menu-link-row">
                        <span className="menu-link-label">{title}</span>
                      </span>
                    </a>
                  </div>)}
                </div>
              </div>
            </div>
              <div className="menu-footer menu-music">
                <p id="menu-music-label">Music</p>
                <button type="button" className="menu-music-toggle" role="switch"
                  aria-labelledby="menu-music-label" aria-checked={musicOn}
                  onClick={() => setMusicOn((value) => !value)}>
                  <span className="menu-music-track" aria-hidden="true"><span /></span>
                  <span>{musicOn ? 'On' : 'Off'}</span>
                </button>
              </div>
          </div>
        </div>
      </nav>
      <div className="menu-page" inert={open}>{children}</div>
    </div>
  );
}
