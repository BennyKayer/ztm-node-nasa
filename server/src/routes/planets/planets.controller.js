const {  getAllPlanets } = require("./planets.model");

async function httpGetAllPlanets(req, res){
    const planets = await getAllPlanets();
    return res.status(200).json(planets);
}

module.exports = {
    httpGetAllPlanets
}