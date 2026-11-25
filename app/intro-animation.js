"use client";

import { useEffect, useState } from "react";

export default function IntroAnimation() {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (window.sessionStorage.getItem("portfolio-intro-seen") === "1") return;

    window.sessionStorage.setItem("portfolio-intro-seen", "1");
    document.body.classList.add("intro-playing");
    setIsPlaying(true);

    const finishTimer = window.setTimeout(() => {
      document.body.classList.remove("intro-playing");
      setIsPlaying(false);
    }, 5200);

    return () => {
      window.clearTimeout(finishTimer);
      document.body.classList.remove("intro-playing");
    };
  }, []);

  if (!isPlaying) return null;

  return (
    <div className="intro-animation" aria-label="Loading portfolio" role="status">
      <div className="intro-envelope" aria-hidden="true">
        <span className="intro-envelope-flap" />
      </div>
      <span className="floating-petal intro-flower" aria-hidden="true" />
    </div>
  );
}
