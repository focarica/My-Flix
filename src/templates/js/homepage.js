function pressedEnterKey(){
    if(event.key === "Enter"){
        allMovies()
    }
}

async function searchMovie(){
    document.getElementById('foundMoviesContainer').style.display='block'
    var search = document.getElementById('searchForm').value

    const api_key = 'YOUR API KEY'
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${search}&language=pt-BR`

    const response = await axios.get(url)
    const allMoviesFind = response.data

    return allMoviesFind['results']
}

async function allMovies(){
    const list = document.getElementById('resultFilmList')
    list.innerHTML = ''

    const allMoviesFind = await searchMovie()


    allMoviesFind.forEach(element => {
        var movieId = element['id']

        const item = document.createElement('li')
        item.className = "list-group-item card"
        item.id = "foundFilms"

        item.innerHTML = `<div class="row">
                            <div class="col-md-1 col-sm-2 mb-3 mt-3 px-4">
                                <img src="https://image.tmdb.org/t/p/original/${element['poster_path']}" alt="movie poster" id=imgPoster>
                            </div>
                            <div class="px-4 col-md-8 col-sm-7">
                                <h5><a href="#">${element['title']}</a></h5>
                                <h6>${element['overview']}</h6>
                            </div>
                            <div class="col-md-3 d-flex justify-content-center align-items-center">
                                <div class="col-md-4">
                                    <i class="fa-solid fa-eye" id="${movieId}" onclick="saveToWatchedList(${movieId})"></i>
                                    <h6 onclick="saveToWatchedList(${movieId})">Watch</h6>
                                </div>
                                
                            </div>
                        </div>`
        
        list.append(item)

    });
}

async function hideSearch(){
    document.addEventListener('mouseup', function(event) {
        const element = document.getElementById('foundMoviesContainer')

        if(!(event.target.closest("#foundMoviesContainer"))){
            element.style.display = 'none'
        }
    })
}


async function saveToWatchedList(id){
    const api_key = 'YOUR API KEY'
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}`)
    const data = response.data

    const movieName = data['original_title']
    const movieDate = data['release_date']
    const movieRating = data['vote_average']


    const iconSave = document.getElementById(id)
    iconSave.addEventListener('click', toSave)

    async function toSave(){
        event.preventDefault()
        await axios.post('http://localhost:8000/movies', {name: movieName, date: movieDate, rating: movieRating, movieId: id})
    }
}

async function getWatchedList(){
    const api_key = 'YOUR API KEY'
    const response = await axios.get('http://localhost:8000/movies')
    const watchedMovies = response.data
    
    console.log(watchedMovies)

    for (const movie of watchedMovies){
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movie['movieId']}?api_key=${api_key}`)
        const data = response.data

        const movieRow = document.getElementById('lastedViewed')

        const item = document.createElement('img')
        
        item.id = "watchedMoviePoster"
        item.src = `https://image.tmdb.org/t/p/original/${data['poster_path']}`

        movieRow.append(item)
    }
}

function app(){
    allMovies()
    getWatchedList()
    hideSearch()
}

app()
