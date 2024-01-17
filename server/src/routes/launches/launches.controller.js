const { getLaunches } = require('./launches.models');

async function httpGetAllLaunches(req, res) {
    // console.log(Array.from(launches.entries()));
    return res.status(200).json(getLaunches());
}

module.exports = {
    httpGetAllLaunches
}