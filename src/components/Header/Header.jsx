import { useState } from 'react';

import Logo from '@/assets/img/logo.svg';
import { MENU_ITEMS } from '@/constants/constants';

import './Header.css';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

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
    </header>
  );
};

export default Header;
