import { Link } from 'react-router-dom';

import Logo from '@/assets/img/logo.svg';
import UserMenu from '@/components/UserMenu/UserMenu';
import { useAuthStore } from '@/stores/authStore';

import './Header.css';

const Header = (): JSX.Element => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  return (
    <header className='Header'>
      <h1>
        <Link to='/'>
          <img className='Header-logo' alt='Logo' src={Logo} />
        </Link>
      </h1>

      {isAuthenticated && <UserMenu />}
    </header>
  );
};

export default Header;
