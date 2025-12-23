import {
  ADD_WORKOUT,
  UPDATE_WORKOUT,
  FETCH_WORKOUTS,
  FETCH_WORKOUTS_FAILURE,

} from '../actions/workoutActions';

const initialState = {
  workoutList: [],  // Stores the workouts fetched from backend
  error: null,      // Stores any potential errors
};

export const workoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_WORKOUTS:
      return {
        ...state,
        workoutList: action.payload,  // Populate workout list from backend data
        error: null,
      };

    case FETCH_WORKOUTS_FAILURE:
      return {
        ...state,
        error: action.payload,  // Capture error on failed fetch
      };

    case ADD_WORKOUT:
      return {
        ...state,
        workoutList: [...state.workoutList, action.payload],
        error: null,
      };

    case UPDATE_WORKOUT:
      const updatedWorkouts = state.workoutList.map((workout, idx) =>
        idx === action.payload.index ? action.payload.workout : workout
      );
      return {
        ...state,
        workoutList: updatedWorkouts,
        error: null,
      };

    case 'DELETE_WORKOUT_SUCCESS':
      const filteredWorkouts = state.workoutList.filter(
        (workout) => workout._id !== action.payload
      );
      return {
        ...state,
        workoutList: filteredWorkouts,
        error: null,
      };

    default:
      return state;
  }
};
