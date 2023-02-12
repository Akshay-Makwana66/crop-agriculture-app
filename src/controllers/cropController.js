const cropModel = require('../models/cropModel');


//============================================= Create Crop =====================================//

const createCrop = async (req, res) => {
    try {
        let data = req.body;
        const {  cropName, categories, nutrition, profit } = data;

        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, message: 'Please enter data in request body' })
        }

        if (!cropName) {
            return res.status(400).send({ status: false, message: 'Please enter cropName' });
        }

        if (!categories) {
            return res.status(400).send({ status: false, message: 'Please enter categories' });
        }
        
        if (!nutrition) {
            return res.status(400).send({ status: false, message: 'Please enter nutrition' });
        }

        if (!profit) {
            return res.status(400).send({ status: false, message: 'Please enter profit' });
        }

        let saveData = await cropModel.create(data);
        return res.status(201).send({ status: true, message: 'crop creation successfull', data: saveData });
    } 
    catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}

module.exports = { createCrop }