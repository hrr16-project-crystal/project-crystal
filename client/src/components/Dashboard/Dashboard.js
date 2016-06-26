import React from 'react';
import Header from '../App/Header';
import Meter from '../Meter/Meter';
import ChatCard from '../Chat/ChatCard';

import './dashboard.css';

export default () =>
  (
  <div>
    <Header />
    <div className="dashContainer">
      <Meter />
    </div>
    <ChatCard />
  </div>
  );
