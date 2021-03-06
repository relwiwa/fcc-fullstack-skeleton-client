import axios from 'axios';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { formInputStati } from '../../config/words';
import FormInputHandler from '../../reusable-components/form-input-handler';
import FormInputState from '../../models/form-input-state';


class AuthUser extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.state.inputsValues = {};
    const { inputsData } = props;
    inputsData.map(datum => {
      this.state.inputsValues[datum.name] = new FormInputState('', false);
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
    const { postUrl, successCallback } = this.props;
    const valuesToPost = {};
    Object.keys(inputsValues).map(key => {
      valuesToPost[key] = inputsValues[key].value;
    });

    axios.post(postUrl, valuesToPost)
    .then(result => {
      return successCallback
      ? successCallback(result.data.userJwt)
      : this.setState({ formInputStatus: formInputStati.successfulTransfer });
    })
    .catch(error => {
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
};

AuthUser.propTypes = {
  headline: PropTypes.string.isRequired,
  inputsData: PropTypes.array.isRequired,
  postUrl: PropTypes.string.isRequired,
  statusMessages: PropTypes.object.isRequired,
  submitLabel: PropTypes.string.isRequired,
  successCallback: PropTypes.func,
};

export default AuthUser;
