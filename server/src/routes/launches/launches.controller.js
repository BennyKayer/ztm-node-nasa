const { HttpStatusCode } = require('axios');
const { getLaunches, addNewLaunch, launchSchema } = require('./launches.models');
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
        if (joi.isError(error)){
            return res.status(HttpStatusCode.BadRequest).json({status: HttpStatusCode.BadRequest, message: error.details})
        }
        console.error(error);
        return res.status(500).json({status: 500, message: `Unhandled error: ${error}`})
    }
    
}

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch
}