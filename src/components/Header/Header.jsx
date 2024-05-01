import Logo from '@/assets/img/logo.svg';
import UserMenu from '@/components/UserMenu/UserMenu';

import './Header.css';

const Header = () => {
  return (
    <header className='Header'>
      <h1><img className='Header-logo' alt='Logo' src={Logo} /></h1>

      <UserMenu />
    </header>
  );
};

export default Header;
