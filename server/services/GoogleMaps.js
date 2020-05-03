const axios = require('axios');

const getDistanceMatrix = async (origin, destinations) => {
  const origins = `${origin.lat},${origin.lng}`;
  const distanceParams = destinations.reduce((accum, destination) => {
    return `${accum}${destination.lat},${destination.lng}|`;
  }, '');
  const params = {
    units: 'metric',
    origins,
    destinations: distanceParams,
    key: process.env.GOOGLE_MAPS_API_KEY
  };
  const result = await axios({
    method: 'get',
    url: 'https://maps.googleapis.com/maps/api/distancematrix/json',
    params
  });
  return result.data.rows[0].elements;
};

module.exports = { getDistanceMatrix };
