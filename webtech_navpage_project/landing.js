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

function buildCard(siteData) {
  console.log(`Creating card for ${siteData.name}`);
  const cardContainer = document.createElement("div");
  listContainer.appendChild(cardContainer);

  cardContainer.className = "card-container";
  cardContainer.addEventListener("click", () => {
    contentRoot.innerHTML = `
      <iframe id="app-viewer" src="${siteData.indexPath}" />
    `;
  });
  cardContainer.innerHTML += `
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
}

function buildNavbar(siteData) {
  console.log(`Creating nav item for ${siteData.name}`);
  const navItem = document.createElement("li");
  navList.appendChild(navItem);

  navItem.className = "nav-link";
  navItem.addEventListener("click", () => {
    contentRoot.innerHTML = `
      <iframe id="app-viewer" src="${siteData.indexPath}" scrolling="no">
    `;
  });
  navItem.textContent = `${siteData.name}`;
}

const json = await loadConfig();
json.sites.forEach(buildCard);
json.sites.forEach(buildNavbar);
