import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '@/contexts/authContext';
import Button from '@/components/Button/Button';
import { fetchData } from '@/utils/utils';
import { INITIAL_LOGIN_FORM_STATE } from '@/constants/constants';

import './LoginForm.css';

const LoginForm = () => {
  const [formData, setFormData] = useState(INITIAL_LOGIN_FORM_STATE);
  const [error, setError] = useState(null);
  const { isAuthenticated, login, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const { VITE_BACKEND_URL } = import.meta.env;

  useEffect(() => {
    // Redirect to home page if user is already authenticated
    if (isAuthenticated) {
      navigate('/');
    };
  }, [isAuthenticated]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    await logout();

    try {
      await fetchData({
        url: `${VITE_BACKEND_URL}/auth/login`,
        method: 'POST',
        body: formData,
        callback: ({ status, jwttoken, user }) => {
          if (status === 'ok') {
            login(jwttoken, user);
          } else {
            setError('Invalid email or password');
          }
        }
      });
    } catch (error) {
      console.error('Fetch error:', error.message);
      setError('An error occurred while loggin in');
    }
  };

  return (
    <div className='LoginForm-container'>
      <h2>Login</h2>
      <form className='LoginForm' onSubmit={handleLogin}>
        <label>Email</label>
        <input
          type='email'
          name='email'
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <label>Password</label>
        <input
          type='password'
          name='password'
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        {error && <p className='LoginForm-error'>{error}</p>}
        <Button type='submit'>Login</Button>
        <div>
          Don't have an account yet?
          <span
            className='LoginForm-register-action'
            onClick={() => navigate('/register')}
          >
            Register
          </span>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
