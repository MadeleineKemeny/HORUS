var db = require("../models");
var weather = require("weather-js");
var twilioClient = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

module.exports = function(app) {
    // Get all examples
    app.get("/api/examples", function(req, res) {
        db.Example.findAll({}).then(function(dbExamples) {
            res.json(dbExamples);
        });
    });

    // Create a new example
    app.post("/api/examples", function(req, res) {
        db.Example.create(req.body).then(function(dbExample) {
            res.json(dbExample);
        });
    });

    // register new user
    app.post("/api/users", function(req, res) {
        console.log(req.body)

        console.log(req.body.email)
        db.User.findOne({
            where: {
                email: req.body.email
            }
        }).then(function(existingUser) {
            if (!existingUser) {
                console.log('user NOT exists');
                db.User.create(req.body).then(function(dbUser) {
                    res.cookie("zipCode", dbUser.location)
                    res.render("userPage", dbUser.dataValues);
                });
            } else {
                console.log('user DOES exists');
                res.send("404")
            }
        });
    });
    // Login User
    app.get("/api/users/:email", function(req, res) {
        console.log("req.params: ", req.params)

        db.User.findOne({
            where: {
                email: req.params.email
            }
        }).then(function(dbUser) {
            if (dbUser !== null) {
                console.log('=========================');
                console.log(dbUser.dataValues)
                console.log('=========================');
                res.cookie("zipCode", dbUser.location);
                res.render("userPage", dbUser.dataValues);
            } else {

                console.log("HEY", dbUser)
                res.send("404")
            }
        });
    });

    // Delete an example by id
    app.delete("/api/examples/:id", function(req, res) {
        db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
            res.json(dbExample);
        });
    });

    app.get("/api/weather/:zipcode", function (req, res) {
        // we can get the zipcode from the cookie


        weather.find({ search: req.params.zipcode, degreeType: 'F' }, function(err, result) {
            if (err) console.log(err);

            console.log("current:", result)
            res.json(result);
        });
    });

    app.get("/send/:phoneNum", function(req, res) {
        console.log("hello req.params: ", req.params);
        console.log('#', process.env.TWILIO_NET_PHONE_NUMBER);

        // process.env.TWILIO_NET_PHONE_NUMBER
        // console.log("hello twilio ", process.env.YING_DEST_PHONE_NUMBER, process.env.TWILIO_NET_PHONE_NUMBER)
        //    }).then(function (dbUser) {
        //    console.log(dbUser);
        twilioClient.messages.create({
            to: `'+1${req.params.phoneNum}'`,
            from: process.env.TWILIO_NET_PHONE_NUMBER,
            body: 'Hello from HORUS, this is the test message for your flooding alert system!'
        }).then(message => {
            console.log("Your alert message was sent successful", message.sid)
            res.json(message.sid)
        });
    });

    // ROUTES FOR SENSOR DATA FROM RPI:
    app.get("/api/sensor", function (req, res) {
        db.Sensor.findAll({
            limit: 1,
            where: {
                sensorType: "flame"
                //your where conditions, or without them if you need ANY entry
            },
            order: [['createdAt', 'DESC']]
        }).then(function (dbExamples) {
            res.json(dbExamples);
        });
    });
    

    // Clears sensor output record
    app.delete("/api/sensor/clear", function (req, res) {
        db.Sensor.destroy({}).then(function (dbExample) {
            res.json(dbExample);
        });
    });

}