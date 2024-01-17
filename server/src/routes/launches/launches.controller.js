const { HttpStatusCode } = require('axios');
const { getLaunches, addNewLaunch, launchSchema, existsLaunchWithId, deleteLaunch } = require('./launches.models');
const joi = require("joi")

async function httpGetAllLaunches(req, res) {
    // console.log(Array.from(launches.entries()));
    return res.status(HttpStatusCode.Ok).json(getLaunches());
}

async function httpAddNewLaunch(req, res) {
    try {
        const { body: newLaunch } = req
        const validatedLaunch = await launchSchema.validateAsync(newLaunch)

        validatedLaunch.launchDate = new Date(newLaunch.launchDate);
        const createdLaunch = addNewLaunch(validatedLaunch)

        return res.status(HttpStatusCode.Created).json(createdLaunch)
    } catch (error) {
        console.error(error);
        if (joi.isError(error)){
            return res.status(HttpStatusCode.BadRequest).json({status: HttpStatusCode.BadRequest, message: JSON.stringify(error.details)})
        }
        return res.status(500).json({status: 500, message: `Unhandled error: ${error}`})
    }
    
}

async function httpAbortLaunch(req, res) {
    try {
        const launchId = Number(req.params.id);

        if (!existsLaunchWithId(launchId)){
            return res.status(404).json({
                error: "Launch not found"
            })
        }

        const aborted = deleteLaunch(launchId);
        return res.status(200).json(aborted)
    } catch (error) {
        return res.status(500).json(error)
    }
}

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch
}