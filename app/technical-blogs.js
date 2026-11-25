"use client";

import { useEffect, useState } from "react";
import { withBasePath } from "./site-path";

const storageKey = "portfolio-technical-blogs";

function createBlog() {
  return {
    id: crypto.randomUUID(),
    title: "Untitled breakdown",
    category: "Engineering notes",
    readTime: "5 min read",
    headline: "What I learned from building this feature",
    intro: "A concise introduction to the technical problem, the constraints, and what this breakdown covers.",
    challengeTitle: "The challenge",
    challenge: "Explain the failure mode, user need, or technical constraint that started this work.",
    approachTitle: "The approach",
    approach: "Walk through the implementation choices, trade-offs, and tools that shaped the solution.",
    takeaway: "Share the outcome and the most useful lesson for someone solving a similar problem.",
  };
}

export default function TechnicalBlogs({ editable = true }) {
  const [blogs, setBlogs] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedBlogs = window.localStorage.getItem(storageKey);
      const parsedBlogs = savedBlogs ? JSON.parse(savedBlogs) : [];
      setBlogs(Array.isArray(parsedBlogs) ? parsedBlogs : []);
    } catch {
      setBlogs([]);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded || !editable) return;
    window.localStorage.setItem(storageKey, JSON.stringify(blogs));
  }, [editable, isLoaded, blogs]);

  function updateBlog(id, field, value) {
    setBlogs((currentBlogs) =>
      currentBlogs.map((blog) =>
        blog.id === id ? { ...blog, [field]: value } : blog,
      ),
    );
  }

  function removeBlog(id) {
    setBlogs((currentBlogs) => currentBlogs.filter((blog) => blog.id !== id));
  }

  if (!editable && (!isLoaded || blogs.length === 0)) {
    return null;
  }

  return (
    <section id="technical-blogs" className="blog-section">
      <div className="ux-section-heading">
        <div>
          <p className="eyebrow">03.2 / Writing</p>
          <h2 className="title">Technical Blogs <span className="holo-text">&amp; Breakdowns</span></h2>
        </div>
        {editable && (
          <button className="btn ux-add" type="button" onClick={() => setBlogs((items) => [...items, createBlog()])} disabled={!isLoaded}>
            <span aria-hidden="true">+</span> Add blog
          </button>
        )}
      </div>

      {blogs.length === 0 ? (
        <p className="ux-empty">No technical blogs yet.</p>
      ) : !editable ? (
        <>
          <div className="entry-preview-grid">
            {blogs.slice(0, 3).map((blog, index) => (
              <article className="glass entry-preview-card blog-preview-card" key={blog.id}>
                <div className="entry-preview-content">
                  <span>{String(index + 1).padStart(2, "0")} / {blog.category || "Engineering notes"}</span>
                  <h3>{blog.title}</h3>
                  <p>{blog.headline || "What I learned from building this feature"}</p>
                  <div className="blog-card-meta">
                    <span>{blog.readTime || "5 min read"}</span>
                    <a href={`/technical-blogs#${blog.id}`} className="entry-preview-link">Read breakdown <span aria-hidden="true">↗</span></a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </>
      ) : (
        <div className="blog-list">
          {blogs.map((blog, index) => (
            <article className="glass blog-item" key={blog.id}>
              <header className="ux-study-header">
                {editable ? (
                  <label className="ux-case-title">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <input
                      aria-label={`Blog ${index + 1} title`}
                      value={blog.title}
                      onChange={(event) => updateBlog(blog.id, "title", event.target.value)}
                    />
                  </label>
                ) : (
                  <div className="ux-case-title ux-case-title-readonly">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <h3>{blog.title}</h3>
                  </div>
                )}
                {editable && (
                  <button className="ux-remove" type="button" onClick={() => removeBlog(blog.id)} aria-label={`Remove ${blog.title}`}>
                    Remove
                  </button>
                )}
              </header>

              <div className={`blog-workbench${editable ? "" : " blog-workbench-readonly"}`}>
                {editable && (
                  <div className="ux-editor blog-editor">
                    <h3>Article content</h3>
                    <label>Category<input value={blog.category} onChange={(event) => updateBlog(blog.id, "category", event.target.value)} /></label>
                    <label>Reading time<input value={blog.readTime} onChange={(event) => updateBlog(blog.id, "readTime", event.target.value)} /></label>
                    <label>Article headline<textarea rows={2} value={blog.headline} onChange={(event) => updateBlog(blog.id, "headline", event.target.value)} /></label>
                    <label>Introduction<textarea rows={3} value={blog.intro} onChange={(event) => updateBlog(blog.id, "intro", event.target.value)} /></label>
                    <label>First section heading<input value={blog.challengeTitle} onChange={(event) => updateBlog(blog.id, "challengeTitle", event.target.value)} /></label>
                    <label>First section copy<textarea rows={3} value={blog.challenge} onChange={(event) => updateBlog(blog.id, "challenge", event.target.value)} /></label>
                    <label>Second section heading<input value={blog.approachTitle} onChange={(event) => updateBlog(blog.id, "approachTitle", event.target.value)} /></label>
                    <label>Second section copy<textarea rows={3} value={blog.approach} onChange={(event) => updateBlog(blog.id, "approach", event.target.value)} /></label>
                    <label>Key takeaway<textarea rows={3} value={blog.takeaway} onChange={(event) => updateBlog(blog.id, "takeaway", event.target.value)} /></label>
                  </div>
                )}

                <div className="blog-preview-wrap">
                  <div className="ux-preview-label">Live article preview</div>
                  <article className="blog-preview">
                    <header className="blog-preview-meta">
                      <span>{blog.category || "Engineering notes"}</span>
                      <span>{blog.readTime || "5 min read"}</span>
                    </header>
                    <div className="blog-preview-content">
                      <h3>{blog.headline || "Your article headline"}</h3>
                      <p className="blog-intro">{blog.intro || "Your introduction will appear here."}</p>
                      <section>
                        <h4>{blog.challengeTitle || "The challenge"}</h4>
                        <p>{blog.challenge || "Your first section will appear here."}</p>
                      </section>
                      <section>
                        <h4>{blog.approachTitle || "The approach"}</h4>
                        <p>{blog.approach || "Your second section will appear here."}</p>
                      </section>
                      <aside>
                        <span>Key takeaway</span>
                        <p>{blog.takeaway || "Your key takeaway will appear here."}</p>
                      </aside>
                    </div>
                  </article>
                </div>
              </div>
              {editable && <p className="ux-save-status" aria-live="polite">Saved in this browser</p>}
            </article>
          ))}
        </div>
      )}
      {blogs.length > 0 && (
        <div className="entry-preview-footer">
          <a className="btn" href={withBasePath("/technical-blogs/")}>View all technical blogs <span aria-hidden="true">→</span></a>
        </div>
      )}
    </section>
  );
}