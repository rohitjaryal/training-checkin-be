var express = require("express"),
  app = express(),
  port = process.env.PORT || 3005,
  mongoose = require("mongoose"),
  Task = require("./api/models/checkinModel"), //created model loading here
  bodyParser = require("body-parser");

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/TrainingCheckin");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "POST, PUT, GET, OPTIONS");
  //   res.header(
  //     "Access-Control-Allow-Headers",
  //     "Origin, X-Requested-With, Content-Type, Accept"
  //   );
  //   res.header("Access-Control-Allow-Methods", "POST, PUT, GET, OPTIONS");
  next();
});

//   app.get('/', function(req, res, next) {
//     // Handle the get for this route
//   });

//   app.post('/', function(req, res, next) {
//    // Handle the post for this route
//   });

// app.use(function (req, res) {
//   res.status(404).send({ url: req.originalUrl + " not found" });
// });

// app.get("*", (req, res) => {\
//   res.status(404).send({ url: req.originalUrl + " not found" });
// });

var routes = require("./api/routes/checkinRoutes"); //importing route
routes(app); //register the route

app.listen(port);

console.log("RESTful API server started on: " + port);
