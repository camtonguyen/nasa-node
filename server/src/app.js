const express = require('express');
const cors = require('cors');

const planetsRounters = require('./routes/planets/planets.router')

const app = express();

app.use(cors({
  origin: 'http://localhost:3000'
}));
app.use(express.json());
app.use(planetsRounters);

module.exports =  app;