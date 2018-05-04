import axios from 'axios';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { getToken } from '../../services/auth-service';

import { formInputStati } from '../../config/words';
import FormInputState from '../../models/form-input-state';
import FormInputHandler from '../../reusable-components/form-input-handler';

class ManageItem extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.state.inputsValues = {};
    const { inputsData, inputsValues } = props;
    inputsData.map(datum => {
      this.state.inputsValues[datum.name] = new FormInputState(inputsValues[datum.name], datum.validation(inputsValues[datum.name]));
    });
    this.state.formInputStatus = formInputStati.enterData;
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(newValues) {
    const { inputsValues } = this.state;
    const newInputsValues = {...this.state.inputsValues};
    const inputName = Object.keys(newValues)[0];
    newInputsValues[inputName] = newValues[inputName];
    this.setState({ inputsValues: newInputsValues });
  }

  handleSubmit() {
    const { inputsValues } = this.state;
    const { apiMethod, apiUrl, successCallback } = this.props;
    const valuesToTransfer = {};
    Object.keys(inputsValues).map(key => {
      valuesToTransfer[key] = inputsValues[key].value;
    });
    valuesToTransfer.jwtToken = getToken();
  
    axios[apiMethod](apiUrl, valuesToTransfer)
    .then(result => {
      return successCallback
       ? successCallback(result.data.item)
      : this.setState({ formInputStatus: formInputStati.successfulTransfer });
    })
    .catch(error => {
      console.log(error);
      this.setState({ formInputStatus: formInputStati.erronousTransfer });
    });
    this.setState({ formInputStatus: formInputStati.transferData });
  }

  render() {
    const { formInputStatus, inputsValues } = this.state;
    const { headline, inputsData, statusMessages, submitLabel } = this.props;

    return <FormInputHandler
      displayInputs={formInputStatus === formInputStati.successfulTransfer ? false : true}
      headline={headline}
      inputsData={inputsData}
      inputsValues={inputsValues}
      onChange={this.handleChange}
      onSubmit={this.handleSubmit}
      statusMessage={statusMessages[formInputStatus]}
      submitLabel={submitLabel}        
    />;
  }
}

ManageItem.propTypes = {
  apiMethod: PropTypes.string.isRequired,
  apiUrl: PropTypes.string.isRequired,
  headline: PropTypes.string.isRequired,
  inputsData: PropTypes.array.isRequired,
  inputsValues: PropTypes.object.isRequired,
  statusMessages: PropTypes.object.isRequired,
  submitLabel: PropTypes.string.isRequired,
  successCallback: PropTypes.func,
};

export default withRouter(ManageItem);