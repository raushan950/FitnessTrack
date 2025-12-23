import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { userLoginReducer, userRegisterReducer, userProfileReducer, getProfileReducer } from './redux/reducers/authReducer';
import { workoutReducer } from './redux/reducers/workoutReducer';
import { dietReducer } from './redux/reducers/dietReducer';
import { tranformationReducer } from './redux/reducers/transformationReducer'
// Combine reducers
const rootReducer = combineReducers({
  workouts: workoutReducer,
  meals: dietReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userProfile: userProfileReducer,
  getUserProfile: getProfileReducer,
  progress: tranformationReducer
});

// Load user from local storage
const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

// Define initial state
const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

// Create store
const store = configureStore({
  reducer: rootReducer,  // This is the combined reducers
  preloadedState: initialState, // This is the initial state
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(), // Default middleware includes thunk
});

export default store;
