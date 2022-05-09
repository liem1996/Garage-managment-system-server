const express = require('express')
const router = express.Router()
const Vehicle = require('../controllers/Vhicles')

router.get('/getVeicles', Vehicle.getVeicles);

router.post('/addNewVehicle', Vehicle.addNewVehicle);

router.get('/getVehicleByLicense/:LicenseNumber', Vehicle.getVehicleByLicense);

module.exports = router