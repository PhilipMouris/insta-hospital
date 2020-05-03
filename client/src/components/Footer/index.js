import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon } from 'semantic-ui-react';
import './footer.css';

const Footer = ({ userInfo, redirectSignUp, logOut, login }) => (
  <div className="footer">
    <h1>Logo Here</h1>
    <div className="footer-links">
      <Link to="/Hospitals">Hospitals</Link>
      <Link to="/About">Partners</Link>
    </div>
    <div className="footer-icons">
      <h2>Follow Us</h2>
      <div>
        <Icon name="linkedin" inverted size="big" />
        <Icon name="facebook f" inverted size="big" />
        <Icon name="twitter" inverted size="big" />
      </div>
    </div>
    <div>
      <h2>Contact Us</h2>
      <p>Main Office: Tagamoaa</p>
      <p>Tel: 0123445566</p>
      <p>email: instaHospital@gmail.com</p>
    </div>
    <div className="footer-signup">
      {userInfo ? (
        <Button onClick={logOut} inverted>
          Log out
        </Button>
      ) : (
        [
          <Button
            key="footerLogin"
            onClick={login}
            className="login-button"
            inverted
          >
            Log In
          </Button>,
          <Button key="footerSignUp" onClick={redirectSignUp} inverted>
            Sign Up
          </Button>
        ]
      )}
    </div>
    <div className="footer-copyright">© 2019 Copyright: instaHospital</div>
  </div>
);

export default Footer;
