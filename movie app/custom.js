const apiKey = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.des&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1';

const imgPath = 'https://image.tmdb.org/t/p/w1280';

const searchApi = "https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query=";

const main = document.getElementById('main');
const form = document.getElementById('form');
const btn = document.getElementById('search');

getMovies(apiKey);

async function getMovies(url){
    const res = await fetch(url);
    const data = await res.json();

    showMovies(data.results)
}

function showMovies(movies){
    main.innerHTML = ``;
    movies.forEach(movie => {
        const {title,poster_path,vote_average, overview} = movie;

        const movieEl = document.createElement('div');

        movieEl.classList.add('movie');

        movieEl.innerHTML = `
        <img src='${imgPath + poster_path}' alt="${title}">

        <div class="movie-info">
        <h3>${title}</h3>
        <span class="${getClassByRate(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
        <h3>Overview</h3>
        ${overview}
        </div>
        `;
        main.append(movieEl);
    });
}

function getClassByRate(vot){
    if(vot >= 8){
        return 'green';
    }
    else if(vot >= 5){
        return 'orange';
    }
    else{
        return 'red';
    }
};

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = btn.value;
    getMovies(searchApi + searchTerm);
})