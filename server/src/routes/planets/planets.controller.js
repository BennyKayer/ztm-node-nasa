const { loadPlanetsData } = require("../../models/planets.model");

async function getAllPlanets(req, res){
    const planets = await loadPlanetsData();
    return res.status(200).json(planets);
}

module.exports = {
    getAllPlanets
}