import React from 'react';
import Header from '../App/Header';
import Meter from '../Meter/Meter';
import ChatCard from '../Chat/ChatCard';
import CalendarCard from '../Calendar/CalendarCard';

import './dashboard.css';

export default () =>
  (
  <div>
    <Header />
    <div className="dashContainer">
      <Meter />
    </div>
    <div className="row">
      <ChatCard />
      <CalendarCard />
    </div>
  </div>
  );
