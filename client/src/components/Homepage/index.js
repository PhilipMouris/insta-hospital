import React from 'react';
import AuthForm from '../AuthForm';

const Homepage = () => (
  <div className="homepage-background">
    <div className="homepage-background-text">
      <h1>InstaHospital</h1>
      <h3>Available 24/7 at your service</h3>
    </div>
    <AuthForm />
  </div>
);

export default Homepage;
