/**
 * Imports express, path, defines the router, sets the views path and imports the pdma router.
 */
const express = require("express");
const path = require("path");
const mongoose = require('mongoose');
const session = require('express-session');
const Driver = require('./models/driver');
const { incrementCRUD, db } = require('./analytics.js');
const Package = require('./models/package');
const pdmaRoutes = require('./pdma.js');
const pdmaAPIRoutes = require('./pdma_api.js');

const print = console.log;
const VIEWS_PATH = path.join(__dirname, "/views/");

const url = 'mongodb://127.0.0.1:27017/Assignment2';

async function connect() {
  await mongoose.connect(url);
}
connect().catch((err) => console.log(err));

/**
 * The port number for the server.
 */
const PORT_NUMBER = 8080;

let app = express();
app.use(express.static("node_modules/bootstrap/dist/css"));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(express.static('images'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use(session({
  secret: '2095-ASSIGNMENT-2',
  cookie: {},
  resave: false,
  saveUninitialized: true
}));

app.get('/', async function (req, res) {
  fileName = VIEWS_PATH + "index.html";
  let driverAmount = await Driver.countDocuments();
  let packageAmount = await Package.countDocuments();
  res.render(fileName, { "driverAmount": driverAmount, "packageAmount": packageAmount });
});

app.get('/login', async function (req, res) {
  fileName = VIEWS_PATH + "login.html";
  res.render(fileName);
});

app.post('/login', async function (req, res) {
  let username = req.body.username;
  let password = req.body.password;

  await db.collection('users').where('password', '==', password).where('username', '==', username).get().then(snapshot => {
    if (snapshot.empty) {
      res.render(VIEWS_PATH + "invalid.html");
    } else {
      req.session.save(() => {
        req.session.logged_in = true;
        req.session.user = {
          username: username
        };
        res.redirect('/');
      });
    }
  });
});

app.get('/signup', async function (req, res) {
  fileName = VIEWS_PATH + "signup.html";
  res.render(fileName);
});

app.post('/signup', async function (req, res) {
  let username = req.body.username;
  let password = req.body.password;
  if (username.length < 6 || !/^[a-zA-Z0-9]+$/.test(username)) res.redirect('/invalid')
  else if (password.length < 5 || password.length > 10) res.redirect('/invalid')
  else {
    await db.collection('users').add({
      username: username,
      password: password
    });
    req.session.save(() => {
      req.session.logged_in = true;
      req.session.user = {
        username: username
      };
      res.redirect('/');
    });
  }
});

app.post("/33892962/Massimo/api/v1/signup", async function (req, res) {
  let username = req.body.username;
  let password = req.body.password;
  if (username.length < 6 || !/^[a-zA-Z0-9]+$/.test(username)) res.json({"error": "Invalid username"});
  else if (password.length < 5 || password.length > 10) res.json({"error": "Invalid password"});
  else {
    await db.collection('users').add({
      username: username,
      password: password
    });
    req.session.save(() => {
      req.session.logged_in = true;
      req.session.user = {
        username: username
      };
      res.json({"status": "User created successfully"});
    });
  }
});

app.post("/33892962/Massimo/api/v1/login", async function (req, res) {
  let username = req.body.username;
  let password = req.body.password;
  await db.collection('users').where('password', '==', password).where('username', '==', username).get().then(snapshot => {
      if (snapshot.empty) {
        res.json({"error": "Invalid username or password"});
      } else {
        req.session.save(() => {
          req.session.logged_in = true;
          req.session.user = {
            username: username
          };
          res.json({"status": "Logged in"});
        });
      }
    });
});

app.use(async (req, res, next) => {
  if (!req.session.user) {
    if (req.url.startsWith('/33892962/Massimo/api/v1')) {
      res.status(401).json({ "error": "You are not logged in" });
      return;
    }
    res.redirect('/login');
    return
  }
  next();
})

app.get('/stats', async function (req, res) {
  let fileName = VIEWS_PATH + "stats.html";
  let data = (await db.collection('a2-analytics').doc("stats").get()).data();
  res.render(fileName, {'insert': data.insert, 'update': data.update, 'Delete': data.delete, 'retrieve': data.retrieve});
});

app.use('/33892962/Massimo', pdmaRoutes);
app.use('/33892962/Massimo/api/v1', pdmaAPIRoutes);

app.get('*', function (req, res) {
  fileName = VIEWS_PATH + "404.html";
  res.render(fileName);
});

app.listen(PORT_NUMBER, () => {
  print(`listening on port ${PORT_NUMBER}`);
});