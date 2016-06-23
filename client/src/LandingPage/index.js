import React from 'react';
import './index.css';
import Header from '../App/Header';

function LandingPage() {
  return (
    <div className="hero">
      <div className="hero__overlay">
        <Header />
        <div className="hero__promo">
          <h4 className="hero__promo__pretitle">Reimagining What It Means</h4>
          <h1 className="hero__promo__title">To Be In Love</h1>
          <p className="hero__promo__subtitle">Relationship suggestions. Date
            reminders.
            Honey do lists. Appreciation notes. Passion building. Personal
            Growth.
          </p>
          <a href="" className="hero__promo__btn hero__promo__btn--primary">
            <span className="">Learn More</span>
          </a>
          <a href="" className="hero__promo__btn hero__promo__btn--secondary">
            <span className="">Get Started</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
