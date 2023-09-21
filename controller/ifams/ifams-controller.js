const IfamsService = require('../../service/ifams/ifams-service');
const responseHandler = require('../../util/common/response-handler');

const test = (req, res) => {
    //handle validation

    // pass request to service
    const data = IfamsService.test(req, res);
}

const getValues = (req, res) => {
    IfamsService.getValues(req, res);
}

const getValue = (req, res) => {
    // IfamsService.getValue(req.params.value, res);

    // example deal with multiple value condition
    IfamsService.getValue(req.params.value, req.query.vote, res);
}

const addValue = (req, res) => {

    const validationSchema = joi.object().keys({
        name: joi.string().required(),
        barcode: joi.string().required(),
        model: joi.string().required(),
        jenama: joi.string().required(),
        harga: joi.number().required(),
        lokasi: joi.string().required(),
        nokppemilik: joi.string().required()
    });

    const result = validationSchema.validate(req.body);

    if (result.error) {
        return responseHandler.generateError(res, "Validation failed", result.error);
    }

    IfamsService.addValue(req.body, res);

}

const updateValue = (req, res) => {

    const validationSchema = joi.object().keys({
        name: joi.string().required(),
        barcode: joi.string().required(),
        model: joi.string().required(),
        jenama: joi.string().required(),
        harga: joi.number().required(),
        lokasi: joi.string().required(),
        nokppemilik: joi.string().required()
    });

    const result = validationSchema.validate(req.body);

    if (result.error) {
        return responseHandler.generateError(res, "Validation failed", result.error);
    }

    IfamsService.updateValue(req.body, req.params.id, res);

}

module.exports = {
    test:test,
    getValues:getValues,
    getValue:getValue,
    addValue:addValue,
    updateValue:updateValue
}