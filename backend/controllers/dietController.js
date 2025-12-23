import Diet from "../models/DietModel.js";

const getAllDiets = async (req,res)=> {
    try {
        const diets = await Diet.find({ user: req.user._id })
        res.json(diets)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

const getDietById = async (req,res)=> {
    try {
        const diet = await Diet.findById(req.params.id)
        res.json(diet)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

const createDiet = async (req,res)=> {
    const { meal, calories, proteins, fats, carbs, date } = req.body
        /* const newDiet = new Diet({
            meal,
            calories,
            protein,
            fats,
            carbs
        }) */
    try {
        const savedDiet = await Diet.create({meal, calories, proteins, fats, carbs, date, user: req.user._id,})
        res.status(201).json(savedDiet)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

const updateDiet = async (req,res)=> {
    try {
        const { meal, calories, protein, fats, carbs } = req.body
        const updatedDiet = await Diet.findByIdAndUpdate(req.params.id,
            {meal, calories, protein, fats, carbs},
            {new:true})
        if(!updatedDiet) return res.status(404).json({message:'Diet not found'})
        res.status(201).json(updateDiet)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

const deleteDiet = async (req,res)=> {
    try {
        const deletedWorkout = await Diet.findByIdAndDelete(req.params.id)
        if(!deleteDiet) return res.status(404).json({message:'Diet not found'})
        res.json({message:'Diet deleted'})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

export {getAllDiets, getDietById, createDiet, updateDiet, deleteDiet}