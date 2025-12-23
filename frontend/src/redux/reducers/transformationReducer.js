const initialState = {
    progressList: [],
    error: null
}

export const tranformationReducer = (state = initialState, action) => {
    switch(action.type){
        case 'FETCH_PROGRESS':
        return {
            ...state,
            progressList: action.payload,
            error: null
        }
        case 'FETCH_PROGRESS_FAILURE':
        return {
            ...state,
            error: action.payload
        }
        case 'ADD_PROGRESS':
        return {
            ...state,
            progressList: [...state.progressList,action.payload],
            error: null
        }
        case 'REMOVE_PROGRESS': 
        const filteredProgress = state.progressList.filter((progress)=>
        progress._id !== action.payload)
        return {
            ...state,
            progressList: filteredProgress
        }
        default:
        return state
    }
}