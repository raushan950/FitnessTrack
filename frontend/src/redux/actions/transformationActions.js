import api from '../../services/api';

export const viewProgress = () => async (dispatch) => {
    try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const token = userInfo ? userInfo.token : null;
        if (!token) throw new Error('No token found in local storage');

        const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        };

        const { data } = await api.get('/transformation',config)
        dispatch({
            type: 'FETCH_PROGRESS',
            payload: data,
          });
    } catch (error) {
        console.error('Error fetching progress:', error);
        dispatch({
        type: 'FETCH_PROGRESS_FAILURE',
        payload: error.message,
        });
    }
}

export const addProgress = (progressdata) => async (dispatch) => {
    try {
        // Convert the progressdata to FormData
        const formData = new FormData();
        formData.append('weight', progressdata.weight);
        formData.append('biceps', progressdata.biceps);
        formData.append('chest', progressdata.chest);
        formData.append('waist', progressdata.waist);
        formData.append('date', progressdata.date);

        // Assuming `progressdata.image` is the file from input
        if (progressdata.image) {
            formData.append('image', progressdata.image);
        }
        
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const token = userInfo ? userInfo.token : null;
        if (!token) throw new Error('No token found in local storage');
        // Post the FormData with 'multipart/form-data' headers
        const { data } = await api.post('/transformation', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`,
            }
        });

        dispatch({
            type: 'ADD_PROGRESS',
            payload: data
        });
    } catch (error) {
        console.error('Error adding progress:', error);
    }
};

export const removeProgress = (id) => async (dispatch) => {
    try {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const token = userInfo ? userInfo.token : null;
    if (!token) throw new Error('No token found in local storage');

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
        await api.delete(`/transformation/${id}`,config)
        dispatch({
            type:'REMOVE_PROGRESS',
            payload:id
        })
    } catch (error) {
        console.error('Error deleting progress:', error)
    }
}