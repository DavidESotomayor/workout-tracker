const db = require('../models');
const router = require('express').Router()

// get workouts
router.get('/api/workouts', (req, res) => {
    db.Workout.find({}).then(workout => {
        workout.forEach(exercise => {
            let total = 0;
            exercise.exercises.forEach(result => {
                total += result.duration;
            });
            exercise.totalDuration = total;
        });
        res.json(workout);
    }).catch( err => {
        res.json(err);
    });
});

