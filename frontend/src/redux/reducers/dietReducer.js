const initialState = {
  mealList: [],
};

export const dietReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_MEAL':
      return {
        ...state,
        mealList: [...state.mealList,action.payload]
      };
    case 'GET_MEAL':
      return {
        ...state,
        mealList: action.payload
      };
    case 'REMOVE_MEAL':
        const filteredMeal = state.mealList.filter((meal)=> meal._id !== action.payload )
      return {
        ...state,
        mealList: filteredMeal
      }
    default:
      return state;
  }
};

  