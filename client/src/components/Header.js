import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const res = await axios.get('/api/users/me', {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (res.status === 200) {
            setIsAuthenticated(true);
            setUsername(res.data.username);
            setRole(res.data.role);
          }
        } else {
          setIsAuthenticated(false);
        }
      } catch (err) {
        if (err.response && err.response.status === 401) {
          // Очистка данных аутентификации и перенаправление на страницу входа
          localStorage.removeItem('token');
          setIsAuthenticated(false);
          setUsername('');
          setRole('');
          navigate('/login');
        } else {
          // Обработка других ошибок
          console.error('Error fetching user data:', err);
        }
      }
    };

    checkAuth();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUsername('');
    setRole('');
    navigate('/');
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <header>
      <div className="header-content">
        <ul className="nav-links">
          <li><Link to="/">Главная</Link></li>

          <li><Link to="/news">Новости</Link></li>
          {role === 'admin' && <li><Link to="/admin">Панель Администратора</Link></li>}
        </ul>
        <div className="auth-section">
          {isAuthenticated ? (
            <>
              <span onClick={handleProfileClick} className="username">{username}</span>
              <button onClick={handleLogout} className="logout-button">Выйти</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
