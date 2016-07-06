import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

/**
 * A modal dialog can only be closed by selecting one of the actions.
 */
export default class Buck extends React.Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleCloseWithAdd = () => {
    let quantity = document.getElementById('quantity').value;
    let reason = document.getElementById('reason').value;
    this.props.givePoints({
      points: quantity,
      memo: reason,
      name: this.props.user.data.first_name,
      couple_id: this.props.user.data.couple_id,
      user_id: this.props.user.data.user_id,
      type: 0,
    });
    this.setState({open: false});
  };

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Give"
        primary={true}
        onTouchTap={this.handleCloseWithAdd}
      />,
    ];

    return (
      <div>
        <RaisedButton label="Give" onTouchTap={this.handleOpen} />
        <Dialog
          title="Give Lovebucks to your significant other for doing something nice"
          actions={actions}
          modal={true}
          open={this.state.open}
        >
          <TextField
            id="quantity"
            floatingLabelText="How Many?"
          /><br />
          <TextField
            id="reason"
            floatingLabelText="For What?"
          />
        </Dialog>
      </div>
    );
  }
}