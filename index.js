const endpoint = 'http://localhost:8000/api/v1/titles/'

async function fetchBestMovie() {
  const response = await fetch(endpoint + '?sort_by=-imdb_score&page=1')
  const movies = await response.json()
  return movies.results
}

async function fetchMovieDetails(id) {
  const resp = await fetch(endpoint + id)
  const movie = resp.json()
  return movie
}

async function fetchTopMovies(genre) {
  const page1 = await fetch(
    endpoint + '?sort_by=-imdb_score&' + 'genre=' + genre + '&' + 'page=1'
  )
  const page2 = await fetch(
    endpoint + '?sort_by=-imdb_score&' + 'genre=' + genre + '&' + 'page=2'
  )
  const moviesPage1 = await page1.json()
  const moviesPage2 = await page2.json()
  const movies = [moviesPage1.results, moviesPage2.results].flat()
  if (genre == '') {
    // Si on récupère juste le Top 7, on supprime le 1er film car déjà affiché dans la section en haut de page
    movies.shift()
  } else {
    movies.pop()
  }
  movies.pop()
  movies.pop()
  return movies
}

// On fetch les données du film mis en avant en haut de page puis on l'ajoute dans le HTML
fetchBestMovie().then((movies) => {
  let bestMovie = movies[0]
  let titre = document.getElementById('featured-title')
  let img = document.getElementById('featured-img')
  let btn = document.getElementById('featured-button')

  titre.innerText = bestMovie.title
  btn.setAttribute('movie-id', bestMovie.id)
  img.src = bestMovie.image_url
  fetchMovieDetails(bestMovie.id).then((movie_details) => {
    let desc = document.getElementById('featured-desc')
    desc.innerText = movie_details.description
  })
})

// On fetch les données des sliders puis on les ajoute dans le HTML
var sliders_data = [
  [fetchTopMovies(''), 'top7'],
  [fetchTopMovies('Action'), 'action'],
  [fetchTopMovies('Animation'), 'animation'],
  [fetchTopMovies('Family'), 'family'],
]
for (let i = 0; i < sliders_data.length; i++) {
  sliders_data[i][0].then((movies) => {

    let customID = sliders_data[i][1]

    for (let j = 1; j <= 7; j++) {
      let movie = document.getElementById('movie'+ j + '-' + customID)
      movie.src = movies[j-1].image_url
      movie.alt = 'Cover picture of movie: ' + movies[j-1].title
      movie.setAttribute('movie-id', movies[j-1].id)
    }
   
  })
}

// Fonction appelé lorsque l'on clique sur un film afin d'ouvrir un modal avec les infos du film
function getMovieDetails(id) {
  console.log(id)
  fetchMovieDetails(id).then((movie) => {
    console.log(movie)
    // On ouvre le modal
    const modal = document.getElementById('modal')
    modal.setAttribute('class', 'modal visible')
    const backgroundDiv = document.getElementById('modal-black-background')
    backgroundDiv.setAttribute('class', 'visible')
    // On ajoute les valeurs du film
    const title = document.getElementById('focus-title')
    const img = document.getElementById('focus-img')
    const genre = document.getElementById('focus-genre')
    const date = document.getElementById('focus-date')
    const rated = document.getElementById('focus-rated')
    const score = document.getElementById('focus-score')
    const director = document.getElementById('focus-director')
    const actors = document.getElementById('focus-actors')
    const duration = document.getElementById('focus-duration')
    const country = document.getElementById('focus-country')
    const results = document.getElementById('focus-results')
    const resume = document.getElementById('focus-resume')

    title.innerText = movie.title
    img.src = movie.image_url
    genre.innerHTML = '<b>Genre.s :</b> ' + movie.genres.toString()
    date.innerHTML = '<b>Date de sortie :</b> ' + movie.date_published
    rated.innerHTML = '<b>Rated :</b> ' + movie.rated
    score.innerHTML = '<b>Note IMDB :</b> ' + movie.imdb_score
    director.innerHTML = '<b>Réalisateur.s :</b> ' + movie.directors.toString()
    actors.innerHTML = '<b>Acteur.s :</b> ' + movie.actors.toString()
    duration.innerHTML = '<b>Durée (minutes) :</b> ' + movie.duration
    country.innerHTML = '<b>Pays :</b> ' + movie.countries.toString()
    results.innerHTML =
      '<b>Revenus box-office :</b> ' + movie.worldwide_gross_income
    resume.innerHTML = '<b>Résumé :</b> ' + movie.long_description
  })
}

// Fermeture du modal
const closeModalBtn = document.getElementById('close-modal')
closeModalBtn.addEventListener('click', function (event) {
  const modal = document.getElementById('modal')
  modal.setAttribute('class', 'modal invisible')
  const backgroundDiv = document.getElementById('modal-black-background')
  backgroundDiv.setAttribute('class', 'invisible')
})

//Gestions des clics sur les boutons suivants et précédents dans les sliders
const btnData = ['top7', 'action', 'animation', 'family']
for (let i = 0; i < 4; i++) {
  let customID = btnData[i]
  const rightBtn = document.getElementById('swipe-right-' + customID)
  const leftBtn = document.getElementById('swipe-left-' + customID)

  rightBtn.addEventListener('click', function (event) {
    event.preventDefault()
    const conent = document.getElementById(customID + '-scrollable')
    conent.scrollLeft += 300
  })

  leftBtn.addEventListener('click', function (event) {
    event.preventDefault()
    const conent = document.getElementById(customID + '-scrollable')
    conent.scrollLeft -= 300
  })
}
