const RoutesConfig = require('../../router/ifams/routes');

const initAppConfig = (app) => {
    console.log('Initializing App: iFams');
    RoutesConfig.initializeAPIs(app);
}

module.exports = {
    initAppConfig:initAppConfig
}