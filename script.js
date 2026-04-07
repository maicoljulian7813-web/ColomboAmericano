/* ─── SCROLL REVEAL ──────────────────────────────────── */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
    rootMargin: "0px 0px -40px 0px"
  }
);

revealElements.forEach((el) => revealObserver.observe(el));

/* ─── SCROLL PROGRESS LINE ───────────────────────────── */

const progressBar = document.createElement("div");
progressBar.style.cssText = [
  "position:fixed",
  "top:0",
  "left:0",
  "height:2px",
  "width:0%",
  "z-index:9999",
  "pointer-events:none",
  "transition:width 80ms linear",
  "background:linear-gradient(90deg,var(--accent),var(--accent-hi,var(--accent)))",
  "opacity:0.7",
].join(";");
document.body.appendChild(progressBar);

window.addEventListener("scroll", () => {
  const scrolled = window.scrollY;
  const total    = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = total > 0 ? (scrolled / total) * 100 + "%" : "0%";
}, { passive: true });

