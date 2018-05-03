import axios from 'axios';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import FormInputState from '../models/form-input-state';

class FormInputHandler extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    const { inputsData } = props;
    inputsData.map(datum => {
      this.state[datum.name] = new FormInputState('', false);
    });

    this.allFieldsValid = this.allFieldsValid.bind(this);
  }

  allFieldsValid(fields) {
    let allValid = true;
    fields.map(field => {
      if (this.state[field.name].valid === false) {
        allValid = false;
      }
    });
    return allValid;
  }

  passFormDataToSubmit(fields) {
    let formData = {};
    fields.map(field => {
      formData[field.name] = this.state[field.name].value;
    });
    this.props.onSubmit(formData);
  }

  render() {
    const { headline, inputsData, onSubmit, statusMessage, submitLabel } = this.props;
    const allFieldsValid = this.allFieldsValid(inputsData);
 
    return <div className="callout primary">
      <h1>{headline}</h1>
      <p>{statusMessage}</p>
      <div className="grid-x">
        {inputsData.map(datum => <div className="cell" key={datum.name}>
          <label>{datum.label}
            <input
              onChange={(event) => {
                const newState = {};
                newState[datum.name] = {};
                newState[datum.name].value = event.target.value;
                newState[datum.name].valid = datum.validation(event.target.value);
                this.setState(newState);
              }}
              type={datum.type}
              placeholder={datum.placeholder}
              value={this.state[datum.name].value}
            />
          </label>
          <p className="help-text"><span className={'fa ' + (this.state[datum.name].valid ? 'fa-check-square-o' : 'fa-square-o')}></span> {datum.helpText}</p>
        </div>)}
        <div className="cell">
          <a
            className={'button primary' + (allFieldsValid ? '' : ' disabled')}
            onClick={allFieldsValid ? () => onSubmit(this.state) : null}
            type="submit"
            tabIndex="0"
          >{submitLabel}</a>
        </div>
      </div>
    </div>;
  }
};

FormInputHandler.propTypes = {
  headline: PropTypes.string.isRequired,
  inputsData: PropTypes.array.isRequired,
  onSubmit: PropTypes.func.isRequired,
  statusMessage: PropTypes.string.isRequired,
  submitLabel: PropTypes.string.isRequired,
};

export default FormInputHandler;
