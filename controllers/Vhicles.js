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
    let energySource =  req.body.EnergySource;
    const wheels =  req.body.Wheels;

    if (type =="Regular motorcycle"){
        wheels.length =2;
        energySource = "fuel tank";
    }
    if (type =="Electric motorcycle"){
        wheels.length =2;
        energySource = "battery";
    }
    if (type =="Regular car"){
        wheels.length =4;
        energySource = "fuel tank";
    }
    if (type == "Electric car"){
        wheels.length =4;
        energySource = "battery";
    }
    if (type == "Truck"){
        wheels.length = 16;
        energySource = "fuel tank";
    }

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
// Compare the tires pressure to the max and change it if smaller
const infalteTiresToMax = async (req,res) =>{
    try {
        Vehicles = await Vehicle.find();

        for (var i=0; i<Vehicles.length; i++){

            for (var j=0; j<Vehicles[i].Wheels.length; j++)
            {
            if (Vehicles[i].Wheels[j] <= Vehicles[i].MaximumTirePressure){
                Vehicles[i].Wheels[j] = Vehicles[i].MaximumTirePressure;
            }
            else {
                res.status(400).send({
                    'status': 'fail',
                    'error': err.message
                })
            }
        }
    }

        res.status(200).send(Vehicles);
        
        }
        catch (err) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
}

// Add energy (Refuel a vehicle or recharge) by license number
// When the available percentage lower or equal to add energy (the trashold) it charged to 100%
const addEnergyByLicense = async (req,res) =>{
    try {       

        const vehicle = await Vehicle.findOne({'LicenseNumber':req.params.LicenseNumber});
        
        if (vehicle.AvailablEnergyPercentage <= vehicle.AddEnergy){
            vehicle.AvailablEnergyPercentage = 100;
        }

        res.status(200).send(vehicle)
        
    } catch (err) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
}


// Bonus: Add a sorting (Retrieve all vehicles) by one or more properties.
// Sorting by License Number number from big to small
const getVehiclesFromSorting = async (req, res) =>{

    try {
        const sorting = await Vehicle.find().sort({
            LicenseNumber: -1
        });

        res.status(200).send(sorting);
    } catch (err) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
}



module.exports = {
    getVeicles,
    addNewVehicle,
    getVehicleByLicense,
    getVehiclesFromSorting,
    infalteTiresToMax,
    addEnergyByLicense
}