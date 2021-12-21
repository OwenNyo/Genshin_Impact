const name = localStorage.getItem("name");

async function renderCards(name) {
    const genshinInfo = await fetch(`https://api.genshin.dev/characters/${name}`);
    const genshinInfoJSON = await genshinInfo.json();
    console.log(genshinInfoJSON);
}

renderCards(name);