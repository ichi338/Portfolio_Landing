"use client";

import { useEffect, useState } from "react";

export default function SkillsStacksSection({ initialLanguages, initialStacks, editable = true }) {
  const [languages, setLanguages] = useState(initialLanguages);
  const [stacks, setStacks] = useState(initialStacks);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedLanguages = window.localStorage.getItem("portfolio-languages");
      const savedStacks = window.localStorage.getItem("portfolio-framework-stacks");
      if (savedLanguages) {
        const parsedLanguages = JSON.parse(savedLanguages);
        if (Array.isArray(parsedLanguages)) setLanguages(parsedLanguages);
      }
      if (savedStacks) {
        const parsedStacks = JSON.parse(savedStacks);
        if (Array.isArray(parsedStacks)) setStacks(parsedStacks);
      }
    } catch {
      setLanguages(initialLanguages);
      setStacks(initialStacks);
    }
    setIsLoaded(true);
  }, [initialLanguages, initialStacks]);

  useEffect(() => {
    if (!isLoaded || !editable) return;
    window.localStorage.setItem("portfolio-languages", JSON.stringify(languages));
    window.localStorage.setItem("portfolio-framework-stacks", JSON.stringify(stacks));
  }, [editable, isLoaded, languages, stacks]);

  function updateLanguage(index, value) {
    setLanguages((items) => items.map((item, itemIndex) => itemIndex === index ? value : item));
  }

  function removeLanguage(index) {
    setLanguages((items) => items.filter((_, itemIndex) => itemIndex !== index));
  }

  function addLanguage() {
    setLanguages((items) => [...items, "New language"]);
  }

  function updateStackItem(groupIndex, itemIndex, value) {
    setStacks((groups) => groups.map((group, index) => index === groupIndex
      ? { ...group, items: group.items.map((item, currentIndex) => currentIndex === itemIndex ? value : item) }
      : group));
  }

  function removeStackItem(groupIndex, itemIndex) {
    setStacks((groups) => groups.map((group, index) => index === groupIndex
      ? { ...group, items: group.items.filter((_, currentIndex) => currentIndex !== itemIndex) }
      : group));
  }

  function addStackItem(groupIndex) {
    setStacks((groups) => groups.map((group, index) => index === groupIndex
      ? { ...group, items: [...group.items, "New item"] }
      : group));
  }

  return (
    <>
      <section id="languages">
        <div className="skills-section-heading">
          <div>
            <p className="eyebrow">01 / Languages</p>
            <h2 className="title">Languages I <span className="holo-text">speak in code</span></h2>
          </div>
          {editable && (
            <button className="btn ux-add" type="button" onClick={addLanguage} disabled={!isLoaded}>
              <span aria-hidden="true">+</span> Add language
            </button>
          )}
        </div>
        <div className="glass panel">
          <div className="chips">
            {languages.map((language, index) => (
              <span className="chip skill-chip" key={`language-${index}`}>
                {editable ? (
                  <>
                    <input
                      aria-label={`Language ${index + 1}`}
                      value={language}
                      onChange={(event) => updateLanguage(index, event.target.value)}
                      style={{ width: `${Math.max(language.length, 6)}ch` }}
                    />
                    <button type="button" aria-label={`Remove ${language || "language"}`} onClick={() => removeLanguage(index)}>×</button>
                  </>
                ) : language}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section id="frameworks">
        <p className="eyebrow">02 / Framework Stacks</p>
        <h2 className="title">Frameworks &amp; <span className="holo-text">stacks used</span></h2>
        <div className="cols">
          {stacks.map((group, groupIndex) => (
            <div className="glass panel" key={group.group}>
              <div className="skills-card-heading">
                <h3>{group.group}</h3>
                {editable && (
                  <button className="btn ux-add" type="button" onClick={() => addStackItem(groupIndex)} disabled={!isLoaded}>
                    <span aria-hidden="true">+</span> Add
                  </button>
                )}
              </div>
              <div className="chips">
                {group.items.map((item, itemIndex) => (
                  <span className="chip skill-chip" key={`${group.group}-${itemIndex}`}>
                    {editable ? (
                      <>
                        <input
                          aria-label={`${group.group} item ${itemIndex + 1}`}
                          value={item}
                          onChange={(event) => updateStackItem(groupIndex, itemIndex, event.target.value)}
                          style={{ width: `${Math.max(item.length, 6)}ch` }}
                        />
                        <button type="button" aria-label={`Remove ${item || "item"}`} onClick={() => removeStackItem(groupIndex, itemIndex)}>×</button>
                      </>
                    ) : item}
                  </span>
                ))}
                {group.items.length === 0 && !editable && <span className="skills-empty">No items listed</span>}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
