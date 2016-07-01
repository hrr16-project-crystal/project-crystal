import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
export const fields = [ 'firstName', 'lastName', 'email', 'sex', 'favoriteColor', 'employed', 'notes' ];
// ^^ All fields on last form

const validate = values => {
  const errors = {};
  if (!values.favoriteColor) {
    errors.favoriteColor = 'Required'
  }
  return errors
};

class FifthQuestion extends Component {
  render() {
    const {
      fields: { favoriteColor, employed, notes },
      handleSubmit,
      previousPage,
      submitting
    } = this.props;
    return (<form onSubmit={handleSubmit}>
        <div>
          <label>Favorite Color</label>
          <div>
            <select {...favoriteColor} value={favoriteColor.value || ''}>
              <option></option>
              <option value="ff0000">Red</option>
              <option value="00ff00">Green</option>
              <option value="0000ff">Blue</option>
            </select>
          </div>
          {favoriteColor.touched && favoriteColor.error && <div>{favoriteColor.error}</div>}
        </div>
        <div>
          <label>
            <input type="checkbox" {...employed}/> Employed
          </label>
        </div>
        <div>
          <label>Notes</label>
          <div>
            <textarea {...notes} value={notes.value || ''}/>
          </div>
        </div>
        <div>
          <button type="button" disabled={submitting} onClick={previousPage}>
            <i/> Previous
          </button>
          <button type="submit" disabled={submitting}>
            {submitting ? <i/> : <i/>} Finish
          </button>
        </div>
      </form>
    )
  }
}

FifthQuestion.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  previousPage: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
};

export default reduxForm({
  form: 'wizard',              // <------ same form name
  fields,                      // <------ all fields on last wizard page
  destroyOnUnmount: false,     // <------ preserve form data
  validate                     // <------ only validates the fields on this page
})(FifthQuestion)
