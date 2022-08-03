let addBeer = false;
const beerUrl = 'https://api.punkapi.com/v2/beers/';
const localHost = 'http://localhost:3000/'
const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
}
let beers = [];
const beerCollection = document.getElementById('beer-collection');
const addBtn = document.querySelector('#new-beer-btn');
const beerFormContainer = document.querySelector('.container');
addBtn.addEventListener('click', () => {
  //hide & seek with the form
  addBeer = !addBeer;
  if (addBeer) {
    beerFormContainer.style.display = "block";
  } else {
    beerFormContainer.style.display = "none";
  }
});
document.querySelector('.add-beer-form').addEventListener('submit', createNewBeer);
function createNewBeer(e) {
  e.preventDefault();
  const beerData = {
    name: e.target.name.value,
    tagline: e.target.tagline.value,
    image_url: e.target.image.value,
    abv: e.target.abv.value,
    food_pairing: e.target.food_pairing.value
  };
  fetch("http://localhost:3000/beers", {
    method: 'POST',
    headers,
    body: JSON.stringify(beerData),
  })
    .then((res) => res.json())
    .then(renderBeer);
}
//fetch and add beers
fetch(beerUrl)
  .then((res) => res.json())
  .then((json) => {
    beers = json;
    renderBeers()
  });
function renderBeers() {
  beerCollection.innerHTML = '';
  beers.forEach(renderBeer);
}
function renderBeer(beer) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.innerHTML = `
  <h2>${beer.name}</h2>
  <p>${beer.tagline}</p>
  <p>${beer.abv}% ABV</p>
  <img src = "${beer.image_url}" class = "beer-avatar" />
  <p> Pairs with <br> ${beer.food_pairing}</p>
  <button class="like-btn"> Favorite </button>
  `;
  card.querySelector('button').addEventListener('click', (e) => {
    fetch(`${beerUrl}/${beer.id}`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify({ likes: beer.likes + 1 }),
    })
      .then((res) => res.json())
      .then((json) => {
        beer.likes = json.likes;
        renderBeers();
      });
  });
  beerCollection.append(card);
}
const el = document.getElementById('box');
const hiddenEl = document.getElementById('hidden');
let darkLight = document.querySelector("#dark-light")
darkLight.addEventListener("click", () => {
  let curClass = document.getElementsByTagName('body')[0].className;
  if (curClass === "light") {
    document.getElementsByTagName('body')[0].className = "dark"
  } else {
    document.getElementsByTagName('body')[0].className = "light"
  }
})
var age = prompt ('Please enter your age verification process');
if(age < 21){
  alert('Sorry you cant drink right now')
  window.location.href = ("https://www.youtube.com/watch?v=dQw4w9WgXcQ")
}
else if(age >= 21){
  alert(('Welcome you JaBroni'))
  console.log(age)
}