const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const cropFieldSchema = new mongoose.Schema({
    fieldId: {
        type: ObjectId,
        ref: 'CropProperty',
        required: true,
        trim: true
    },

    cropId: {
        type: ObjectId,
        ref: 'Crop',
        required: true,
        trim: true
    },

    pesticides: {
        type: String,
        required: true,
        trim: true
    },
    durationInNumber: {
        type: String,
        required: true,
        trim: true
    },
    weather: {
        type: String,
        required: true,
        trim: true
    },
}, { timestamps: true });

module.exports = mongoose.model('CropField', cropFieldSchema);