const contentRoot = document.getElementById("content-root");
contentRoot.innerHTML = `
  <div id="landing-root">
    <h1 id="list-title">Available Apps</h1>
    <div id="list-container"></div>
  </div>
`;

const listContainer = document.getElementById("list-container");

async function loadConfig() {
  const response = await fetch("./sites.json");
  if (!response.ok) {
    throw new Error("Failed to fetch sites.json!");
  }

  const config = await response.json();
  return config;
}

function buildCard(cardData) {
  console.log(`Creating card for ${cardData.name}`);
  const cardContainer = document.createElement("div");
  listContainer.appendChild(cardContainer);

  cardContainer.className = "card-container";
  cardContainer.addEventListener("click", () => {
    contentRoot.innerHTML = `
      <iframe id="app-viewer" src="${cardData.indexPath}" scrolling="no">
    `;
  });
  cardContainer.innerHTML += `
    <div class="card-image">
      <img src="${cardData.logoName}" />
    </div>
    <div class="card-content">
      <div class="card-title-container">
        <h1 class="card-title">${cardData.name}</h1>
      </div>
      <div class="card-text-container">
        <p class="card-text">${cardData.description}</p>
      </div>
    </div>
  `;
}

const json = await loadConfig();
json.sites.forEach(buildCard);
