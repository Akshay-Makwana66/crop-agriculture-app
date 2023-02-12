const fieldModel = require('../models/fieldModel');
const mongoose = require("mongoose");


//============================================= Create Field =====================================//

const createField = async (req, res) => {
    try {
        let data = req.body;
        let { regionId, agricultureField, farmSize, longitude, latitude, cropRecords } = data;

        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, message: 'Please enter data in request body' });
        }

        if (!regionId) {
            return res.status(400).send({ status: false, message: 'Please enter regionId' });
        }
        if (!mongoose.isValidObjectId(regionId)) {
            return res.status(400).send({ status: false, message: 'regionId is not valid ObjectId' })
        }

        if (!agricultureField) {
            return res.status(400).send({ status: false, message: 'Please enter agricultureField' });
        }

        if (!farmSize) {
            return res.status(400).send({ status: false, message: 'Please enter farmSize' });
        }

        if (!longitude) {
            return res.status(400).send({ status: false, message: 'Please enter longitude' });
        }

        if (!latitude) {
            return res.status(400).send({ status: false, message: 'Please enter latitude' });
        }

        if (!cropRecords) {
            return res.status(400).send({ status: false, message: 'Please enter cropRecords' });
        }

        let saveData = await fieldModel.create(data);
        return res.status(201).send({ status: true, message: 'field creation successfull', data: saveData });
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}

module.exports = { createField}