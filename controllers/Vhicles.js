const Vehicle = require('../models/vehicle_model')

const getVeicles = async (req, res) => {
    try {
        Vehicles = await Vehicle.find()
        res.status(200).send(offers)
    } catch (err) {
       
    }
}

module.exports = {
    getVeicles
}