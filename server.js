const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// ------------------------------------------------------------------------------------------------------
// mongoose init
mongoose.connect(process.env.MONGODB_URI || 'mongodb://root:password1@ds159776.mlab.com:59776/heroku_5ng9m1w7', { useNewUrlParser: true });

const Workouts = require("./models/workout.js");
const Exercises = require("./models/exercise.js");
// ------------------------------------------------------------------------------------------------------
// routing
app.get('/api/workouts', function (req, res) {
    Workouts.find({})
        .then(data => {
            res.json(data);
        });
});
app.get('/exercise', function (req, res) {
    res.sendFile(path.join(__dirname, 'public/exercise.html'));
});
app.get('/stats', function (req, res) {
    res.sendFile(path.join(__dirname, 'public/stats.html'));
});
app.get('/api/workouts/range', function(req, res) {
    Workouts.find({})
        .then(data => {
            res.json(data);
        });
})
app.put('/api/workouts/:id', function (req, res) {
    Workouts.find({ "_id": req.params.id })
        .then(workout => {
            let list = workout[0].exercises;
            list.push(req.body);
            return list;
        }).then(current => {
            Workouts.find({ "_id": req.params.id }).updateOne({ "exercises": current })
                .then(workout => {
                    res.json(workout);
                })
        })
});
app.post('/api/workouts', function (req, res) {
    Workouts.create({
        "_id": req.body._id,
        "exercises": [],
    }).then(data => {
        console.log(data);
        res.json(data);
    });
});
// ------------------------------------------------------------------------------------------------------
app.listen(PORT, () => {
    console.log("Server Started");
});