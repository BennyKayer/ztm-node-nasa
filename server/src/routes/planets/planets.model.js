const { parse } = require('csv-parse');
const fs = require('fs');
const { planetsModel } = require("./planets.mongo")

function isHabitablePlanet(planet) {
  return planet['koi_disposition'] === 'CONFIRMED'
    && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
    && planet['koi_prad'] < 1.6;
}

function loadPlanetsData(){
    return new Promise((resolve, reject) => {
            fs.createReadStream('kepler_data.csv')
            .pipe(parse({
                comment: '#',
                columns: true,
            }))
            .on('data', async (data) => {
                if (isHabitablePlanet(data)) {
                    savePlanet(data)
                }
            })
            .on('error', (err) => {
                console.log(err);
                reject(err)
            })
            .on('end', async () => {
                const planetsFound = await getAllPlanets();
                console.log(`${planetsFound.length} habitable planets found`);
                resolve(planetsFound);
            });
    })
}


async function getAllPlanets() {
    // Second parameter can also by provided as space separated, string
    // - before a string excludes it
    // return await planetsModel.find({
    //     name: "Kepler-62 f"
    // }, {
    //     "name": 1
    // })
    return await planetsModel.find({}, {'__v': 0, "_id": 0})
}

async function savePlanet(planet) {
    try {
        // Upsert => insert + update
        await planetsModel.updateOne({
            name: planet.name
        }, {
            name: planet.name
        }, {
            upsert: true
        });
    } catch (error) {
        console.error(error);
    }
    
}

module.exports = {
    loadPlanetsData,
    getAllPlanets
}