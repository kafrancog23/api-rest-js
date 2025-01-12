// navigation.js

let infiniteScroll;
window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);
window.addEventListener('scroll', () => {
    if (infiniteScroll) infiniteScroll();
}, { passive: false });

import {
    getTrendingMoviesPreview,
    getCategoriesPreview,
    getMoviesByCategories,
    getMoviesBySearch,
    getTrendingMovies,
    getMovieById,
    getPaginatedTrendingMovies, getPaginatedMoviesBySearch, getLikedMovies
} from './main.js';
import {
    headerSection,
    arrowBtn,
    movieDetailSection,
    genericSection,
    headerTitle,
    headerCategoryTitle,
    categoriesPreviewSection,
    trendingPreviewSection,
    searchForm,
    categoriesPreviewList,
    searchFormBtn,
    movieDetailTitle,
    movieDetailScore,
    movieDetailDescription,
    searchFormInput,
    movieDetailCategoriesList,
    trendingBtn,
    trendingMoviesPreviewList,
    relatedMoviesContainer,
    likedMoviesSection, likedMovies
} from "./nodes.js";

searchFormBtn.addEventListener('click', () => {
    location.hash = '#search=' + searchFormInput.value;
});

trendingBtn.addEventListener('click', () => {
    location.hash = '#trends';
});

arrowBtn.addEventListener('click', () => {
    history.back();
});

function navigator() {
    if (infiniteScroll) {
        window.removeEventListener('scroll', infiniteScroll, { passive: false });
        infiniteScroll = undefined;
    }

    if (location.hash.startsWith('#trends')) {
        trendsPage();
    } else if (location.hash.startsWith('#search=')) {
        searchPage();
    } else if (location.hash.startsWith('#movie=')) {
        movieDetailsPage();
    } else if (location.hash.startsWith('#category=')) {
        categoriesPage();
    } else {
        homePage();
    }
    window.scrollTo(0, 0);

    if (infiniteScroll) {
        window.addEventListener('scroll', infiniteScroll, { passive: false });
    }
}

function homePage() {

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    headerTitle.classList.remove('inactive');

    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.remove('inactive');
    likedMoviesSection.classList.remove('inactive');
    categoriesPreviewSection.classList.remove('inactive');
    genericSection.classList.add('inactive');

    movieDetailSection.classList.add('inactive');
    getTrendingMoviesPreview();
    getCategoriesPreview();
    getLikedMovies();
}

function categoriesPage() {

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerCategoryTitle.classList.remove('inactive');
    headerTitle.classList.add('inactive');

    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.add('inactive');
    likedMoviesSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');

    movieDetailSection.classList.add('inactive');
    const [_, categoryData] = location.hash.split('=');
    const [categoryId, categoryName] = categoryData.split('-');
    headerCategoryTitle.innerHTML = categoryName;

    getMoviesByCategories(categoryId);
}

function movieDetailsPage() {

    headerSection.classList.add('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    headerCategoryTitle.classList.add('inactive');
    arrowBtn.classList.add('header-arrow--white');
    headerTitle.classList.add('inactive');

    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    likedMoviesSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.add('inactive');

    movieDetailSection.classList.remove('inactive');
    const [_, id] = location.hash.split('=');
    getMovieById(id);
}

function searchPage() {

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerCategoryTitle.classList.add('inactive');
    headerTitle.classList.add('inactive');

    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.add('inactive');
    likedMoviesSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');

    movieDetailSection.classList.add('inactive');

    const [_, query] = location.hash.split('=');
    getMoviesBySearch(query);

    infiniteScroll = getPaginatedMoviesBySearch(query);
}

function trendsPage() {

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerCategoryTitle.classList.remove('inactive');
    headerTitle.classList.add('inactive');

    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    likedMoviesSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');

    movieDetailSection.classList.add('inactive');
    headerCategoryTitle.innerHTML = 'Tendencias';
    getTrendingMovies();
    infiniteScroll = getPaginatedTrendingMovies;
}