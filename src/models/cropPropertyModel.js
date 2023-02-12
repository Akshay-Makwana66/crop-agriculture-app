const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const cropPropertySchema = new mongoose.Schema({
    cropCycle: {
        type: String,
        required: true,
        trim: true
    },
    propertyId: {
        type: ObjectId, 
       required: true, 
       ref: 'Property'
     },

    season: {
        type: String,
        required: true,
        trim: true
    },
    months: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true });

module.exports = mongoose.model('CropProperty', cropPropertySchema);