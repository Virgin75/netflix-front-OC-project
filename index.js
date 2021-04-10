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
    const title = document.getElementById('focus-title')
    title.innerText = movie.title
  })
}

fetchBestMovie().then((movies) => {
  let bestMovie = movies[0]
  let titre = document.getElementById('title')
  //titre.innerText = bestMovie.title
  //titre.setAttribute('movie-id', bestMovie.id)
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
  movie2.src = movies[1].image_url
  movie3.src = movies[2].image_url
  movie4.src = movies[3].image_url
  movie5.src = movies[4].image_url
  movie6.src = movies[5].image_url
  movie7.src = movies[6].image_url
  movie1.setAttribute('movie-id', movies[0].id)
  movie2.setAttribute('movie-id', movies[1].id)
  movie3.setAttribute('movie-id', movies[2].id)
  movie4.setAttribute('movie-id', movies[3].id)
  movie5.setAttribute('movie-id', movies[4].id)
  movie6.setAttribute('movie-id', movies[5].id)
  movie7.setAttribute('movie-id', movies[6].id)
})

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

const modalBtn = document.getElementById('open-modal')
modalBtn.addEventListener('click', function (event) {
  const modal = document.getElementById('modal')
  modal.setAttribute('class', 'modal visible')
})

const closeModalBtn = document.getElementById('close-modal')
closeModalBtn.addEventListener('click', function (event) {
  const modal = document.getElementById('modal')
  modal.setAttribute('class', 'modal invisible')
})
