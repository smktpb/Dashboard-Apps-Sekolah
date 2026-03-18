const apps = [
  {
    name: "Sistem Kehadiran Murid",
    category: "Operasi Sekolah",
    type: "AppSheet",
    description: "Rekod kehadiran harian murid oleh guru kelas atau pentadbir.",
    url: "https://example.com/kehadiran",
    owner: "Unit HEM"
  },
  {
    name: "Dashboard Analisis Peperiksaan",
    category: "Akademik",
    type: "Google Sheet",
    description: "Paparan ringkas pencapaian ujian, peperiksaan, dan perbandingan kelas.",
    url: "https://example.com/analisis-peperiksaan",
    owner: "Setiausaha Peperiksaan"
  },
  {
    name: "Permohonan Cuti Guru",
    category: "Sumber Manusia",
    type: "Apps Script",
    description: "Borang digital dan rekod kelulusan untuk cuti guru dan staf.",
    url: "https://example.com/cuti-guru",
    owner: "Pentadbiran"
  },
  {
    name: "Inventori Makmal",
    category: "Aset",
    type: "Excel Online",
    description: "Semakan stok, alat rosak, dan rekod pembelian bagi makmal sekolah.",
    url: "https://example.com/inventori-makmal",
    owner: "Penyelaras Makmal"
  },
  {
    name: "Tempahan Bilik Khas",
    category: "Operasi Sekolah",
    type: "Google Form",
    description: "Tempahan bilik mesyuarat, makmal, dewan, dan bilik khas lain.",
    url: "https://example.com/tempahan-bilik",
    owner: "Pejabat Sekolah"
  },
  {
    name: "Laporan Disiplin",
    category: "HEM",
    type: "AppSheet",
    description: "Catatan kes disiplin, tindakan susulan, dan pemantauan status.",
    url: "https://example.com/laporan-disiplin",
    owner: "Guru Disiplin"
  }
];

const appsGrid = document.getElementById("apps-grid");
const searchInput = document.getElementById("search-input");
const categoryFilter = document.getElementById("category-filter");
const appCount = document.getElementById("app-count");
const categoryCount = document.getElementById("category-count");
const resultsSummary = document.getElementById("results-summary");

function uniqueCategories(records) {
  return [...new Set(records.map((app) => app.category))].sort((a, b) => a.localeCompare(b, "ms"));
}

function populateCategories() {
  const categories = uniqueCategories(apps);
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });

  appCount.textContent = apps.length;
  categoryCount.textContent = categories.length;
}

function renderApps(records) {
  appsGrid.innerHTML = "";

  if (!records.length) {
    const emptyState = document.createElement("div");
    emptyState.className = "empty-state";
    emptyState.textContent = "Tiada app ditemui. Cuba kata kunci lain atau pilih kategori lain.";
    appsGrid.appendChild(emptyState);
    resultsSummary.textContent = "0 aplikasi dipaparkan";
    return;
  }

  records.forEach((app) => {
    const card = document.createElement("article");
    card.className = "app-card";

    card.innerHTML = `
      <div class="app-card__top">
        <div>
          <span class="badge">${app.type}</span>
          <h3>${app.name}</h3>
        </div>
      </div>
      <p>${app.description}</p>
      <div class="app-card__meta">
        <span class="tag">${app.category}</span>
      </div>
      <div class="app-card__actions">
        <a class="app-link" href="${app.url}" target="_blank" rel="noreferrer">Buka App</a>
        <span class="app-owner">${app.owner}</span>
      </div>
    `;

    appsGrid.appendChild(card);
  });

  resultsSummary.textContent = `${records.length} aplikasi dipaparkan`;
}

function filterApps() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const selectedCategory = categoryFilter.value;

  const filtered = apps.filter((app) => {
    const matchesCategory = selectedCategory === "all" || app.category === selectedCategory;
    const haystack = [app.name, app.description, app.category, app.type, app.owner].join(" ").toLowerCase();
    return matchesCategory && haystack.includes(searchTerm);
  });

  renderApps(filtered);
}

searchInput.addEventListener("input", filterApps);
categoryFilter.addEventListener("change", filterApps);

populateCategories();
renderApps(apps);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {
      // Dashboard still works without offline support.
    });
  });
}
