import api from '../../services/api';

// Register a new user
export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: 'USER_REGISTER_REQUEST' });

    const { data } = await api.post('/auth/register', { name, email, password });

    dispatch({ type: 'USER_REGISTER_SUCCESS', payload: data });
    dispatch({ type: 'USER_LOGIN_SUCCESS', payload: data });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: 'USER_REGISTER_FAIL',
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

// Login a user
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: 'USER_LOGIN_REQUEST' });

    const { data } = await api.post('/auth/login', { email, password });
    
    dispatch({ type: 'USER_LOGIN_SUCCESS', payload: data });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: 'USER_LOGIN_FAIL',
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

//View Profile

export const getProfile = ()=> async (dispatch) => {
  try {
    dispatch({type: 'Fetch_Profile_Request'})

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const token = userInfo ? userInfo.token : null;
    console.log('Token--->',token)
    if (!token) throw new Error('No token found in local storage');
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Add the token to the headers
      },
    };
    const {data} = await api.get('/auth/profile',config)

    dispatch({type: 'Fetch_Profile_Success', payload: data})
  } catch (error) {
    dispatch({
      type: 'Fetch_Profile_Fail',
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
}

//Update Profile

export const updateProfile = (profileData)=> async (dispatch) => {
  try {
    dispatch({type: 'Profile_Update_Request'})

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const token = userInfo ? userInfo.token : null;
    console.log('Token--->',token)
    if (!token) throw new Error('No token found in local storage');
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Add the token to the headers
      },
    };

    const {data} = await api.put('/auth/profile', profileData, config)
    dispatch({type: 'Profile_Update_Success', payload: data})
    
  } catch (error) {
    dispatch({
      type: 'Profile_Update_Fail',
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
}

// Logout user
export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch({ type: 'USER_LOGOUT' });
};

