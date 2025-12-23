import api from '../../services/api';

export const addMeal = (meal) => async (dispatch)=> {
    try {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const token = userInfo ? userInfo.token : null;
    if (!token) throw new Error('No token found in local storage');

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
      const {data} = await api.post('/diet',meal,config)
      dispatch({
        type: 'ADD_MEAL',
        payload: data,
      });
    } catch (error) {
      console.error('error adding diet :', error)
    }
  };

  export const getMeal = () => async (dispatch)=> {
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const token = userInfo ? userInfo.token : null;
      if (!token) throw new Error('No token found in local storage');
  
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const {data} = await api.get('/diet',config)
      dispatch({
        type: 'GET_MEAL',
        payload: data,
      });
    } catch (error) {
      console.error('error fetching diet :', error)
    }
  };
  
  export const removeMeal = (id) => async (dispatch)=> {
    try {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const token = userInfo ? userInfo.token : null;
    if (!token) throw new Error('No token found in local storage');

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
      await api.delete(`/diet/${id}`,config)
      dispatch({
        type: 'REMOVE_MEAL',
        payload: id
      })
    } catch (error) {
      console.error('error deleting diet :', error)
    }
  }