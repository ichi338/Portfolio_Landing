"use client";

import { useEffect, useState } from "react";

const storageKey = "portfolio-technical-blogs";

export default function AllTechnicalBlogs() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    try {
      const saved = JSON.parse(window.localStorage.getItem(storageKey) || "[]");
      setBlogs(Array.isArray(saved) ? saved : []);
    } catch {
      setBlogs([]);
    }
  }, []);

  return (
    <main className="wrap">
      <section>
        <nav className="entry-page-toolbar glass" aria-label="Page navigation">
          <a className="entry-page-back" href="/"><span aria-hidden="true">←</span> Portfolio</a>
        </nav>
        <header className="entry-page-intro glass">
          <p className="hello">03.2 / Writing</p>
          <h1 className="holo-text">Technical Blogs &amp; Breakdowns</h1>
          <p className="lead">Engineering notes and practical breakdowns covering implementation choices, technical challenges, and lessons learned.</p>
        </header>

        {blogs.length === 0 ? (
          <p className="ux-empty">No technical blogs yet.</p>
        ) : (
          <div className="entry-page-list">
            {blogs.map((blog, index) => (
              <article className="glass entry-page-card blog-preview-card" id={blog.id} key={blog.id}>
                <div className="entry-preview-content">
                  <span>{String(index + 1).padStart(2, "0")} / {blog.category || "Engineering notes"}</span>
                  <h2>{blog.title}</h2>
                  <h3>{blog.headline || "What I learned from building this feature"}</h3>
                  <p>{blog.intro || "A concise introduction to the technical problem and what this breakdown covers."}</p>
                  <div className="blog-card-meta">
                    <span>{blog.readTime || "5 min read"}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
