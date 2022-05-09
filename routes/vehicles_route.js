const express = require('express')
const router = express.Router()
const Vehicle = require('../controllers/Vhicles')

router.get('/getVeicles', Vehicle.getVeicles);

router.post('/addNewVehicle', Vehicle.addNewVehicle);

router.get('/getVehicleByLicense/:LicenseNumber', Vehicle.getVehicleByLicense);

router.get('/getVehicleFromFreeSearch/:freesearch', Vehicle.getVehicleFromFreeSearch);

router.get('/getVehiclesFromSorting', Vehicle.getVehiclesFromSorting);

router.post('/infalteTiresToMax', Vehicle.infalteTiresToMax);

router.post('/addEnergyByLicense/:LicenseNumber', Vehicle.addEnergyByLicense);


module.exports = router