const mongoose = require("mongoose");

const workoutSchema =
{
    day: {
        type: Date,
        default: Date.now
    },
    exercises: []
};

const Workout = mongoose.model('workout', workoutSchema);
module.exports = Workout;