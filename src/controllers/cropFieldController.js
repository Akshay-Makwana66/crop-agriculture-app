const cropFieldModel = require('../models/cropFieldModel')
const mongoose = require("mongoose")




//============================================= Create Crop Field =====================================//

const createCropField = async (req, res) => {
    try {
        let data = req.body;
        const { fieldId,cropId, pesticides, durationInNumber, weather } = data;

        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, message: 'Please enter data in request body' });
        }

        if (!fieldId) {
            return res.status(400).send({ status: false, message: 'Please enter fieldId' });
        }
        if (!mongoose.isValidObjectId(fieldId)) {
            return res.status(400).send({ status: false, message: 'fieldId is not valid ObjectId' });
        }

        if (!cropId) {
            return res.status(400).send({ status: false, message: 'Please enter cropId' });
        }
        if (!mongoose.isValidObjectId(cropId)) {
            return res.status(400).send({ status: false, message: 'cropId is not valid ObjectId' });
        }

        if (!pesticides) {
            return res.status(400).send({ status: false, message: 'Please enter pesticides' });
        }

        if (!durationInNumber) {
            return res.status(400).send({ status: false, message: 'Please enter durationInNumber' });
        }

        if (!weather) {
            return res.status(400).send({ status: false, message: 'Please enter weather' });
        }

        let saveData = await cropFieldModel.create(data);
        return res.status(201).send({ status: true, message: 'cropField creation successfull', data: saveData });
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}



module.exports = { createCropField }