"use client";

import { useEffect, useState } from "react";
import UxCaseStudies from "./ux-case-studies";
import TechnicalBlogs from "./technical-blogs";
import ProjectsSection from "./projects-section";
import SkillsStacksSection from "./skills-stacks-section";

// ------------------------------------------------------------------
// EDIT THIS BLOCK: all of the portfolio's content lives here.
// ------------------------------------------------------------------
const profile = {
  name: "Your Name",
  year: "Incoming 4th Year BSIT",
  role: "UI/UX Developer | Graphic Designer | Aspiring SOC Analyst",
  blurb:
    "An incoming 4th-year IT student blending formal UI/UX design and graphic design direction with solid foundations in networking and cybersecurity. I build digital products that are engaging to use and secure by design. Currently looking for an internship where I can learn from a team and ship real features.",
  email: "hello@yourdomain.com",
  facebook: "https://facebook.com/your-handle",
  facebookHandle: "@your-handle",
  linkedin: "https://www.linkedin.com/in/your-handle",
  linkedinHandle: "/in/your-handle",
  github: "https://github.com/your-username",
};

const languages = ["JavaScript", "TypeScript", "Python", "PHP", "Java", "SQL", "HTML", "CSS"];

const frameworks = [
  { group: "Frontend", items: ["Next.js", "React", "Tailwind CSS", "Bootstrap"] },
  { group: "Backend", items: ["Node.js", "Express", "Laravel", "Django"] },
  { group: "Database & Tools", items: ["MySQL", "PostgreSQL", "MongoDB", "Git", "Figma"] },
  { group: "UI/UX & Design", items: ["Wireframing", "Prototyping", "Design Systems"] },
  { group: "Project Management", items: ["Task Planning", "Documentation"] },
];

const projects = [
  {
    id: "barangaylink",
    name: "BarangayLink",
    problem: "Reducing long queues for barangay document requests",
    thumb: "/projects/barangaylink.svg",
    stack: ["Next.js", "PostgreSQL", "Tailwind"],
    github: "https://github.com/your-username/barangaylink",
  },
  {
    id: "enrollease",
    name: "EnrollEase",
    problem: "Simplifying manual student enrollment and record keeping",
    thumb: "/projects/enrollease.svg",
    stack: ["Laravel", "MySQL", "Bootstrap"],
    github: "https://github.com/your-username/enrollease",
  },
  {
    id: "stocksense",
    name: "StockSense",
    problem: "Preventing stock-outs in small retail stores",
    thumb: "/projects/stocksense.svg",
    stack: ["React", "Node.js", "MongoDB"],
    github: "https://github.com/your-username/stocksense",
  },
  {
    id: "studybuddy",
    name: "StudyBuddy",
    problem: "Helping students stay organized with deadlines and study sessions",
    thumb: "/projects/studybuddy.svg",
    stack: ["Next.js", "TypeScript", "Supabase"],
    github: "https://github.com/your-username/studybuddy",
  },
];

const education = [
  {
    when: "2023 - Present",
    what: "Bachelor of Science in Information Technology",
    where: "Your University, City",
  },
  {
    when: "2021 - 2023",
    what: "Senior High School, TVL / ICT Strand",
    where: "Your Senior High School, City",
  },
];

const achievements = [
  { when: "2025", what: "Dean's Lister", where: "College of Computer Studies" },
  { when: "2025", what: "Hackathon Finalist", where: "Regional Collegiate Hackathon" },
  { when: "2024", what: "Best Capstone Proposal (Section)", where: "Systems Analysis & Design" },
];

const experiences = [
  {
    when: "2025 - Present",
    role: "Public Relations and Graphic Design Officer",
    organization: "Student Organization Name",
    tasks: [
      "Created campaign graphics and visual materials for organization-wide announcements.",
      "Coordinated publication schedules and supported public-facing communication efforts.",
      "Worked with the team to maintain consistent branding across digital and print materials.",
    ],
  },
  {
    when: "2024 - 2025",
    role: "Graphic Design Committee Member",
    organization: "Student Organization Name",
    tasks: [
      "Designed social media graphics for events, activities, and organization updates.",
      "Collaborated with committee members to prepare layouts and production-ready assets.",
      "Helped document activities and organize design files for future use.",
    ],
  },
];

// ------------------------------------------------------------------

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 .5A11.5 11.5 0 0 0 .5 12c0 5.08 3.29 9.38 7.86 10.9.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 2.75.11 3.04.74.81 1.19 1.83 1.19 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  );
}

function withEntryIds(items, prefix) {
  return items.map((item, index) => ({ ...item, id: item.id || `${prefix}-${index}` }));
}

function Timeline({ items, editable, editingId, onEdit, onUpdate, onRemove }) {
  return (
    <ul className="timeline">
      {items.map((item, index) => {
        const isEditing = editingId === item.id;

        return (
          <li key={item.id || `${item.what}-${index}`}>
            {isEditing ? (
              <div className="entry-editor">
                <label>Period<input value={item.when} onChange={(event) => onUpdate(item.id, "when", event.target.value)} /></label>
                <label>Title<input value={item.what} onChange={(event) => onUpdate(item.id, "what", event.target.value)} /></label>
                <label>Organization or institution<input value={item.where} onChange={(event) => onUpdate(item.id, "where", event.target.value)} /></label>
              </div>
            ) : (
              <>
                <div className="when">{item.when}</div>
                <div className="what">{item.what}</div>
                <div className="where">{item.where}</div>
              </>
            )}
            {editable && (
              <div className="entry-actions">
                <button type="button" onClick={() => onEdit(isEditing ? null : item.id)}>{isEditing ? "Done" : "Edit"}</button>
                <button type="button" onClick={() => onRemove(item.id)}>Remove</button>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

function ExperienceList({ items, editable, editingId, onEdit, onUpdate, onRemove }) {
  return (
    <div className="experience-list">
      {items.map((item, index) => {
        const isEditing = editingId === item.id;

        return (
          <article className="experience-item" key={item.id || `${item.role}-${index}`}>
            <div className="experience-timeline-marker" aria-hidden="true" />
            <div className="experience-content">
              {isEditing ? (
                <div className="entry-editor">
                  <label>Period<input value={item.when} onChange={(event) => onUpdate(item.id, "when", event.target.value)} /></label>
                  <label>Role<input value={item.role} onChange={(event) => onUpdate(item.id, "role", event.target.value)} /></label>
                  <label>Organization<input value={item.organization} onChange={(event) => onUpdate(item.id, "organization", event.target.value)} /></label>
                  <label>Responsibilities, one per line<textarea rows={4} value={item.tasks.join("\n")} onChange={(event) => onUpdate(item.id, "tasks", event.target.value.split("\n"))} /></label>
                </div>
              ) : (
                <>
                  <span className="experience-date">{item.when}</span>
                  <h4>{item.role}</h4>
                  <p className="experience-organization">{item.organization}</p>
                  <ul>
                    {item.tasks.filter(Boolean).map((task, taskIndex) => (
                      <li key={`${item.id}-${taskIndex}`}>{task}</li>
                    ))}
                  </ul>
                </>
              )}
              {editable && (
                <div className="entry-actions">
                  <button type="button" onClick={() => onEdit(isEditing ? null : item.id)}>{isEditing ? "Done" : "Edit"}</button>
                  <button type="button" onClick={() => onRemove(item.id)}>Remove</button>
                </div>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default function Home() {
  const canEditUxStudies = process.env.VERCEL !== "1" && !process.env.RENDER;
  const [isDark, setIsDark] = useState(false);
  const [themeLoaded, setThemeLoaded] = useState(false);
  const [educationItems, setEducationItems] = useState(() => withEntryIds(education, "education"));
  const [achievementItems, setAchievementItems] = useState(() => withEntryIds(achievements, "achievement"));
  const [experienceItems, setExperienceItems] = useState(() => withEntryIds(experiences, "experience"));
  const [listsLoaded, setListsLoaded] = useState(false);
  const [editingEntryId, setEditingEntryId] = useState(null);
  const [previewMode, setPreviewMode] = useState(false);
  const isEditable = canEditUxStudies && !previewMode;

  useEffect(() => {
    setPreviewMode(window.localStorage.getItem("portfolio-preview-mode") === "true");
  }, []);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("portfolio-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDark(savedTheme ? savedTheme === "dark" : prefersDark);
    setThemeLoaded(true);
  }, []);

  useEffect(() => {
    if (!themeLoaded) return;
    const theme = isDark ? "dark" : "light";
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("portfolio-theme", theme);
  }, [isDark, themeLoaded]);

  useEffect(() => {
    const storedLists = [
      ["portfolio-education", setEducationItems, education, "education"],
      ["portfolio-achievements", setAchievementItems, achievements, "achievement"],
      ["portfolio-experiences", setExperienceItems, experiences, "experience"],
    ];

    for (const [key, setter, fallback, prefix] of storedLists) {
      try {
        const stored = window.localStorage.getItem(key);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) setter(withEntryIds(parsed, prefix));
        } else {
          setter(withEntryIds(fallback, prefix));
        }
      } catch {
        setter(withEntryIds(fallback, prefix));
      }
    }
    setListsLoaded(true);
  }, []);

  useEffect(() => {
    if (!listsLoaded || !canEditUxStudies) return;
    window.localStorage.setItem("portfolio-education", JSON.stringify(educationItems));
    window.localStorage.setItem("portfolio-achievements", JSON.stringify(achievementItems));
    window.localStorage.setItem("portfolio-experiences", JSON.stringify(experienceItems));
  }, [achievementItems, canEditUxStudies, educationItems, experienceItems, listsLoaded]);

  function updateListItem(setter, id, field, value) {
    setter((items) => items.map((item) => item.id === id ? { ...item, [field]: value } : item));
  }

  function removeListItem(setter, id) {
    setter((items) => items.filter((item) => item.id !== id));
    setEditingEntryId(null);
  }

  function addEducationItem() {
    const item = { id: crypto.randomUUID(), when: "", what: "New education entry", where: "" };
    setEducationItems((items) => [...items, item]);
    setEditingEntryId(item.id);
  }

  function addAchievementItem() {
    const item = { id: crypto.randomUUID(), when: "", what: "New achievement", where: "" };
    setAchievementItems((items) => [...items, item]);
    setEditingEntryId(item.id);
  }

  function addExperienceItem() {
    const item = {
      id: crypto.randomUUID(),
      when: "",
      role: "New experience",
      organization: "",
      tasks: ["Add a responsibility"],
    };
    setExperienceItems((items) => [...items, item]);
    setEditingEntryId(item.id);
  }

  return (
    <>
      <div className="backdrop" aria-hidden="true">
        <div className="orb o1" />
        <div className="orb o2" />
        <div className="orb o3" />
        <div className="orb o4" />
        <div className="grid-lines" />
      </div>

      <div className="floating-petals" aria-hidden="true">
        {[
          [7, -2, 24, 22, -18], [16, -11, 29, 17, 24], [25, -7, 21, 26, -26],
          [34, -15, 27, 19, 20], [43, -4, 31, 21, -22], [52, -18, 23, 28, 18],
          [61, -9, 26, 24, -28], [69, -14, 30, 20, 24], [78, -3, 22, 27, -16],
          [87, -16, 28, 18, 22], [94, -8, 24, 25, -20], [12, -20, 32, 15, 26],
          [37, -22, 20, 30, -24], [56, -26, 29, 16, 20], [73, -19, 25, 29, -18],
          [91, -24, 31, 17, 16],
        ].map(([left, delay, duration, size, drift], index) => (
          <span
            className={`floating-petal floating-petal-${(index % 3) + 1}`}
            style={{
              "--petal-left": `${left}%`,
              "--petal-delay": `${delay}s`,
              "--petal-duration": `${duration}s`,
              "--petal-size": `${size}px`,
              "--petal-drift": `${drift}px`,
            }}
            key={index}
          />
        ))}
      </div>

      <div className="pink-fireflies" aria-hidden="true">
        {[
          [12, 18, 1.2, 13.5], [29, 72, 5.8, 15.2], [48, 38, 9.4, 12.8],
          [67, 84, 3.6, 16.1], [84, 27, 7.1, 14.4], [92, 62, 11.3, 15.6],
        ].map(([left, top, delay, duration], index) => (
          <span
            className="pink-firefly"
            style={{
              "--firefly-left": `${left}%`,
              "--firefly-top": `${top}%`,
              "--firefly-delay": `${delay}s`,
              "--firefly-duration": `${duration}s`,
            }}
            key={index}
          />
        ))}
      </div>

      <nav className="nav glass" aria-label="Primary">
        <span className="logo holo-text">{profile.name}</span>
        <div className="nav-actions">
          <ul>
            <li><a href="#intro">Intro</a></li>
            <li><a href="#languages">Languages</a></li>
            <li><a href="#frameworks">Frameworks</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#ux-case-studies">UX Studies</a></li>
            <li><a href="#education">Education</a></li>
          </ul>
          {canEditUxStudies && (
            <button
              className="preview-toggle"
              type="button"
              role="switch"
              aria-checked={previewMode}
              aria-label={previewMode ? "Exit deployed preview" : "Preview deployed site"}
              title={previewMode ? "Exit deployed preview" : "Preview deployed site"}
              onClick={() => {
                setPreviewMode((current) => {
                  const next = !current;
                  window.localStorage.setItem("portfolio-preview-mode", String(next));
                  return next;
                });
              }}
            >
              <span aria-hidden="true">{previewMode ? "←" : "◉"}</span>
              <span>{previewMode ? "Exit preview" : "Preview"}</span>
            </button>
          )}
          <button
            className="theme-toggle"
            type="button"
            role="switch"
            aria-checked={isDark}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            title={isDark ? "Light mode" : "Dark mode"}
            onClick={() => setIsDark((current) => !current)}
          >
            <span className="theme-toggle-icon" aria-hidden="true">
              {isDark ? "\u263E" : "\u2600"}
            </span>
          </button>
        </div>
      </nav>

      <main className="wrap">
        {/* 1. Introduction */}
        <section id="intro" className="hero">
          <div className="glass hero-card">
            <span className="hello">Hello, I&apos;m</span>
            <h1 className="holo-text">{profile.name}</h1>
            <p className="role">{profile.role}</p>
            <p className="lead">{profile.blurb}</p>
            <div className="badges">
              <span className="pill"><span className="dot" />{profile.year}</span>
              <span className="pill"><span className="dot" />Open to internships</span>
            </div>
          </div>
        </section>

        <SkillsStacksSection initialLanguages={languages} initialStacks={frameworks} editable={isEditable} />

        <ProjectsSection initialProjects={projects} editable={isEditable} />

        <UxCaseStudies editable={isEditable} />
        <TechnicalBlogs editable={isEditable} />

        {/* 5. Education and achievements */}
        <section id="education">
          <p className="eyebrow">04 / Education &amp; Achievements</p>
          <h2 className="title">Where I&apos;ve <span className="holo-text">learned &amp; leveled up</span></h2>
          <div className="cols">
            <div className="glass panel">
              <div className="editable-panel-heading">
                <h3>Education</h3>
                {isEditable && <button className="btn ux-add" type="button" onClick={addEducationItem} disabled={!listsLoaded}>+ Add</button>}
              </div>
              <Timeline
                items={educationItems}
                editable={isEditable}
                editingId={editingEntryId}
                onEdit={setEditingEntryId}
                onUpdate={(id, field, value) => updateListItem(setEducationItems, id, field, value)}
                onRemove={(id) => removeListItem(setEducationItems, id)}
              />
            </div>
            <div className="glass panel">
              <div className="editable-panel-heading">
                <h3>Achievements</h3>
                {isEditable && <button className="btn ux-add" type="button" onClick={addAchievementItem} disabled={!listsLoaded}>+ Add</button>}
              </div>
              <Timeline
                items={achievementItems}
                editable={isEditable}
                editingId={editingEntryId}
                onEdit={setEditingEntryId}
                onUpdate={(id, field, value) => updateListItem(setAchievementItems, id, field, value)}
                onRemove={(id) => removeListItem(setAchievementItems, id)}
              />
            </div>
          </div>
          <div className="glass panel experience-panel">
            <div className="editable-panel-heading">
              <h3>Experiences</h3>
              {isEditable && <button className="btn ux-add" type="button" onClick={addExperienceItem} disabled={!listsLoaded}>+ Add</button>}
            </div>
            <ExperienceList
              items={experienceItems}
              editable={isEditable}
              editingId={editingEntryId}
              onEdit={setEditingEntryId}
              onUpdate={(id, field, value) => updateListItem(setExperienceItems, id, field, value)}
              onRemove={(id) => removeListItem(setExperienceItems, id)}
            />
          </div>
        </section>
      </main>

      <footer className="site-footer" id="contact">
        <div className="footer-field" aria-hidden="true">
          {[18, 31, 44, 57, 70, 83, 94].map((left, index) => (
            <span
              className={`footer-flower footer-flower-${(index % 3) + 1}`}
              style={{ "--flower-left": `${left}%`, "--flower-delay": `${index * -0.7}s` }}
              key={left}
            />
          ))}
        </div>
        <div className="footer-inner">
          <div className="footer-message">
            <p className="footer-kicker">Have an idea in mind?</p>
            <h2>Good ideas get better when we build them together.</h2>
            <a className="footer-email" href={`mailto:${profile.email}`}>{profile.email}</a>
          </div>
          <div className="footer-socials">
            <p className="footer-kicker">Find me around the web</p>
            <a href={profile.facebook} target="_blank" rel="noopener noreferrer">
              <span>Facebook</span><span>{profile.facebookHandle}</span>
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
              <span>LinkedIn</span><span>{profile.linkedinHandle}</span>
            </a>
            <a href={profile.github} target="_blank" rel="noopener noreferrer">
              <span>GitHub</span><span>your-username</span>
            </a>
          </div>
          <div className="footer-meta">
            <span>&copy; {new Date().getFullYear()} {profile.name}</span>
            <span>Built with Next.js</span>
          </div>
        </div>
      </footer>
    </>
  );
}
