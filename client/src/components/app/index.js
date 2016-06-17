import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.object.isRequired,
};

App.defaultProps = {};

export default App;
