const organizationModel = require('../models/organizationModel')
const cropFieldModel = require('../models/cropFieldModel')
const fieldModel = require('../models/fieldModel')
const propertyModel = require('../models/propertyModel');
const mongoose = require('mongoose');

const getOrganizationData = async function (req, res) {
    try {
      let conditions = req.query; 
      // Checks whether or organizationId is a valid ObjectId
        if(conditions.organizationId) {
          if (!mongoose.isValidObjectId(conditions.organizationId))return res.status(400).send({ status: false, msg: "Please Enter organizationId as a valid ObjectId" })}
  
      // Fetching the organizations  
      let organization = await organizationModel.find(conditions);
      if (organization.length == 0)return res.status(404).send({ status: false, msg: "No organizations found" });
  
      res.status(200).send({ status: true, data: organization });   
  
    } catch (error) {
      res.status(500).send({ status: false, msg: error.message });
    }
  };


  const getDataByCrop = async function (req, res) {  
      try {
        let conditions = req.query; 
        // Checks whether fieldId is a valid ObjectId
          if(conditions.fieldId) {
            if (!mongoose.isValidObjectId(conditions.fieldId))return res.status(400).send({ status: false, msg: "Please Enter fieldId as a valid ObjectId" })}
    
        // Fetching  
        let crops = await cropFieldModel.find(conditions).populate("cropId").populate("fieldId")         
        if (crops.length == 0)return res.status(404).send({ status: false, msg: "No crops found" }); 
    
        res.status(200).send({ status: true, data: crops });   
    
      } catch (error) {
        res.status(500).send({ status: false, msg: error.message });
      }
    };
  


  const getDataByField = async function (req, res) {
    try {
      let conditions = req.query
      if(conditions.organizationId) {
        if (!mongoose.isValidObjectId(conditions.organizationId))return res.status(400).send({ status: false, msg: "Please Enter organizationId as a valid ObjectId" })}
        // fetching the data...
        let checkOrg = await organizationModel.findOne({_id: conditions.organizationId}); 
        if(!checkOrg) return res.status(400).send({ status: false, msg: "organizationId is not present in database" });

        let findingPath= await fieldModel.find().populate({
          path    : 'regionId',
          populate: [
              { path: 'propertyId' }
          ]
     });
     
        let filterTheId = findingPath.filter((x)=>{
                let storingOrganizationId = x.regionId.propertyId.organizationId.toString()
               
                if(storingOrganizationId===conditions.organizationId){
                    return x 
                }
        });    
      
         if (filterTheId.length == 0)return res.status(404).send({ status: false, msg: "No fields found" });
        res.status(200).send({ status: true, data: filterTheId });   
  
    } catch (error) {
      console.log(error)
        res.status(500).send({ status: false, msg: error.message });     
    }
  };  

  const getDataByCropCylce = async function (req, res) {
    try {
      let conditions = req.query
      if(conditions.propertyId) {
        if (!mongoose.isValidObjectId(conditions.propertyId))return res.status(400).send({ status: false, msg: "Please Enter propertyId as a valid ObjectId" })}
        // fetching the data...
        let checkOrg = await propertyModel.findOne({_id: conditions.propertyId}); 
        if(!checkOrg) return res.status(400).send({ status: false, msg: "propertyId is not present in database" });

        let findingPath= await cropFieldModel.find().populate({
         
          path    : 'fieldId',
          populate: [
              { path: 'regionId' }
          ]
         
     }).populate({
       path: 'cropId',        
     })
     let filterTheId = findingPath.filter((x)=>{
      let storingPropertyId = x.fieldId.regionId.propertyId.toString()
     
      if(storingPropertyId===conditions.propertyId){
          return x 
      }
});        

if (filterTheId.length == 0)return res.status(404).send({ status: false, msg: "No cropcycle founds" });
res.status(200).send({ status: true, data: filterTheId });   

    } catch (error) {
        console.log(error)
      res.status(500).send({ status: false, msg: error.message });
    }
  };

  module.exports = {getOrganizationData,getDataByCrop,getDataByField,getDataByCropCylce}