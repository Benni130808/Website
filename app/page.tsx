"use client";

import { useEffect, useRef, useState } from "react";

const textSymbols = {
  northEast: "\u2197\uFE0E",
  southEast: "\u2198\uFE0E",
  right: "\u2192\uFE0E",
  down: "\u2193\uFE0E",
  up: "\u2191\uFE0E",
  rotate: "\u21BB\uFE0E",
} as const;

const interests = [
  {
    id: "sport",
    number: "01",
    title: "Sport",
    short: "Court / Platz / Gym",
    kicker: "Bewegen. Wachsen. Dranbleiben.",
    text: "Ob auf dem Court, dem Fußballplatz oder im Gym – Sport ist für mich mehr als Bewegung. Er zeigt mir, was mit Fokus und Disziplin möglich ist.",
    note: "Mein Drive",
    detail: "Disziplin fühlt sich nicht immer leicht an. Aber das Gefühl, ein Ziel erreicht zu haben, ist es jedes Mal wert.",
    tags: ["Tennis", "Fußball", "Gym"],
    facts: [
      { label: "Tennis-Favorit", value: "Alexander Zverev" },
      { label: "Meine Position", value: "Linker Flügel" },
      { label: "Gym-Ziel", value: "Ein Muscle-Up" },
    ],
    image: "/images/sport-benjamin-v2.webp",
    imageAlt: "Benjamin beim Tennisaufschlag auf einem blauen Court",
    icon: textSymbols.northEast,
    color: "lime",
  },
  {
    id: "musik",
    number: "02",
    title: "Musik",
    short: "Saiten / Tasten / Sound",
    kicker: "Gefühl wird zu Sound.",
    text: "Mit der Gitarre verliere ich jedes Zeitgefühl. Gerade bringe ich mir außerdem Klavier bei – Taste für Taste, Song für Song.",
    note: "Mein Sound",
    detail: "Musik ist mein Ausgleich: ausprobieren, falsch greifen, neu anfangen – bis aus einzelnen Tönen etwas Eigenes entsteht.",
    tags: ["Gitarre", "Klavier", "Vibes"],
    facts: [
      { label: "Gitarre", value: "Seit 8 Jahren" },
      { label: "Bruno-Mars-Song", value: "Grenade" },
      { label: "Aktuell", value: "Passacaglia" },
    ],
    image: "/images/musik-benjamin-v2.webp",
    imageAlt: "Benjamin spielt Gitarre in seinem Musikzimmer",
    icon: "♫",
    color: "coral",
  },
  {
    id: "code",
    number: "03",
    title: "Coding",
    short: "Lernen / Bauen / Debuggen",
    kicker: "Ideen werden echt.",
    text: "Ich stehe noch am Anfang, aber genau das macht es spannend: Neues lernen, Fehler knacken und irgendwann Projekte bauen, die vorher nur im Kopf existiert haben.",
    note: "Mein nächstes Level",
    detail: "Noch bin ich Lernender. Mein Ziel: nicht nur Code verstehen, sondern damit Projekte erschaffen, die Spaß machen und wirklich funktionieren.",
    tags: ["Lernen", "Bauen", "Entdecken"],
    facts: [
      { label: "Erstes Projekt", value: "Ein kleines, lustiges Programm" },
      { label: "Mein Reiz", value: "Erschaffen & optimieren" },
    ],
    image: "/images/code-benjamin-v2.webp",
    imageAlt: "Benjamin lernt Programmieren an seinem Schreibtisch",
    icon: "{ }",
    color: "blue",
  },
  {
    id: "meer",
    number: "04",
    title: "Meer",
    short: "Reisen / Surfen / Tauchen",
    kicker: "Draußen ist mein Lieblingsort.",
    text: "Reisen bedeutet Freiheit. Am liebsten bin ich dort, wo das Meer beginnt – beim Surfen auf der Welle, beim Tauchen darunter oder einfach mit Sand unter den Füßen.",
    note: "Mein Reset",
    detail: "Das Meer macht den Kopf frei. Über der Wasseroberfläche beim Surfen – und darunter beim Tauchen in eine komplett andere Welt.",
    tags: ["Reisen", "Surfen", "Tauchen"],
    facts: [
      { label: "Oʻahu-Favorit", value: "US Naval Radio Station Haʻikū" },
      { label: "Dort erlebt", value: "Surfen & Tauchen" },
      { label: "Indonesien", value: "Naturvielfalt & Landschaft" },
    ],
    image: "/images/meer-benjamin.webp",
    imageAlt: "Benjamin mit einem Surfboard im klaren Meer",
    icon: "≈",
    color: "aqua",
  },
];

const quickFacts = [
  {
    label: "Lieblingssport",
    value: "Tennis + FCB",
    text: "Auf dem Court selbst aktiv – und beim Fußball Fan des FC Bayern München.",
    compact: true,
  },
  {
    label: "Sportliches Ziel",
    value: "Titel gewinnen",
    text: "In einem Fußballverein spielen, als Team besser werden und gemeinsam einen Titel holen.",
    compact: true,
  },
  {
    label: "Lieblingskünstler",
    value: "Bruno Mars",
    text: "Mein Favorit, wenn Musik einfach gute Energie haben soll.",
    compact: true,
  },
  {
    label: "Will ich spielen",
    value: "Passacaglia",
    text: "Die Passacaglia von Händel/Halvorsen ist eines der Stücke, die ich unbedingt lernen möchte.",
    compact: true,
  },
  {
    label: "Gerade am Lernen",
    value: "HTML · CSS · JS",
    text: "Die Grundlagen verstehen und daraus Schritt für Schritt eigene digitale Ideen bauen.",
    compact: true,
  },
  {
    label: "Will ich bauen",
    value: "Diese Website",
    text: "Eine persönliche, interaktive Website wie diese – nur irgendwann komplett selbst programmiert.",
    compact: true,
  },
  {
    label: "Schönste Reise",
    value: "Oʻahu",
    text: "Hawaii, besonders die Insel Oʻahu, ist mein bisher schönstes Reiseziel.",
  },
  {
    label: "Traumreiseziel",
    value: "Indonesien",
    text: "Inseln, Meer, neue Kulturen und möglichst viele Abenteuer.",
    compact: true,
  },
  {
    label: "In drei Worten",
    value: "3 Worte",
    text: "Abenteuerlustig. Neugierig. Ehrlich.",
  },
];

const goals = [
  {
    number: "01",
    title: "Programmieren lernen",
    text: "HTML, CSS und JavaScript wirklich verstehen – und damit eigene Projekte umsetzen.",
  },
  {
    number: "02",
    title: "Überall weiterentwickeln",
    text: "Sportlich und persönlich nicht stehen bleiben, sondern jeden Tag ein Stück wachsen.",
  },
  {
    number: "03",
    title: "Möglichst viel reisen",
    text: "Neue Orte, Menschen und Perspektiven kennenlernen – am liebsten immer in Richtung Meer.",
  },
];

const chapters = [
  { id: "about", number: "00", label: "Profil" },
  { id: "facts", number: "01", label: "Steckbrief" },
  { id: "scroll-story", number: "02", label: "Tour" },
  { id: "interessen", number: "03", label: "Deep Dive" },
  { id: "ziele", number: "04", label: "Ziele" },
  { id: "next", number: "05", label: "Ausblick" },
];

export default function Home() {
  const [active, setActive] = useState("sport");
  const [activeChapter, setActiveChapter] = useState("about");
  const [flipped, setFlipped] = useState<Set<string>>(() => new Set());
  const [openFact, setOpenFact] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [storyIndex, setStoryIndex] = useState(0);
  const rootRef = useRef<HTMLElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const storyRef = useRef<HTMLElement | null>(null);
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
      { threshold: 0.14, rootMargin: "0px 0px -7%" },
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

    const chapterObserver = new IntersectionObserver(
      (entries) => {
        const current = entries.find((entry) => entry.isIntersecting);
        if (current?.target.id) setActiveChapter(current.target.id);
      },
      { rootMargin: "-42% 0px -53%", threshold: 0 },
    );

    document.querySelectorAll<HTMLElement>("[data-chapter]").forEach((node) => {
      chapterObserver.observe(node);
    });

    let scrollFrame = 0;
    let lastStoryIndex = -1;
    const onScroll = () => {
      if (scrollFrame) return;
      scrollFrame = window.requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const progress = max > 0 ? window.scrollY / max : 0;
        rootRef.current?.style.setProperty("--scroll-progress", `${progress}`);

        const heroProgress = Math.min(window.scrollY / Math.max(window.innerHeight, 1), 1);
        heroRef.current?.style.setProperty("--hero-shift", `${heroProgress * 110}px`);
        heroRef.current?.style.setProperty("--hero-fade", `${1 - heroProgress * 0.78}`);

        const story = storyRef.current;
        if (story) {
          const rect = story.getBoundingClientRect();
          const travel = story.offsetHeight - window.innerHeight;
          const storyProgress = Math.min(Math.max(-rect.top / Math.max(travel, 1), 0), 1);
          story.style.setProperty("--story-progress", `${storyProgress}`);
          const nextIndex = Math.min(3, Math.floor(storyProgress * 3.999));
          if (nextIndex !== lastStoryIndex) {
            lastStoryIndex = nextIndex;
            setStoryIndex(nextIndex);
          }
        }

        scrollFrame = 0;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      revealObserver.disconnect();
      cardObserver.disconnect();
      chapterObserver.disconnect();
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
    glow.style.transform = `translate3d(${event.clientX - rect.left}px, ${event.clientY - rect.top}px, 0) translate(-50%, -50%)`;
    glow.style.opacity = "1";
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <main ref={rootRef}>
      <div className="scroll-progress" aria-hidden="true" />
      <nav className="chapter-nav" aria-label="Kapitelübersicht">
        <span className="chapter-nav-title">KAPITEL</span>
        <a className="chapter-home" href="#top" aria-label="Zurück zum Start">
          <span className="text-arrow">{textSymbols.up}</span>
          <small>Start</small>
        </a>
        {chapters.map((chapter) => (
          <a
            key={chapter.id}
            href={`#${chapter.id}`}
            className={activeChapter === chapter.id ? "active" : ""}
            aria-current={activeChapter === chapter.id ? "step" : undefined}
            aria-label={`${chapter.number}: ${chapter.label}`}
          >
            <span>{chapter.number}</span>
            <small>{chapter.label}</small>
          </a>
        ))}
      </nav>

      <header className="nav">
        <a className="logo" href="#top" aria-label="Zurück zum Anfang">
          B/<span>18</span>
        </a>
        <nav aria-label="Hauptnavigation">
          <a href="#about">Profil</a>
          <a href="#facts">Steckbrief</a>
          <a href="#scroll-story">Interessen</a>
          <a href="#ziele">Ziele</a>
        </nav>
        <div className="menu-shell" ref={menuRef}>
          <button
            className="nav-pill"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="explore-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            Menü
            <span className={menuOpen ? "turn" : ""}>＋</span>
          </button>
          <div
            className={`explore-menu ${menuOpen ? "open" : ""}`}
            id="explore-menu"
            aria-hidden={!menuOpen}
          >
            <div className="menu-heading">
              <span>INHALT / 09</span>
              <button type="button" onClick={closeMenu} aria-label="Menü schließen">×</button>
            </div>
            <a href="#about" onClick={closeMenu}>
              <span>00</span> Profil <i className="text-arrow">{textSymbols.southEast}</i>
            </a>
            <a href="#facts" onClick={closeMenu}>
              <span>01</span> Persönlicher Steckbrief <i className="text-arrow">{textSymbols.right}</i>
            </a>
            <a href="#scroll-story" onClick={closeMenu}>
              <span>02</span> Interessen-Tour <i className="text-arrow">{textSymbols.right}</i>
            </a>
            {interests.map((item) => (
              <a key={item.id} href={`#${item.id}`} onClick={closeMenu}>
                <span>03.{item.number}</span> {item.title} <i>{item.icon}</i>
              </a>
            ))}
            <a href="#ziele" onClick={closeMenu}>
              <span>04</span> Ziele + Kontakt <i className="text-arrow">{textSymbols.southEast}</i>
            </a>
            <a href="#next" onClick={closeMenu}>
              <span>05</span> Ausblick <i className="text-arrow">{textSymbols.southEast}</i>
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
        <div className="hero-ruler" aria-hidden="true">
          {Array.from({ length: 14 }).map((_, index) => <i key={index} />)}
        </div>

        <div className="hero-copy">
          <p className="hero-kicker">FIELD NOTES / BENJAMIN / 2026</p>
          <h1 className="hero-title" aria-label="Benjamin">
            <span>BEN</span>
            <span>JAMIN</span>
          </h1>
          <p className="hero-intro">
            18 Jahre. Vier Welten. Und ziemlich viel Lust, herauszufinden,
            was als Nächstes möglich ist.
          </p>
        </div>

        <figure className="hero-main-photo">
          <span className="tape tape-top" aria-hidden="true" />
          <img src="/images/meer-benjamin.webp" alt="Benjamin mit einem Surfboard im klaren Meer" />
          <figcaption>
            <span>04 / HAPPY PLACE</span>
            Meer, Wellen, Kopf frei.
          </figcaption>
          <span className="photo-mark" aria-hidden="true">B.</span>
        </figure>

        <aside className="hero-note">
          <span>GERADE AM LERNEN</span>
          <strong>HTML<br />CSS / JS</strong>
          <i className="text-arrow" aria-hidden="true">{textSymbols.southEast}</i>
        </aside>

        <div className="hero-index" aria-label="Direkt zu meinen Interessen">
          {interests.map((item) => (
            <a href={`#${item.id}`} key={item.id}>
              <span>{item.number}</span>
              <strong>{item.title}</strong>
              <small>{item.short}</small>
            </a>
          ))}
        </div>

        <a className="scroll-cue" href="#about">
          <span>RUNTER<br />SCROLLEN</span>
          <i className="text-arrow">{textSymbols.down}</i>
        </a>
      </section>

      <section className="manifesto" id="about" data-chapter>
        <div className="manifesto-label" data-reveal>
          <span>00 / PROFIL</span>
          <i />
        </div>
        <div className="manifesto-copy" data-reveal>
          <p>Ich sammle keine perfekten Momente.</p>
          <p>
            Ich sammle <em>Fortschritt</em>: einen stärkeren Aufschlag,
            einen neuen Akkord, eine funktionierende Zeile Code und den
            nächsten Sprung ins Meer.
          </p>
        </div>
        <div className="manifesto-margin-note" data-reveal>
          <span>NOTIZ AN MICH</span>
          <strong>Neugierig bleiben.<br />Anfangen. Dranbleiben.</strong>
        </div>
      </section>

      <section className="quick-section" id="facts" data-chapter>
        <div className="quick-intro" data-reveal>
          <p className="eyebrow">01 / PERSONAL INDEX / 09</p>
          <h2>Neun Dinge,<br /><em>die wirklich passen.</em></h2>
          <p>Aufklappen und mehr erfahren – diesmal mit echten Lieblingsorten, Zielen und Sounds.</p>
        </div>
        <div className="quick-grid">
          {quickFacts.map((fact, index) => {
            const isOpen = openFact === index;
            return (
            <article
              className={`quick-fact ${fact.compact ? "compact" : ""} ${isOpen ? "is-open" : ""}`}
              key={fact.label}
            >
              <button
                className="fact-toggle"
                type="button"
                id={`fact-toggle-${index}`}
                aria-expanded={isOpen}
                aria-controls={`fact-panel-${index}`}
                onClick={() => setOpenFact(isOpen ? null : index)}
              >
                <span>0{index + 1} / {fact.label}</span>
                <strong>{fact.value}</strong>
                <i>＋</i>
              </button>
              <div
                className="fact-panel"
                id={`fact-panel-${index}`}
                role="region"
                aria-labelledby={`fact-toggle-${index}`}
                aria-hidden={!isOpen}
              >
                <div>
                  <p>{fact.text}</p>
                </div>
              </div>
            </article>
            );
          })}
        </div>
      </section>

      <section
        className="scroll-story"
        id="scroll-story"
        ref={storyRef}
        data-chapter
        aria-label="Meine Interessen als Scroll-Geschichte"
      >
        <div className="story-sticky">
          <div className="story-chrome">
            <span>02 / INTERESSEN TOUR</span>
            <div className="story-dots" aria-label={`Kapitel ${storyIndex + 1} von 4`}>
              {interests.map((item, index) => (
                <i className={storyIndex === index ? "active" : ""} key={item.id}>
                  {item.number}
                </i>
              ))}
            </div>
            <span>VERTIKAL {textSymbols.down} / HORIZONTAL {textSymbols.right}</span>
          </div>

          <div className="story-track">
            {interests.map((item, index) => (
              <article className={`story-panel story-${item.color}`} key={item.id}>
                <div className="story-number" aria-hidden="true">{item.number}</div>
                <figure>
                  <img src={item.image} alt={item.imageAlt} />
                  <figcaption>{item.short}</figcaption>
                </figure>
                <div className="story-copy">
                  <span>KAPITEL {item.number} / 04</span>
                  <h2>{item.title}</h2>
                  <p>{item.text}</p>
                  <a href={`#${item.id}`}>
                    Karte entdecken <i className="text-arrow">{textSymbols.southEast}</i>
                  </a>
                </div>
                <div className="story-tags" aria-hidden="true">
                  {item.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
                <span className="story-count" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}—04
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="interests" id="interessen" data-chapter>
        <div className="section-head" data-reveal>
          <p className="eyebrow">03 / DEEP DIVE / 04 KARTEN</p>
          <h2>Klick rein.<br /><em>Dreh um.</em></h2>
          <p>Jede Karte hat eine Vorder- und Rückseite – genau wie die Interessen selbst.</p>
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
                <i className="text-arrow">{textSymbols.northEast}</i>
              </a>
            ))}
          </aside>

          <div className="interest-cards">
            {interests.map((item) => {
              const isFlipped = flipped.has(item.id);
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
                    onClick={() => {
                      setFlipped((current) => {
                        const next = new Set(current);
                        if (next.has(item.id)) {
                          next.delete(item.id);
                        } else {
                          next.add(item.id);
                        }
                        return next;
                      });
                    }}
                  >
                    <span className="flip-card-inner">
                      <span className="card-face card-front">
                        <span
                          className="card-photo"
                          style={{ "--card-image": `url("${item.image}")` } as React.CSSProperties}
                        >
                          <img src={item.image} alt={item.imageAlt} />
                        </span>
                        <span className="image-shade" />
                        <span className="card-top">
                          <span>ARCHIV / {item.number}</span>
                          <span className="card-icon">{item.icon}</span>
                        </span>
                        <span className="card-front-content">
                          <span>{item.kicker}</span>
                          <strong>{item.title}</strong>
                          <span className="flip-hint">UMDREHEN <i className="text-arrow">{textSymbols.rotate}</i></span>
                        </span>
                      </span>

                      <span className={`card-face card-back ${item.color}`}>
                        <span className="card-top">
                          <span>NOTIZ / {item.number}</span>
                          <span className="card-icon text-arrow">{textSymbols.rotate}</span>
                        </span>
                        <span className="card-back-content">
                          <span className="card-note">{item.note}</span>
                          <strong>{item.title}</strong>
                          <span className="card-description">{item.text}</span>
                          <span className="card-detail">{item.detail}</span>
                          <span className="interest-facts">
                            {item.facts.map((fact) => (
                              <span key={fact.label}>
                                <small>{fact.label}</small>
                                <strong>{fact.value}</strong>
                              </span>
                            ))}
                          </span>
                          <span className="tags">
                            {item.tags.map((tag) => <span key={tag}>{tag}</span>)}
                          </span>
                        </span>
                        <span className="card-decoration" aria-hidden="true">{item.number}</span>
                      </span>
                    </span>
                  </button>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="goal-section" id="ziele" data-chapter>
        <div className="goal-intro" data-reveal>
          <p className="eyebrow">04 / WAS JETZT ZÄHLT</p>
          <h2>Drei Ziele.<br /><em>Kein Stillstand.</em></h2>
          <p>
            Keine Bucket List für irgendwann – sondern die Richtung, in die ich
            mich gerade bewege.
          </p>
        </div>

        <div className="goal-board">
          {goals.map((goal) => (
            <article className="goal-note" key={goal.number} data-reveal>
              <span>{goal.number} / NEXT</span>
              <strong>{goal.title}</strong>
              <p>{goal.text}</p>
              <i className="text-arrow" aria-hidden="true">{textSymbols.northEast}</i>
            </article>
          ))}
        </div>

        <a
          className="instagram-card"
          href="https://www.instagram.com/b.j.1308"
          target="_blank"
          rel="noreferrer"
          data-reveal
          aria-label="Benjamin auf Instagram öffnen"
        >
          <span>KONTAKT / INSTAGRAM</span>
          <strong>@b.j.1308</strong>
          <i className="text-arrow">{textSymbols.northEast}</i>
        </a>
      </section>

      <section className="finale" id="next" data-chapter>
        <div className="finale-photo" data-reveal>
          <span className="tape tape-top" aria-hidden="true" />
          <img src="/images/meer-benjamin.webp" alt="Benjamin blickt mit seinem Surfboard aus dem Meer zurück" />
          <small>FORTSETZUNG FOLGT …</small>
        </div>
        <div className="finale-copy" data-reveal>
          <p className="eyebrow">05 / KEIN FERTIGES PROFIL</p>
          <h2>
            EHER EIN<br />
            <span>STARTPUNKT.</span>
          </h2>
          <p>Mehr lernen. Weiter reisen. Neue Ideen bauen. Und dabei neugierig bleiben.</p>
        </div>
        <div className="finale-marquee" aria-hidden="true">
          <div>SPORT / MUSIK / CODE / MEER / SPORT / MUSIK / CODE / MEER /</div>
        </div>
      </section>

      <footer>
        <a className="logo" href="#top">B/<span>18</span></a>
        <p>Benjamin · 18 · Always learning</p>
        <div>
          <a href="https://www.instagram.com/b.j.1308" target="_blank" rel="noreferrer">
            INSTAGRAM <span className="text-arrow">{textSymbols.northEast}</span>
          </a>
          <a href="#top">
            BACK TO TOP <span className="text-arrow">{textSymbols.up}</span>
          </a>
        </div>
      </footer>
    </main>
  );
}
