document.getElementById("yr").textContent = new Date().getFullYear();

// highlight for the current section in the nav
const links = [...document.querySelectorAll(".nav ul a")];
const so = new IntersectionObserver(
  (es) =>
    es.forEach((e) => {
      if (e.isIntersecting)
        links.forEach((a) =>
          a.classList.toggle(
            "on",
            a.getAttribute("href") === "#" + e.target.id,
          ),
        );
    }),
  { rootMargin: "-45% 0px -50% 0px" },
);
document.querySelectorAll("section[id]").forEach((s) => so.observe(s));

// tap the sticker for a little burst of hearts :P
const pud = document.getElementById("pud");
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const colors = ["#f4b6c2", "#fbd96a", "#8aa68f"];

pud.addEventListener("click", () => {
  pud.classList.remove("wiggle");
  void pud.offsetWidth;
  pud.classList.add("wiggle");
  if (reduce) return;

  const r = pud.getBoundingClientRect();
  for (let i = 0; i < 10; i++) {
    const s = document.createElement("span");
    s.className = "pop";
    s.textContent = i % 3 === 0 ? "✦" : "♥";
    s.style.color = colors[i % 3];
    s.style.left = r.left + r.width / 2 + "px";
    s.style.top = r.top + r.height / 3 + "px";
    document.body.appendChild(s);

    const angle = (Math.PI * 2 * i) / 10 + Math.random() * 0.4;
    const dist = 60 + Math.random() * 60;
    const dx = Math.cos(angle) * dist;
    const dy = Math.sin(angle) * dist - 30;
    s.animate(
      [
        { transform: "translate(-50%,-50%) scale(.4)", opacity: 1 },
        {
          transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(1.2)`,
          opacity: 0,
        },
      ],
      { duration: 900, easing: "cubic-bezier(.2,.7,.2,1)" },
    ).onfinish = () => s.remove();
  }
});
