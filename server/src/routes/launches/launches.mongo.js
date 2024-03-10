const mongoose = require("mongoose")

const launchesMongoSchema = new mongoose.Schema({
    flightNumber: {
        type: Number,
        required: true,
        // default: 100,
        // min: 100,
        // max: 999,
    },
    launchDate: {
        type: Date,
        required: true,
    },
    mission: {
        type: String,
        required: true,
    },
    rockets: {
        type: String,
        required: true,
    },
    // No joins, transactions or other SQL goodies 
    // target: {
    //     type: mongoose.ObjectId,
    //     ref: "Planet",
    // }
    target: {
        type: String,
        required: false,
    },
    customers: {
        type: [String]
    },
    upcoming: {
        type: Boolean,
        required: true,
    },
    success: {
        type: Boolean,
        required: true,
        default: true,
    }
})

// will transform to "launches"
const launchesModel = mongoose.model('Launch', launchesMongoSchema)

module.exports = {
    launchesModel
}