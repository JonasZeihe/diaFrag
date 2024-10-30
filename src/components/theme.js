export function toggleTheme() {
  const body = document.body;
  const themeToggle = document.getElementById("themeToggle");

  // Umschalten des Dark Themes
  body.classList.toggle("dark-theme");

  // Speichern der Auswahl im localStorage
  if (body.classList.contains("dark-theme")) {
    localStorage.setItem("theme", "dark");
    themeToggle.checked = true;
  } else {
    localStorage.setItem("theme", "light");
    themeToggle.checked = false;
  }
}

// Überprüfung des gespeicherten Themas beim Laden der Seite
export function initializeTheme() {
  const savedTheme = localStorage.getItem("theme");
  const themeToggle = document.getElementById("themeToggle");

  if (savedTheme === "dark") {
    document.body.classList.add("dark-theme");
    themeToggle.checked = true;
  } else {
    document.body.classList.remove("dark-theme");
    themeToggle.checked = false;
  }
}

// Event-Listener für den Theme-Umschalter
document.addEventListener("DOMContentLoaded", () => {
  initializeTheme();
  document
    .getElementById("themeToggle")
    .addEventListener("change", toggleTheme);
});
