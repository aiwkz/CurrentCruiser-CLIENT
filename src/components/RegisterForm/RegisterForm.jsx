import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '@/contexts/authContext';
import { fetchData } from '@/utils/utils';
import { INITIAL_REGISTER_FORM_STATE } from '@/constants/constants';
import Button from '@/components/Button/Button';

import './RegisterForm.css';

const RegisterForm = () => {
  const [formData, setFormData] = useState(INITIAL_REGISTER_FORM_STATE);
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

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    await logout();

    try {
      await fetchData({
        url: `${VITE_BACKEND_URL}/auth/register`,
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
      setError('An error occurred while registering');
    }
  };

  return (
    <div className='RegisterForm-container'>
      <h2>Register</h2>
      <form className='RegisterForm' onSubmit={handleRegister}>
        <label>Name</label>
        <input
          type='text'
          name='username'
          value={formData.username}
          onChange={handleInputChange}
          required
        />
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
        {error && <p className='RegisterForm-error'>{error}</p>}
        <Button type='submit'>Register</Button>
        <div>
          Already have an account?
          <span
            className='RegisterForm-login-action'
            onClick={() => navigate('/login')}
          >
            Login
          </span>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
