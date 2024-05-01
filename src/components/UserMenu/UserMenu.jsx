import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import UserProfileIcon from '@/assets/icons/user-profile-icon.svg';
import ArrowDown from '@/assets/icons/arrow-down-icon.svg';
import ArrowUp from '@/assets/icons/arrow-up-icon.svg';
import { MENU_ITEMS } from '@/constants/constants';
import { AuthContext } from '@/contexts/authContext';

import './UserMenu.css'

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  }

  return (
    <div className='UserMenu'>
      <div
        className={`UserMenu-icons-container ${isOpen ? 'isOpen' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <img
          className='UserMenu-profile-icon'
          alt='User profile icon'
          src={UserProfileIcon}
        />

        <img
          className='UserMenu-open-close-menu-icon'
          alt='Open/Close menu icon'
          src={isOpen ? ArrowDown : ArrowUp}
        />
      </div>

      <nav className={`UserMenu-nav ${isOpen ? 'isOpen' : ''}`}>
        <ul className={`UserMenu-ul ${isOpen ? 'isOpen' : ''}`} >
          {
            MENU_ITEMS.map(({ id, title, href }) =>
              <a
                key={id}
                href={href}
                target='_blank'
                className='UserMenu-a'
              >
                <li className='UserMenu-li'>
                  {title.toUpperCase()}
                </li>
              </a>)
          }

          <li
            className='UserMenu-logout UserMenu-li'
            onClick={handleLogout}
          >
            LOGOUT
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default UserMenu;
