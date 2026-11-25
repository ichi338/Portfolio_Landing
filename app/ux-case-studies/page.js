"use client";

import { useEffect, useState } from "react";

const storageKey = "portfolio-ux-case-studies";

export default function AllUxCaseStudies() {
  const [studies, setStudies] = useState([]);

  useEffect(() => {
    try {
      const saved = JSON.parse(window.localStorage.getItem(storageKey) || "[]");
      setStudies(Array.isArray(saved) ? saved : []);
    } catch {
      setStudies([]);
    }
  }, []);

  return (
    <main className="wrap">
      <section>
        <nav className="entry-page-toolbar glass" aria-label="Page navigation">
          <a className="entry-page-back" href="/"><span aria-hidden="true">←</span> Portfolio</a>
        </nav>
        <header className="entry-page-intro glass">
          <p className="hello">03.1 / Design work</p>
          <h1 className="holo-text">UX Case Studies</h1>
          <p className="lead">A collection of product design work, process notes, and experience decisions from research through final interface.</p>
        </header>

        {studies.length === 0 ? (
          <p className="ux-empty">No UX case studies yet.</p>
        ) : (
          <div className="entry-page-list">
            {studies.map((study, index) => (
              <article className="glass entry-page-card" id={study.id} key={study.id}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={study.thumb || "/projects/barangaylink.svg"} alt={`${study.title} thumbnail`} />
                <div className="entry-preview-content">
                  <span>{String(index + 1).padStart(2, "0")} / {study.brand || "Studio name"}</span>
                  <h2>{study.title}</h2>
                  <h3>{study.headline || "Designing a clearer experience"}</h3>
                  <p>{study.intro || "A short introduction to the product, its audience, and the opportunity."}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
