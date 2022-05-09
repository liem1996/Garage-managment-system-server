const Vehicle = require('../models/vehicle_model')

// Retrieve all of the available vehicles
const getVeicles = async (req, res) => {
    try {
        Vehicles = await Vehicle.find()
        res.status(200).send(Vehicles)
    } catch (err) {
       
    }
}

// Add a new vehicle to the vehicle's collection
const addNewVehicle = async (req, res) => { 
    const type = req.body.Type;
    const modelName =req.body.ModelName;
    const licenseNumber = req.body.LicenseNumber;
    const availablEnergyPercentage = req.body.AvailablEnergyPercentage;
    const maximumTirePressure = req.body.MaximumTirePressure;
    const inflateTire=req.body.InflateTire;
    const addEnergy =  req.body.AddEnergy;
    const energySource =  req.body.EnergySource;
    const wheels =  req.body.Wheels;

    const vehicle = Vehicle({
        Type:type,
        ModelName:modelName,
        LicenseNumber: licenseNumber,
        AvailablEnergyPercentage :availablEnergyPercentage,
        MaximumTirePressure :maximumTirePressure,
        InflateTire:inflateTire,
        AddEnergy: addEnergy,
        EnergySource: energySource,
        Wheels:wheels   
       
    })

    const vehicle2 = await vehicle.save();
    res.status(200).send(vehicle2)
       
}

// Retrieve a single vehicle by license number
const getVehicleByLicense = async (req, res) => {

    try {       
        const vehicle = await Vehicle.findOne({'LicenseNumber':req.params.LicenseNumber});
        if(vehicle==null){
            res.status(400).send({
                'status': 'fail',
                'error': err.message
            })

        }else{
            res.status(200).send(vehicle)
        }
    } catch (err) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
}

// Inflate vehicle tires to maximum pressure

// Add energy (Refuel a vehicle or recharge) by license number


module.exports = {
    getVeicles,
    addNewVehicle,
    getVehicleByLicense
}