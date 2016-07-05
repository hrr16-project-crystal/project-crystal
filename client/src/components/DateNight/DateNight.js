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
  }

  handleChange(e){
    this.setState({text: e.target.value});
  }

  handleFormSubmit(e) {
    e.preventDefault();
    this.props.getRestaurants(this.state.text);
    this.state.text = '';
  }
  
  render(){
    if(!this.props.places){
      return (
        <div>
          <Header />
          <div className='date'>
            <div className='date__overlay'>
              <h3 className='date__mainTitle'>It's date night, time to find that perfect place</h3>
              <div>
                <form className='date__addForm' onSubmit={ this.handleFormSubmit }>
                  <input className='date__input' onChange={this.handleChange} type="text" value={this.state.text} placeholder="Search by City" autoFocus={true} />
                  <button className="date__btn waves-effect waves-light btn" type="submit">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div>
        <Header />
        <div className='date'>
          <div className='date__overlay'>
            <h3 className='date__mainTitle'>It's date night, time to find the perfect place to go!</h3>
            <div>
              <form className='date__addForm' onSubmit={ this.handleFormSubmit }>
                <input className='date__input' onChange={this.handleChange} type="text" value={this.state.text} placeholder="Search by City" autoFocus={true} />
                <button className="date__btn waves-effect waves-light btn" type="submit">Submit</button>
              </form>
            </div>
            <div className='date__overallCard'>
              
              {this.props.places.map(eats => 
                <div className="card small date__card">
                  <div className="card-image waves-effect waves-block waves-light">
                    <img className="activator" src={eats.image_url}></img>
                  </div>
                  <div className="card-content">
                    <span className="card-title activator grey-text text-darken-4">{eats.name}<i className="material-icons right">more_vert</i></span>
                    <span className='date__rating'><img src={eats.rating_img_url}></img></span>
                    <p><a target='_blank' href={eats.url}>More info on yelp</a></p>
                  </div>
                  <div className="card-reveal">
                    <span className="card-title grey-text text-darken-4">{eats.name}<i className="material-icons right">close</i></span>
                    <p>Phone #: {eats.display_phone}</p>
                    <p>Address: {eats.location.address} {eats.location.city}, {eats.location.state_code} {eats.location.postal_code}</p>
                    <p>Currently Open: {eats.is_closed ? 'No' : 'Yes'}</p>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    );
  };
};

const mapStateToProps = state => {
  return { places: state.yelp.restaurants, user: state.auth.user };
};

export default connect(mapStateToProps, actions)(DateNight);


                // <div className='eats' onClick={ this.newView } key={eats.id}>
                //   <div>
                //     <img src={eats.image_url}></img>
                //   </div>
                //   <div>
                //     <p>{eats.name}</p>
                //   </div>
                //   <div>
                //     <img src={eats.rating_img_url_small}></img>
                //   </div>
                // </div>
