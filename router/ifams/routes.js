const IfamsController = require('../../controller/ifams/ifams-controller');

const API_NAME = 'api/ifams';

const initializeAPIs = app => {
    
    // define project routes
    app.get('/api/ifams/test', IfamsController.test);

    app.get(`/${API_NAME}/data`, IfamsController.getValues);
    app.get(`/${API_NAME}/data/:value`, IfamsController.getValue);
    app.post(`/${API_NAME}/data`, IfamsController.addValue);
    app.put(`/${API_NAME}/data/:id`, IfamsController.updateValue);

}

module.exports = {
    initializeAPIs:initializeAPIs
}