const PgHandler = require('../../util/common/pg-connection-handler');
const ResponseHandler = require('../../util/common/response-handler');

const test = async (req, res) => {

    // return response data
    res.send('Hello World');
}

const getValues = async (req, res) => {

    let resp;

    try {
        resp = await PgHandler.query('SELECT * FROM public.aset_maklumat ORDER BY id ASC ');
    } catch (err) {
        console.log(err);
        // return res.send({
        //     message: 'An unexpected error had occured.',
        //     status: 400
        // });
        return ResponseHandler.generateError(res, 'An unexpected error had occured');
    }

    if(resp.rowCount === 0) {
        console.log('Asset not found.');
        // return res.send({
        //     message: 'Asset not found.',
        //     status: 404
        // });
        return ResponseHandler.generateNotFoundError(res, 'Asset not found.');
    }

    const values = resp.rows;

    // mysql
    // if(resp[0].length === 0) {
    //     console.log('Asset not found.');
    //     return res.send({
    //         message: 'Asset not found.',
    //         status: 404
    //     });
    // return ResponseHandler.generateNotFoundError(res, 'Asset not found.');
    // }

    // const values = resp[0];

    // return res.send({
    //     message: 'Successfully retrieved values!',
    //     data: {
    //         values: values
    //     }
    // });

    return ResponseHandler.generateSuccess(res, 'Successfully retrieved values!', values);

}

const getValue = async (id, res) => {
    let resp;
    try {
        resp = await PgHandler.query('SELECT * FROM public.aset_maklumat WHERE id = $1', [id]);

        // example deal with multiple value condition
        // resp = await PgHandler.query('SELECT * FROM public.aset_maklumat WHERE id = $1 AND vote = $2', [id, vote]);
        // mysql
        // resp = await PgHandler.query('SELECT * FROM public.aset_maklumat WHERE id = ? AND vote = ? ', [id, vote]);
    } catch (err) {
        console.log('[ERROR] An unexpected error had occured: postgresql');
        return ResponseHandler.generateError(res, 'An unexpected error had occured');
    }

    if(resp.rowCount === 0) {
        console.log('[WARN] Asset not found: postgresql');
        return ResponseHandler.generateNotFoundError(res, 'Asset not found.');
    }

    const values = resp.rows[0];

    const responseData = {
        id: values.id,
        barcode: values.barcode,
        nama_aset: values.nama_aset,
        model: values.model,
        jenama: values.jenama,
        harga: values.harga,
        lokasi: values.lokasi,
        nokppemilik: values.nokppemilik
    }

    return ResponseHandler.generateSuccess(res, 'Successfully retrieved values!', responseData);

}

const addValue = async (value, res) => {

    let insertResp;

    try {
        insertResp = await PgHandler.query(`
            INSERT INTO public.aset_maklumat(
                barcode, nama_aset, model, jenama, harga, lokasi, nokppemilik
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7)
        `, [
            value.barcode,
            value.name,
            value.model,
            value.jenama,
            value.harga,
            value.lokasi,
            value.nokppemilik
        ]);
    } catch (err) {
        console.log('[ERROR] Failed to insert new value into database: postgresql');
        return ResponseHandler.generateError(res, 'DATABASE_ERROR');
    }

    const responseData = {
        name: value.name,
        barcode: value.barcode,
        model: value.model,
        jenama: value.jenama,
        harga: value.harga,
        lokasi: value.lokasi,
        nokppemilik: value.nokppemilik
    };

    return ResponseHandler.generateSuccess(res, 'Successfully added new values!', responseData);
}

const updateValue = async (value, id, res) => {

    let updateResp;

    try {
        updateResp = await PgHandler.query(`
            UPDATE public.aset_maklumat
            SET barcode = $1, nama_aset = $2, model = $3, jenama = $4, harga = $5, lokasi = $6, nokppemilik = $7
            WHERE id = $8
        `, [
            value.barcode,
            value.name,
            value.model,
            value.jenama,
            value.harga,
            value.lokasi,
            value.nokppemilik,
            id
        ]);
    } catch (err) {
        console.log('[ERROR] Failed to update new value into database: postgresql');
        return ResponseHandler.generateError(res, 'DATABASE_ERROR');
    }

    const responseData = {
        name: value.name,
        barcode: value.barcode,
        model: value.model,
        jenama: value.jenama,
        harga: value.harga,
        lokasi: value.lokasi,
        nokppemilik: value.nokppemilik
    };

    return ResponseHandler.generateSuccess(res, 'Successfully updated values!', responseData);
}

const deleteValue = async (id, res) => {
    let resp;
    
    try {
        resp = await PgHandler.query('DELETE FROM public.aset_maklumat WHERE id = $1', [id]);
    } catch (err) {
        console.log('[ERROR] An unexpected error had occured: postgresql');
        return ResponseHandler.generateError(res, 'An unexpected error had occured');
    }

    if(resp.rowCount === 0) {
        console.log('[WARN] Asset not found: postgresql');
        return ResponseHandler.generateNotFoundError(res, 'Asset not found.');
    }

    return ResponseHandler.generateSuccess(res, 'Successfully delete values!');

}

module.exports = {
    test:test,
    getValues:getValues,
    getValue:getValue,
    addValue:addValue,
    updateValue:updateValue,
    deleteValue:deleteValue
}