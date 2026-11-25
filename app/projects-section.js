"use client";

import { useEffect, useRef, useState } from "react";
import { withBasePath } from "./site-path";

const storageKey = "portfolio-projects";
const designStorageKey = "portfolio-design-in-practice";

function createProject() {
  return {
    id: crypto.randomUUID(),
    name: "Untitled project",
    problem: "Describe the problem this project solves",
    thumb: "/projects/barangaylink.svg",
    stack: [],
    github: "",
  };
}

export default function ProjectsSection({ initialProjects, editable = true }) {
  const [projects, setProjects] = useState(initialProjects);
  const [isLoaded, setIsLoaded] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [designImages, setDesignImages] = useState([]);
  const [designLoaded, setDesignLoaded] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");
  const designInputRef = useRef(null);

  useEffect(() => {
    try {
      const savedProjects = window.localStorage.getItem(storageKey);
      if (savedProjects) {
        const parsedProjects = JSON.parse(savedProjects);
        if (Array.isArray(parsedProjects)) setProjects(parsedProjects);
      }
    } catch {
      setProjects(initialProjects);
    }
    setIsLoaded(true);
  }, [initialProjects]);

  useEffect(() => {
    if (!isLoaded || !editable) return;
    window.localStorage.setItem(storageKey, JSON.stringify(projects));
  }, [editable, isLoaded, projects]);

  useEffect(() => {
    try {
      const savedImages = window.localStorage.getItem(designStorageKey);
      if (savedImages) {
        const parsedImages = JSON.parse(savedImages);
        if (Array.isArray(parsedImages)) setDesignImages(parsedImages);
      }
    } catch {
      setDesignImages([]);
    }
    setDesignLoaded(true);
  }, []);

  useEffect(() => {
    if (!designLoaded || !editable) return;
    try {
      window.localStorage.setItem(designStorageKey, JSON.stringify(designImages));
    } catch {
      setUploadStatus("This image is too large to save in this browser.");
    }
  }, [designImages, editable, designLoaded]);

  function updateProject(id, field, value) {
    setProjects((currentProjects) =>
      currentProjects.map((project) =>
        project.id === id ? { ...project, [field]: value } : project,
      ),
    );
  }

  function removeProject(id) {
    setProjects((currentProjects) => currentProjects.filter((project) => project.id !== id));
    setEditingId(null);
  }

  function addProject() {
    const newProject = createProject();
    setProjects((currentProjects) => [...currentProjects, newProject]);
    setEditingId(newProject.id);
  }

  function addDesignImage(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setUploadStatus("Please choose an image file.");
      event.target.value = "";
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setUploadStatus("Please choose an image smaller than 2 MB.");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setDesignImages((currentImages) => [
        ...currentImages,
        { id: crypto.randomUUID(), src: String(reader.result), name: file.name },
      ]);
      setUploadStatus("Image added to Design in Practice.");
    };
    reader.readAsDataURL(file);
  }

  return (
    <section id="projects">
      <div className="project-section-heading">
        <div>
          <p className="eyebrow">03 / Projects</p>
          <h2 className="title">Projects that <span className="holo-text">solve problems</span></h2>
        </div>
        {editable && (
          <button className="btn ux-add" type="button" onClick={addProject} disabled={!isLoaded}>
            <span aria-hidden="true">+</span> Add project
          </button>
        )}
      </div>

      {projects.length === 0 ? (
        <p className="ux-empty">No projects yet.</p>
      ) : (
        <div className="projects">
          {projects.map((project) => {
            const isEditing = editingId === project.id;

            return (
              <article className="glass project" key={project.id}>
                <div className="thumb">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={withBasePath(project.thumb || "/projects/barangaylink.svg")} alt={`${project.name} thumbnail`} loading="lazy" />
                </div>
                <div className="project-body">
                  <h3>
                    <span className="holo-text">{project.name}</span>
                    <span className="sep"> - </span>
                    <span className="problem">{project.problem}</span>
                  </h3>
                  <div className="stack">
                    {project.stack.map((item, index) => (
                      <span className="tag" key={`${project.id}-${index}`}>{item}</span>
                    ))}
                  </div>
                  {project.github && (
                    <a className="btn" href={project.github} target="_blank" rel="noopener noreferrer">
                      View on GitHub <span aria-hidden="true">↗</span>
                    </a>
                  )}
                  {editable && (
                    <div className="project-actions">
                      <button className="project-edit-toggle" type="button" onClick={() => setEditingId(isEditing ? null : project.id)}>
                        {isEditing ? "Done editing" : "Edit project"}
                      </button>
                    </div>
                  )}
                </div>

                {editable && isEditing && (
                  <div className="project-editor">
                    <h4>Project details</h4>
                    <label>Project name<input value={project.name} onChange={(event) => updateProject(project.id, "name", event.target.value)} /></label>
                    <label>Problem solved<textarea rows={3} value={project.problem} onChange={(event) => updateProject(project.id, "problem", event.target.value)} /></label>
                    <label>Thumbnail URL<input value={project.thumb} onChange={(event) => updateProject(project.id, "thumb", event.target.value)} /></label>
                    <label>Technology stack<input value={project.stack.join(", ")} onChange={(event) => updateProject(project.id, "stack", event.target.value.split(",").map((item) => item.trim()).filter(Boolean))} /></label>
                    <label>GitHub URL<input type="url" value={project.github} onChange={(event) => updateProject(project.id, "github", event.target.value)} /></label>
                    <button className="ux-remove" type="button" onClick={() => removeProject(project.id)} aria-label={`Remove ${project.name}`}>
                      Remove project
                    </button>
                  </div>
                )}
                {editable && <p className="ux-save-status" aria-live="polite">Saved in this browser</p>}
              </article>
            );
          })}
        </div>
      )}

      <div className="design-practice">
        <div className="design-practice-heading">
          <div>
            <h3>Design in Practice</h3>
            <p>
              A showcase of graphic design work created for student organizations,
              with a focus on public relations and visual storytelling.
            </p>
          </div>
          {editable && (
            <div className="design-practice-actions">
              <input
                ref={designInputRef}
                className="design-image-input"
                type="file"
                accept="image/*"
                onChange={addDesignImage}
              />
              <button className="btn ux-add" type="button" onClick={() => designInputRef.current?.click()}>
                <span aria-hidden="true">+</span> Add image
              </button>
              {uploadStatus && <p className="ux-save-status" aria-live="polite">{uploadStatus}</p>}
            </div>
          )}
        </div>

        <div className="design-carousel" aria-label="Graphic design showcase">
          <div className="design-carousel-track">
            {[...designImages, ...initialProjects, ...designImages, ...initialProjects].map((item, index) => (
              <article className="glass design-carousel-card" key={`${item.id}-${index}`} aria-hidden={index >= designImages.length + initialProjects.length}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.src || withBasePath(item.thumb || "/projects/barangaylink.svg")} alt={item.name || "Student organization graphic design sample"} loading="lazy" />
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}