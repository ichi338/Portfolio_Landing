"use client";

import { useEffect, useState } from "react";

const storageKey = "portfolio-ux-case-studies";

function createStudy() {
  return {
    id: crypto.randomUUID(),
    title: "Untitled case study",
    brand: "Studio name",
    thumb: "/projects/barangaylink.svg",
    headline: "Designing a clearer experience",
    intro: "A short introduction to the product, its audience, and the opportunity.",
    action: "Explore the project",
    sectionHeading: "The challenge",
    sectionCopy: "Describe the user need and the design decision that shaped this experience.",
  };
}

export default function UxCaseStudies({ editable = true }) {
  const [studies, setStudies] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedStudies = window.localStorage.getItem(storageKey);
      const parsedStudies = savedStudies ? JSON.parse(savedStudies) : [];
      setStudies(Array.isArray(parsedStudies) ? parsedStudies : []);
    } catch {
      setStudies([]);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded || !editable) return;
    window.localStorage.setItem(storageKey, JSON.stringify(studies));
  }, [editable, isLoaded, studies]);

  function updateStudy(id, field, value) {
    setStudies((currentStudies) =>
      currentStudies.map((study) =>
        study.id === id ? { ...study, [field]: value } : study,
      ),
    );
  }

  function removeStudy(id) {
    setStudies((currentStudies) => currentStudies.filter((study) => study.id !== id));
  }

  if (!editable && (!isLoaded || studies.length === 0)) {
    return null;
  }

  return (
    <section id="ux-case-studies" className="ux-section">
      <div className="ux-section-heading">
        <div>
          <p className="eyebrow">03.1 / Design work</p>
          <h2 className="title">UX <span className="holo-text">Case Studies</span></h2>
        </div>
        {editable && (
          <button className="btn ux-add" type="button" onClick={() => setStudies((items) => [...items, createStudy()])} disabled={!isLoaded}>
            <span aria-hidden="true">+</span> Add case study
          </button>
        )}
      </div>

      {studies.length === 0 ? (
        <p className="ux-empty">No UX case studies yet.</p>
      ) : !editable ? (
        <>
          <div className="entry-preview-grid">
            {studies.slice(0, 3).map((study, index) => (
              <article className="glass entry-preview-card" key={study.id}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={study.thumb || "/projects/barangaylink.svg"} alt={`${study.title} thumbnail`} />
                <div className="entry-preview-content">
                  <span>{String(index + 1).padStart(2, "0")} / {study.brand || "Studio name"}</span>
                  <h3>{study.title}</h3>
                  <p>{study.headline || "Designing a clearer experience"}</p>
                  <a href={`/ux-case-studies#${study.id}`} className="entry-preview-link">
                    {study.action || "Explore the project"} <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </>
      ) : (
        <div className="ux-study-list">
          {studies.map((study, index) => (
            <article className="glass ux-study" key={study.id}>
              <header className="ux-study-header">
                {editable ? (
                  <label className="ux-case-title">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <input
                      aria-label={`Case study ${index + 1} title`}
                      value={study.title}
                      onChange={(event) => updateStudy(study.id, "title", event.target.value)}
                    />
                  </label>
                ) : (
                  <div className="ux-case-title ux-case-title-readonly">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <h3>{study.title}</h3>
                  </div>
                )}
                {editable && (
                  <button className="ux-remove" type="button" onClick={() => removeStudy(study.id)} aria-label={`Remove ${study.title}`}>
                    Remove
                  </button>
                )}
              </header>

              <div className={`ux-workbench${editable ? "" : " ux-workbench-readonly"}`}>
                {editable && (
                  <div className="ux-editor">
                    <h3>Template content</h3>
                    <label>
                      Brand
                      <input value={study.brand} onChange={(event) => updateStudy(study.id, "brand", event.target.value)} />
                    </label>
                    <label>
                      Thumbnail URL
                      <input value={study.thumb || "/projects/barangaylink.svg"} onChange={(event) => updateStudy(study.id, "thumb", event.target.value)} />
                    </label>
                    <label>
                      Page headline
                      <textarea rows={2} value={study.headline} onChange={(event) => updateStudy(study.id, "headline", event.target.value)} />
                    </label>
                    <label>
                      Introduction
                      <textarea rows={3} value={study.intro} onChange={(event) => updateStudy(study.id, "intro", event.target.value)} />
                    </label>
                    <label>
                      Action label
                      <input value={study.action} onChange={(event) => updateStudy(study.id, "action", event.target.value)} />
                    </label>
                    <label>
                      Section heading
                      <input value={study.sectionHeading} onChange={(event) => updateStudy(study.id, "sectionHeading", event.target.value)} />
                    </label>
                    <label>
                      Section copy
                      <textarea rows={3} value={study.sectionCopy} onChange={(event) => updateStudy(study.id, "sectionCopy", event.target.value)} />
                    </label>
                  </div>
                )}

                <div className="ux-preview-wrap">
                  <div className="ux-preview-label">Live page preview</div>
                  <div className="ux-preview">
                    <div className="ux-preview-nav">
                      <span>{study.brand || "Studio name"}</span>
                      <span>Work&nbsp;&nbsp; About</span>
                    </div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className="ux-preview-thumb" src={study.thumb || "/projects/barangaylink.svg"} alt={`${study.title} thumbnail`} />
                    <div className="ux-preview-hero">
                      <p>Selected work · 2025</p>
                      <h3>{study.headline || "Your project headline"}</h3>
                      <p>{study.intro || "Your introduction will appear here."}</p>
                      <span className="ux-preview-action">{study.action || "Explore the project"} <span aria-hidden="true">↗</span></span>
                    </div>
                    <div className="ux-preview-story">
                      <span>01 / Overview</span>
                      <h4>{study.sectionHeading || "The challenge"}</h4>
                      <p>{study.sectionCopy || "Your case study details will appear here."}</p>
                    </div>
                  </div>
                </div>
              </div>
              {editable && <p className="ux-save-status" aria-live="polite">Saved in this browser</p>}
            </article>
          ))}
        </div>
      )}
      {studies.length > 0 && (
        <div className="entry-preview-footer">
          <a className="btn" href="/ux-case-studies">View all UX case studies <span aria-hidden="true">→</span></a>
        </div>
      )}
    </section>
  );
}