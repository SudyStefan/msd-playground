const contentRoot = document.getElementById("content-root");
contentRoot.innerHTML = `
  <div id="landing-root">
    <div id="list-container"></div>
  </div>
`;

const listContainer = document.getElementById("list-container");
const navList = document.getElementById("nav-list");

async function loadConfig() {
  const response = await fetch("./sites.json");
  if (!response.ok) {
    throw new Error("Failed to fetch sites.json!");
  }

  const config = await response.json();
  return config;
}

function showProject(indexPath) {
  contentRoot.innerHTML = `
    <iframe id="app-viewer" src="${indexPath}" />
  `;
}

function showHome(config) {
  contentRoot.innerHTML = `
    <div id="landing-root">
      <div id="list-container"></div>
    </div>
  `;
  const newListContainer = document.getElementById("list-container");

  config.sites.forEach((site) => {
    buildCard(site, newListContainer);
  });
}

function buildCard(siteData, container) {
  console.log(`Creating card for ${siteData.name}`);
  const cardContainer = document.createElement("div");
  cardContainer.className = "card-container";

  cardContainer.innerHTML = `
    <div class="card-image">
      <img src="${siteData.logoName}" />
    </div>
    <div class="card-content">
      <div class="card-title-container">
        <h1 class="card-title">${siteData.name}</h1>
      </div>
      <div class="card-text-container">
        <p class="card-text">${siteData.description}</p>
      </div>
    </div>
  `;

  cardContainer.addEventListener("click", () => {
    showProject(siteData.indexPath);

    const url = new URL(window.location.href);
    url.searchParams.set("project", siteData.name);
    history.pushState(
      { project: siteData.name, path: siteData.indexPath },
      "",
      url,
    );
  });

  container.appendChild(cardContainer);
}

function buildNavbar(siteData) {
  console.log(`Creating nav item for ${siteData.name}`);
  const navItem = document.createElement("li");
  navList.appendChild(navItem);

  navItem.className = "nav-link";
  navItem.addEventListener("click", () => {
    showProject(siteData.indexPath);

    const url = new URL(window.location.href);
    url.searchParams.set("project", siteData.name);
    history.pushState(
      { project: siteData.name, path: siteData.indexPath },
      "",
      url,
    );
  });
  navItem.textContent = `${siteData.name}`;
}

// load json
const json = await loadConfig();

// buck/forward button listener
window.addEventListener("popstate", (event) => {
  if (event.state && event.state.path) {
    showProject(event.state.path);
  } else {
    showHome(json);
  }
});
const urlParams = new URLSearchParams(window.location.search);
const projectParam = urlParams.get("project");
const activeSite = json.sites.find((site) => site.name === projectParam);

// switch sites
if (activeSite) {
  showProject(activeSite.indexPath);
} else {
  json.sites.forEach((site) => buildCard(site, listContainer));
}

// build navbar
json.sites.forEach(buildNavbar);
