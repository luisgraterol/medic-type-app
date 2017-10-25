const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const mysql = require('mysql');


// Crear la coneccion a la base de :
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'MedicTypeDB'
});

// Conectar a la base de datos:
connection.connect((err) => {
  if (err) {
     console.log(err);
  }
  console.log('MySql connected...');
});

// Iniciar la applicacion:
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


// Middleware:
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log');
    }
  });
  next();
});

app.use(express.static(__dirname + '/public'));









// var nombreP;
//
// connection.query('SELECT * FROM TABLE Paciente', (error, results) => {
//   if (error) {
//     console.log(error);
//   };
//   // YOUR CODE HERE
//
//   nombreP = results[1];
//
//   console.log('The solution is: ', results);
// });









// Get Requests:
app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page'
  });
});


// Iniciar el servidor:
app.listen(3000, () => {
  console.log('Server is up on port 3000.');
});
