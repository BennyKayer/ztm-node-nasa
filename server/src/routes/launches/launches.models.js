const launches = new Map();

const launch = {
    mission: "Keppler Exploration X",
    rocket: "Explore IS1",
    launchDate: new Date("December 27, 2030"),
    destination: "Kepler-442 b",
    flightNumber: 100,
    customer: ['NASA', 'ZTM'],
    upcoming: true,
    succes: true,
}

launches.set(launch.flightNumber, launch);
// launches.get(100) === launch

module.exports = {
    launches
}