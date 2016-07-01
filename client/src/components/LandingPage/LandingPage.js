import React from 'react';
import './landingPage.css';
import Header from '../App/Header';
import { Link } from 'react-router';

function LandingPage() {
  return (
    <div className="hero">
      <div className="hero__overlay">
        <div className="hero__header">
          <Header />
        </div>
        <div className="hero__promo">
          <h4 className="hero__promo__pretitle">Reimagining What It Means</h4>
          <h1 className="hero__promo__title">To Be In Love</h1>
          <p className="hero__promo__subtitle">Relationship suggestions. Date
            reminders.
            Honey do lists. Appreciation notes. Passion building. Personal
            Growth.
          </p>
          <Link to="/signin" className="hero__promo__btn hero__promo__btn--primary">Learn More</Link>
          <Link to="/signup" className="hero__promo__btn hero__promo__btn--secondary">Get Started</Link>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;

