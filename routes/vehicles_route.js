const express = require('express')
const router = express.Router()

const vhicles_model = require('../models/vehicle_model')


router.get('/', (req,res)=>{
    res.send("Hello");
});

module.exports = router