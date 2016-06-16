import React, {PropTypes} from 'react';

class App extends React.Component {
  render() {
    return (
      <div className="hero">
        <div className="hero__overlay">
          <nav>
            <a className="logo">Sparkq<span className="logo__dot">.</span></a>
            <ul className="menu">
              <li className="menu__item"><a className="menu__link" href="">Services</a>
              </li>
              <li className="menu__item"><a className="menu__link"
                                            href="">About</a></li>
              <li className="menu__item"><a className="menu__link" href="">Contact</a>
              </li>
              <li className="menu__item"><a className="menu__link"
                                            href="">Login</a></li>
            </ul>
          </nav>
          <div className="hero__promo">
            <h4 className="hero__promo__pretitle">Reimagining What It Means</h4>
            <h1 className="hero__promo__title">To Be In Love</h1>
            <p className="hero__promo__subtitle">Relationship suggestions. Date
              reminders.
              Honey do lists. Appreciation notes. Passion building. Personal
              Growth
              .</p>
            <a href=""
               className="hero__promo__btn hero__promo__btn--primary"> <span
              className="">Learn
    More</span></a>
            <a href="" className="hero__promo__btn hero__promo__btn--secondary">
              <span className="">Get The App</span></a>
          </div>
        </div>
      </div>
    );
  }
}

App.propTypes = {};
App.defaultProps = {};

export default App;
