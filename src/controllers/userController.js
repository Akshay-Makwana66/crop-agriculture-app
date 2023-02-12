const jwt =require('jsonwebtoken');
const bcrypt=require('bcrypt')
const userModel = require('../models/userModel')
const saltRounds = 10;

// User Registration API -
const createUser = async function (req, res) {                   
            try {
                 let data= req.body;      
                 data.password = await bcrypt.hash(data.password, saltRounds);
                 let savedData = await userModel.create(data); 
                 res.status(201).send({ message:'Your Registration Is Done Successfully', data: savedData }); 
                }catch (err) {
                  res.status(500).send({ message:'Sorry, for the inconvenience caused', msg: err.message });
            }
};

// User Login API -
const userLogin= async function(req,res){
            try{
                let data = req.body;

                let userEmail= data.email    
                let userPassword= data.password

                let checkCred= await userModel.findOne({email: userEmail})
                if(!checkCred) return res.status(401).send({status:false, msg:"Email is incorrect"})
                let decryptPassword =  bcrypt.compare(userPassword, checkCred.password);

                if (!decryptPassword) {  
                return res.status(401).send({ status: false, message: "Password is not correct" });
                }

                //Creating token if E-mailId and password is correct -
                let token= jwt.sign({
                userId: checkCred._id.toString(),
                }, "crop-agriculture-app");
                //Sending token in response body
                res.status(201).send({message:'You are Successfully LoggedIn',data: token})
                }catch(err) {
                res.status(500).send({ message:'Sorry, for the inconvenience caused', msg: err.message });                
                }
}

module.exports= {createUser, userLogin}