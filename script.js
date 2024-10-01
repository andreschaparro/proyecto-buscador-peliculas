// Crear una API KEY en https://www.themoviedb.org/settings/api
// Documentación: https://developer.themoviedb.org/docs/search-and-query-for-details 
const apiKey = 'd02ee54cac59ef38987b3910925698de'
const urlBase = 'https://api.themoviedb.org/3/search/movie'
const urlImg = 'https://image.tmdb.org/t/p/w200'
const resultsDiv = document.getElementById('results')

document.getElementById('searchButton').addEventListener('click', searchMovies)

function searchMovies() {
    // La siguiente línea mejora la experiencia del usuario al mostrarle que la página haciendo algo
    resultsDiv.innerHTML = 'Cargando...'
    const searchInput = document.getElementById('searchInput').value
    fetch(`${urlBase}?query=${searchInput}&api_key=${apiKey}`)
        .then(response => response.json())
        .then(response => displayMovies(response.results))
}

function displayMovies(movies) {
    resultsDiv.innerHTML = ''

    if (movies.length === 0) {
        resultsDiv.innerHTML = '<p>No se encontraron resultados para tu búsqueda</p>'
        return
    }

    movies.forEach(movie => {
        const movieDiv = document.createElement('div')
        movieDiv.classList.add('movie')

        const title = document.createElement('h2')
        title.textContent = movie.title

        const releaseDate = document.createElement('p')
        releaseDate.textContent = 'La fecha de lanzamiento fue: ' + movie.release_date

        const overview = document.createElement('p')
        overview.textContent = movie.overview

        const posterPath = urlImg + movie.poster_path
        const poster = document.createElement('img')
        poster.src = posterPath

        movieDiv.appendChild(poster)
        movieDiv.appendChild(title)
        movieDiv.appendChild(releaseDate)
        movieDiv.appendChild(overview)

        resultsDiv.appendChild(movieDiv)
    })
}