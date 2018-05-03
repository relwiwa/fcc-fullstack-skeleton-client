import axios from 'axios';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { authUserStati } from '../../config/words';
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
    this.state.authUserStatus = authUserStati.enterData;

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
      : this.setState({ authUserStatus: authUserStati.successfulTransfer });
    })
    .catch(error => {
      this.setState({ authUserStatus: authUserStati.erronousTransfer });
    });
    this.setState({ authUserStatus: authUserStati.transferData });
  }

  render() {
    const { authUserStatus, inputsValues } = this.state;
    const { headline, inputsData, statusMessages, submitLabel } = this.props;

    return <FormInputHandler
      displayInputs={authUserStatus === authUserStati.successfulTransfer ? false : true}
      headline={headline}
      inputsData={inputsData}
      inputsValues={inputsValues}
      onChange={this.handleChange}
      onSubmit={this.handleSubmit}
      statusMessage={statusMessages[authUserStatus]}
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
