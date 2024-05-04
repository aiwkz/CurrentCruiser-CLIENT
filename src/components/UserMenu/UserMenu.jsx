import { useState, useContext, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import UserProfileIcon from '@/assets/icons/user-profile-icon.svg';
import ArrowDown from '@/assets/icons/arrow-down-icon.svg';
import ArrowUp from '@/assets/icons/arrow-up-icon.svg';
import { MENU_ITEMS } from '@/constants/constants';
import { AuthContext } from '@/contexts/authContext';

import './UserMenu.css';

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const menuRef = useRef(null);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='UserMenu' ref={menuRef}>
      <div
        className={`UserMenu-icons-container ${isOpen ? 'isOpen' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <img
          className='UserMenu-profile-icon'
          alt='User profile icon'
          src={UserProfileIcon}
        />

        {user.username && <span className='UserMenu-username'>{user.username}</span>}

        {<img
          className='UserMenu-open-close-menu-icon'
          alt='Open/Close menu icon'
          src={isOpen ? ArrowDown : ArrowUp}
        />}
      </div>

      <nav className={`UserMenu-nav ${isOpen ? 'isOpen' : ''}`}>
        <ul className={`UserMenu-ul ${isOpen ? 'isOpen' : ''}`} >
          {
            MENU_ITEMS.map(({ id, title, href }) =>
              <li className='UserMenu-li' key={id}>
                <Link
                  to={href}
                  className='UserMenu-link'
                >
                  {title.toUpperCase()}
                </Link>
              </li>
            )
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
