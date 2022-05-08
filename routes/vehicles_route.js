const express = require('express')
const router = express.Router()
const Vehicle = require('../controllers/Vhicles')

router.get('/getVeicles', Vehicle.getVeicles);

module.exports = router