if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config()
}

const express = require('express'),
	  app = express(),
	  bodyParser = require('body-parser'),
	  mongoose = require('mongoose'),
	  passport    = require("passport"),
	  LocalStrategy = require("passport-local").Strategy,
	  session = require("express-session"),
	  flash        = require("connect-flash"),
	  User        = require("./models/user"),
	  Commission = require('./models/commission'),
	  MongoStore = require("connect-mongo")(session)

const indexRoutes = require('./routes/index'),
	  commissionRoutes = require('./routes/commissions'),
	  commentRoutes    = require("./routes/comments")

mongoose.connect(process.env.DATABASE_URL,{
		useUnifiedTopology: true,
		useNewUrlParser: true
	})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))



app.use(express.static('public'))
app.set('view engine', 'ejs')
// app.use(bodyParser.urlencoded({extended: true}))
app.use(express.urlencoded({extended: true}))

app.use(session({
	secret: "Once again Rusty wins cutest dog!",
	resave: false,
	saveUninitialized: false,
	store: new MongoStore({
	mongooseConnection: mongoose.connection,
	collection: 'sessions'
	}),
  cookie: {
		maxAge: 1000 * 60 * 60 * 24
	}
}))

app.use(flash())
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use(function(req, res, next){
	res.locals.currentUser = req.user
	next()
})

app.use('/', indexRoutes)
app.use('/commissions', commissionRoutes)
app.use("/commissions/:id/comments", commentRoutes)

app.listen(3000, () => {
	console.log('server on port 3000')
})
