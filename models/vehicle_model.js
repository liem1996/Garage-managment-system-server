//The schema that is saved to the collection
const mongoose = require("mongoose")

const VhicleSchema = new mongoose.Schema({
    Type: {
        type: [String],
        required: true
    },
    ModelName: {
        type: String,
        required: true
    }, 
    LicenseNumber: {
        type: Number,
        required: true
    },
    AvailablEnergyPercentage:{
        type: Number,
        required: true
    },
    MaximumTirePressure:{
        type: Number,
        required: true
    },
    InflateTire:{
        type: Number,
        required: true
    },
    AddEnergy:{
        type: String,
        required: true
    },
    EnergySource:{
        type: String,
        required: true
    },
    Wheels:{
        type: Number,
        required: true
    }
})


module.exports = mongoose.model('Vhicle', VhicleSchema)
