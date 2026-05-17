/**
 * ChurnLens — charts.js
 * Chart.js line and bar charts (Kazakh labels)
 */

function initChurnCharts() {
  'use strict';

  if (typeof Chart === 'undefined') {
    console.warn('[ChurnLens] Chart.js not loaded');
    return;
  }

  Chart.defaults.color = '#94A3B8';
  Chart.defaults.borderColor = 'rgba(148, 163, 184, 0.15)';
  Chart.defaults.font.family = "'IBM Plex Sans', sans-serif";

  const lineCtx = document.getElementById('churn-line-chart');
  if (lineCtx) {
    new Chart(lineCtx, {
      type: 'line',
      data: {
        labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
        datasets: [
          {
            label: 'Сала орташа көрсеткіші',
            data: [32, 34, 31, 29, 28, 27],
            borderColor: '#94A3B8',
            backgroundColor: 'rgba(148, 163, 184, 0.1)',
            tension: 0.35,
            fill: true,
          },
          {
            label: 'Компания көрсеткіші',
            data: [38, 36, 33, 30, 26, 22],
            borderColor: '#00D4AA',
            backgroundColor: 'rgba(0, 212, 170, 0.15)',
            tension: 0.35,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom' },
          tooltip: {
            callbacks: {
              label: (ctx) => `${ctx.dataset.label}: ${ctx.parsed.y}%`,
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 45,
            title: { display: true, text: 'Churn Rate (%)' },
            ticks: { callback: (v) => `${v}%` },
          },
          x: {
            title: { display: true, text: 'Жыл' },
          },
        },
      },
    });
    console.log('[ChurnLens] Line chart initialized');
  }

  const barCtx = document.getElementById('churn-bar-chart');
  if (barCtx) {
    const industries = ['Бөлшек сауда', 'Телеком', 'Банк', 'SaaS', 'Сақтандыру'];
    const churnData = [34, 28, 18, 12, 22];
    const colors = churnData.map((v) =>
      v > 30 ? '#FF4757' : v >= 15 ? '#FBBF24' : '#00D4AA'
    );

    new Chart(barCtx, {
      type: 'bar',
      data: {
        labels: industries,
        datasets: [
          {
            label: 'Churn Rate (%)',
            data: churnData,
            backgroundColor: colors,
            borderRadius: 6,
          },
        ],
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => `Churn Rate: ${ctx.parsed.x}%`,
            },
          },
        },
        scales: {
          x: {
            beginAtZero: true,
            max: 40,
            title: { display: true, text: 'Churn Rate (%)' },
            ticks: { callback: (v) => `${v}%` },
          },
        },
      },
    });
    console.log('[ChurnLens] Bar chart initialized');
  }
}

window.addEventListener('load', initChurnCharts);
