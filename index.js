let contrastToggle = false;
let searchQuery = "";
let results = document.querySelector(".result");
let search = document.getElementById("search__input");
const genshinListEl = document.querySelector(".genshins");

function toggleContrast() {
  contrastToggle = !contrastToggle;
  if (contrastToggle) {
    document.body.classList += " dark-theme";
  } else {
    document.body.classList.remove("dark-theme");
  }
}

async function main() {

  skeleton();
  
  // Call Genshin APi
  const genshinAPI = await fetch(
    "https://api.genshin.dev/characters/" + searchQuery
  ).catch((error) => {
    console.log("here!!");
    console.error(error.response);
  });


  // Get genshin data in json format
  const genshinDataResults = await genshinAPI.json();
  console.log(genshinDataResults);

  genshinListEl.innerHTML = `<div class="genshin">
                              <figure class="genshin__img--wrapper">
                                <img class="genshin__img" alt="" src="https://api.genshin.dev/characters/${search.value}/card">
                              </figure>
                              <h2 class="genshin__character">${genshinDataResults.name}</h2>
                              <div class="genshin__element">${genshinDataResults.vision}</div>
                            </div>`;

  results.innerHTML = `Results for "${search.value}"`;
}

//Function to detect "Enter" Key
function searchKeyPress(event) {
  event = event || window.event;
  if (event.key === "Enter") {
    searchQuery = search.value;
    main();
    return false;
  }
  return true;
}

function skeleton() {
  skeletonHTML = `<div class="genshin">
                      <figure>
                          <img class="skeleton-image skeleton">
                      </figure>
                      <h2 class="skeleton-title skeleton"></h2>
                      <div class="skeleton-type skeleton"></div>
                  </div>`
  genshinListEl.innerHTML = skeletonHTML.repeat(10);
}
