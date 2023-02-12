const propertyModel = require('../models/propertyModel');
const mongoose = require("mongoose");


//============================================= Create Property =====================================//

const createProperty = async (req, res) => {
    try {
        let data = req.body;
        const { organizationId, ownerShip, purchaseDate, fieldArea, propertyLocation } = data;

        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, message: 'Please enter data in request body' });
        }

        if (!organizationId) {
            return res.status(400).send({ status: false, message: 'Please enter organizationId' });
        }
        if (!mongoose.isValidObjectId(organizationId)) {
            return res.status(400).send({ status: false, message: 'organizationId is not valid ObjectId' });
        }

        if (!ownerShip) {
            return res.status(400).send({ status: false, message: 'Please enter ownership' });
        }
        if (!["owned", "lease"].includes(ownerShip)) {
            return res.status(400).send({ status: false, message: "ownership must contains 'owned' or 'lease' only" });
        }

        if (purchaseDate) {
            if (typeof purchaseDate !== Date) {
                return res.status(400).send({ status: false, message: 'Please enter purchaseDate as a date dataType' });
            }
        }

        if (!fieldArea) {
            return res.status(400).send({ status: false, message: 'Please enter fieldArea' });
        }

        if (!propertyLocation) {
            return res.status(400).send({ status: false, message: 'Please enter propertyLocation' });
        }

        let saveData = await propertyModel.create(data);
        return res.status(201).send({ status: true, message: "Property creation successfull", data: saveData });
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
};

module.exports = { createProperty }