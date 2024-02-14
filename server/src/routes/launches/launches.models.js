const coreJoi = require("joi")
const joiDate = require("@joi/date")
const { launchesModel } = require("./launches.mongo");
const { planetsModel } = require("../planets/planets.mongo");

const joi = coreJoi.extend(joiDate);

const launchSchema = joi.object({
    mission: joi.string().required(),
    rocket: joi.string().required(),
    launchDate: joi.date().format("DD.MM.YYYY").required(),
    destination: joi.string().required(),
})

async function existsLaunchWithId(launchId) {
    return await launchesModel.findOne({ flightNumber: launchId})
}

async function getLatestFlightNumber() {
    const latestLaunch = await launchesModel
    .findOne() // return first
    .sort('-flightNumber') // sort ascending is default, - makes it descending

    if (!latestLaunch){
        return 100;
    }

    return latestLaunch.flightNumber
}

async function getLaunches() {
    return await launchesModel.find({}, 
        {'__v': 0, '_id': 0})
}

async function saveLaunch(launch) {
    // Referential integrity check
    // Does the planet even exists?
    console.log(launch);
    const planet = await planetsModel.findOne({ name: launch.destination })
    if (!planet) {
        throw new Error("No matching planet was found")
    }

    // launchesModel.updateOne returns some additional fields, while 
    // this one just returns what it got
    return await launchesModel.findOneAndUpdate(
        { flightNumber: launch.flightNumber },
        launch,
        { upsert: true })
}

async function addNewLaunch(launch) {
    const flightNumber = await getLatestFlightNumber() + 1;
    const newLaunch = { ...launch, flightNumber, customers: ["ZTM", "NASA"], upcoming: true, succes: true }

    await saveLaunch(newLaunch)
}

async function deleteLaunch(id) {
    const aborted =  await launchesModel.updateOne({ flightNumber: id}, { upcoming: false, success: false})
    return aborted.modifiedCount === 1;
}

module.exports = {
    launchSchema,
    existsLaunchWithId,
    getLaunches,
    addNewLaunch,
    deleteLaunch,
    saveLaunch
}