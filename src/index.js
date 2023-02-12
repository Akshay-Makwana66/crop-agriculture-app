const express = require('express');
const route = require('./routes/route.js');
const mongoose = require('mongoose');
const app = express();


app.use(express.json());


mongoose.connect('mongodb+srv://AkshayMakwana:Akshay123@cluster0.zmta9.mongodb.net/crop-agriculture-app-DB?retryWrites=true&w=majority', {
    useNewUrlParser: true
}
)

.then(() => console.log("MongoDb is connected"))
.catch(err => console.log(err))


app.use('/', route);


app.listen( 3000,  () =>{
    console.log('Express app running on port 3000' );
});