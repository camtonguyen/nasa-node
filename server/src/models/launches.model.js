const launchesDatabase = require('./launches.mongo');
const planets = require('./planets.mongo');

const launches = new Map();
// let latestFlightNumber = 100;
const DEFAULT_FLIGHT_NUMBER = 100;

const launch = {
  flightNumber: 100,
  mission: 'Kepler Exploration X',
  rocket: 'Explorer IS1',
  launchDate: new Date('December 12, 2030'),
  target: 'Kepler-442 b',
  customers: ['Space X', 'Nasa'],
  upcoming: true,
  success: true
}

saveLaunch(launch);

async function existLaunchWithId(launchId) {
  return await launchesDatabase.findOne({
    flightNumber: launchId
  })
}

async function getLatestFlightNumber() {
  const latestLaunch = await launchesDatabase
    .findOne()
    .sort('-flightNumber');
  
  if(!latestLaunch) {
    return DEFAULT_FLIGHT_NUMBER
  }
  return latestLaunch.flightNumber;
}

async function getAllLaunches() {
  return await launchesDatabase.find({}, {
    '_id': 0,
    '__v': 0,
  })
}

async function saveLaunch(launch) {
  try {
    const planet = await planets.findOne({
      keplerName: launch.target
    })

    if(!planet) {
      throw new Error('No matching planet found!')
    }

    await launchesDatabase.findOneAndUpdate({
      flightNumber: launch.flightNumber,
    }, launch, {upsert: true});

  } catch(err) {
    console.log(`Error ${err}`)
  }
 

}

async function scheduleNewLaunch(launch) {
  const newFlightNumber = await getLatestFlightNumber() + 1;

  const newLaunch = Object.assign(launch, {
    upcoming: true,
    success: true, 
    customers: ['Space X', 'Nasa'],
    flightNumber: newFlightNumber,
  })
  await saveLaunch(newLaunch);
}

async function abortLaunchById(launchId) {
  try {
    return await launchesDatabase.updateOne({
      flightNumber: launchId
    }, {
      upcoming: false,
      success: false,
    }); 
  } catch (e) {
    console.log(e)
  }

  
}

module.exports = {
  getAllLaunches,
  scheduleNewLaunch,
  existLaunchWithId,
  abortLaunchById,
}