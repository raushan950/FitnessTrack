import mongoose from "mongoose";

const progressSchema = new mongoose.Schema({
    weight : {
        type: Number,
        required: true,
    },
    biceps : {
        type: Number,
        required: true,
    },
    chest : {
        type: Number,
        required: true,
    },
    waist : {
        type: Number,
        required: true,
    },
    date : {
        type: Date,
        required: true,
    },
    image : {
        type: String,
        required: true,
    },
    imageType: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
})

const Progress = mongoose.model('Progress',progressSchema)

export default Progress