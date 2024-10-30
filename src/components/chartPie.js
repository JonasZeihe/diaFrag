import { applyGlowEffect } from "./chartUtils.js";

export function generatePieChart(data) {
  const canvas = document.getElementById("chartCanvas");
  const context = canvas.getContext("2d");

  let startAngle = 0;
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = Math.min(centerX, centerY) - 20; // Dynamischer Radius für Anpassung an Canvasgröße
  const gapAngle = 0.14; // Erhöhter Winkel für den Abstand zwischen den Segmenten

  data.values.forEach((value, index) => {
    const sliceAngle = (value / data.total) * 2 * Math.PI - gapAngle; // Segment um den Abstandswinkel reduzieren

    // Zeichnen des Segments mit Lücke
    context.beginPath();
    context.moveTo(centerX, centerY);
    context.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
    context.closePath();

    // Füllen des Segments mit Farbe
    context.fillStyle = data.colors[index % data.colors.length];
    context.fill();

    applyGlowEffect(context); // Glow-Effekt anwenden

    // Prozentsatz im Segment anzeigen
    const middleAngle = startAngle + sliceAngle / 2;
    const textX = centerX + Math.cos(middleAngle) * radius * 0.7;
    const textY = centerY + Math.sin(middleAngle) * radius * 0.7;

    context.font = "bold 16px Arial"; // Größere Schrift für bessere Lesbarkeit
    context.fillStyle = "white";
    context.strokeStyle = "black"; // Schwarze Kontur für besseren Kontrast
    context.lineWidth = 1; // Dünnere Kontur

    // Prozentzeichen nur hinzufügen, wenn es nicht schon in data.percentages[index] enthalten ist
    const percentageText = data.percentages[index].toString().includes("%")
      ? data.percentages[index]
      : `${data.percentages[index]}%`;

    // Textkontur für bessere Sichtbarkeit
    context.strokeText(percentageText, textX, textY);
    context.fillText(percentageText, textX, textY);

    // Startwinkel für das nächste Segment anpassen, mit Lücke
    startAngle += sliceAngle + gapAngle;
  });
}
