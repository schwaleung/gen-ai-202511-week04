// -----------------------------
// formatPeopleData.js
// Extracted script for formatPeopleData.html
// Handles fetching people.json, validating and rendering a table.
//
// This file contains clear sections for rendering and data loading so
// students can see separation of concerns: build UI elements, then
// fetch and pass data to the renderer.
// -----------------------------

// -----------------------------
// Rendering helper
// -----------------------------
// renderTablePeople: given an array of person objects, produce a
// <table> element. The `cols` array controls which object keys are
// displayed and in what order. This makes it easy to experiment during
// class (e.g. add/remove columns).
function renderTablePeople(items) {
  const cols = ['name','language','id','version','bio'];
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');

  // Build header row
  cols.forEach(c => {
    const th = document.createElement('th');
    th.textContent = c;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Build body rows
  const tbody = document.createElement('tbody');
  items.forEach(it => {
    const tr = document.createElement('tr');
    cols.forEach(c => {
      const td = document.createElement('td');
      // Use nullish coalescing to avoid showing "undefined" in cells
      td.textContent = it[c] ?? '';
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
  return table;
}


// -----------------------------
// Data loading
// -----------------------------
// loadAndRenderPeople: fetches people.json, extracts the `people`
// array, validates it, and then renders the table. This keeps the demo
// focused on fetch + DOM manipulation.
async function loadAndRenderPeople() {
  const out = document.getElementById('output');
  if (!out) return; // guard for missing container
  out.textContent = 'Loading...';
  try {
    // Note: fetch requires an HTTP server. Use a local server for demos.
    const res = await fetch('people.json');
    if (!res.ok) throw new Error('Failed to load people.json: '+res.status);
    const data = await res.json();

    // The repo stores the list under `people` key. If the shape changes,
    // students should inspect the JSON and adjust this line.
    const arr = data.people || [];
    if (!Array.isArray(arr)) throw new Error('people.json.people is not an array');

    out.textContent = '';
    out.appendChild(renderTablePeople(arr));
  } catch (err) {
    out.textContent = 'Error: ' + err.message;
  }
}

// Run when the document is ready
document.addEventListener('DOMContentLoaded', loadAndRenderPeople);
