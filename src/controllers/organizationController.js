const organizationModel = require('../models/organizationModel');


//============================================= Create Organization =====================================//

const createOrganization = async (req, res) => {
    try {
        let data = req.body;

        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, message: 'Please enter data in request body' });
        }

        if (!data.organizationName) {
            return res.status(400).send({ status: false, message: 'Please enter organizationName' });
        }

        if (!data.headQuarter) {
            return res.status(400).send({ status: false, message: 'Please enter headQuarter' });
        }

        if (!data.country) {
            return res.status(400).send({ status: false, message: 'Please enter country' });
        }
       

        let saveData = await organizationModel.create(data);
        return res.status(201).send({ status: true, message: "organization creation successfull", data: saveData });
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
};

module.exports = { createOrganization }