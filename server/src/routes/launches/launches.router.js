const express = require('express');

const { 
  httpGetAllLaunches,
} = require('./launches.controller')

const launchesRounters = express.Router();

launchesRounters.get('/launches', httpGetAllLaunches)

module.exports = launchesRounters;