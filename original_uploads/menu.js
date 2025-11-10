//toggle menu
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");

  // Solo agrega el evento si los elementos existen
  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      menu.classList.toggle("active");
    });
  }
});
