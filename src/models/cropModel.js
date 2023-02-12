const mongoose = require('mongoose');

const cropSchema = new mongoose.Schema({
   
    cropName: {
        type: String,
        required: true,
        trim: true
    },
    categories: {
        type: String,
        required: true,
        trim: true
    },
    nutrition: {
        type: [String],
        required: true,
        trim: true
    },
    profit: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Crop', cropSchema);