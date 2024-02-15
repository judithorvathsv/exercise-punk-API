let beers = []
let partResults = []
let beersArray = []

//show loader
document.getElementById('loaderDiv').style.display = 'flex'

//check localStorage
let storedBeers = localStorage.getItem('beersStorage')

if (storedBeers == 'undefined' || storedBeers == null) {
  //get all beers in array
  const fetchBeers = async page => {
    const url = `https://api.punkapi.com/v2/beers?page=${page}&per_page=80`
    const response = await fetch(url)
    return await response.json()
  }

  let fetchAllBeers = async () => {
    for (let i = 1; i < 6; i++) {
      await fetchBeers(i).then(beers => {
        beersArray = beersArray.concat(beers)
      })
    }
    return beersArray
  }

  //set localStorage from array then get one beer
  fetchAllBeers().then(allBeers => {
    localStorage.setItem('beersStorage', JSON.stringify(allBeers))
    checkHasOneBeerAndGetBeer(allBeers)
  })
} else {
  //get one beer
  let beers = JSON.parse(storedBeers)
  checkHasOneBeerAndGetBeer(beers)
}

function getBeer (beers) {
  //show loader
  document.getElementById('loaderDiv').style.display = 'flex'
  document.getElementById('card').style.opacity = 0

  if (beers == null) {
    beers = JSON.parse(localStorage.getItem('beersStorage'))
  }
  let randomId = Math.floor(Math.random() * 25 + 1)
  let randomBeer = beers.find(b => b.id == randomId)

  if (randomBeer == null || randomBeer == 'undefined') {
    return
  }
  document.getElementById('beerImage').src = randomBeer.image_url
  document.getElementById('beerName').innerText = randomBeer.name
  localStorage.setItem('beerId', randomBeer.id)
  //hide loader
  document.getElementById('loaderDiv').style.display = 'none'
  document.getElementById('card').style.opacity = 1
}

async function checkHasOneBeerAndGetBeer (beers) {
  let beerId = localStorage.getItem('beerId')
  if (typeof beerId == 'undefined' || beerId == null) {
    getBeer(beers)
  } else {
    let randomBeer = beers.find(b => b.id == beerId)
    if (randomBeer == null || randomBeer == 'undefined') {
      return
    }
    document.getElementById('beerImage').src = randomBeer.image_url
    document.getElementById('beerName').innerText = randomBeer.name
  }
}

//hide loader
document.getElementById('loaderDiv').style.display = 'none'
document.getElementById('card').style.opacity = 1

document
  .getElementById('randomButton')
  .addEventListener('click', () => getBeer())

document
  .getElementById('detailButton')
  .addEventListener('click', () => (window.location = 'details.html'))

document
  .getElementById('searchBeerButton')
  .addEventListener('click', () => (window.location = 'search.html'))

document
  .getElementById('advancedSearchBeerButton')
  .addEventListener('click', () => (window.location = 'advancedSearch.html'))
