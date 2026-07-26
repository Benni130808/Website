"use client";

import { useEffect, useRef, useState } from "react";

const interests = [
  {
    id: "sport",
    number: "01",
    title: "Sport",
    kicker: "Bewegen. Wachsen. Dranbleiben.",
    text: "Ob auf dem Court, dem Fußballplatz oder im Gym – Sport ist für mich mehr als Bewegung. Er zeigt mir, was mit Fokus und Disziplin möglich ist.",
    tags: ["Tennis", "Fußball", "Gym"],
    icon: "↗",
    color: "lime",
  },
  {
    id: "musik",
    number: "02",
    title: "Musik",
    kicker: "Gefühl wird zu Sound.",
    text: "Mit der Gitarre verliere ich jedes Zeitgefühl. Gerade bringe ich mir außerdem Klavier bei – Taste für Taste, Song für Song.",
    tags: ["Gitarre", "Klavier", "Vibes"],
    icon: "♫",
    color: "coral",
  },
  {
    id: "code",
    number: "03",
    title: "Coding",
    kicker: "Ideen werden echt.",
    text: "Ich stehe noch am Anfang, aber genau das macht es spannend: Neues lernen, Fehler knacken und irgendwann Projekte bauen, die vorher nur im Kopf existiert haben.",
    tags: ["Lernen", "Bauen", "Entdecken"],
    icon: "{ }",
    color: "blue",
  },
  {
    id: "meer",
    number: "04",
    title: "Meer",
    kicker: "Draußen ist mein Lieblingsort.",
    text: "Reisen bedeutet Freiheit. Am liebsten bin ich dort, wo das Meer beginnt – beim Surfen auf der Welle, beim Tauchen darunter oder einfach mit Sand unter den Füßen.",
    tags: ["Reisen", "Surfen", "Tauchen"],
    icon: "≈",
    color: "aqua",
  },
];

function WaveLines() {
  return (
    <div className="wave-lines" aria-hidden="true">
      <span />
      <span />
      <span />
      <span />
      <span />
    </div>
  );
}

export default function Home() {
  const [active, setActive] = useState("sport");
  const [mouse, setMouse] = useState({ x: 50, y: 50 });
  const cardRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-25% 0px -45%", threshold: [0.15, 0.5] },
    );
    Object.values(cardRefs.current).forEach((node) => node && observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const handlePointer = (event: React.PointerEvent<HTMLElement>) => {
    setMouse({
      x: (event.clientX / window.innerWidth) * 100,
      y: (event.clientY / window.innerHeight) * 100,
    });
  };

  return (
    <main
      onPointerMove={handlePointer}
      style={{ "--mx": `${mouse.x}%`, "--my": `${mouse.y}%` } as React.CSSProperties}
    >
      <header className="nav">
        <a className="logo" href="#top" aria-label="Zurück zum Anfang">
          B<span>.</span>
        </a>
        <nav aria-label="Hauptnavigation">
          <a href="#about">Über mich</a>
          <a href="#interessen">Interessen</a>
        </nav>
        <a className="nav-pill" href="#interessen">
          Entdecken <span>↓</span>
        </a>
      </header>

      <section className="hero" id="top">
        <div className="cursor-glow" aria-hidden="true" />
        <div className="hero-orbit orbit-one" aria-hidden="true">
          <span>18</span>
        </div>
        <div className="hero-orbit orbit-two" aria-hidden="true">
          <span>BER</span>
        </div>

        <p className="eyebrow reveal">HEY, ICH BIN</p>
        <h1 className="hero-title">
          <span>BENJA</span>
          <span className="outline">MIN.</span>
        </h1>
        <div className="hero-bottom reveal">
          <p>
            <strong>18 Jahre.</strong> Immer in Bewegung,
            <br />
            immer auf der Suche nach dem nächsten Level.
          </p>
          <div className="scroll-cue">
            <span>SCROLL TO EXPLORE</span>
            <i>↓</i>
          </div>
        </div>
        <WaveLines />
      </section>

      <section className="manifesto" id="about">
        <div className="manifesto-label">
          <span>MEIN MINDSET</span>
          <i />
        </div>
        <p className="manifesto-copy">
          Ich probiere aus, bleibe dran und lerne jeden Tag etwas Neues.
          <span> Nicht perfekt sein – besser werden.</span>
        </p>
        <div className="sticker sticker-one">STAY<br />CURIOUS</div>
        <div className="sticker sticker-two">★</div>
      </section>

      <section className="interests" id="interessen">
        <div className="section-head">
          <p className="eyebrow">WAS MICH ANTREIBT</p>
          <h2>Meine <em>Welten</em></h2>
          <p>Vier Interessen. Unendlich viele Möglichkeiten.</p>
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
            {interests.map((item) => (
              <article
                key={item.id}
                id={item.id}
                className={`interest-card ${item.color}`}
                ref={(node) => {
                  cardRefs.current[item.id] = node;
                }}
              >
                <div className="card-top">
                  <span>{item.number} / 04</span>
                  <div className="card-icon">{item.icon}</div>
                </div>
                <div className="card-content">
                  <p>{item.kicker}</p>
                  <h3>{item.title}</h3>
                  <div className="card-copy">
                    <p>{item.text}</p>
                    <div className="tags">
                      {item.tags.map((tag) => <span key={tag}>{tag}</span>)}
                    </div>
                  </div>
                </div>
                <div className="card-decoration" aria-hidden="true" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="finale">
        <p className="eyebrow">UND DAS IST ERST DER ANFANG</p>
        <h2>
          LET&apos;S SEE<br />
          WHAT&apos;S <span>NEXT.</span>
        </h2>
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
