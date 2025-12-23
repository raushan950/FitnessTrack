import mongoose from 'mongoose'

const dietSchema = new mongoose.Schema({
    meal : {
        type:String,
        required:true
    },
    calories : {
        type:Number,
        required:true
    },
    proteins : {
        type:Number,
        required:true
    },
    fats : {
        type:Number,
        required:true
    },
    carbs : {
        type:Number,
        required:true
    },
    date : {
        type: Date,
        required:true
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
})

const Diet = mongoose.model('Diet',dietSchema)

export default Diet