const path = require('path');
const dotenv = require('dotenv');

const envFile = path.resolve(__dirname + '/../.env');
dotenv.config({ path: envFile });

const appConfig = {
  weatherUrl: 'https://api.openweathermap.org/data/2.5/weather',
  forecastUrl: 'https://api.openweathermap.org/data/2.5/forecast',
  proxyHost: process.env.PROXY_HOST,
  proxyPort: process.env.PROXY_PORT,
};

export default appConfig;
