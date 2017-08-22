require('./config/config')
const express =  require('express')
const bodyParser =  require('body-parser')
const {mongoose} =  require('./db/mongoose')
const {Articles} =  require('./models/Articles')
const {Notes} =  require('./models/Note')
var app =  express()
const port =  process.env.PORT || 3000
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;
app.use(bodyParser.json()) // middleware

var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

require("./routes/api-routes")(app)