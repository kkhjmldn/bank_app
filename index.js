var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
const uuid = require('uuid/v4')
const session =  require('express-session')
const FileStore = require('session-file-store')(session)

const db = require('./db');
const movieRouter = require('./routes/movie-router')
const uploadRouter = require('./routes/upload-router')

var app = express();
var apiPort = 3001;
db.on('error',console.error.bind(console,'Mongodb connection Error:'))

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(session({
    genid: (req) => {
        console.log('Inside the session middleware')
        console.log(req.sessionID)
        return uuid()
    },
    store : new FileStore(),
    secret: 'keyboard-cat',
    resave : false,
    saveUninitialized : true
}))


app.get('/',(req,res) => {
    const uniqueId = uuid()

    res.send(`Hello world, receive uniq ID :${uniqueId}`)
})

app.get('/login', (req, res) => {
    console.log('Inside the Login callback')
    console.log(req.sessionID)
    res.send('Login Page')
})



app.use('/api',movieRouter)
app.post('/upload',uploadRouter)



app.use(cors());


app.listen(apiPort, () => console.log(`Server running at PORT ${apiPort}`));