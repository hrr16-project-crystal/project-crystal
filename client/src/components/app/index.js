// import React, { Component } from 'react';

// class App extends Component {
//   render() {
//     return (
//       <div>
//         {this.props.children}
//         Hello
//       </div>
//     );
//   }
// }

// App.propTypes = {
//   children: React.PropTypes.object.isRequired,
// };

// App.defaultProps = {};

// export default App;


import React, { Component } from 'react';
import Header from '../../Authentication/Header';

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        {this.props.children}
      </div>
    );
  }
}
