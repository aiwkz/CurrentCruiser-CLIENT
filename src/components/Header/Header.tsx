import { useContext } from 'react';
import { Link } from 'react-router-dom';

import Logo from '@/assets/img/logo.svg';
import UserMenu from '@/components/UserMenu/UserMenu';
import { AuthContext } from '@/contexts/authContext';

import './Header.css';

const Header = (): JSX.Element => {
    const { isAuthenticated } = useContext(AuthContext)!;

    return (
        <header className='Header'>
            <h1>
                <Link to='/'>
                    <img
                        className='Header-logo'
                        alt='Logo'
                        src={Logo}
                    />
                </Link>
            </h1>

            {isAuthenticated && <UserMenu />}
        </header>
    );
};

export default Header;
