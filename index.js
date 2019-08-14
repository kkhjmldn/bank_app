var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
const uuid = require('uuid/v4')
const session =  require('express-session')
const FileStore = require('session-file-store')(session)
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const axios = require('axios')

const db = require('./db');
const movieRouter = require('./routes/movie-router')
const uploadRouter = require('./routes/upload-router')

passport.use(new LocalStrategy(
    {usernameField:'email'},
    (email, password, done) => {
        axios.get(`http://localhost:3002/users?email=${email}&password=${password}`)
            .then(res => {
                const user = res.data[0]
                if (!user) {
                    return done(null, false, {message:'Invalid credentials email.\n'})
                }
                if (password != user.password) {
                    return done(null, false, {message:'Invalid credentials password.\n'})
                }
                return done(null, user)
            })
            .catch(error => done(error))
       
    }
    
))

passport.serializeUser((user, done) => {
    console.log('callback serialized passport. User is saved to session store')
    done(null, user.id)
})

passport.deserializeUser( (id,done) => {
    axios.get(`http://localhost:3002/users/${id}`)
    .then(res=> done(null, res.data))
    .catch(error => done(error, false))
})

var app = express();
var apiPort = 3001;

//db.on('error',console.error.bind(console,'Mongodb connection Error:'))

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

app.use(passport.initialize())
app.use(passport.session())


app.get('/',(req,res) => {
    const uniqueId = uuid()

    res.send(`Hello world, receive uniq ID :${uniqueId}`)
})

app.get('/login', (req, res) => {
    console.log('Inside the Login callback')
    console.log(req.sessionID)
    res.send('Login Page')
})

app.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (info) {return res.send(info.message)}
        if (err) {return next(err)}
        if (!user) { return res.redirect('/login')}
        req.login(user, (err) => {
            if (err) { return next(err) }
            return res.redirect('/authrequired')
        })
    })(req,res,next)
    // console.log(req.body)
    // res.send('Login Page')
})

app.get('/authrequired', (req,res) => {
   
    if (req.isAuthenticated() ) {
        res.send('You hit the authenticated end point \n')
    } else{
        res.redirect('/')
    }
})


// app.use('/api',movieRouter)
// app.post('/upload',uploadRouter)



app.use(cors());


app.listen(apiPort, () => console.log(`Server running at PORT ${apiPort}`));