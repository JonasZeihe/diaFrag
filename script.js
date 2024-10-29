function generateChart() {
  const jsonInput = document.getElementById("jsonInput").value;
  const chartType = document.getElementById("chartType").value;
  const errorElement = document.getElementById("error");
  const ctx = document.getElementById("chartCanvas").getContext("2d");
  const legend = document.getElementById("legend");
  errorElement.textContent = "";

  let data;
  try {
    data = JSON.parse(jsonInput);
    if (!data.answers || !Array.isArray(data.answers)) {
      throw new Error("JSON muss ein 'answers'-Array enthalten.");
    }
  } catch {
    errorElement.textContent = "Ungültiges JSON-Format.";
    return;
  }

  const labels = data.answers.map((a) => a.response);
  const values = data.answers.map((a) => a.count);
  const colors = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"];

  legend.innerHTML = "";
  legend.className =
    chartType === "pie" || chartType === "doughnut"
      ? "legend horizontal-legend"
      : "legend vertical-legend";
  labels.forEach((label, i) => {
    const item = document.createElement("div");
    item.className = "legend-item";
    const swatch = document.createElement("span");
    swatch.className = "legend-swatch";
    swatch.style.backgroundColor = colors[i % colors.length];
    const text = document.createElement("span");
    text.textContent = label;
    item.append(swatch, text);
    legend.appendChild(item);
  });

  if (window.currentChart) window.currentChart.destroy();
  window.currentChart = new Chart(ctx, {
    type: chartType,
    data: {
      labels,
      datasets: [{ data: values, backgroundColor: colors }],
    },
    options: {
      plugins: {
        legend: { display: false },
        datalabels: {
          color: "#fff",
          font: { weight: "bold" },
          formatter: (value) => value,
        },
        tooltip: {
          enabled: true,
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          titleFont: { size: 14 },
          bodyFont: { size: 12 },
        },
      },
    },
  });
}

function exportChart() {
  const chartCanvas = document.getElementById("chartCanvas");
  const legend = document.getElementById("legend");
  const exportCanvas = document.createElement("canvas");
  exportCanvas.width = chartCanvas.width + legend.offsetWidth + 10;
  exportCanvas.height = Math.max(chartCanvas.height, legend.offsetHeight);
  const context = exportCanvas.getContext("2d");

  context.fillStyle = window.getComputedStyle(document.body).backgroundColor;
  context.fillRect(0, 0, exportCanvas.width, exportCanvas.height);

  context.drawImage(chartCanvas, 0, 0);
  html2canvas(legend).then((legendCanvas) => {
    context.drawImage(legendCanvas, chartCanvas.width + 10, 0);
    const link = document.createElement("a");
    link.href = exportCanvas.toDataURL("image/png");
    link.download = "diagramm_mit_legende.png";
    link.click();
  });
}

function toggleTheme() {
  document.body.classList.toggle("dark-theme");
}
