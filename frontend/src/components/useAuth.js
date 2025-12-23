import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import { logout } from '../redux/actions/authActions';

const useAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.userInfo);
  const token = userInfo?.token;

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        dispatch(logout());
        navigate('/login');
      }
    } catch (error) {
      dispatch(logout());
      navigate('/login');
    }
  }, [token, dispatch, navigate]);

  return token;
};

export default useAuth;
