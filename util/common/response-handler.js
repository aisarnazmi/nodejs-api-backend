const generateSuccess = (res, message, responseData) => {
    res.status(200).send({
        "message": message,
        "data": responseData,
        "status": 200
    });
    res.end();
}

const generateError = (res, message, responseData) => {
    res.status(400).send({
        "message": message,
        "data": responseData,
        "status": 400
    });
    res.end();
}

const generateNotFoundError = (res, message, responseData) => {
    res.status(404).send({
        "message": message,
        "data": responseData,
        "status": 404
    });
    res.end();
}

module.exports = {
    generateSuccess:generateSuccess,
    generateError:generateError,
    generateNotFoundError:generateNotFoundError
}