const ENDPOINT = "http://localhost:8013";

async function httpGetPlanets() {
  // Load planets and return as JSON.
  try {
      const planets = await fetch(`${ENDPOINT}/planets`);
      return await planets.json()
  } catch (error) {
      console.error(error)
  }

}

async function httpGetLaunches() {
  // Load launches, sort by flight number, and return as JSON.
  try {
    const launches = await fetch(`${ENDPOINT}/launches`)
    const fetchedLaunches = await launches.json()
    return fetchedLaunches.sort((a, b) => {
      return a.flightNumber - b.flightNumber;
    })
  } catch (error) {
    console.error(error);
  }
}

async function httpSubmitLaunch(launch) {
  // TODO: Once API is ready.
  // Submit given launch data to launch system.
}

async function httpAbortLaunch(id) {
  // TODO: Once API is ready.
  // Delete launch with given ID.
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};