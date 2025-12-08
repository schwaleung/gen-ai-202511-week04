// -----------------------------
// formatLeaveData.js
// Extracted script for formatLeaveData.html
// Includes mapping, date helper, table rendering and fetch logic.
//
// This file is written for classroom demonstration. Read the comments
// below to understand each section: data mapping, helpers, rendering
// and fetching. Run this example with a simple HTTP server so `fetch`
// can load the local JSON files (see README or run `python3 -m http.server`).
// -----------------------------

// -----------------------------
// Data mapping
// -----------------------------
// Map shorthand leave types to human-readable text. You can modify
// these mappings during a demo to show how UI text updates without
// changing the JSON source.
const leaveTypeMapping = {
  AL: "Annual Leave",
  SL: "Sick Leave",
  "No Pay": "No Pay Leave",
};


// -----------------------------
// Helpers
// -----------------------------
// fmtDateRaw: convert an ISO date (or any date-like string) into a
// readable yyyy-mm-dd HH:MM string. Notes for students:
// - We guard against empty values and invalid dates.
// - We use zero-padding for consistent column alignment.
function fmtDateRaw(s) {
  if (!s) return ""; // empty input -> empty output
  const d = new Date(s);
  if (Number.isNaN(d.getTime())) return s; // return original if unparsable
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}


// -----------------------------
// Rendering
// -----------------------------
// renderTable: build a <table> element from an array of leave objects.
// Students: the `cols` array controls which object keys are shown and
// their order. Try changing it to add/remove columns for the demo.
function renderTable(items) {
  const cols = [
    'row_number','name','type','fromDate','toDate','Reason','submittedAt','num_date'
  ];

  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');

  // Build header row from column list
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

    // Copy and format fields so we don't mutate the original objects.
    const formatted = {...it};

    // Apply mapping and formatting. This keeps display logic separate
    // from the raw data.
    formatted.type = leaveTypeMapping[formatted.type] || formatted.type;
    formatted.fromDate = fmtDateRaw(formatted.fromDate);
    formatted.toDate = fmtDateRaw(formatted.toDate);
    formatted.submittedAt = fmtDateRaw(formatted.submittedAt);

    // Create cells in the defined column order
    cols.forEach(c => {
      const td = document.createElement('td');
      td.textContent = formatted[c] ?? '';
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
  return table;
}


// -----------------------------
// Data loading / orchestration
// -----------------------------
// loadAndRenderLeave: fetch leave.json and render the table into #output.
// Important classroom note: `fetch` will not work from `file://` URLs.
// Start a local HTTP server (e.g. `python3 -m http.server`) to serve the
// project files when demonstrating this code.
async function loadAndRenderLeave() {
  const out = document.getElementById('output');
  if (!out) return; // guard if the expected element is missing
  out.textContent = 'Loading...';
  try {
    const res = await fetch('leave.json');
    if (!res.ok) throw new Error('Failed to load leave.json: '+res.status);
    const data = await res.json();

    // Validate expected shape (an array) and show helpful error if not.
    if (!Array.isArray(data)) throw new Error('leave.json expected to contain an array');

    // Clear loader text and render the table
    out.textContent = '';
    out.appendChild(renderTable(data));
  } catch (err) {
    // Present errors on the page so students can read what's wrong.
    out.textContent = 'Error: ' + err.message;
  }
}


// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', loadAndRenderLeave);
