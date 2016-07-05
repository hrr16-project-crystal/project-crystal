import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './dateNightActions';
import Header from '../App/Header';
import './date.css';

class DateNight extends Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.newView = this.newView.bind(this);
  }

  // componentWillMount() {
  //   this.props.getTodos(this.props.user.data.couple_id);
  // }

  handleChange(e){
    this.setState({text: e.target.value});
  }

  handleFormSubmit(e) {
    e.preventDefault();
    this.props.getRestaurants(this.state.text);
    this.state.text = '';
  }

  newView(){
    console.log('newView successful');
  }
  
  render(){
    console.log('this.props.places', this.props.places);
    if(!this.props.places){
      return (
        <div>
          <Header />
          <h3>Its date night, time to find a place to eat!</h3>
          <div>
            <form className='dateNight__addForm' onSubmit={ this.handleFormSubmit }>
              <input className='dateNight__input' onChange={this.handleChange} type="text" value={this.state.text} placeholder="Search by City" autoFocus={true} />
              <button className="dateNight__btn waves-effect waves-light btn" type="submit">Submit</button>
            </form>
          </div>
        </div>
      );
    }

    return (
      <div>
        <Header />
        <h3>It is date night, time to find a place to eat!</h3>
        <div>
          <form className='dateNight__addForm' onSubmit={ this.handleFormSubmit }>
            <input className='dateNight__input' onChange={this.handleChange} type="text" value={this.state.text} placeholder="Search by City" autoFocus={true} />
            <button className="dateNight__btn waves-effect waves-light btn" type="submit">Submit</button>
          </form>
        </div>
        <div>
          {this.props.places.map(eats => 
            <div className='eats' onClick={ this.newView } key={eats.id}>
              <div>
                <img src={eats.image_url}></img>
              </div>
              <div>
                <p>{eats.name}</p>
              </div>
              <div>
                <img src={eats.rating_img_url_small}></img>
                {eats.rating_img_url_small}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };
};

const mapStateToProps = state => {
  return { places: state.yelp.restaurants, user: state.auth.user };
};

export default connect(mapStateToProps, actions)(DateNight);
