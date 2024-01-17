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
  // Submit given launch data to launch system.
  try {
    const apiLaunch = JSON.stringify({
      launchDate: launch.launchDate,
      mission: launch.mission,
      rocket: launch.rocket,
      destination: launch.target,
    })
    return await fetch(`${ENDPOINT}/launches`, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: apiLaunch
    })
  } catch (error) {
    console.error(error);
    return { ok: false }
  }
}

async function httpAbortLaunch(id) {
  // Delete launch with given ID.
  try {
    return await fetch(`${ENDPOINT}/launches/${id}`, {
      method: "delete",
    })
  } catch (error) {
    console.log(error);
    return { ok: false }
  }
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};