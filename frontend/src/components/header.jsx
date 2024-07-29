import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import useAuth from '../utils/useAuth';

const Header = () => {
  const navigate = useNavigate();
  const loginUser = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(!!loginUser);

  useEffect(() => {
    setIsLoggedIn(!!loginUser);
  }, [loginUser]);

  const handleLogout = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You are not logged in');
      return;
    }

    const confirmLogout = window.confirm('Are you sure you want to log out?');
    if (confirmLogout) {
      localStorage.removeItem('token');
      setIsLoggedIn(false);
      navigate('/login');
    }
  };

  return (
    <header className="flex items-center justify-between h-14 px-6 lg:px-14 bg-white text-slate-600">
      <div>
        <Link to="/" className="text-xl font-semibold">
          ToDo
        </Link>
      </div>
      <nav>
        <ul className="flex items-center justify-between text-base ">
          {!isLoggedIn && (
            <li className="pl-7">
              <Link to="/signup">Sign up</Link>
            </li>
          )}
          {!isLoggedIn && (
            <li className="pl-7">
              <Link to="/login">Log in</Link>
            </li>
          )}
          {isLoggedIn && (
            <li className="pl-7 cursor-pointer" onClick={handleLogout}>
              Log out
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
