const express = require('express');
const router = express.Router();


const {createUser, userLogin} = require('../controllers/userController');
const {userValidations,userLoginValidations} = require('../middlewares/validation')
const { authentication} = require('../middlewares/auth');

const { createOrganization } = require('../controllers/organizationController');
const { createProperty} = require('../controllers/propertyController');
const { createRegion } = require('../controllers/regionController');
const { createField} = require('../controllers/fieldController');

const { createCrop } = require('../controllers/cropController');
const { createCropField } = require('../controllers/cropFieldController');
const { createCropProperty } = require('../controllers/cropPropertyController');

const {getOrganizationData,getDataByCrop,getDataByField,getDataByCropCylce} = require('../controllers/getAgricultureInfo')

//----------------------------- User's API -----------------------------//
router.post('/signup', userValidations,createUser);
router.post('/login', userLoginValidations,userLogin);


// POST API
router.post('/createOrganization', authentication, createOrganization);
router.post('/createProperty', authentication, createProperty);
router.post('/createRegion', authentication, createRegion);
router.post('/createField', authentication, createField);

router.post('/createCropProperty', authentication, createCropProperty);
router.post('/createCropField', authentication, createCropField);
router.post('/createCrop', authentication, createCrop);


// GET API - 
router.get('/getOrganizationsData',authentication,getOrganizationData)
router.get('/getDataByCrop',authentication,getDataByCrop)
router.get('/getDataByField',authentication,getDataByField)
router.get('/getDataByCropCylce',authentication,getDataByCropCylce)





module.exports = router;