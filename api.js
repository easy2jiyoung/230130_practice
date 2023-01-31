const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');

app.use(express.json(), cookieParser(), cors());

app.get('/login', (req, res) => {
    res.send('로그인')
})

app.get('/register', (req, res) => {
    res.send('회원가입')
})

app.get('/movies', (req, res) => {
    res.send('게시글리스트')
})

app.get('/movies/:id', (req, res) => {
    res.send('선택 게시글 상세')
})

app.post('/write', (req, res) => {
    res.send('게시글 작성')
})

app.post('/modify', (req, res) => {
    res.send('게시글 수정')
})

app.post('/delete', (req, res) => {
    res.send('게시글 삭제')
})

app.listen(3002, () => {
    console.log('3000번으로 서버 연결')
})