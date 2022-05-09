const express = require('express')
const router = express.Router()
const Vehicle = require('../controllers/Vhicles')

/**
* @swagger
* components:
*   schemas:
*     Vehicle:
*       type: object
*       required:
*           - Type
*           - ModelName
*           - LicenseNumber
*           - AvailablEnergyPercentage
*           - MaximumTirePressure
*           - InflateTire
*           - AddEnergy
*           - EnergySource
*           - Wheels
*       properties:
*         Type:
*           type: [String]
*           description: Type of the vhicle
*         ModelName:
*           type: String
*           description: The model name of the vhicle
*         LicenseNumber:
*           type: Number
*           description: The LicenseNumber of the vhicle
*         AvailablEnergyPercentage:
*           type: Number
*           description: Available Energy Percentage of the vehicle
*         MaximumTirePressure:
*           type: Number
*           description:  Maximum Tire Pressure of the vehicle  
*         InflateTire:
*           type: Number
*           description: The number of wheels that need to inflate tire
*         AddEnergy:
*           type: Number
*           description: The trashold of each vhicle present
*         EnergySource:
*           type: [String]
*           description: The energy source of each vehicle - battery/full tank
*         Wheels:
*           type: [Number]
*           description: List of the vehicle wheels that include the tire pressure of each wheel
*       example:
*           Type: ["Regular motorcycle", "Electric motorcycle", "Regular car", "Electric car", "Truck"]  
*           ModelName: "ChevroletAveo"
*           LicenseNumber: 6512152
*           AvailablEnergyPercentage: 30
*           MaximumTirePressure: 100
*           InflateTire: 2
*           AddEnergy: 50
*           EnergySource: ["battery", "full tank"]  
*           Wheels: [20, 30, 50, 60, 30, 10]
*/

/**
* @swagger
* /getVeicles:
*   get:
*     summary: get all vehicles
*     tags: [Vehicle Api]
*     responses:
*       200:
*         description: The vehicles list
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Vehicle'
*/

router.get('/getVeicles', Vehicle.getVeicles);

/**
* @swagger
* /addNewVehicle:
*   post:
*     summary: Add a new vehicle
*     tags: [Vehicle Api]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Vehicle'
*     responses:
*       200:
*         description: Add new vehicle 
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Vehicle'
*/

router.post('/addNewVehicle', Vehicle.addNewVehicle);

/**
* @swagger
* /getVehicleByLicense/{LicenseNumber}:
*   get:
*     summary: Get the vehicle by license number
*     tags: [Vehicle Api]
*     parameters:
*       - in: path
*         name: LicenseNumber
*         schema:
*           type: Number
*         description: The License Number
*     responses:
*       200:
*         description: The vehicle
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Vehicle'
*/

router.get('/getVehicleByLicense/:LicenseNumber', Vehicle.getVehicleByLicense);

/**
* @swagger
* /getVehiclesFromSorting:
*   get:
*     summary: get all vehicles by sorted from big to small the lisence number
*     tags: [Vehicle Api]
*     responses:
*       200:
*         description: The vehicles list
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Vehicle'
*/

router.get('/getVehiclesFromSorting', Vehicle.getVehiclesFromSorting);

/**
* @swagger
* /infalteTiresToMax:
*   post:
*     summary: Compare the tires pressure to the max and change it if smaller and return the updated
*     tags: [Vehicle Api]
*     responses:
*       200:
*         description: The vehicles updated list
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Vehicle'
*/

router.post('/infalteTiresToMax', Vehicle.infalteTiresToMax);

/**
* @swagger
* /addEnergyByLicense/{LicenseNumber}:
*   post:
*     summary: When the available percentage lower or equal to add energy (the trashold) it charged to 100% and send the updated
*     tags: [Vehicle Api]
*     parameters:
*       - in: path
*         name: LicenseNumber
*         schema:
*           type: Number
*         description: The License Number
*     responses:
*       200:
*         description: The vehicle
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Vehicle'
*/

router.post('/addEnergyByLicense/:LicenseNumber', Vehicle.addEnergyByLicense);


module.exports = router