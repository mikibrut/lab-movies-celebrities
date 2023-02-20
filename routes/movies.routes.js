const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie.model')
const Celebrity = require('../models/Celebrity.model');

// GET all movies
// ROUTE: /movies
router.get('/', async (req, res, next) => {
    try {
        const movies = await Movie.find({}).sort({ title: 1 });
        res.render('movies/movies', {movies});
    } catch (error) {
        next(error)
    }
});

// GET new movie page
// ROUTE: /movies/create
router.get('/create', async (req, res, next) => {
    try {
        const celebrities = await Celebrity.find({}).sort({ name: 1});
        res.render('movies/new-movie', { celebrities });
    } catch (error) {
        next(error);
    }
})
// POST new movie
// ROUTE: /movies/create
router.post('/create', async (req, res, next) => {
    const { title, genre, plot, cast } = req.body;
    try {
        await Movie.create({ title, genre, plot, cast });
        res.redirect('/movies');
    } catch (error) {
        next(error);
    }
})

// GET movie details
// ROUTE: /movies/details:movieId
router.get('/details/:movieId', async (req, res, next) => {
    const { movieId } = req.params;
    try {
        const selectedMovie = await Movie.findById(movieId).populate('cast');
        console.log(selectedMovie)
        res.render('movies/movie-details', selectedMovie);
    } catch (error) {
        next(error);
    }
});

// GET delete movie
// ROUTE: /movies/delete/:movieId
router.get('/delete/:movieId', async (req, res, next) => {
    const { movieId } = req.params;
    try {
        await Movie.findByIdAndDelete(movieId);
        res.redirect('/movies');
    } catch (error) {
        next(error);
    }
});

// GET for edit movie
// ROUTE: /movies/edit/:movieId
router.get('/edit/:movieId', async (req, res, next) => {
    const { movieId } = req.params;
    try {
        const movie = await Movie.findById(movieId).populate('cast');
        res.render('movies/edit-movie', movie);
    } catch (error) {
        next(error);
    }
});

// POST for edit movie
// ROUTE: /movies/edit/:movieId
router.post('/edit/:movieId', async (req, res, next) => {
    const { movieId } = req.params;
    const { title, genre, plot, cast } = req.body;
    try {
        await Movie.findByIdAndUpdate(movieId, { title, genre, plot, cast });
        res.redirect(`/movies/details/${movieId}`);
    } catch (error) {
        next(error);
    }
})

module.exports = router;