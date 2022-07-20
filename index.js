const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors');
const log = console.log;

// mongoose helps to connect our Mongo DB
const app = express();
const mongoose = require('mongoose');
const config = require('./config/db');

// local
const backendURL = '/api';
// const port = process.env.PORT || 8080;
const port = process.env.PORT || 8080;
const users = require('./routes/users/users');

// Config
app.use(cookieParser());
app.use(express.json());
app.use(express.static('front/build'));
app.use(cors());

// Config DB
mongoose.connect(config.db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'bananabee',
});

// Hooks
mongoose.connection.on('connected', () => {
  log(' :-) Connected to bananabee DB');
});

// Connection-to-DB error
mongoose.connection.on('error', (error) => {
  log('Connection to bananabee DB failed:'(error));
});

// ? Routes
// Этот роут подставит апи, а потом пойдет в файл юзерс и доподставить путь, который прописан там '/registration'
app.use(backendURL + '/users', users);

// default route - если не найдет совпадений
app.get('*', (req, res) => {
  //
  res.sendFile(path.join(__dirname, 'front/build/index.html'));
});

//
app.listen(port, () => {
  log(` :-) Server is running on port ${port}`);
});
