// require dependencies
const express = require('express');
const logger = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const passport = require('passport');
// require dotenv to add env file
require('dotenv').config();
// initialize express app
const app = express();
// middleware setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());
// static directory
app.use(express.static('public'));
// views directory
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
// port setup (either enivornmental or port 3000)
const port = process.env.PORT || 3000;
// let app listen to port
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
// index route setup
app.get('/', (req, res) => {
  res.render('index', {
    currentPage: 'Home',
    documentTitle: 'Todo App',
  });
});
// import routes and use the route
const todoRoutes = require('./routes/todo-routes.js');
app.use('/todos', todoRoutes);
// catch all for routes that don't exist
app.get('*', (req, res) => {
  res.status(404).send('Not Found!');
});