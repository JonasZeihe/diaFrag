import { applyGlowEffect } from "./chartUtils.js";

export function generateRadarChart(data, theme = "dark") {
  const canvas = document.getElementById("chartCanvas");
  const context = canvas.getContext("2d");

  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const maxRadius = Math.min(centerX, centerY) - 30; // Dynamischer Maximalradius mit zusätzlichem Rand
  const angleStep = (2 * Math.PI) / data.labels.length;
  const levels = 5; // Anzahl der Hintergrundebenen für das Netz

  // Farben basierend auf dem Modus
  const lineColor = theme === "dark" ? "#ccc" : "#444";
  const textColor = theme === "dark" ? "white" : "black";
  const fillColor = data.colors[0] + "88";

  // Kreisförmiges Hintergrundnetz für das Radar-Diagramm
  context.strokeStyle = lineColor;
  context.lineWidth = 1;
  for (let level = 1; level <= levels; level++) {
    const radius = (maxRadius / levels) * level;
    context.beginPath();
    context.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    context.closePath();
    context.stroke();
  }

  // Achsenlinien und Labels
  context.font = "14px Arial";
  context.fillStyle = textColor;
  context.strokeStyle = lineColor;
  for (let i = 0; i < data.labels.length; i++) {
    const angle = i * angleStep;
    const x = centerX + Math.cos(angle) * maxRadius;
    const y = centerY + Math.sin(angle) * maxRadius;

    // Achsenlinie zeichnen
    context.beginPath();
    context.moveTo(centerX, centerY);
    context.lineTo(x, y);
    context.stroke();

    // Label am Ende der Achse platzieren
    const labelX = centerX + Math.cos(angle) * (maxRadius + 20);
    const labelY = centerY + Math.sin(angle) * (maxRadius + 20);
    context.fillText(
      data.labels[i],
      labelX - context.measureText(data.labels[i]).width / 2,
      labelY
    );
  }

  // Datenpunkte und Verbindungslinien
  context.beginPath();
  data.values.forEach((value, i) => {
    const angle = i * angleStep;
    const radius = (value / Math.max(...data.values)) * maxRadius;
    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;
    if (i === 0) {
      context.moveTo(x, y);
    } else {
      context.lineTo(x, y);
    }

    // Punkt an jeder Datenstelle
    context.fillStyle = data.colors[i % data.colors.length];
    context.beginPath();
    context.arc(x, y, 5, 0, 2 * Math.PI);
    context.fill();

    applyGlowEffect(context); // Glow-Effekt auf Punkte
  });
  context.closePath();

  // Halbtransparente Füllung und Rahmen für die Datenfläche
  context.fillStyle = fillColor; // Halbtransparente Farbe
  context.fill();
  context.strokeStyle = data.colors[0];
  context.lineWidth = 2;
  context.stroke();
}
