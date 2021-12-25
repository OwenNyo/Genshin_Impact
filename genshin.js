const genshinNAME = localStorage.getItem("name");
const genshinListEl = document.querySelector(".genshin__container");
const genshinCEl = document.querySelector(".genshin__constellations--display");
let results = document.querySelector(".result");
let backgroundColor = document.querySelector('.genshin__landing')

async function renderCards(name) {
    const genshinInfo = await fetch(`https://api.genshin.dev/characters/${name}`);
    const genshinInfoJSON = await genshinInfo.json();
    let genshinVision = genshinInfoJSON.vision;
    console.log(genshinVision);

    results.innerHTML = `Results for ${genshinNAME}`     
    genshinListEl.innerHTML = genshinHTML(name,genshinInfoJSON);


    switch (genshinVision) {
      case 'Geo':
          backgroundColor.style.background = "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 10%, rgba(248,208,48,1) 100%)";
          break;
      case 'Anemo':
          backgroundColor.style.background = "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 10%, rgba(120,200,80,1) 100%)";
          break;
      case 'Pyro':
          backgroundColor.style.background = "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 10%, rgba(240,128,48,1) 100%)";
          break;
      case 'Cryo':
          backgroundColor.style.background = "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 10%, rgba(240,128,48,1) 100%)";
          break;
      case 'Hydro':
          backgroundColor.style.background = "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 10%, rgba(104,144,240,1) 100%)";
          break;
      case 'Electro':
          backgroundColor.style.background = "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 10%, rgba(248,88,136,1) 100%)";
          break;
      default:
          backgroundColor.style.backgroundColor = "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 10%, rgba(204,204,204,1) 80%)";
          break;
    }

    

}

// Genshin Results Display
function genshinHTML(genshinCharacters,genshinDetails) {
    return `<div class="genshin__information">
    <figure class="genshin__img--wrapper">
      <img class="" src="https://api.genshin.dev/characters/${genshinCharacters}/card">
    </figure>
    <div class="genshin__description">
    <h2>Name : ${genshinDetails.name}</h2>
    <h2>Vision : ${genshinDetails.vision}</h2>
    <h2>Weapon : ${genshinDetails.weapon}</h2>
    </div>
  </div>`;
}

async function loadConstellations(obj) {
  var id = obj.id;

  const genshinInfo = await fetch(`https://api.genshin.dev/characters/${genshinNAME}`);
  const genshinInfoJSON = await genshinInfo.json();
  console.log(genshinInfoJSON.constellations[0]);


  if(id === "C1")
  {genshinCEl.innerHTML = constellationsHTML(genshinInfoJSON.constellations[0])}
  else if(id === "C2")
  {genshinCEl.innerHTML = constellationsHTML(genshinInfoJSON.constellations[1])}
  else if(id === "C3")
  {genshinCEl.innerHTML = constellationsHTML(genshinInfoJSON.constellations[2])}
  else if(id === "C4")
  {genshinCEl.innerHTML = constellationsHTML(genshinInfoJSON.constellations[3])}
  else if(id === "C5")
  {genshinCEl.innerHTML = constellationsHTML(genshinInfoJSON.constellations[4])}
  else if(id === "C6")
  {genshinCEl.innerHTML = constellationsHTML(genshinInfoJSON.constellations[5])}
  else {}
}

function constellationsHTML(genshinConstellations) {
  return `<h2>Constellation Name : ${genshinConstellations.name}</h2>
  <h2>Constellation Description : ${genshinConstellations.description}</h2>`
}


renderCards(genshinNAME);