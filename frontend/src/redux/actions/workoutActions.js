import api from '../../services/api';

export const ADD_WORKOUT = 'ADD_WORKOUT';
export const UPDATE_WORKOUT = 'UPDATE_WORKOUT';
export const REMOVE_WORKOUT = 'REMOVE_WORKOUT';
export const FETCH_WORKOUTS = 'FETCH_WORKOUTS';
export const FETCH_WORKOUTS_FAILURE = 'FETCH_WORKOUTS_FAILURE';

// Fetch all workouts from the backend
export const fetchWorkouts = () => async (dispatch) => {
  try {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const token = userInfo ? userInfo.token : null;
    if (!token) throw new Error('No token found in local storage');

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await api.get('/workouts',config); // Fetch workouts from API
    console.log('data->'+data)
    dispatch({
      type: FETCH_WORKOUTS,
      payload: data, // Data is the array of workouts fetched from the backend
    });
  } catch (error) {
    console.error('Error fetching workouts:', error);
    dispatch({
      type: FETCH_WORKOUTS_FAILURE,
      payload: error.message,
    });
  }
};
// Action to add a new workout
export const addWorkout = (workout) => async (dispatch) => {
  try {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const token = userInfo ? userInfo.token : null;
    if (!token) throw new Error('No token found in local storage');

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await api.post('/workouts', workout,config);
    dispatch({
      type: 'ADD_WORKOUT',
      payload: data, // This is the workout data returned from the backend
    });
  } catch (error) {
    console.error('Error adding workout:', error);
  }
};

// Action to update an existing workout
export const updateWorkout = (index, workout) => ({
  type: UPDATE_WORKOUT,
  payload: { index, workout },
});

// Action to remove a workout
 export const removeWorkout = (id) => async(dispatch) => {
   try {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const token = userInfo ? userInfo.token : null;
    if (!token) throw new Error('No token found in local storage');

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    await api.delete(`/workouts/${id}`,config)
    dispatch({
      type:'DELETE_WORKOUT_SUCCESS',
      payload:id
    })
   } catch (error) {
    dispatch({
      type: 'DELETE_WORKOUT_FAILURE',
      payload: error.response ? error.response.data.message : error.message,
    });
   }
}; 
