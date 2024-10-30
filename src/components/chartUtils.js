// Funktion für das Erstellen der Legende
export function createLegend(labels, colors) {
  const legend = document.getElementById("legend");
  legend.innerHTML = ""; // Vorherige Legende leeren

  labels.forEach((label, index) => {
    const item = document.createElement("div");
    item.className = "legend-item";
    item.innerHTML = `<span class="legend-swatch" style="background-color: ${colors[index]}"></span>${label}`;
    legend.appendChild(item);
  });
}

// Funktion zum Anzeigen von Statistiken unterhalb des Diagramms
export function displayStatistics(total, labels, values, percentages) {
  const statistics = document.getElementById("statistics");
  statistics.innerHTML = `Total Responses: ${total} <br>`;
  labels.forEach((label, index) => {
    statistics.innerHTML += `${label}: ${values[index]} (${percentages[index]})<br>`;
  });
}

// Funktion zum Anwenden eines Gloweffects für Diagrammkomponenten
export function applyGlowEffect(context) {
  context.shadowColor = "rgba(255, 255, 255, 0.3)";
  context.shadowBlur = 10;
}
