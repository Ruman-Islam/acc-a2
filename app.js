const express = require("express");
const app = express();
const cors = require("cors");

// Routes
const tourRoute = require('./routes/tour.route');

// Middlewares
app.use(express.json());
app.use(cors());



app.get("/", (req, res) => {
    res.send("Route is working!");
});


// posting to database
app.use("/api/v1/tour", tourRoute);

module.exports = app;