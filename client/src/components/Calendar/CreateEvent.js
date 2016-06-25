import React, { Component } from 'react';
import DatePicker from 'material-ui/DatePicker';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './calendar.css';

class CreateEvent extends Component {
  constructor(props) {
    super(props);
    this.state = { open: true };
    this.handleClick = this.handleClick.bind(this);
  }

  handleDialogOpen() {
    this.setState({ open: true });
  }

  handleDialogClose() {
    this.setState({ open: false });
  }

  handleClick() {
    console.log('i was clicked');
    this.renderForm();
  }

  renderForm() {
    const actions = [
      <FlatButton
        label="Sumbit"
        onTouchTap={this.handleDialogClose}
      />,
    ];

    return (
      <div>
        <Dialog
          title="TEST"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleDialogClose}
        >
          Here goes the form
          <DatePicker hintText="Date Picker" />
        </Dialog>
      </div>
    );
  }

  render() {
    const actions = [
      <FlatButton
        label="Sumbit"
        onTouchTap={this.handleDialogClose}
      />,
    ];
    return (
      <div className="center-align" onClick={this.handleClick}>
        <button id="create-button" className="btn waves-effect waves-light">
          <i className="material-icons left prefix">today</i>Create</button>
          <div>
        <Dialog
          title="Create Your Event"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleDialogClose}
        >
          <form>
            <div>
              <label>Title</label>
              <input type="text" placeholder="Title" />
              <label>Date</label>
              <DatePicker hintText="Date Picker" />
            </div>
          </form>
        </Dialog>
      </div>
      </div>
    );
  }
}

export default CreateEvent;
