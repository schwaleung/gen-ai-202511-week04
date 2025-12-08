// -----------------------------
// formatWeekdayData.js
// Extracted script for formatWeekdayData.html
// Fetches weekday JSON and renders a simple table.
// -----------------------------

function renderTableWeekday(items) {
  const cols = ['name','shortForm'];
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');

  cols.forEach(c => {
    const th = document.createElement('th');
    th.textContent = c;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement('tbody');
  items.forEach(it => {
    const tr = document.createElement('tr');
    cols.forEach(c => {
      const td = document.createElement('td');
      td.textContent = it[c] ?? '';
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
  return table;
}

async function loadAndRenderWeekday() {
  const out = document.getElementById('output');
  if (!out) return;
  out.textContent = 'Loading...';
  try {
    // Adjust filename if your JSON file has a different name
    const res = await fetch('weekday.json');
    if (!res.ok) throw new Error('Failed to load weekday.json: '+res.status);
    const data = await res.json();
    if (!Array.isArray(data)) throw new Error('weekday.json is not an array');
    out.textContent = '';
    out.appendChild(renderTableWeekday(data));
  } catch (err) {
    out.textContent = 'Error: ' + err.message;
  }
}

document.addEventListener('DOMContentLoaded', loadAndRenderWeekday);
