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

app.use(express.static('./dist/assignment-3/browser'));

app.use(session({
  secret: '2095-ASSIGNMENT-3',
  cookie: {},
  resave: false,
  saveUninitialized: true
}));

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
        res.status(401).json({"error": "Invalid username or password"});
      } else {
        req.session.save((err) => {
          if (err) {
            res.status(500).json({ "error": "Session not saved" });
          } else {
            req.session.logged_in = true;
            req.session.user = { username: username };
            res.json({ "status": "Logged in" });
          }
        });
      }
    });
});

app.get("/33892962/Massimo/api/v1/driverspackages", async function (req, res) {
  let drivers = await Driver.find();
  let packages = await Package.find();
  res.json({"drivers": drivers.length, "packages": packages.length});
});

app.get("/33892962/Massimo/api/v1/authenticated", async function (req, res) {
  if (req.session.user) {
    res.json(true);
  } else {
    res.json(false);
  }
});

app.use(async (req, res, next) => {
  if (req.path === "/33892962/Massimo/api/v1/authenticated") {
    return next();
  }

  if (!req.session.user) {
    res.status(401).json({ "error": "You are not logged in" });
    return;
  }
  next();
});

app.use('/33892962/Massimo/api/v1', pdmaAPIRoutes);

app.listen(PORT_NUMBER, () => {
  print(`listening on port ${PORT_NUMBER}`);
});