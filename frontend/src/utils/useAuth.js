import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const useAuth = () => {
  const [loginUser, setLoginUser] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const currentPath = location.pathname;

    if (currentPath === '/signup' || currentPath === '/login') {
      return;
    }

    if (!token) {
      navigate('/login');
    }

    try {
      const decoded = jwtDecode(token);
      setLoginUser(decoded.email);
    } catch (error) {
      navigate('/login');
    }
  }, [navigate, location]);

  return loginUser;
};

export default useAuth;
