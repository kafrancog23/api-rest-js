const $ = (id) => document.querySelector(id);

//Sections

export const headerSection = $('#header');
export const trendingPreviewSection = $ ('#trendingPreview');
export const categoriesPreviewSection = $ ('#categoriesPreview');
export const genericSection = $('#genericList');
export const movieDetailSection = $('#movieDetail');
export const likedMoviesSection = $('#liked')

// Lists & Containers
export const searchForm = $('#searchForm');
export const trendingMoviesPreviewList = $('.trendingPreview-movieList');
export const categoriesPreviewList = $('.categoriesPreview-list');
export const movieDetailCategoriesList = $('#movieDetail .categories-list');
export const relatedMoviesContainer = $('.relatedMovies-scrollContainer');
export const likedMovies = document.querySelector('.liked-movieList');

// Elements
export const headerTitle = $('.header-title');
export const arrowBtn = $('.header-arrow');
export const headerCategoryTitle = $('.header-title--categoryView');

export const searchFormInput = $('#searchForm input');
export const searchFormBtn = $('#searchBtn');

export const trendingBtn = $('.trendingPreview-btn');

export const movieDetailTitle = $('.movieDetail-title');
export const movieDetailDescription = $('.movieDetail-description');
export const movieDetailScore = $('.movieDetail-score');