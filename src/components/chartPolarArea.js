import { applyGlowEffect } from "./chartUtils.js";

export function generatePolarAreaChart(data) {
  const canvas = document.getElementById("chartCanvas");
  const context = canvas.getContext("2d");

  let startAngle = 0;
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const maxRadius = Math.min(centerX, centerY) - 20; // Dynamischer Maximalradius für Anpassung an Canvasgröße
  const gapAngle = 0.04; // Winkel für Abstand zwischen den Segmenten

  data.values.forEach((value, i) => {
    const sliceAngle = (value / data.total) * 2 * Math.PI - gapAngle;
    const radius = (value / Math.max(...data.values)) * maxRadius; // Radius proportional zum Wert

    // Zeichnen des Segmentes
    context.beginPath();
    context.moveTo(centerX, centerY);
    context.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
    context.closePath();

    // Füllen des Segments mit Farbe
    context.fillStyle = data.colors[i % data.colors.length];
    context.fill();

    applyGlowEffect(context); // Glow-Effekt auf das Segment

    // Text innerhalb des Segments
    const middleAngle = startAngle + sliceAngle / 2;
    const textX = centerX + Math.cos(middleAngle) * radius * 0.5;
    const textY = centerY + Math.sin(middleAngle) * radius * 0.5;

    context.font = "bold 14px Arial"; // Textgröße
    context.fillStyle = "white";
    context.strokeStyle = "black";
    context.lineWidth = 1;

    const percentageText = `${((value / data.total) * 100).toFixed(1)}%`;

    // Textkontur für bessere Lesbarkeit
    context.strokeText(percentageText, textX, textY);
    context.fillText(percentageText, textX, textY);

    // Startwinkel für das nächste Segment anpassen, mit Lücke
    startAngle += sliceAngle + gapAngle;
  });
}
