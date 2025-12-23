import mongoose from 'mongoose'

const workoutSchema = new mongoose.Schema({
    exercise: {
        type:String,
        required:true,
    },
    sets: {
        type:Number,
        required:true,
    },
    reps: {
        type:Number,
        required:true,
    },
    weight: {
        type:Number,
        required:true,
    },
    volume: {
        type:Number,
    },
    date: { 
        type: Date, 
        default: Date.now 
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
})

const Workout = mongoose.model('Workout',workoutSchema)

export default Workout;