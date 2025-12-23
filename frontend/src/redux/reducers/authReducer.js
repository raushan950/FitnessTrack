export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case 'USER_LOGIN_REQUEST':
      return { loading: true };
    case 'USER_LOGIN_SUCCESS':
      return { loading: false, userInfo: action.payload };
    case 'USER_LOGIN_FAIL':
      return { loading: false, error: action.payload };
    case 'USER_LOGOUT':
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case 'USER_REGISTER_REQUEST':
      return { loading: true };
    case 'USER_REGISTER_SUCCESS':
      return { loading: false, userInfo: action.payload };
    case 'USER_REGISTER_FAIL':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userProfileReducer = (state = {}, action) => {
  switch(action.type){
    case 'Profile_Update_Request':
      return { loading: true };
    case 'Profile_Update_Success':
      return { loading: false, userInfo: action.payload };
    case 'Profile_Update_Fail':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export const getProfileReducer = (state = {}, action) => {
  switch(action.type){
    case 'Fetch_Profile_Request':
      return {loading: true};
    case 'Fetch_Profile_Success':
      return {loading: false, userInfo: action.payload};
    case 'Fetch_Profile_Fail':
      return {loading: false, error:action.payload};
    default:
      return state;
  }
}