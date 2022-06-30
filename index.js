require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const homeRoute = require('./routes/index');

const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(cookieParser(process.env.SESSION_SECRET));

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static('public'));

app.use("/", (req, res, next) => {
  return res.render("index")
})

app.listen(port, () => {
    console.log('Server is listening on port ' + port);
})