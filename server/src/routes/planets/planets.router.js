const express = require('express');

const { getAllPlanets } = require('./planets.controller')

const planetsRounters = express.Router();

planetsRounters.get('/planets', getAllPlanets);


module.exports = planetsRounters;