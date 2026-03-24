const body = document.body;
const toggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
const mobileLinks = document.querySelectorAll(".mobile-menu__links a");

if (toggle) {
  toggle.addEventListener("click", () => {
    const isOpen = body.classList.toggle("menu-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
}

mobileLinks.forEach((link) => {
  link.addEventListener("click", () => {
    body.classList.remove("menu-open");
    toggle?.setAttribute("aria-expanded", "false");
  });
});

window.addEventListener("resize", () => {
  if (window.innerWidth >= 920) {
    body.classList.remove("menu-open");
    toggle?.setAttribute("aria-expanded", "false");
  }
});
