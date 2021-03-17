const db = require('../models');
const router = require('express').Router()

// get workouts
router.get('/api/workouts', (req, res) => {
    db.Workout.find({}).then(response => {
        response.forEach(workout => {
            let total = 0;
            workout.exercises.forEach(result => {
                total += result.duration;
            });
            workout.totalDuration = total;
        });
        res.json(response);
    }).catch( err => {
        res.json(err);
    });
});

//create workout
router.post('/api/workouts', (req, res) => {
    db.Workout.create(req.body).then((workout => {
        res.json(workout);
    })).catch(err => {
        res.json(err);
    });
});

// add exercise
router.put('/api/workouts/:id', (req, res) => {
    db.Workout.findOneAndUpdate(
        { _id: req.params.id },
        {
            $inc: { totalDuration: req.body.duration },
            $push: { exercises: req.body }
        },
        { new: true }).then(workout => {
            res.json(workout);
        }).catch(err => {
            res.json(err);
        });
});