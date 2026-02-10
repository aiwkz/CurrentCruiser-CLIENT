import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import UserProfileIcon from '@/assets/icons/user-profile-icon.svg';
import ArrowDown from '@/assets/icons/arrow-down-icon.svg';
import ArrowUp from '@/assets/icons/arrow-up-icon.svg';
import { MENU_ITEMS } from '@/constants/constants';
import { useAuthStore } from '@/stores/authStore';

import './UserMenu.css';

const UserMenu = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout, user } = useAuthStore();
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', listener);
    return () => document.removeEventListener('mousedown', listener);
  }, []);

  return (
    <div className='UserMenu' ref={menuRef}>
      <button
        type='button'
        className={`UserMenu-trigger ${isOpen ? 'isOpen' : ''}`}
        onClick={() => setIsOpen(v => !v)}
        aria-haspopup='menu'
        aria-expanded={isOpen}
      >
        <img
          className='UserMenu-profile-icon'
          alt=''
          src={UserProfileIcon}
          aria-hidden='true'
        />

        {user?.username && (
          <span className='UserMenu-username'>{user.username}</span>
        )}

        <img
          className='UserMenu-open-close-menu-icon'
          alt=''
          src={isOpen ? ArrowUp : ArrowDown}
          aria-hidden='true'
        />
      </button>

      <nav
        className={`UserMenu-nav ${isOpen ? 'isOpen' : ''}`}
        aria-label='User menu'
      >
        <ul className='UserMenu-ul' role='menu'>
          <li className='UserMenu-li' role='none'>
            <button
              type='button'
              className='UserMenu-logout'
              role='menuitem'
              onClick={handleLogout}
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default UserMenu;
