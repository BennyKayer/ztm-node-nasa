// Express way
// const express = require('express');

// const app = express();

// const PORT = process.env.PORT || 6000;

// app.listen(PORT, () => {
//     console.log(`App listening on port: ${PORT}`);
// })

// Http + express way -> separates concepts, 
// allow for late easy web socket integration
const http = require('http')
const app = require('./app')
const { loadPlanetsData } = require("./routes/planets/planets.model");
const { loadLaunchData } = require("./routes/launches/launches.models") 
const { mongoConnect } = require('./utils/mongo');

const PORT = process.env.PORT || 8013;

const server = http.createServer(app);

async function startServer() {
    await mongoConnect()
    await loadPlanetsData();
    await loadLaunchData();

    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    });
}

startServer();
