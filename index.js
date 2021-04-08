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
  })
}

fetchBestMovie().then((movies) => {
  let bestMovie = movies[0]
  let titre = document.getElementById('title')
  titre.innerText = bestMovie.title
  titre.setAttribute('movie-id', bestMovie.id)
})

fetch7BestFamilyMovies().then((movies) => {
  let movie1 = document.getElementById('movie1')
  movie1.innerText = movies[2].title
})
