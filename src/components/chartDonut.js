import { applyGlowEffect } from "./chartUtils.js";

export function generateDonutChart(data) {
  const canvas = document.getElementById("chartCanvas");
  const context = canvas.getContext("2d");

  let startAngle = 0;
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const outerRadius = Math.min(centerX, centerY) - 20; // Äußerer Radius des Donuts
  const innerRadius = outerRadius * 0.5; // Innerer Radius für den Donut-Effekt
  const gapAngle = 0.04; // Winkel für Abstand zwischen Segmenten

  data.values.forEach((value, index) => {
    const sliceAngle = (value / data.total) * 2 * Math.PI - gapAngle;
    const middleAngle = startAngle + sliceAngle / 2;

    // Zeichnen des äußeren Segments mit innerem Loch
    context.beginPath();
    context.arc(
      centerX,
      centerY,
      outerRadius,
      startAngle,
      startAngle + sliceAngle
    );
    context.arc(
      centerX,
      centerY,
      innerRadius,
      startAngle + sliceAngle,
      startAngle,
      true
    );
    context.closePath();

    // Füllen des Segments mit Farbe
    context.fillStyle = data.colors[index % data.colors.length];
    context.fill();

    applyGlowEffect(context); // Glow-Effekt anwenden

    // Prozentsatz im Segment anzeigen
    const textX =
      centerX + (Math.cos(middleAngle) * (outerRadius + innerRadius)) / 2;
    const textY =
      centerY + (Math.sin(middleAngle) * (outerRadius + innerRadius)) / 2;

    context.font = "bold 16px Arial"; // Textgröße
    context.fillStyle = "white";
    context.strokeStyle = "black"; // Schwarze Kontur für besseren Kontrast
    context.lineWidth = 1; // Dünne Kontur

    // Prozentwert anzeigen
    const percentageText = `${((value / data.total) * 100).toFixed(1)}%`;

    // Text mit Kontur
    context.strokeText(percentageText, textX, textY);
    context.fillText(percentageText, textX, textY);

    // Nächsten Startwinkel berechnen
    startAngle += sliceAngle + gapAngle;
  });
}
