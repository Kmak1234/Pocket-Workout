require('dotenv').config()

const express = require("express");
const workoutRoutes = require('./routes/workouts')

const app = express()

// middleware

app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.use('/api/workouts', workoutRoutes)

app.listen(process.env.PORT, () => {
    console.log('listening on port 4000', process.env.PORT)
})


