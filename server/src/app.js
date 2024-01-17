const express = require('express');
const cors = require("cors")
const path = require("path")
const morgan = require("morgan")

const { planetsRouter } = require("./routes/planets/planets.router");
const { launchesRouter } = require('./routes/launches/launches.router');

const app = express();

// CORS middleware
app.use(cors({origin: ['http://localhost:3000', "http://localhost:6000"]}));
// MORGAN logging middleware
app.use(morgan("combined"));

// All responses are json
app.use(express.json());
// Add static assets
app.use(express.static(path.join(__dirname, "..", "fe-build")))

// Register routers
app.use('/planets', planetsRouter)
app.use("/launches", launchesRouter)

// Serve frontend on static
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, "..", "fe-build", "index.html"))
})

module.exports = app;