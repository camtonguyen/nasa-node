const express = require('express');

const { 
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch,
} = require('./launches.controller')

const launchesRounters = express.Router();

launchesRounters.get('/', httpGetAllLaunches)
launchesRounters.post('/', httpAddNewLaunch)
launchesRounters.delete('/:id', httpAbortLaunch)

module.exports = launchesRounters;