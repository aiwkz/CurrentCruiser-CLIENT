import { Link } from 'react-router-dom';

import FacekookIcon from '@/assets/icons/facebook-icon.svg';
import TwitterIcon from '@/assets/icons/twitter-icon.svg';
import LinkedIn from '@/assets/icons/linkedin-icon.svg';

import './Footer.css';

const Footer = () => {
  return (
    <footer className='Footer'>
      <div className='Footer-content-container'>
        <div className='Footer-contact-info'>
          <h2>Contact us:</h2>
          <span>Email: example@example.com</span>
          <span>Phone: +1234567890</span>
          <span>Address: 123 Street, City, Country</span>
        </div>
        <div className='Footer-social-links'>
          <h2>Follow us:</h2>
          <div className='Footer-social-links-icons-container'>
            <Link to='https://facebook.com'>
              <img
                className='Footer-facebook-icon'
                alt='Facebook icon'
                src={FacekookIcon}
              />
            </Link>

            <Link to='https://twitter.com'>
              <img
                className='Footer-twitter-icon'
                alt='Twitter icon'
                src={TwitterIcon}
              />
            </Link>

            <Link to='https://linkedin.com'>
              <img
                className='Footer-linkedin-icon'
                alt='LinkedIn icon'
                src={LinkedIn}
              />
            </Link>
          </div>
        </div>
      </div>
      <div className='Footer-legal-links'>
        <Link
          className='Footer-nav-link'
          to='/terms-of-service'
        >
          Terms of Service
        </Link>

        <Link
          className='Footer-nav-link'
          to='/privacy-policy'
        >
          Privacy Policy
        </Link>
      </div>
      <div className='Footer-copyright'>
        <div>&copy; {new Date().getFullYear()} Current Cruiser. All rights reserved.</div>
      </div>
    </footer>
  )
};

export default Footer;
