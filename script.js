/* =========================================================
   YOUR PROJECTS
   Add/remove/edit objects here — the Work section builds
   itself from this list, grouped by category. No HTML
   editing needed to add a new piece of work.

   category: groups projects under a heading (e.g. "Social Media")
   image: path to your image (put files in /images), leave "" to use the color
========================================================= */
const PROJECTS = [
  { title: "Campaign Reboot", info: "Instagram carousel series", category: "Social Media", image: "", color: "#002fa7" },
  { title: "Weekly Drops", info: "Content system, 3 months", category: "Social Media", image: "", color: "#274690" },
  { title: "Story Templates", info: "Reusable IG story kit", category: "Social Media", image: "", color: "#4a5fb0" },

  { title: "Launch Poster", info: "Print + digital, client work", category: "Marketing", image: "", color: "#141414" },
  { title: "Product Sheet", info: "One-pager, self-initiated", category: "Marketing", image: "", color: "#3a3a3a" },
  { title: "Email Series", info: "3-part newsletter redesign", category: "Marketing", image: "", color: "#5c5c5c" }
];

/* =========================================================
   RENDER WORK, GROUPED BY CATEGORY
========================================================= */
const workCategories = document.getElementById("workCategories");

const groups = PROJECTS.reduce((acc, project) => {
  (acc[project.category] = acc[project.category] || []).push(project);
  return acc;
}, {});

Object.entries(groups).forEach(([categoryName, projects]) => {
  const section = document.createElement("div");
  section.className = "category";

  const heading = document.createElement("div");
  heading.className = "category__heading";
  heading.innerHTML = `${categoryName} <span class="category__count">(${projects.length})</span>`;
  section.appendChild(heading);

  const grid = document.createElement("div");
  grid.className = "project-grid";

  projects.forEach((project) => {
    const card = document.createElement("div");
    card.className = "project-card";
    card.style.background = project.color;

    if (project.image) {
      const img = document.createElement("img");
      img.src = project.image;
      img.alt = project.title;
      card.appendChild(img);
    }

    card.innerHTML += `<span>${project.title}<span class="project-card__info">${project.info}</span></span>`;
    grid.appendChild(card);
  });

  section.appendChild(grid);
  workCategories.appendChild(section);
});

/* =========================================================
   SCROLL REVEAL for project cards (slide up + fade as you
   scroll down the page — this is the "sliding down" motion)
========================================================= */
const revealTargets = document.querySelectorAll(".project-card");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // small stagger so a row doesn't pop in all at once
          setTimeout(() => entry.target.classList.add("is-visible"), i * 60);
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );
  revealTargets.forEach((el) => revealObserver.observe(el));
} else {
  revealTargets.forEach((el) => el.classList.add("is-visible"));
}

/* =========================================================
   HERO DOODLES — nudge toward/away from the cursor
========================================================= */
const hero = document.getElementById("hero");
const doodles = document.querySelectorAll("[data-doodle]");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isTouch = window.matchMedia("(hover: none)").matches;

if (hero && !reduceMotion && !isTouch) {
  hero.addEventListener("mousemove", (e) => {
    doodles.forEach((doodle) => {
      const rect = doodle.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / 25;
      const dy = (e.clientY - cy) / 25;
      // clamp so the movement stays playful, not chaotic
      const clampedX = Math.max(-14, Math.min(14, dx));
      const clampedY = Math.max(-14, Math.min(14, dy));
      doodle.style.transform = `translate(${clampedX}px, ${clampedY}px) rotate(${clampedX * 0.6}deg)`;
    });
  });

  hero.addEventListener("mouseleave", () => {
    doodles.forEach((doodle) => (doodle.style.transform = ""));
  });
}

/* =========================================================
   CURSOR-FOLLOW PREVIEW IMAGE (shown while hovering the hero)
   Add your own images here — cycles through on each hover-enter.
========================================================= */
const HERO_PREVIEWS = [
  { label: "self portrait, 2025", image: "" },
  { label: "sketchbook page", image: "" },
  { label: "latest project", image: "" }
];

const cursorPreview = document.getElementById("cursorPreview");
const cursorPreviewInner = document.getElementById("cursorPreviewInner");
let previewIndex = 0;

if (hero && cursorPreview && !isTouch) {
  hero.addEventListener("mouseenter", () => {
    const item = HERO_PREVIEWS[previewIndex % HERO_PREVIEWS.length];
    previewIndex++;
    cursorPreviewInner.innerHTML = item.image
      ? `<img src="${item.image}" alt="${item.label}">`
      : item.label;
    cursorPreview.classList.add("is-active");
  });

  hero.addEventListener("mousemove", (e) => {
    cursorPreview.style.left = e.clientX + "px";
    cursorPreview.style.top = e.clientY + "px";
  });

  hero.addEventListener("mouseleave", () => {
    cursorPreview.classList.remove("is-active");
  });
}
