const { launches } = require('./launches.models');

async function getAllLaunches(req, res) {
    // console.log(Array.from(launches.entries()));
    return res.status(200).json(Array.from(launches.values()));
}

module.exports = {
    getAllLaunches
}