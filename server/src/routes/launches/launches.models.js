const joi = require("joi")

const launchSchema = joi.object({
    mission: joi.string().required(),
    rocket: joi.string().required(),
    launchDate: joi.date().required(),
    destination: joi.string().required(),
})

// Map has a method for getting els
// launches.get(100) === launch
const launches = new Map();

let latestFlightNumber = 100;

function getLaunches() {
    return Array.from(launches.values())
}

function addNewLaunch(launch) {
    latestFlightNumber++;
    const addedLaunch =  {...launch, flightNumber: latestFlightNumber, customers: ["ZTM", "NASA"], upcoming: true, succes: true}
    launches.set(latestFlightNumber,addedLaunch)
    return addedLaunch
}


module.exports = {
    getLaunches,
    addNewLaunch,
    launchSchema
}