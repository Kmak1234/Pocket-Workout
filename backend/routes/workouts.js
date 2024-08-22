const express = require('express')
const {createWorkout, getAllWorkouts, getWorkout, deleteWorkout, updateWorkout} = require('../controller/workoutControllers')
const Workout = require('../models/WorkoutModel')

const router = express.Router()

// get all workout
router.get('/', getAllWorkouts)

//get a single workout
router.get('/:id', getWorkout)

//post a new workoutt
router.post('/', createWorkout)

//delete a workout
router.delete('/:id', deleteWorkout)
//update a workout
router.patch('/:id', updateWorkout)

module.exports = router

