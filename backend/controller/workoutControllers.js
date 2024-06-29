const Workout = require('../models/WorkoutModel')
const mongoose = require('mongoose')


// GET all workout
const getAllWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({createdAt: -1})

    res.status(200).json(workouts)
}

// GET single workout
const getWorkout = async(req,res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workout'})
    }

    const workout = await Workout.findById(id)

    if(!workout){
        return res.status(404).json({error:'No such workout'})
    }

    res.status(200).json(workout)
}



// POST create a workout

const createWorkout = async(req, res) => {
    const {title, load, reps} = req.body
    //add new doc to db
    try {
        const workout = await Workout.create({title, load, reps})
        res.status(200).json(workout)
    } catch(error){
        res.status(400).json({error: error.message})
    }
}

// POST update workout

const updateWorkout = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workout'})
    }

    const workout = await Workout.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!workout){
        return res.status(404).json({error:'No such workout'})
    }

    res.status(200).json(workout)
}


// DELETE delete workout
const deleteWorkout = async(req,res) =>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workout'})
    }

    const workout = await Workout.findOneAndDelete({_id: id})

    if(!workout){
        return res.status(404).json({error:'No such workout'})
    }

    res.status(200).json(workout)
}





module.exports = {
    createWorkout,
    getAllWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
}