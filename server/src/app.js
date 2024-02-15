const express = require('express');
const cors = require("cors")
const path = require("path")
const morgan = require("morgan")
const { routerV1 } = require("./routes/v1")

const app = express();

// CORS middleware
app.use(cors({origin: ['http://localhost:3000', "http://localhost:6000"]}));
// MORGAN logging middleware
app.use(morgan("combined"));

// All responses are json
app.use(express.json());
// Add static assets
app.use(express.static(path.join(__dirname, "..", "fe-build")))

app.use(routerV1)
app.use('v1', routerV1);
// app.use("v2", routerV2);

// Serve frontend on static
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, "..", "fe-build", "index.html"))
})

module.exports = app;