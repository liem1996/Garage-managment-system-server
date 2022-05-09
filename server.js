const express = require('express')
const app = express()
const mongoose = require('mongoose')
const swaggerUI = require("swagger-ui-express")
const swaggerJsDoc = require("swagger-jsdoc")
// in order to analayze the url body parameters
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:true, limit: '1m'}))
app.use(bodyParser.json())

// connection the mongoDB and collection's creation
mongoose.connect("mongodb://127.0.0.1:27017/Vhicles",{useNewUrlParser : true})
const db = mongoose.connection
db.on('error',error=>{console.error(error)})
db.once('open',()=>{console.log('MongoDB is connected!')})

// first "/" in order to concat after the first one more API's
const VhiclesRouter = require('./routes/vehicles_route')
app.use('/',VhiclesRouter)

const port = 3000;

app.listen(port, ()=>
{
    console.log("server is running on port: "+port);
});

// Adding the swagger doc    
    const options = {
        definition: {
            openapi: "3.0.0",
            info: {
                title: "Node API Description",
                version: "1.0.0",
                description: "Extension about the API's",
            },
        //    bearerAuth: {type: 'apiKey', in: 'header', name: 'authorization'},
            servers: [{url: "http://localhost:" + port,},],
            
        },
        apis: ["./routes/*.js"],
    };
    const specs = swaggerJsDoc(options);

    app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
 


