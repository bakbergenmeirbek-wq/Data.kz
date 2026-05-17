/**
 * ChurnLens — table.js
 * Sort, filter, CSV export for analytics data table
 */

(function () {
  'use strict';

  const table = document.getElementById('churn-table');
  const searchInput = document.getElementById('table-search');
  const exportBtn = document.getElementById('csv-export');

  if (!table) return;

  const tbody = table.querySelector('tbody');
  let sortCol = -1;
  let sortAsc = true;

  function getChurnClass(value) {
    const num = parseFloat(String(value).replace('%', ''));
    if (num > 30) return 'churn-high';
    if (num >= 15) return 'churn-mid';
    return 'churn-low';
  }

  function applyChurnColors() {
    table.querySelectorAll('tbody tr').forEach((row) => {
      const churnCell = row.cells[5];
      if (churnCell) {
        churnCell.className = getChurnClass(churnCell.textContent);
      }
    });
  }

  function sortTable(colIndex) {
    const rows = Array.from(tbody.querySelectorAll('tr'));
    if (sortCol === colIndex) sortAsc = !sortAsc;
    else {
      sortCol = colIndex;
      sortAsc = true;
    }

    table.querySelectorAll('th').forEach((th, i) => {
      th.classList.remove('sorted-asc', 'sorted-desc');
      if (i === colIndex) th.classList.add(sortAsc ? 'sorted-asc' : 'sorted-desc');
    });

    rows.sort((a, b) => {
      let aVal = a.cells[colIndex]?.textContent.trim() || '';
      let bVal = b.cells[colIndex]?.textContent.trim() || '';

      const aNum = parseFloat(aVal.replace(/[^\d.-]/g, ''));
      const bNum = parseFloat(bVal.replace(/[^\d.-]/g, ''));

      if (!Number.isNaN(aNum) && !Number.isNaN(bNum)) {
        return sortAsc ? aNum - bNum : bNum - aNum;
      }
      return sortAsc ? aVal.localeCompare(bVal, 'kk') : bVal.localeCompare(aVal, 'kk');
    });

    rows.forEach((row) => tbody.appendChild(row));
    applyChurnColors();
    console.log('[ChurnLens] Table sorted by column', colIndex, sortAsc ? 'ASC' : 'DESC');
  }

  table.querySelectorAll('th').forEach((th, index) => {
    th.addEventListener('click', () => sortTable(index));
    th.setAttribute('tabindex', '0');
    th.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        sortTable(index);
      }
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const q = searchInput.value.toLowerCase().trim();
      tbody.querySelectorAll('tr').forEach((row) => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(q) ? '' : 'none';
      });
    });
  }

  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      const headers = Array.from(table.querySelectorAll('th')).map((th) => th.textContent.replace(/[↑↓]/g, '').trim());
      const visibleRows = Array.from(tbody.querySelectorAll('tr')).filter((r) => r.style.display !== 'none');
      const csvRows = [headers.join(',')];

      visibleRows.forEach((row) => {
        const cells = Array.from(row.cells).map((cell) => {
          const val = cell.textContent.trim().replace(/"/g, '""');
          return `"${val}"`;
        });
        csvRows.push(cells.join(','));
      });

      const blob = new Blob(['\uFEFF' + csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'churn-derekter.csv';
      a.click();
      URL.revokeObjectURL(url);
      console.log('[ChurnLens] CSV exported, rows:', visibleRows.length);
    });
  }

  applyChurnColors();
  console.log('[ChurnLens] table.js initialized');
})();
