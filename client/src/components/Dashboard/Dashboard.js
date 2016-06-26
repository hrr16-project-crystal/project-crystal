import React from 'react';
import Header from '../App/Header';
import Meter from '../Meter/Meter';
import './dashboard.css';

// export default class Dashboard extends Component {
export default () =>
  (
  <div>
    <Header />
    <div className="dashContainer">
      <Meter />
    </div>
  </div>
  );
