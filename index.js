// =====Packages being used===========

const express = require('express');
const mustacheExpress = require('mustache-express');
// const handleBars = require('express-handlebars');
const bodyParser = require('body-parser');
// const morgan = require('morgan');
// const expressValidator = require('express-validator');
// const session = require('session');
// const fs = require('fs');
const app = express();



// Tells express to use mustache========

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');

// Tells express to use bodyparser=======

app.use(bodyParser());

// Arrays for ToDo List========

const todoArray = [];
const completeArray = [];
let last_id = 0;

// =========Home======

// Gets info from server=======
app.get('/', function(req, res) {
  res.render('home', {
    todo: todoArray,
    done: completeArray
  });
});

// Sends info to server==========
app.post("/", function(req, res) {
  last_id += 1;
  todoArray.push({
    id: last_id,
    text: req.body.item
  });

  // Redirects user back home to empty form and refreshes data
  res.redirect('/')
});



app.post("/:id", function(req, res) {
  let id = req.params.id;
  pending = todoArray.filter(function(li) {
    return li.id == id;
  });

  pending.forEach(function(li) {
    let index = todoArray.indexOf(li);
    if (index != -1) {
      todoArray.splice(index, 1);
    }

    doneArray.push(li);
  });

  res.redirect('/;')
})
// =========Tells me Node is running======

app.listen(3000, function() {
  console.log('App is running!');

});
