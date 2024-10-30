import { applyGlowEffect } from "./chartUtils.js";

export function generateLineChart(data, theme = "dark") {
  const canvas = document.getElementById("chartCanvas");
  const context = canvas.getContext("2d");

  // Farbvariablen für Dunkel- und Hellmodus
  const lineColor = theme === "dark" ? data.colors[0] : "black";
  const textColor = theme === "dark" ? "white" : "black";

  // Dynamische Skalierung
  const padding = 50;
  const chartWidth = canvas.width - 2 * padding;
  const chartHeight = canvas.height - 2 * padding;
  const maxDataValue = Math.max(...data.values);
  const xInterval = chartWidth / (data.values.length - 1);
  const yScale = chartHeight / maxDataValue;

  // Linie zeichnen
  context.beginPath();
  context.strokeStyle = lineColor;
  context.lineWidth = 2;

  data.values.forEach((value, i) => {
    const x = padding + i * xInterval;
    const y = canvas.height - padding - value * yScale;
    if (i === 0) {
      context.moveTo(x, y); // Startpunkt setzen
    } else {
      context.lineTo(x, y); // Linie zu jedem weiteren Punkt
    }
  });
  context.stroke(); // Linie rendern

  // Punkte und Werte zeichnen
  data.values.forEach((value, i) => {
    const x = padding + i * xInterval;
    const y = canvas.height - padding - value * yScale;

    // Punkt auf jeder Datenstelle
    context.fillStyle = data.colors[i % data.colors.length];
    context.beginPath();
    context.arc(x, y, 8, 0, 2 * Math.PI); // Größere Punkte (Radius 8)
    context.fill();

    applyGlowEffect(context); // Verstärkter Glow-Effekt auf Punkte

    // Wert über jedem Punkt anzeigen
    context.font = "bold 16px Arial"; // Größere Schrift für bessere Sichtbarkeit

    // Text mit Hintergrund für bessere Lesbarkeit
    context.strokeStyle = theme === "dark" ? "black" : "white";
    context.lineWidth = 3;
    context.strokeText(value, x - context.measureText(value).width / 2, y - 12);

    // Textfarbe anpassen und Text darstellen
    context.fillStyle = textColor;
    context.fillText(value, x - context.measureText(value).width / 2, y - 12);
  });

  // X-Achsenbeschriftung hinzufügen
  context.fillStyle = textColor;
  context.font = "14px Arial";
  data.labels.forEach((label, i) => {
    const labelX = padding + i * xInterval;
    const labelY = canvas.height - padding + 20;
    context.fillText(
      label,
      labelX - context.measureText(label).width / 2,
      labelY
    );
  });
}
