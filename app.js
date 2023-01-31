const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const users = require('./src/model/users')
const movies = require('./src/model/movies')

app.use(express.json(), cookieParser(), cors());

app.get('/index', (req, res) => {
    res.send('index')
})

app.get('/movies', (req, res) => {
    const page = req.query.page
    console.log(page)
    const movieCopy = [...movies]
    const lastPage = Math.ceil(movies.length / 4)
    const startIndex = (page - 1) * 4
    const movieSplice = movieCopy.splice(startIndex, 4)

    const movieList = movieSplice.map(movie => ({
        ...movie,
        name: users.find(user => user.id === movie.user_id).name
    }))
    movies.sort((a, b) => {
        const aTime = new Date(a.created_at).getTime()
        const bTime = new Date(b.created_at).getTime()
        return bTime - aTime
    })
    // console.log(movieList)
    res.send({
        pageInfo: {lastPage},
        movies: movieList
    })
})

app.post('/movies', (req, res) => {
    const newMovie = req.body
    newMovie.id = movies[movies.length - 1 ].id + 1
    newMovie.hit_count = 0
    newMovie.created_at = new Date().toISOString()
    movies.unshift(newMovie)
    res.send(newMovie)
})

app.get('/movies/:id', (req, res) => {
    const { id } = req.params
    const movieId = movies.find(movie => movie.id === Number(id))
    const plusHit_count = {
        ...movieId,
        hit_count: movieId.hit_count + 1
    }
    const findIndex = movies.findIndex(movie => movie.id === plusHit_count.id)
    movies.splice(findIndex, 1, plusHit_count)
    console.log(movies[3])
    res.send(movieId)
})

app.listen(3002, () => {
    console.log('3002번으로 서버 연결')
})