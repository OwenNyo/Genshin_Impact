let searchQuery = "";
let results = document.querySelector(".result");
let search = document.getElementById("search__input");
const genshinListEl = document.querySelector(".genshins");
var slideIndex = 0;
showSlides();

async function renderGenshinAPI() {

  skeleton();

  // Genshin Characters are called here
  const res = await fetch("https://api.genshin.dev/characters/");
  const genshinCharacters = await res.json();
  console.log(genshinCharacters);

  // Genshin Details are called here
  const genshinDetails = await Promise.all(
    genshinCharacters.map(async (genshin) => {
      const res = await fetch(`https://api.genshin.dev/characters/${genshin}`);
      const genshinDetail = await res.json();
      return genshinDetail;
    })
  );
  console.log(genshinDetails);
  // Map genshinCharacter's index to match genshinDetails and map into innerhtml function
  genshinListEl.innerHTML = genshinCharacters.map((data, index) => {
    const data1 = genshinDetails[index];
    return genshinHTML(data, data1);
  }).join('');

  results.innerHTML = `Results for characters - ${genshinCharacters.length}`
}

// Function to detect "Enter" Key
function searchKeyPress(event) {
  event = event || window.event;
  if (event.key === "Enter") {
    searchQuery = search.value;
    renderGenshinAPI();
    return false;
  }
  return true;
}

// Button to start method
function renderGenshin() {
  renderGenshinAPI();
}

// Skeleton Loading State
function skeleton() {
  skeletonHTML = `<div class="genshin">
                      <figure>
                          <img class="skeleton-image skeleton">
                      </figure>
                      <h2 class="skeleton-title skeleton"></h2>
                      <div class="skeleton-type skeleton"></div>
                  </div>`;
  genshinListEl.innerHTML = skeletonHTML.repeat(10);
}

// Genshin Results Display
function genshinHTML(genshinCharacters, genshinDetails) {
  return `<div class="genshin" onclick="showUserPosts('${genshinCharacters}')">
  <figure class="genshin__img--wrapper">
    <img class="" src="https://api.genshin.dev/characters/${genshinCharacters}/card">
  </figure>
  <h2 class="genshin__character">${genshinDetails.name}</h2>
  <h2 class="genshin__element">${genshinDetails.vision}</h2>
</div>`;
}

// Genshin Image Slider
function showSlides() {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
  setTimeout(showSlides, 4000); // Change image every 2 seconds
}

function showUserPosts(name) {
  localStorage.setItem("name", name)
  window.location.href = `genshin.html`
}

