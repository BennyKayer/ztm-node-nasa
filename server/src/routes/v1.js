const express = require("express")
const { planetsRouter } = require("./planets/planets.router");
const { launchesRouter } = require('./launches/launches.router');

const routerV1 = express.Router()

// Register routers
routerV1.use('/planets', planetsRouter)
routerV1.use("/launches", launchesRouter)

module.exports = {
    routerV1
}