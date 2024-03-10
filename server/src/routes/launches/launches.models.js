const coreJoi = require("joi")
const joiDate = require("@joi/date")
const { launchesModel } = require("./launches.mongo");
const { planetsModel } = require("../planets/planets.mongo");
const axios = require("axios")

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

async function getLaunches(skip, limit) {
    return await launchesModel.find({}, 
        {'__v': 0, '_id': 0})
        .sort({ flightNumber: 1 }) // 1 for ascending -1 for descending
        .skip(skip)
        .limit(limit)
}

async function saveLaunch(launch) {
    // launchesModel.updateOne returns some additional fields, while 
    // this one just returns what it got
    return await launchesModel.findOneAndUpdate(
        { flightNumber: launch.flightNumber },
        launch,
        { upsert: true })
}

async function addNewLaunch(launch) {
    // Referential integrity check
    // Does the planet even exists?
    const planet = await planetsModel.findOne({ name: launch.destination })
    if (!planet) {
        throw new Error("No matching planet was found")
    }
    
    const flightNumber = await getLatestFlightNumber() + 1;
    const newLaunch = { ...launch, flightNumber, customers: ["ZTM", "NASA"], upcoming: true, succes: true }

    await saveLaunch(newLaunch)
}

async function deleteLaunch(id) {
    const aborted =  await launchesModel.updateOne({ flightNumber: id}, { upcoming: false, success: false})
    return aborted.modifiedCount === 1;
}

async function findLaunch(filter) {
    return await launchesModel.findOne(filter);
}

const spaceXUrl = "https://api.spacexdata.com/v4/launches/query"

async function populateLaunches() {
    const { data, status } = await axios.post(spaceXUrl, {
            query: {},
            options: {
                pagination: false,
                populate: [
                    {
                        path: "rocket",
                        select: {
                            name: 1,
                        }
                    },
                    {
                        path: "payloads",
                        select: {
                            customers: 1
                        }
                    }
                ]
            }
        })

        if (status !== 200){
            console.log('Problem downloading launch data');
            throw new Error("Launch data download failed")
        }

        const launchDocs = data.docs;
    
        for (const launchDoc of launchDocs) {
            const { payloads } = launchDoc
            const customers = payloads.flatMap(el => el.customers)
    
            const launch = {
                flightNumber: launchDoc.flight_number,
                success: launchDoc.success,
                upcoming: launchDoc.upcoming,
                mission: launchDoc.name,
                rocket: launchDoc.rocket.name,
                launchDate: launchDoc.date_local,
                customers
            }

            await saveLaunch(launch);
        }
}

async function loadLaunchData() {
    const firstLaunch = await findLaunch({
        flightNumber: 1,
        rocket: "Falcon 1",
        mission: "FalconSat"
    })
    if (firstLaunch){
        console.log('Launch data was already loaded');
    }else {
        console.log('Loading launches data...');
        await populateLaunches();
    }
    
}

module.exports = {
    launchSchema,
    existsLaunchWithId,
    getLaunches,
    addNewLaunch,
    deleteLaunch,
    saveLaunch,
    loadLaunchData
}