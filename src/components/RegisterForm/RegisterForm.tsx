import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuthStore } from '@/stores/authStore';
import { fetchData } from '@/utils/fetchData';
import { INITIAL_REGISTER_FORM_STATE } from '@/constants/constants';
import Button from '@/components/Button/Button';
import { RegisterFormData, User } from '@/types';

import './RegisterForm.css';

const RegisterForm = (): JSX.Element => {
  const [formData, setFormData] = useState<RegisterFormData>(
    INITIAL_REGISTER_FORM_STATE
  );
  const [error, setError] = useState<string | null>(null);
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const login = useAuthStore(state => state.login);
  const logout = useAuthStore(state => state.logout);
  const navigate = useNavigate();
  const { VITE_BACKEND_URL } = import.meta.env;

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    await logout();

    try {
      await fetchData<{
        status: string;
        jwttoken: string;
        user: User;
      }>({
        url: `${VITE_BACKEND_URL}/auth/register`,
        method: 'POST',
        body: formData,
        callback: ({ status, jwttoken, user }) => {
          if (status === 'ok') {
            login(jwttoken, user);
          } else {
            setError('Invalid email or password');
          }
        },
      });
    } catch (error) {
      console.error('Fetch error:', (error as Error).message);
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
