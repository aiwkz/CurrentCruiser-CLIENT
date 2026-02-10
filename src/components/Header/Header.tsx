import { Link, NavLink } from 'react-router-dom';

import Logo from '@/assets/img/logo.svg';
import UserMenu from '@/components/UserMenu/UserMenu';
import { useAuthStore } from '@/stores/authStore';

import './Header.css';

const Header = (): JSX.Element => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  return (
    <header className='Header'>
      <div className='Header-inner'>
        <div className='Header-left'>
          <Link
            to='/'
            className='Header-brand'
            aria-label='CurrentCruiser Home'
          >
            <img className='Header-logo' alt='CurrentCruiser logo' src={Logo} />
            <span className='Header-brandText'>CurrentCruiser</span>
          </Link>
        </div>

        <nav className='Header-nav' aria-label='Primary'>
          <NavLink
            to='/lists'
            className={({ isActive }) =>
              `Header-navLink${isActive ? ' Header-navLink--active' : ''}`
            }
          >
            Lists
          </NavLink>
        </nav>

        <div className='Header-right'>{isAuthenticated && <UserMenu />}</div>
      </div>
    </header>
  );
};

export default Header;
