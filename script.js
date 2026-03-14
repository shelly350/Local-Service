function goHome() {
  // always navigate to index.html (no-op if already there)
  if (!window.location.pathname.endsWith("main.html")) {
    window.location.href = "main.html";
  }
}

function searchServices() {
  const zip = document.getElementById("zip").value.trim();
  const addressQuery = document.getElementById("address").value.trim().toLowerCase();
  const service = document.getElementById("service").value.trim().toLowerCase();
  const resultsContainer = document.getElementById("results");

  if (!zip && !service && !addressQuery) {
    resultsContainer.innerHTML = "<p class='info'>Please enter at least ZIP, address, or service to search.</p>";
    return;
  }

  const stored = JSON.parse(localStorage.getItem("services")) || [];

  const filtered = stored.filter(s => {
    const matchZip = zip ? s.zip === zip : true;
    const matchService = service ? s.type.toLowerCase().includes(service) : true;
    const matchAddress = addressQuery
      ? s.address && s.address.toLowerCase().includes(addressQuery)
      : true;
    return matchZip && matchService && matchAddress;
  });

  resultsContainer.innerHTML = "";

  if (filtered.length === 0) {
    resultsContainer.innerHTML = "<p class='info'>No results found.</p>";
    return;
  }

  filtered.forEach(s => {
    const card = document.createElement("div");
    card.className = "result-card";
    card.innerHTML = `
      <div class="text">
        <h3>${escapeHTML(s.name)}</h3>
        <p><strong>Service:</strong> ${escapeHTML(s.type)}</p>
        <p><strong>ZIP:</strong> ${escapeHTML(s.zip)}${s.address ? ` | <strong>Address:</strong> ${escapeHTML(s.address)}` : ""}</p>
        <p>${escapeHTML(s.desc || "")}</p>
      </div>
      ${s.image ? `<div class="thumb"><img src="${s.image}" alt="${escapeHTML(s.name)}" width="150"></div>` : ""}
    `;
    resultsContainer.appendChild(card);
  });
}

// simple escaping to avoid injection if later extended
function escapeHTML(str = "") {
  return str.replace(/[&<>"']/g, tag => {
    const chars = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    };
    return chars[tag] || tag;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  searchServices(); // with empty inputs this will list all saved businesses
});
