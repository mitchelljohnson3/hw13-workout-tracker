const mongoose = require("mongoose");

const exerciseSchema = {
    "type": String,
    "name": String,
    "weight": Number,
    "sets": Number,
    "reps": Number,
    "distance": Number,
    "totalDuration": Number,
}

const Exercise = mongoose.model('exercise', exerciseSchema);
module.exports = Exercise;