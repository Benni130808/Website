"use client";

import { useEffect, useRef, useState } from "react";

const interests = [
  {
    id: "sport",
    number: "01",
    title: "Sport",
    kicker: "Bewegen. Wachsen. Dranbleiben.",
    text: "Ob auf dem Court, dem Fußballplatz oder im Gym – Sport ist für mich mehr als Bewegung. Er zeigt mir, was mit Fokus und Disziplin möglich ist.",
    note: "Mein Drive",
    detail: "Disziplin fühlt sich nicht immer leicht an. Aber das Gefühl, ein Ziel erreicht zu haben, ist es jedes Mal wert.",
    tags: ["Tennis", "Fußball", "Gym"],
    image: "/images/sport.png",
    imageAlt: "Tennisspieler beim Aufschlag auf einem blauen Court",
    icon: "↗",
    color: "lime",
  },
  {
    id: "musik",
    number: "02",
    title: "Musik",
    kicker: "Gefühl wird zu Sound.",
    text: "Mit der Gitarre verliere ich jedes Zeitgefühl. Gerade bringe ich mir außerdem Klavier bei – Taste für Taste, Song für Song.",
    note: "Mein Sound",
    detail: "Musik ist mein Ausgleich: ausprobieren, falsch greifen, neu anfangen – bis aus einzelnen Tönen etwas Eigenes entsteht.",
    tags: ["Gitarre", "Klavier", "Vibes"],
    image: "/images/musik.png",
    imageAlt: "Hände beim Gitarrespielen in einem warmen Musikzimmer",
    icon: "♫",
    color: "coral",
  },
  {
    id: "code",
    number: "03",
    title: "Coding",
    kicker: "Ideen werden echt.",
    text: "Ich stehe noch am Anfang, aber genau das macht es spannend: Neues lernen, Fehler knacken und irgendwann Projekte bauen, die vorher nur im Kopf existiert haben.",
    note: "Mein nächstes Level",
    detail: "Noch bin ich Lernender. Mein Ziel: nicht nur Code verstehen, sondern damit Projekte erschaffen, die Spaß machen und wirklich funktionieren.",
    tags: ["Lernen", "Bauen", "Entdecken"],
    image: "/images/code.png",
    imageAlt: "Junger Programmierer an einem Schreibtisch bei Abendlicht",
    icon: "{ }",
    color: "blue",
  },
  {
    id: "meer",
    number: "04",
    title: "Meer",
    kicker: "Draußen ist mein Lieblingsort.",
    text: "Reisen bedeutet Freiheit. Am liebsten bin ich dort, wo das Meer beginnt – beim Surfen auf der Welle, beim Tauchen darunter oder einfach mit Sand unter den Füßen.",
    note: "Mein Reset",
    detail: "Das Meer macht den Kopf frei. Über der Wasseroberfläche beim Surfen – und darunter beim Tauchen in eine komplett andere Welt.",
    tags: ["Reisen", "Surfen", "Tauchen"],
    image: "/images/meer.png",
    imageAlt: "Surfer mit Board im klaren Meer bei Sonnenaufgang",
    icon: "≈",
    color: "aqua",
  },
];

const quickFacts = [
  {
    label: "Aktuell",
    value: "18",
    text: "Alt genug für große Ziele. Jung genug, um alles auszuprobieren.",
  },
  {
    label: "Mindset",
    value: "1%+",
    text: "Jeden Tag ein kleines Stück besser – ohne den Spaß am Weg zu verlieren.",
  },
  {
    label: "Happy Place",
    value: "Meer",
    text: "Am liebsten zwischen Wellen, Weite und dem nächsten Abenteuer.",
  },
  {
    label: "Nächster Skill",
    value: "Code",
    text: "Verstehen, bauen, testen und aus einer Idee ein echtes Projekt machen.",
  },
];

export default function Home() {
  const [active, setActive] = useState("sport");
  const [flipped, setFlipped] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const rootRef = useRef<HTMLElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -6%" },
    );

    document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((node) => {
      revealObserver.observe(node);
    });

    const cardObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-22% 0px -48%", threshold: [0.15, 0.5] },
    );

    Object.values(cardRefs.current).forEach((node) => node && cardObserver.observe(node));

    let scrollFrame = 0;
    const onScroll = () => {
      if (scrollFrame) return;
      scrollFrame = window.requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const progress = max > 0 ? window.scrollY / max : 0;
        rootRef.current?.style.setProperty("--scroll-progress", `${progress}`);
        heroRef.current?.style.setProperty(
          "--hero-shift",
          `${Math.min(window.scrollY * 0.18, 130)}px`,
        );
        scrollFrame = 0;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      revealObserver.disconnect();
      cardObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
      if (scrollFrame) window.cancelAnimationFrame(scrollFrame);
    };
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    const onPointerDown = (event: PointerEvent) => {
      if (
        menuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, [menuOpen]);

  const handleHeroPointer = (event: React.PointerEvent<HTMLElement>) => {
    const hero = heroRef.current;
    const glow = glowRef.current;
    if (!hero || !glow) return;
    const rect = hero.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    glow.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
    glow.style.opacity = "1";
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <main ref={rootRef}>
      <div className="scroll-progress" aria-hidden="true" />

      <header className="nav">
        <a className="logo" href="#top" aria-label="Zurück zum Anfang">
          B<span>.</span>
        </a>
        <nav aria-label="Hauptnavigation">
          <a href="#about">Über mich</a>
          <a href="#interessen">Interessen</a>
          <a href="#next">Was kommt</a>
        </nav>
        <div className="menu-shell" ref={menuRef}>
          <button
            className="nav-pill"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="explore-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            Explore
            <span className={menuOpen ? "turn" : ""}>＋</span>
          </button>
          <div
            className={`explore-menu ${menuOpen ? "open" : ""}`}
            id="explore-menu"
            aria-hidden={!menuOpen}
          >
            <div className="menu-heading">
              <span>SPRING ZU</span>
              <button type="button" onClick={closeMenu} aria-label="Menü schließen">×</button>
            </div>
            <a href="#about" onClick={closeMenu}>
              <span>00</span> Über mich <i>↘</i>
            </a>
            {interests.map((item) => (
              <a key={item.id} href={`#${item.id}`} onClick={closeMenu}>
                <span>{item.number}</span> {item.title} <i>{item.icon}</i>
              </a>
            ))}
            <a href="#next" onClick={closeMenu}>
              <span>05</span> Was kommt <i>→</i>
            </a>
          </div>
        </div>
      </header>

      <section
        className="hero"
        id="top"
        ref={heroRef}
        onPointerMove={handleHeroPointer}
        onPointerEnter={handleHeroPointer}
        onPointerLeave={() => {
          if (glowRef.current) glowRef.current.style.opacity = "0";
        }}
      >
        <div className="cursor-glow" ref={glowRef} aria-hidden="true" />
        <div className="hero-orbit orbit-one" aria-hidden="true">
          <span>18</span>
        </div>
        <div className="hero-orbit orbit-two" aria-hidden="true">
          <span>BER</span>
        </div>

        <div className="hero-copy">
          <p className="eyebrow reveal">HEY, ICH BIN</p>
          <h1 className="hero-title">
            <span>BENJA</span>
            <span className="outline">MIN.</span>
          </h1>
        </div>

        <div className="hero-photo-stack" aria-label="Einblicke in meine Interessen">
          <a href="#sport" className="hero-photo photo-sport" aria-label="Zu Sport">
            <img src="/images/sport.png" alt="" />
            <span>SPORT</span>
          </a>
          <a href="#musik" className="hero-photo photo-musik" aria-label="Zu Musik">
            <img src="/images/musik.png" alt="" />
            <span>MUSIK</span>
          </a>
          <a href="#meer" className="hero-photo photo-meer" aria-label="Zum Meer">
            <img src="/images/meer.png" alt="" />
            <span>MEER</span>
          </a>
        </div>

        <div className="hero-bottom reveal">
          <p>
            <strong>18 Jahre.</strong> Immer in Bewegung,
            <br />
            immer auf der Suche nach dem nächsten Level.
          </p>
          <a className="scroll-cue" href="#about">
            <span>SCROLL TO EXPLORE</span>
            <i>↓</i>
          </a>
        </div>
        <div className="wave-lines" aria-hidden="true">
          <span /><span /><span /><span /><span />
        </div>
      </section>

      <section className="manifesto" id="about">
        <div className="manifesto-label" data-reveal>
          <span>MEIN MINDSET</span>
          <i />
        </div>
        <p className="manifesto-copy" data-reveal>
          Ich probiere aus, bleibe dran und lerne jeden Tag etwas Neues.
          <span> Nicht perfekt sein – besser werden.</span>
        </p>
        <div className="sticker sticker-one" aria-hidden="true">STAY<br />CURIOUS</div>
        <div className="sticker sticker-two" aria-hidden="true">★</div>
      </section>

      <section className="quick-section">
        <div className="quick-intro" data-reveal>
          <p className="eyebrow">BENJAMIN IN KURZ</p>
          <h2>Ein paar <em>Quick Facts</em></h2>
          <p>Klick die Karten auf – ein kleiner Steckbrief im Steckbrief.</p>
        </div>
        <div className="quick-grid">
          {quickFacts.map((fact, index) => (
            <details className="quick-fact" key={fact.label} data-reveal>
              <summary>
                <span>0{index + 1}</span>
                <strong>{fact.value}</strong>
                <i>＋</i>
              </summary>
              <div>
                <p>{fact.label}</p>
                <span>{fact.text}</span>
              </div>
            </details>
          ))}
        </div>
      </section>

      <section className="photo-reel" aria-label="Visuelle Eindrücke">
        <div className="reel-track">
          {[...interests, ...interests].map((item, index) => (
            <a href={`#${item.id}`} key={`${item.id}-${index}`} tabIndex={index > 3 ? -1 : 0}>
              <img src={item.image} alt={index < 4 ? item.imageAlt : ""} />
              <span>{item.title}</span>
            </a>
          ))}
        </div>
      </section>

      <section className="interests" id="interessen">
        <div className="section-head" data-reveal>
          <p className="eyebrow">WAS MICH ANTREIBT</p>
          <h2>Meine <em>Welten</em></h2>
          <p>Klick auf eine Karte, um sie umzudrehen.</p>
        </div>

        <div className="interest-layout">
          <aside className="interest-nav" aria-label="Interessen auswählen">
            {interests.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={active === item.id ? "active" : ""}
                onMouseEnter={() => setActive(item.id)}
              >
                <span>{item.number}</span>
                {item.title}
                <i>↗</i>
              </a>
            ))}
          </aside>

          <div className="interest-cards">
            {interests.map((item) => {
              const isFlipped = flipped === item.id;
              return (
                <article
                  key={item.id}
                  id={item.id}
                  className={`interest-card-wrap ${item.color}`}
                  ref={(node) => {
                    cardRefs.current[item.id] = node;
                  }}
                  data-reveal
                >
                  <button
                    type="button"
                    className={`flip-card ${isFlipped ? "is-flipped" : ""}`}
                    aria-pressed={isFlipped}
                    aria-label={`${item.title}: ${isFlipped ? "Vorderseite zeigen" : "Details zeigen"}`}
                    onClick={() => setFlipped(isFlipped ? null : item.id)}
                  >
                    <span className="flip-card-inner">
                      <span className="card-face card-front">
                        <img src={item.image} alt={item.imageAlt} />
                        <span className="image-shade" />
                        <span className="card-top">
                          <span>{item.number} / 04</span>
                          <span className="card-icon">{item.icon}</span>
                        </span>
                        <span className="card-front-content">
                          <span>{item.kicker}</span>
                          <strong>{item.title}</strong>
                          <span className="flip-hint">KLICKEN &amp; UMDREHEN <i>↻</i></span>
                        </span>
                      </span>

                      <span className={`card-face card-back ${item.color}`}>
                        <span className="card-top">
                          <span>{item.number} / 04</span>
                          <span className="card-icon">↻</span>
                        </span>
                        <span className="card-back-content">
                          <span className="card-note">{item.note}</span>
                          <strong>{item.title}</strong>
                          <span className="card-description">{item.text}</span>
                          <span className="card-detail">{item.detail}</span>
                          <span className="tags">
                            {item.tags.map((tag) => <span key={tag}>{tag}</span>)}
                          </span>
                        </span>
                        <span className="card-decoration" aria-hidden="true" />
                      </span>
                    </span>
                  </button>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="finale" id="next">
        <div className="finale-photo" data-reveal>
          <img src="/images/meer.png" alt="Blick auf einen Surfer im Meer" />
        </div>
        <div className="finale-copy" data-reveal>
          <p className="eyebrow">UND DAS IST ERST DER ANFANG</p>
          <h2>
            LET&apos;S SEE<br />
            WHAT&apos;S <span>NEXT.</span>
          </h2>
          <p>Mehr lernen. Weiter reisen. Neue Ideen bauen. Und dabei neugierig bleiben.</p>
        </div>
        <div className="finale-marquee" aria-hidden="true">
          <div>SPORT ★ MUSIK ★ CODE ★ MEER ★ SPORT ★ MUSIK ★ CODE ★ MEER ★</div>
        </div>
      </section>

      <footer>
        <a className="logo" href="#top">B<span>.</span></a>
        <p>Benjamin · 18 · Always learning</p>
        <a href="#top">BACK TO TOP ↑</a>
      </footer>
    </main>
  );
}
