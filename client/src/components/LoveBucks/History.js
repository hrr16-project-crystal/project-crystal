import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import moment from 'moment';

const style = {
  margin: 12,
};
/**
 * A modal dialog can only be closed by selecting one of the actions.
 */
export default class History extends React.Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.props.getLovebuckInfo(this.props.user.data.couple_id);
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  componentDidMount(){
    this.props.getLovebuckInfo(this.props.user.data.couple_id);
  };

  render() {
    const actions = [
      <FlatButton
        label="OK"
        primary={true}
        onTouchTap={this.handleClose}
      />,
    ];

    return (
      <div>
        <RaisedButton style={style} backgroundColor="#fff59d" label="View History" onTouchTap={this.handleOpen} />
        <Dialog
          title="Your lovebucks transaction history:"
          actions={actions}
          modal={false}
          open={this.state.open}
          autoScrollBodyContent={true}
        >
          <ul className='lovebucks-history'>
            {this.props.lovebucks.transactions && this.props.lovebucks.transactions.map((trans, index) => {
              const time = moment(trans.created_at).calendar();
              const name = trans.name[0].toUpperCase()+trans.name.slice(1);
              return (
                <li key={`trans-${index}`} className='trans-item'>
                  <p className={`transaction`}>
                    {name} gave {trans.points} points for {trans.memo} {time}.
                  </p>
                </li>
              );
            })}
          </ul>
        </Dialog>
      </div>
    );
  }
}
