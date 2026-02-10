import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuthStore } from '@/stores/authStore';
import Button from '@/components/Button/Button';
import { fetchData } from '@/utils/utils';
import { INITIAL_LOGIN_FORM_STATE } from '@/constants/constants';
import { LoginFormData, User } from '@/types';

import './LoginForm.css';

const LoginForm = (): JSX.Element => {
  const [formData, setFormData] = useState<LoginFormData>(
    INITIAL_LOGIN_FORM_STATE
  );
  const [error, setError] = useState<string | null>(null);

  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const login = useAuthStore(state => state.login);

  const navigate = useNavigate();
  const { VITE_BACKEND_URL } = import.meta.env;

  useEffect(() => {
    if (isAuthenticated) navigate('/');
  }, [isAuthenticated, navigate]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      const data = await fetchData<{
        status: string;
        jwttoken: string;
        user: User;
      }>({
        url: `${VITE_BACKEND_URL}/auth/login`,
        method: 'POST',
        body: formData,
        autoLogoutOnAuthError: false, // ✅ IMPORTANT: don't auto-logout on failed login
      });

      if (data.status === 'ok') {
        login(data.jwttoken, data.user);
        // no need to navigate here; the effect will redirect on isAuthenticated=true
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      console.error('Fetch error:', (err as Error).message);
      setError('An error occurred while logging in');
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
          Don&apos;t have an account yet?
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
