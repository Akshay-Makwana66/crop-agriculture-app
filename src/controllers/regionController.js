const regionModel = require('../models/regionModel');
const mongoose = require("mongoose");


//============================================= Create Region  =====================================//

const createRegion = async (req, res) => {
    try {
        let data = req.body;
        const { propertyId, state, agriculturalRegion, cropType } = data;

        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, message: 'Please enter data in request body' });
        }

        if (!propertyId) {
            return res.status(400).send({ status: false, message: 'Please enter propertyId' });
        }
        if (!mongoose.isValidObjectId(propertyId)) {
            return res.status(400).send({ status: false, message: 'propertyId is not valid ObjectId' });
        }

        if (!state) {
            return res.status(400).send({ status: false, message: 'Please enter state' });
        }

        if (!agriculturalRegion) {
            return res.status(400).send({ status: false, message: 'Please enter agriculturalRegion' });
        }

        if (!cropType) {
            return res.status(400).send({ status: false, message: 'Please enter cropType' });
        }

        let saveData = await regionModel.create(data)
        return res.status(201).send({ status: true, message: "region creation successFull", data: saveData })
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
};

module.exports = { createRegion}