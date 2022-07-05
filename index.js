require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const qualifyRoute = require('./routes/qualify.route')
const userRoute = require('./routes/user.route')
const careerRoute = require('./routes/career.route')
const loRoute = require('./routes/lo.route')
const lpRoute = require('./routes/lp.route')

const app = express()
const port = process.env.PORT || 3000;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))
app.use(cookieParser(process.env.SESSION_SECRET))

app.set('view engine', 'pug')
app.set('views', './views')

app.use(express.static('public'))

app.use("/identification", qualifyRoute)
app.use("/user", userRoute)
app.use("/career", careerRoute)
app.use("/lo", loRoute)
app.use("/lp", lpRoute)
app.get("/", (req, res, next) => {
  return res.redirect("/identification")
})

app.listen(port, () => {
    console.log('Server is listening on port ' + port);
})

