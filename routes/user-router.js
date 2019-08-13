const express = require('express')

const MovieCtrl = require('../controllers/movie-ctrl')

const router = express.Router()

const app = express()

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});


router.post('/movie',MovieCtrl.createMovie)
router.put('/movie/:id',MovieCtrl.updateMovie)
router.delete('/movie/:id',MovieCtrl.deleteMovie)
router.get('/movie/:id',MovieCtrl.getMovieById)
router.get('/movies',MovieCtrl.getMovies)

module.exports = router