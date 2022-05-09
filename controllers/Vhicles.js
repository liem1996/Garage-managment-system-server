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
const addEnergyByLicense = async (req,res) =>{
    try {       
        // use AvailablEnergyPercentage
        // use EnergySource
        const vehicle = await Vehicle.findOne({'LicenseNumber':req.params.LicenseNumber});

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

// Wheels serch
const getVehicleFromFreeSearch = async (req, res) => {

    var num1 = req.params.freesearch;

    try {
        const vehicles1 = await Vehicle.find({'Wheels': num1});

        res.status(200).send(vehicles1);
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
    getVehicleFromFreeSearch,
    getVehiclesFromSorting,
    infalteTiresToMax,
    addEnergyByLicense
}