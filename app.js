const CATEGORY_ORDER = ["Kurikulum", "Kokurikulum", "HEM", "Pentadbiran"];
const ACCESS_ORDER = ["Ibu Bapa", "Guru", "Admin"];

const apps = [
  {
    name: "Sistem Kehadiran Murid",
    category: "HEM",
    access: ["Guru", "Admin"],
    type: "AppSheet",
    icon: "📋",
    description: "Rekod kehadiran harian murid oleh guru kelas dan pentadbir sekolah.",
    url: "https://example.com/kehadiran",
    owner: "Unit HEM"
  },
  {
    name: "Dashboard Analisis Peperiksaan",
    category: "Kurikulum",
    access: ["Guru", "Admin"],
    type: "Google Sheet",
    icon: "📊",
    description: "Paparan ringkas pencapaian ujian, peperiksaan, dan perbandingan kelas.",
    url: "https://example.com/analisis-peperiksaan",
    owner: "Setiausaha Peperiksaan"
  },
  {
    name: "Permohonan Cuti Guru",
    category: "Pentadbiran",
    access: ["Guru", "Admin"],
    type: "Apps Script",
    icon: "📝",
    description: "Borang digital dan rekod kelulusan untuk cuti guru dan staf.",
    url: "https://example.com/cuti-guru",
    owner: "Pentadbiran"
  },
  {
    name: "Inventori Makmal",
    category: "Pentadbiran",
    access: ["Guru", "Admin"],
    type: "Excel Online",
    icon: "🧪",
    description: "Semakan stok, alat rosak, dan rekod pembelian bagi makmal sekolah.",
    url: "https://example.com/inventori-makmal",
    owner: "Penyelaras Makmal"
  },
  {
    name: "Tempahan Bilik Khas",
    category: "Pentadbiran",
    access: ["Guru", "Admin"],
    type: "Google Form",
    icon: "🏫",
    description: "Tempahan bilik mesyuarat, makmal, dewan, dan bilik khas lain.",
    url: "https://example.com/tempahan-bilik",
    owner: "Pejabat Sekolah"
  },
  {
    name: "Laporan Disiplin",
    category: "HEM",
    access: ["Guru", "Admin"],
    type: "AppSheet",
    icon: "🛡️",
    description: "Catatan kes disiplin, tindakan susulan, dan pemantauan status.",
    url: "https://example.com/laporan-disiplin",
    owner: "Guru Disiplin"
  },
  {
    name: "Portal Markah Ibu Bapa",
    category: "Kurikulum",
    access: ["Ibu Bapa", "Admin"],
    type: "Google Sheet",
    icon: "👨‍👩‍👧",
    description: "Semakan keputusan dan prestasi murid yang boleh diakses oleh ibu bapa.",
    url: "https://example.com/markah-ibubapa",
    owner: "Unit Kurikulum"
  },
  {
    name: "Pendaftaran Aktiviti Kelab",
    category: "Kokurikulum",
    access: ["Guru", "Admin"],
    type: "AppSheet",
    icon: "🎯",
    description: "Pendaftaran, kehadiran, dan pengurusan aktiviti kelab serta persatuan.",
    url: "https://example.com/kokurikulum",
    owner: "Unit Kokurikulum"
  }
];

const appsGrid = document.getElementById("apps-grid");
const quickCategories = document.getElementById("quick-categories");
const searchInput = document.getElementById("search-input");
const categoryFilter = document.getElementById("category-filter");
const accessFilter = document.getElementById("access-filter");
const appCount = document.getElementById("app-count");
const categoryCount = document.getElementById("category-count");
const resultsSummary = document.getElementById("results-summary");

function populateCategories() {
  CATEGORY_ORDER.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });

  quickCategories.innerHTML = "";

  const allButton = document.createElement("button");
  allButton.type = "button";
  allButton.className = "quick-chip is-active";
  allButton.dataset.category = "all";
  allButton.textContent = "Semua";
  quickCategories.appendChild(allButton);

  CATEGORY_ORDER.forEach((category) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "quick-chip";
    button.dataset.category = category;
    button.textContent = category;
    quickCategories.appendChild(button);
  });

  ACCESS_ORDER.forEach((access) => {
    const option = document.createElement("option");
    option.value = access;
    option.textContent = access;
    accessFilter.appendChild(option);
  });

  appCount.textContent = apps.length;
  categoryCount.textContent = CATEGORY_ORDER.length;
}

function renderApps(records) {
  appsGrid.innerHTML = "";

  if (!records.length) {
    const emptyState = document.createElement("div");
    emptyState.className = "empty-state";
    emptyState.textContent = "Tiada app ditemui. Cuba kata kunci, kategori, atau akses lain.";
    appsGrid.appendChild(emptyState);
    resultsSummary.textContent = "0 aplikasi dipaparkan";
    return;
  }

  records.forEach((app) => {
    const card = document.createElement("article");
    card.className = "app-card";

    const accessPills = app.access
      .map((label) => `<span class="access-pill">${label}</span>`)
      .join("");

    card.innerHTML = `
      <div class="app-card__header">
        <div class="app-card__icon" aria-hidden="true">${app.icon || "📱"}</div>
        <div>
          <h3>${app.name}</h3>
          <p class="app-card__type">${app.type}</p>
        </div>
      </div>
      <p class="app-card__description">${app.description}</p>
      <div class="app-card__meta">
        <span class="tag">${app.category}</span>
        <span class="owner-pill">${app.owner}</span>
      </div>
      <div class="app-card__access">${accessPills}</div>
      <a class="app-link" href="${app.url}" target="_blank" rel="noreferrer">Buka App</a>
    `;

    appsGrid.appendChild(card);
  });

  resultsSummary.textContent = `${records.length} aplikasi dipaparkan`;
}

function setActiveChip(category) {
  [...quickCategories.querySelectorAll(".quick-chip")].forEach((button) => {
    button.classList.toggle("is-active", button.dataset.category === category);
  });
}

function filterApps() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const selectedCategory = categoryFilter.value;
  const selectedAccess = accessFilter.value;

  const filtered = apps.filter((app) => {
    const matchesCategory = selectedCategory === "all" || app.category === selectedCategory;
    const matchesAccess = selectedAccess === "all" || app.access.includes(selectedAccess);
    const haystack = [app.name, app.description, app.category, app.type, app.owner, ...app.access]
      .join(" ")
      .toLowerCase();

    return matchesCategory && matchesAccess && haystack.includes(searchTerm);
  });

  renderApps(filtered);
  setActiveChip(selectedCategory);
}

searchInput.addEventListener("input", filterApps);
categoryFilter.addEventListener("change", filterApps);
accessFilter.addEventListener("change", filterApps);
quickCategories.addEventListener("click", (event) => {
  const button = event.target.closest(".quick-chip");
  if (!button) {
    return;
  }

  categoryFilter.value = button.dataset.category;
  filterApps();
});

populateCategories();
renderApps(apps);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {
      // Dashboard still works without offline support.
    });
  });
}
