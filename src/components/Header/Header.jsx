import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Logo from '@/assets/img/logo.svg';
import { MENU_ITEMS } from '@/constants/constants';
import { AuthContext } from '@/contexts/authContext';

import './Header.css';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  }

  return (
    <header className='Header'>
      <h1><img className='Header-logo' alt='Logo' src={Logo} /></h1>

      <nav className={`Header-nav ${isOpen ? 'isVisible' : ''}`}>
        <ul className={`Header-ul ${isOpen ? 'isVisible' : ''}`} >
          {
            MENU_ITEMS.map(({ id, title, href }) =>
              <a key={id} href={href} target='_blank' className='Header-a'>
                <li className='Header-li'>
                  {title.toUpperCase()}
                </li>
              </a>)
          }
        </ul>
      </nav>

      <button className={`Header-toggle-button ${isOpen ? 'isVisible' : ''}`} onClick={() => setIsOpen(!isOpen)}>
        <span className={`Header-burger-icon ${isOpen ? 'isVisible' : ''}`}>&#8801;</span>
      </button>

      <span className='Header-logout-action' onClick={handleLogout}>Logout</span>
    </header>
  );
};

export default Header;
