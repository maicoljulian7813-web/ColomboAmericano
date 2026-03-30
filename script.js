// Reveal on scroll
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
    threshold: 0.16,
    rootMargin: "0px 0px -40px 0px"
  }
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});

// Presentation Navigation
const presSections = Array.from(document.querySelectorAll(".pres-section"));

if (presSections.length > 0) {
  const sectionTitles = {
    "introduction": "Introduction",
    "sports": "Sports & Activities",
    "eco": "Eco-Friendly Tips",
    "food": "Gastronomy & Food",
    "faq": "Frequently Asked Questions"
  };

  let currentSection = 0;

  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const sectionTitle = document.getElementById("sectionTitle");
  const sectionCounter = document.getElementById("sectionCounter");

  function goToSection(index) {
    currentSection = Math.max(0, Math.min(presSections.length - 1, index));
    presSections[currentSection].scrollIntoView({ behavior: "smooth", block: "start" });
    updateNav();
  }

  function updateNav() {
    const id = presSections[currentSection].id;
    if (sectionTitle) sectionTitle.textContent = sectionTitles[id] || "";
    if (sectionCounter) sectionCounter.textContent = (currentSection + 1) + " / " + presSections.length;
    if (prevBtn) prevBtn.disabled = currentSection === 0;
    if (nextBtn) nextBtn.disabled = currentSection === presSections.length - 1;
  }

  if (prevBtn) prevBtn.addEventListener("click", function () { goToSection(currentSection - 1); });
  if (nextBtn) nextBtn.addEventListener("click", function () { goToSection(currentSection + 1); });

  // Keyboard navigation with arrow keys
  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") goToSection(currentSection + 1);
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") goToSection(currentSection - 1);
  });

  // Update nav when scrolling manually
  const sectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const idx = presSections.indexOf(entry.target);
        if (idx !== -1) {
          currentSection = idx;
          updateNav();
        }
      }
    });
  }, { threshold: 0.5 });

  presSections.forEach(function (s) { sectionObserver.observe(s); });

  updateNav();
}
