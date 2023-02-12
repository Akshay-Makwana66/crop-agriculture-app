const jwt = require("jsonwebtoken");

const authentication = async function (req, res, next) {
  try {

    let token = req.headers["x-api-key"];

    if (!token) return res.status(400).send({ status: false, msg: "Enter token in header" });

    jwt.verify(token,"crop-agriculture-app",function(error,decoded){

      if(error)return res.status(401).send({ status: false, msg: "Invalid Token" });

      else
      req.userId = decoded.userId;
     return  next()  
   });   
  } catch (err) {
    res.status(500).send({  message:'Sorry, for the inconvenience caused', msg: err });
  }
};

module.exports={authentication}