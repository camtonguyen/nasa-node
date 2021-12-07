const express = require('express');

const { httpGetAllPlanets } = require('./planets.controller')

const planetsRounters = express.Router();

planetsRounters.get('/planets', httpGetAllPlanets);


module.exports = planetsRounters;