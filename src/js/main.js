import { API_KEY } from '../utils/secrets.js';
import {
    trendingMoviesPreviewList,
    categoriesPreviewList,
    genericSection,
    trendingPreviewSection,
    movieDetailTitle,
    movieDetailDescription,
    movieDetailScore,
    movieDetailCategoriesList,
    headerSection,
    relatedMoviesContainer,
    likedMovies
} from "./nodes.js";

let page = 1;
let maxPage;
const language = window.navigator.language;
const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        'Content-Type' : 'application/json;charset=utf-8'
    },
    params: {
        'api_key': API_KEY,
        "language": language,
    },
});

function likedMoviesList() {
    const item = JSON.parse(localStorage.getItem('liked_movies'));
    let movies;

    if (item) {
        movies = item;
    } else {
        movies = {};
    }

    return movies;
}

function likeMovie(movie) {
    const likedMovies = likedMoviesList();
    console.log(likedMovies)
    if (likedMovies[movie.id]) {
        likedMovies[movie.id] = undefined;
    } else {
        likedMovies[movie.id] = movie;
    }

    localStorage.setItem('liked_movies', JSON.stringify(likedMovies));
}

// utils
const lazyLoader = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log({entry})
        if(entry.intersectionRatio) {
            const url = entry.target.getAttribute('data-img')
            entry.target.setAttribute('src', url)
        }
    })
});
//helpers
function createMovies (movies, container, {lazyLoad = false, clean = true} = {}, ){
    if(clean){
        container.innerHTML = '';
    }


    movies.forEach(movie => {
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');


        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute(lazyLoad ? 'data-img' : 'src', 'https://image.tmdb.org/t/p/w300' + movie.poster_path);
        movieImg.addEventListener('click', () =>{
            location.hash = '#movie=' + movie.id;
        })
        movieImg.addEventListener('error', () =>{
            movieImg.setAttribute('src', 'https://static.platzi.com/static/images/error/img404.png')
        })

        const movieBtn = document.createElement('button');
        movieBtn.classList.add('movie-btn');
        likedMoviesList()[movie.id] && movieBtn.classList.add('#movie-btn--liked');
        movieBtn.addEventListener('click', () => {
            movieBtn.classList.toggle('movie-btn--liked');
            likeMovie(movie);
        })

        if(lazyLoad){
            lazyLoader.observe(movieImg)
        }

        movieContainer.appendChild(movieImg);
        movieContainer.appendChild(movieBtn)
        container.appendChild(movieContainer);
    });
}

function createCategories (categories, container){
    container.innerHTML = "";
    categories.forEach(category => {

        const categoryContainer = document.createElement('div');
        categoryContainer.classList.add('category-container');

        const categoryTitle = document.createElement('h3');
        categoryTitle.classList.add('category-title');
        categoryTitle.setAttribute('id', 'id' +  category.id);
        categoryTitle.addEventListener('click', () => {
            location.hash = `#category=${category.id}-${category.name}`;
        })
        const categoryTitleText = document.createTextNode(category.name)

        categoryTitle.appendChild(categoryTitleText);
        categoryContainer.appendChild(categoryTitle);
        container.appendChild(categoryContainer)
    });
}
// exportables functions

export async function getTrendingMoviesPreview(){
    const {data} = await api('trending/movie/day');
    const movies = data.results;
    console.log({data, movies});
    trendingMoviesPreviewList.innerHTML = "";
    createMovies(movies, trendingMoviesPreviewList, true)
}

export async function getCategoriesPreview(){
    const {data} = await api('genre/movie/list');
    const categories = data.genres;
    categoriesPreviewList.innerHTML = "";
    createCategories(categories, categoriesPreviewList)
}

export async function getMoviesByCategories(id){
    console.log(`fetching movies for category id: ${id}`);
    const {data} = await api('discover/movie', {
        params:{
            with_genres: id,
        }
    });
    const movies = data.results;
    genericSection.innerHTML = "";
    createMovies(movies, genericSection, true)
}

export async function getMoviesBySearch(query){
    const {data} = await api('search/movie', {
        params:{
            query: query,
        }
    });
    const movies = data.results;
    createMovies(movies, genericSection)
}

export function getPaginatedMoviesBySearch(query) {
    return async function () {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        const scrollIsBottom = (scrollTop + clientHeight) >= (scrollHeight - 15);

        const pageIsNotMax = page <= maxPage;
        if(scrollIsBottom && pageIsNotMax){
            page++;
            const {data} = await api('search/movie', {
                params:{
                    query,
                    page,
                }
            });
            const movies = data.results;
            maxPage = data.total_pages;
            createMovies(movies, genericSection, { lazyLoad: true, clean: false });
        }
    }
}

export async function getTrendingMovies() {
    const { data } = await api('trending/movie/day');
    const movies = data.results;
    createMovies(movies, genericSection, { lazyLoad: true, clean: true });
}

export async function getPaginatedTrendingMovies() {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    const scrollIsBottom = (scrollTop + clientHeight) >= (scrollHeight - 15);
    const pageIsNotMax = page <= maxPage;
    if(scrollIsBottom && pageIsNotMax){
        page++;
        const { data } = await api('trending/movie/day', {
            params: {
                page,
            },
        });
        console.log('aqui', data);
        const movies = data.results;
        createMovies(movies, genericSection, { lazyLoad: true, clean: false });
        }
}


export async function getMovieById(id){
    const {data: movie} = await api('movie/' + id);
    const movieImageUrl = 'https://image.tmdb.org/t/p/w300' + movie.poster_path;
    headerSection.style.background =
        `linear-gradient(180deg, rgba(0, 0, 0, 0.35) 19.27%, rgba(0, 0, 0, 0) 29.17%), 
        url(${movieImageUrl})
        `;
    movieDetailTitle.textContent = movie.title;
    movieDetailDescription.textContent = movie.overview;
    movieDetailScore.textContent = movie.vote_average.toFixed(1);

    createCategories(movie.genres, movieDetailCategoriesList)
    getRelatedMoviesId(id);
}
async function getRelatedMoviesId(id){
    const { data } = await api(`movie/${id}/recommendations`);
    const relatedMovies = data.results;

    createMovies(relatedMovies, relatedMoviesContainer);
}

export function getLikedMovies (){
    const likedMovie= likedMoviesList();
    const moviesArray = Object.values(likedMovie);

    createMovies(moviesArray, likedMovies, {lazyLoad: false, clean: true});

}