import React, { useEffect, useState } from 'react';
// import './Navbar.css';
import './Navbar2.css';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faBars } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import useAuth from '../../auth/useAuth';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { auth, logout } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(()=>{
    document.addEventListener("mousedown", ()=>{
      setIsMenuOpen(false);
    });
  },[]);

  const handleSignOut = async () => {
    try {
      if (!auth) {
        console.error('User is not logged in');
        return;
      }

      const authToken = localStorage.getItem('authToken');
      await logout();

      const response = await axios.post(
        'https://u-pick-up-y7qnw.ondigitalocean.app/api/logout',
        {},
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
  
      console.log('Logout API response:', response.data);
      localStorage.removeItem('authToken');

      navigate('/');
    } catch (error) {
      console.error('Error occurred while logging out:', error);
    }
  };


  return (
    <div className='navbar-2'>
      <nav className='navbar-student'>
        <Link to={auth ? "/student/home" : "/"} style={{ textDecoration: 'none' }}>
          <div className="logo">
            <img src="../images/logo.png" alt="" />
          </div>
        </Link>

        <div className='right-side'>
          <FontAwesomeIcon icon={faBars} className='menu-icon' onClick={toggleMenu}/>
          <div className={`sub-menu-wrap ${isMenuOpen ? 'open-menu' : ''}`} id="subMenu">
            <div className="sub-menu">

              {/* <Link to="/profile" className="userinfo">
                <h3> Profile </h3>
                <p><FontAwesomeIcon icon={faArrowRight} className='icon' /></p>
              </Link> */}

              <Link to="/student/home" className='show-nav sub-menu-link' style={{ textDecoration: 'none' }}>
                <p>Home</p>
                <p className='arrow'><FontAwesomeIcon icon={faArrowRight} className='icon' /></p>
              </Link>
              <Link to="/student/calendar"  className='show-nav sub-menu-link' style={{ textDecoration: 'none' }}>
                <p>Calendar</p>
                <p className='arrow'><FontAwesomeIcon icon={faArrowRight} className='icon' /></p>
              </Link>
              <Link to="/student/inventory" className='show-nav sub-menu-link' style={{ textDecoration: 'none' }}>
                <p>Inventory</p>
                <p className='arrow'><FontAwesomeIcon icon={faArrowRight} className='icon' /></p>
              </Link>
              <Link to="/student/profile" className='show-nav sub-menu-link' style={{ textDecoration: 'none' }}>
                <p>Profile</p>
                <p className='arrow'><FontAwesomeIcon icon={faArrowRight} className='icon' /></p>
              </Link>
              <Link to="/student/help" className="sub-menu-link" style={{ textDecoration: 'none' }}>
                <p> FAQs </p>
                <p className='arrow'><FontAwesomeIcon icon={faArrowRight} className='icon' /></p>
              </Link>
              <hr />
              <Link onClick={handleSignOut} className="sub-menu-link" style={{ textDecoration: 'none' }}>
                <p> Sign Out </p>
                <p className='arrow'><FontAwesomeIcon icon={faArrowRight} className='icon' /></p>
              </Link>

            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
