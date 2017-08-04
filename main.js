// ===============Packages====================

const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const session = require('express-session')
const expressValidator = require('express-validator')
const app = express();
let complete = [];

// =======Tells express to use handlebars======

app.engine('handlebars', handlebars());
app.set('views', './views');
app.set('view engine', 'handlebars');

app.use(express.static('public'));

// Tells express to use bodyParser middleware to parse
// form data

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(expressValidator());

// ========Session Info==========

app.use(session({
  secret: 'complete',
  resave: false,
  saveUninitialized: true
}))

app.use(morgan('dev'));

app.use((req, res, next) => {
  if (!req.session.completeList) {
    req.session.completeList = []
  }
  if (!req.session.taskList) {
    req.session.taskList = [];
  }

  console.log(req.session);
  next();

})

// ==========Configure the webroot and
// form page===========

app.get('/', function(req, res) {
res.render('home', {
    taskList: req.session.taskList,
    completeList: req.session.completeList
  });
});


app.post('/enterTodo', function(req, res) {
  let todo = req.body.todo;
  console.log(todo)
  req.checkBody('todo').notEmpty();
  let items = req.validationErrors();
  if (items) {
    res.render('home', {});


  } else {
    req.session.taskList.push(todo);
    res.redirect('/');
  }
})

// ========Redirects user to empty form======

app.get('/del/:index', function(req, res) {
  let done = req.session.taskList.splice(req.params.index, 1);
  req.session.completeList.push(done)
  console.log(complete)
  res.redirect('/');
})


app.listen(3000, function() {
  console.log('App is running!');
});
