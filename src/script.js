import { generatePieChart } from "./components/chartPie.js";
import { generateDonutChart } from "./components/chartDonut.js";
import { generateBarChart } from "./components/chartBar.js";
import { generateLineChart } from "./components/chartLine.js";
import { generateRadarChart } from "./components/chartRadar.js";
import { generatePolarAreaChart } from "./components/chartPolarArea.js";
import { createLegend, displayStatistics } from "./components/chartUtils.js";
import { toggleTheme, initializeTheme } from "./components/theme.js";

function generateChart() {
  const chartType = document.getElementById("chartType").value;
  const data = parseJsonInput();

  if (!data) return;

  const canvas = document.getElementById("chartCanvas");
  const context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height); // Canvas leeren

  // Diagrammtyp auswählen und generieren
  switch (chartType) {
    case "pie":
      generatePieChart(data);
      break;
    case "donut":
      generateDonutChart(data);
      break;
    case "bar":
      generateBarChart(data);
      break;
    case "line":
      generateLineChart(data);
      break;
    case "radar":
      generateRadarChart(data);
      break;
    case "polarArea":
      generatePolarAreaChart(data);
      break;
    default:
      console.error("Unsupported chart type");
      return;
  }

  createLegend(data.labels, data.colors);
  displayStatistics(data.total, data.labels, data.values, data.percentages);
}

// Funktion zum Exportieren des gesamten Containers als Bild
function exportChart() {
  const chartContainer = document.getElementById("chartCard");

  // html2canvas zur Erfassung des gesamten Containers nutzen
  html2canvas(chartContainer, { backgroundColor: null })
    .then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "diagram_with_legend.png";
      link.click();
    })
    .catch((error) => {
      console.error("Failed to export the chart container:", error);
    });
}

function parseJsonInput() {
  const jsonInput = document.getElementById("jsonInput").value;
  const errorElement = document.getElementById("error");

  try {
    const data = JSON.parse(jsonInput);
    if (!data.answers || !Array.isArray(data.answers)) {
      throw new Error("JSON must contain an 'answers' array.");
    }
    const labels = data.answers.map((answer) => answer.response);
    const values = data.answers.map((answer) => answer.count);
    const total = values.reduce((sum, count) => sum + count, 0);
    const percentages = values.map(
      (value) => ((value / total) * 100).toFixed(1) + "%"
    );
    const colors = ["#FF5C5C", "#FF9A76", "#FFCE67", "#2E86DE", "#6C5CE7"];

    return { labels, values, total, percentages, colors };
  } catch (error) {
    errorElement.textContent = "Invalid JSON format.";
    console.error(error);
    return null;
  }
}

// Initialisierung des Themes und Event-Listener hinzufügen
document.addEventListener("DOMContentLoaded", () => {
  initializeTheme(); // Anwendung des gespeicherten Themes beim Laden der Seite
  document
    .getElementById("generateButton")
    .addEventListener("click", generateChart);
  document
    .getElementById("exportButton")
    .addEventListener("click", exportChart); // Event für Export-Button
  document
    .getElementById("themeToggle")
    .addEventListener("change", toggleTheme);
});
