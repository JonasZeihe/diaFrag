import { applyGlowEffect } from "./chartUtils.js";

export function generateBarChart(data) {
  const canvas = document.getElementById("chartCanvas");
  const context = canvas.getContext("2d");

  const chartWidth = canvas.width - 100; // Platz für Rand lassen
  const chartHeight = 400; // Diagrammhöhe
  const maxBarHeight = chartHeight * 0.8; // Maximale Balkenhöhe angepasst
  const barWidth = chartWidth / data.values.length - 20; // Dynamische Breite
  const maxDataValue = Math.max(...data.values);

  data.values.forEach((value, i) => {
    const barHeight = (value / maxDataValue) * maxBarHeight;
    const x = 50 + i * (barWidth + 20); // X-Position, Platz für Rand links
    const y = chartHeight - barHeight;

    // Balken zeichnen
    context.fillStyle = data.colors[i % data.colors.length];
    context.fillRect(x, y, barWidth, barHeight);

    applyGlowEffect(context); // Glow-Effekt auf Balken

    // Zahl im Balken anzeigen, angepasst an die Balkenhöhe
    context.fillStyle = "white";
    context.font = "bold 16px Arial"; // Größere Schrift für besseren Kontrast
    const text = value.toString();
    const textWidth = context.measureText(text).width;
    const textX = x + (barWidth - textWidth) / 2;

    // Wenn der Balken hoch genug ist, die Zahl im Balken zentrieren
    // Ansonsten die Zahl oberhalb des Balkens platzieren
    const textY = barHeight > 30 ? y + barHeight / 2 : y - 15;

    // Text vertikal zentrieren in großen Balken
    context.fillText(text, textX, textY);
  });

  // Achsenbeschriftung hinzufügen
  context.fillStyle = "white";
  context.font = "14px Arial";
  data.labels.forEach((label, i) => {
    const labelX = 50 + i * (barWidth + 20) + barWidth / 2;
    const labelY = chartHeight + 20;
    context.fillText(
      label,
      labelX - context.measureText(label).width / 2,
      labelY
    );
  });
}
