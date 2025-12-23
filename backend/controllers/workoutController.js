import Workout from "../models/WorkoutModel.js";

const getAllWorkouts = async(req,res)=> {
    try {
       const workouts = await Workout.find({ user: req.user._id })
      // console.log('workouts->'+workouts)
      if (!workouts.length) {
        return res.status(404).json({ message: 'No workouts found for this user' });
      }
       res.json(workouts)
    } catch(error) {
       res.status(500).json({message:error.message})
    }
}

const getWorkoutById = async(req,res)=> {
    try {

       const workout = await Workout.findById(req.params.id)
       res.json(workout)
    } catch(error) {
       res.status(500).json({message:error.message})
    }
}

   const createWorkout = async (req, res) => {
    const { exercise, sets, reps, weight } = req.body;
    const volume = sets*reps*weight;
    const newWorkout = new Workout({
      exercise,
      sets,
      reps,
      weight,
      volume,
      user: req.user._id,
    });
    
    try {
      //const savedWorkout = await Workout.create({ exercise, sets, reps, weight });

      const savedWorkout = await newWorkout.save();
      //console.log(savedWorkout);
      res.status(201).json(savedWorkout);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }; 

/*   const createWorkout = async (req, res) => {
    try {
      const workout = new Workout({ ...req.body, user: req.user._id }); // Associate workout with logged-in user
      const createdWorkout = await workout.save();
      res.status(201).json(createdWorkout);
    } catch (error) {
      res.status(500).json({ message: 'Error creating workout' });
    }
  }; */
  

/* const updateWorkout = async (req,res) => {
    try {
        const {exercise, sets, reps, weight} = req.body
        const updatedWorkout = await Workout.findByIdAndUpdate(
            req.params.id,
            { exercise, sets, reps, weight },
            { new: true } // return the updated workout
          );
          if (!updatedWorkout) return res.status(404).json({ message: 'Workout not found' });
          res.json(updatedWorkout);
    } catch(error) {
        res.status(400).json({message:error.message})
    }
} */

    const updateWorkout = async (req, res) => {
      try {
        const workout = await Workout.findById(req.params.id);
    
        if (!workout) return res.status(404).json({ message: 'Workout not found' });
    
        // Ensure the workout belongs to the logged-in user
        if (workout.user.toString() !== req.user._id.toString()) {
          return res.status(403).json({ message: 'Unauthorized to update this workout' });
        }
    
        // Perform the update
        Object.assign(workout, req.body);
        const updatedWorkout = await workout.save();
        res.json(updatedWorkout);
      } catch (error) {
        res.status(500).json({ message: 'Error updating workout' });
      }
    };

const deleteWorkout = async (req,res) => {
    try {
        const deleteWorkout = await Workout.findByIdAndDelete(req.params.id)
        if(!deleteWorkout) return res.status(404).json({message: 'Workout not found'})
        res.json({message: 'Workout deleted'})
    } catch(error) {
        res.status(400).json({message:error.message})
    }
}

export {getAllWorkouts, getWorkoutById, createWorkout, updateWorkout, deleteWorkout}