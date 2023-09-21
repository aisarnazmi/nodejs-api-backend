const express = require('express');
const cors = require('cors');
const app = express();

//
global.configs = {};

const env = process.env.NODE_ENV.trim();

if (env == 'production') {
    configs = require('./env/env-prod.json')
} else if (env == 'development') {
    configs = require('./env/env-dev.json')
}

console.log(`Current environment: ${configs.environment}`);

global.joi = require('joi');

const IfamsAppConfig = require('./config/ifams/app-config');

app.use(cors());
app.use(express.json());

app.get('/test-api', (req, res) => {
    res.send('Example Data');
});

IfamsAppConfig.initAppConfig(app);

app.listen(configs.serverPort, () => {
    console.log(`myApp-backend listening on port ${configs.serverPort}`);
});