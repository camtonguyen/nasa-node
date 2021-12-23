const http = require('http');
const app = require('./app');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config().parsed;

const PORT = dotenv.PORT;
const DB_USERNAME = dotenv.DB_USERNAME;
const DB_PASSWORD = dotenv.DB_PASSWORD;
const DB_CLUSTER = dotenv.DB_CLUSTER;
const DB_NAME = dotenv.DB_NAME;

const { loadPlanetsData } = require('./models/planets.model')

const ENV_PORT = process.env.PORT || PORT;

const MONGO_URL = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_CLUSTER}/${DB_NAME}?retryWrites=true&w=majority`;
const server = http.createServer(app);

mongoose.connection.once('open', () => {
  console.log('MongoDB connection ready!')
})

mongoose.connection.on('error', (err) => {
  console.log(err)
})

async function startServer() {
  await mongoose.connect(MONGO_URL)
  await loadPlanetsData();

  server.listen(ENV_PORT, () => {
    console.log(`Listening on port ${ENV_PORT}`)
  });
}

startServer();

