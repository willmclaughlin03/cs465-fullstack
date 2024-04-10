const mongoose = require('mongoose');
const Trip = require('../models/travlr'); // Check if this is the correct import path
const Model = mongoose.model('trips');

const tripsList = async (req, res) => {
    try {
        const q = await Model.find({}).exec();
        return res.status(200).json(q);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

const tripsFindByCode = async (req, res) => {
    try {
        const q = await Model.find({ 'code': req.params.tripCode }).exec();
        if (!q || q.length === 0) {
            return res.status(404).json({ error: 'Trip not found' });
        }
        return res.status(200).json(q);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

const tripsAddTrip = async (req, res) => {
    try {
        const newTrip = new Model({
            code: req.body.code,
            name: req.body.name,
            length: req.body.length,
            start: req.body.start,
            resort: req.body.resort,
            perPerson: req.body.perPerson,
            image: req.body.image,
            description: req.body.description
        });

        const q = await newTrip.save();
        return res.status(201).json(q);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

// PUT: /trips/:tripCode - Adds a new Trip
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsUpdateTrip = async (req, res) => {
    // Uncomment for debugging
    console.log(req.params);
    console.log(req.body);
    const q = await Model
        .findOneAndUpdate(
            { 'code': req.params.tripCode },
            {
                code: req.body.code,
                name: req.body.name,
                length: req.body.length,
                start: req.body.start,
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                image: req.body.image,
                description: req.body.description
            }
        )
        .exec();

    if (!q) {
        // Database returned no data
        return res
            .status(400)
            .json({ message: "Error: Trip not found or could not be updated" });
    } else {
        // Return resulting updated trip
        return res
            .status(201)
            .json({ message: "Trip updated successfully", trip: q });
    }

    // Uncomment the following line to show results of operation
    // on the console
    // console.log(q);
};


module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip
};
