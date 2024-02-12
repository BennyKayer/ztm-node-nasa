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
const mongoose = require("mongoose")
const { ENVS } = require("./config")

const { loadPlanetsData } = require("./routes/planets/planets.model")

const PORT = process.env.PORT || 8013;

const server = http.createServer(app);

mongoose.connection.once('open', () => {
    console.log('MongoDB connection ready!');
})

mongoose.connection.on('error', (err) => {
    console.error(err);
})

async function startServer() {
    await mongoose.connect(ENVS.DB_URL, {
        // useNewUrlParser: true,
        // useFindAndModify: false,
        // useCreateIndex: true
        // useUnifiedTopology: true, all of these are deprecated
    })
    await loadPlanetsData();
    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    });
}

startServer();
