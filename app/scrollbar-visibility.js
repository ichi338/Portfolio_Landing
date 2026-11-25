"use client";

import { useEffect } from "react";

const scrollKeys = new Set(["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " "]);

export default function ScrollbarVisibility() {
  useEffect(() => {
    const root = document.documentElement;
    let hideTimer;

    function showScrollbar() {
      root.classList.add("scrollbar-active");
      window.clearTimeout(hideTimer);
      hideTimer = window.setTimeout(() => root.classList.remove("scrollbar-active"), 850);
    }

    function handleKeyDown(event) {
      if (!scrollKeys.has(event.key)) return;
      if (event.target instanceof HTMLElement && event.target.closest("input, textarea, select, button, a, [contenteditable='true']")) return;
      showScrollbar();
    }

    window.addEventListener("scroll", showScrollbar, { passive: true });
    window.addEventListener("wheel", showScrollbar, { passive: true });
    window.addEventListener("touchmove", showScrollbar, { passive: true });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(hideTimer);
      window.removeEventListener("scroll", showScrollbar);
      window.removeEventListener("wheel", showScrollbar);
      window.removeEventListener("touchmove", showScrollbar);
      window.removeEventListener("keydown", handleKeyDown);
      root.classList.remove("scrollbar-active");
    };
  }, []);

  return null;
}