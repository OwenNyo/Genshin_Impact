const genshinNAME = localStorage.getItem("name");
const genshinListEl = document.querySelector(".genshin__container");
let results = document.querySelector(".result");

async function renderCards(name) {
    const genshinInfo = await fetch(`https://api.genshin.dev/characters/${name}`);
    const genshinInfoJSON = await genshinInfo.json();
    console.log(genshinInfoJSON);
    results.innerHTML = `Results for ${genshinNAME} - ${genshinNAME.length}`     
    genshinListEl.innerHTML = genshinHTML(name,genshinInfoJSON);

}

// Genshin Results Display
function genshinHTML(genshinCharacters,genshinDetails) {
    return `<div class="genshin__information">
    <figure class="genshin__img--wrapper">
      <img class="" src="https://api.genshin.dev/characters/${genshinCharacters}/card">
    </figure>
    <div class="genshin__description">
    <h2 class="genshin__name">Name : ${genshinDetails.name}</h2>
    <h2 class="genshin__vision">Vision : ${genshinDetails.vision}</h2>
    <h2>Weapon : ${genshinDetails.weapon}</h2>
    </div>
  </div>`;
}

renderCards(genshinNAME);