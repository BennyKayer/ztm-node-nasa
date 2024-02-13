const { getLaunches, addNewLaunch, launchSchema, existsLaunchWithId, deleteLaunch } = require('./launches.models');
const joi = require("joi")

async function httpGetAllLaunches(req, res) {
    // console.log(Array.from(launches.entries()));
    return res.status(200).json(await getLaunches());
}

async function httpAddNewLaunch(req, res) {
    try {
        const { body: newLaunch } = req
        const validatedLaunch = await launchSchema.validateAsync(newLaunch)

        validatedLaunch.launchDate = new Date(newLaunch.launchDate);
        const createdLaunch = addNewLaunch(validatedLaunch)

        return res.status(201).json(createdLaunch)
    } catch (error) {
        console.error(error);
        if (joi.isError(error)){
            return res.status(400).json({status: 400, message: JSON.stringify(error.details)})
        }
        return res.status(500).json({status: 500, message: `Unhandled error: ${error}`})
    }
    
}

async function httpAbortLaunch(req, res) {
    try {
        const launchId = Number(req.params.id);
        const existsLaunch = await existsLaunchWithId(launchId)

        if (!existsLaunch){
            return res.status(404).json({
                error: "Launch not found"
            })
        }

        const aborted = await deleteLaunch(launchId);
        if (!aborted){
            return res.status(400).json({
                error: "Launch not aborted"
            })
        }
        return res.status(200).json({
            ok: true
        })
    } catch (error) {
        return res.status(500).json(error)
    }
}

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch
}