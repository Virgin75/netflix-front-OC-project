const endpoint = 'http://localhost:8000/api/v1/titles/'

async function fetchBestMovie() {
  const response = await fetch(endpoint + '?sort_by=-imdb_score&page=1')
  const movies = await response.json()
  return movies.results
}

async function fetchFollowing7BestMovies() {
  const page1 = await fetch(endpoint + '?sort_by=-imdb_score&page=1')
  const page2 = await fetch(endpoint + '?sort_by=-imdb_score&page=2')
  const moviesPage1 = await page1.json()
  const moviesPage2 = await page2.json()
  const movies = [moviesPage1.results, moviesPage2.results].flat()
  movies.shift()
  movies.pop()
  movies.pop()
  return movies
}

async function fetch7BestActionMovies() {
  const page1 = await fetch(
    endpoint + '?sort_by=-imdb_score&genre=Action&page=1'
  )
  const page2 = await fetch(
    endpoint + '?sort_by=-imdb_score&genre=Action&page=2'
  )
  const moviesPage1 = await page1.json()
  const moviesPage2 = await page2.json()
  const movies = [moviesPage1.results, moviesPage2.results].flat()
  movies.pop()
  movies.pop()
  movies.pop()
  return movies
}

async function fetch7BestAnimationMovies() {
  const page1 = await fetch(
    endpoint + '?sort_by=-imdb_score&genre=Animation&page=1'
  )
  const page2 = await fetch(
    endpoint + '?sort_by=-imdb_score&genre=Animation&page=2'
  )
  const moviesPage1 = await page1.json()
  const moviesPage2 = await page2.json()
  const movies = [moviesPage1.results, moviesPage2.results].flat()
  movies.pop()
  movies.pop()
  movies.pop()
  return movies
}

async function fetch7BestFamilyMovies() {
  const page1 = await fetch(
    endpoint + '?sort_by=-imdb_score&genre=Family&page=1'
  )
  const page2 = await fetch(
    endpoint + '?sort_by=-imdb_score&genre=Family&page=2'
  )
  const moviesPage1 = await page1.json()
  const moviesPage2 = await page2.json()
  const movies = [moviesPage1.results, moviesPage2.results].flat()
  movies.pop()
  movies.pop()
  movies.pop()
  return movies
}

async function fetchMovieDetails(id) {
  const resp = await fetch(endpoint + id)
  const movie = resp.json()
  return movie
}
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

fetchFollowing7BestMovies().then((movies) => {
  let movie1 = document.getElementById('movie1-top7')
  let movie2 = document.getElementById('movie2-top7')
  let movie3 = document.getElementById('movie3-top7')
  let movie4 = document.getElementById('movie4-top7')
  let movie5 = document.getElementById('movie5-top7')
  let movie6 = document.getElementById('movie6-top7')
  let movie7 = document.getElementById('movie7-top7')
  movie1.src = movies[0].image_url
  movie1.alt = 'Cover picture of movie: ' + movies[0].title
  movie2.src = movies[1].image_url
  movie2.alt = 'Cover picture of movie: ' + movies[1].title
  movie3.src = movies[2].image_url
  movie3.alt = 'Cover picture of movie: ' + movies[2].title
  movie4.src = movies[3].image_url
  movie4.alt = 'Cover picture of movie: ' + movies[3].title
  movie5.src = movies[4].image_url
  movie5.alt = 'Cover picture of movie: ' + movies[4].title
  movie6.src = movies[5].image_url
  movie6.alt = 'Cover picture of movie: ' + movies[5].title
  movie7.src = movies[6].image_url
  movie7.alt = 'Cover picture of movie: ' + movies[6].title
  movie1.setAttribute('movie-id', movies[0].id)
  movie2.setAttribute('movie-id', movies[1].id)
  movie3.setAttribute('movie-id', movies[2].id)
  movie4.setAttribute('movie-id', movies[3].id)
  movie5.setAttribute('movie-id', movies[4].id)
  movie6.setAttribute('movie-id', movies[5].id)
  movie7.setAttribute('movie-id', movies[6].id)
})

fetch7BestActionMovies().then((movies) => {
  let movie1 = document.getElementById('movie1-action')
  let movie2 = document.getElementById('movie2-action')
  let movie3 = document.getElementById('movie3-action')
  let movie4 = document.getElementById('movie4-action')
  let movie5 = document.getElementById('movie5-action')
  let movie6 = document.getElementById('movie6-action')
  let movie7 = document.getElementById('movie7-action')
  movie1.src = movies[0].image_url
  movie1.alt = 'Cover picture of movie: ' + movies[0].title
  movie2.src = movies[1].image_url
  movie2.alt = 'Cover picture of movie: ' + movies[1].title
  movie3.src = movies[2].image_url
  movie3.alt = 'Cover picture of movie: ' + movies[2].title
  movie4.src = movies[3].image_url
  movie4.alt = 'Cover picture of movie: ' + movies[3].title
  movie5.src = movies[4].image_url
  movie5.alt = 'Cover picture of movie: ' + movies[4].title
  movie6.src = movies[5].image_url
  movie6.alt = 'Cover picture of movie: ' + movies[5].title
  movie7.src = movies[6].image_url
  movie7.alt = 'Cover picture of movie: ' + movies[6].title
  movie1.setAttribute('movie-id', movies[0].id)
  movie2.setAttribute('movie-id', movies[1].id)
  movie3.setAttribute('movie-id', movies[2].id)
  movie4.setAttribute('movie-id', movies[3].id)
  movie5.setAttribute('movie-id', movies[4].id)
  movie6.setAttribute('movie-id', movies[5].id)
  movie7.setAttribute('movie-id', movies[6].id)
})

fetch7BestAnimationMovies().then((movies) => {
  let movie1 = document.getElementById('movie1-animation')
  let movie2 = document.getElementById('movie2-animation')
  let movie3 = document.getElementById('movie3-animation')
  let movie4 = document.getElementById('movie4-animation')
  let movie5 = document.getElementById('movie5-animation')
  let movie6 = document.getElementById('movie6-animation')
  let movie7 = document.getElementById('movie7-animation')
  movie1.src = movies[0].image_url
  movie1.alt = 'Cover picture of movie: ' + movies[0].title
  movie2.src = movies[1].image_url
  movie2.alt = 'Cover picture of movie: ' + movies[1].title
  movie3.src = movies[2].image_url
  movie3.alt = 'Cover picture of movie: ' + movies[2].title
  movie4.src = movies[3].image_url
  movie4.alt = 'Cover picture of movie: ' + movies[3].title
  movie5.src = movies[4].image_url
  movie5.alt = 'Cover picture of movie: ' + movies[4].title
  movie6.src = movies[5].image_url
  movie6.alt = 'Cover picture of movie: ' + movies[5].title
  movie7.src = movies[6].image_url
  movie7.alt = 'Cover picture of movie: ' + movies[6].title
  movie1.setAttribute('movie-id', movies[0].id)
  movie2.setAttribute('movie-id', movies[1].id)
  movie3.setAttribute('movie-id', movies[2].id)
  movie4.setAttribute('movie-id', movies[3].id)
  movie5.setAttribute('movie-id', movies[4].id)
  movie6.setAttribute('movie-id', movies[5].id)
  movie7.setAttribute('movie-id', movies[6].id)
})

fetch7BestFamilyMovies().then((movies) => {
  let movie1 = document.getElementById('movie1-family')
  let movie2 = document.getElementById('movie2-family')
  let movie3 = document.getElementById('movie3-family')
  let movie4 = document.getElementById('movie4-family')
  let movie5 = document.getElementById('movie5-family')
  let movie6 = document.getElementById('movie6-family')
  let movie7 = document.getElementById('movie7-family')
  movie1.src = movies[0].image_url
  movie1.alt = 'Cover picture of movie: ' + movies[0].title
  movie2.src = movies[1].image_url
  movie2.alt = 'Cover picture of movie: ' + movies[1].title
  movie3.src = movies[2].image_url
  movie3.alt = 'Cover picture of movie: ' + movies[2].title
  movie4.src = movies[3].image_url
  movie4.alt = 'Cover picture of movie: ' + movies[3].title
  movie5.src = movies[4].image_url
  movie5.alt = 'Cover picture of movie: ' + movies[4].title
  movie6.src = movies[5].image_url
  movie6.alt = 'Cover picture of movie: ' + movies[5].title
  movie7.src = movies[6].image_url
  movie7.alt = 'Cover picture of movie: ' + movies[6].title
  movie1.setAttribute('movie-id', movies[0].id)
  movie2.setAttribute('movie-id', movies[1].id)
  movie3.setAttribute('movie-id', movies[2].id)
  movie4.setAttribute('movie-id', movies[3].id)
  movie5.setAttribute('movie-id', movies[4].id)
  movie6.setAttribute('movie-id', movies[5].id)
  movie7.setAttribute('movie-id', movies[6].id)
})

//Boutons suivant et précédent section TOP7
const rightBtnTop7 = document.getElementById('swipe-right-top7')
const leftBtnTop7 = document.getElementById('swipe-left-top7')

rightBtnTop7.addEventListener('click', function (event) {
  const conent = document.getElementById('top7-scrollable')
  conent.scrollLeft += 300
  event.preventDefault()
})

leftBtnTop7.addEventListener('click', function (event) {
  const conent = document.getElementById('top7-scrollable')
  conent.scrollLeft -= 300
  event.preventDefault()
})

//Boutons suivant et précédent section ACTION
const rightBtnAction = document.getElementById('swipe-right-action')
const leftBtnAction = document.getElementById('swipe-left-action')

rightBtnAction.addEventListener('click', function (event) {
  const conent = document.getElementById('action-scrollable')
  conent.scrollLeft += 300
  event.preventDefault()
})

leftBtnAction.addEventListener('click', function (event) {
  const conent = document.getElementById('action-scrollable')
  conent.scrollLeft -= 300
  event.preventDefault()
})

//Boutons suivant et précédent section ANIMATION
const rightBtnAnimation = document.getElementById('swipe-right-animation')
const leftBtnAnimation = document.getElementById('swipe-left-animation')

rightBtnAnimation.addEventListener('click', function (event) {
  const conent = document.getElementById('animation-scrollable')
  conent.scrollLeft += 300
  event.preventDefault()
})

leftBtnAnimation.addEventListener('click', function (event) {
  const conent = document.getElementById('animation-scrollable')
  conent.scrollLeft -= 300
  event.preventDefault()
})

//Boutons suivant et précédent section FAMILY
const rightBtnFamily = document.getElementById('swipe-right-family')
const leftBtnFamily = document.getElementById('swipe-left-family')

rightBtnFamily.addEventListener('click', function (event) {
  const conent = document.getElementById('family-scrollable')
  conent.scrollLeft += 300
  event.preventDefault()
})

leftBtnFamily.addEventListener('click', function (event) {
  const conent = document.getElementById('family-scrollable')
  conent.scrollLeft -= 300
  event.preventDefault()
})

// Fermeture du modal
const closeModalBtn = document.getElementById('close-modal')
closeModalBtn.addEventListener('click', function (event) {
  const modal = document.getElementById('modal')
  modal.setAttribute('class', 'modal invisible')
  const backgroundDiv = document.getElementById('modal-black-background')
  backgroundDiv.setAttribute('class', 'invisible')
})
