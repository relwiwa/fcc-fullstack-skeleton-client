import axios from 'axios';
import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { authUserInputData } from '../../config/auth-user-input-data';
import { authUserStati } from '../../config/words';

class AuthUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authUserStatus: authUserStati.enterData,
      email: {
        value: '',
        valid: false,
      },
      password: {
        value: '',
        valid: false,
      },
    };

    this.postUserData = this.postUserData.bind(this);
  }

  postUserData() {
    const { email, password } = this.state;
    const { postUrl, successCallback } = this.props;

    this.setState({ authUserStatus: authUserStati.transferData });
    axios.post(postUrl, {
      email: email.value,
      password: password.value,
    })
    .then(result => {
      successCallback ? successCallback(result.data.userJwt) : null;
      this.setState({ authUserStatus: authUserStati.successfulTransfer });
    })
    .catch(error => {
      this.setState({ authUserStatus: authUserStati.erronousTransfer });
    });
  }

  render() {
    const { authUserStatus, email, password } = this.state;
    const { authLabel, statusMessages } = this.props;
    const allFieldsValid = email.valid && password.valid;

    return (
      <div className="callout primary">
        <h1>{authLabel}</h1>
        {authUserStatus === authUserStati.enterData && <p>{statusMessages.enter}</p>}
        {authUserStatus === authUserStati.transferData && <p><span className="fa fa-spinner fa-spin"></span> {statusMessages.transfer} <span className="fa fa-spinner fa-spin"></span></p>}
        {authUserStatus === authUserStati.successfulTransfer && <p>{statusMessages.success}</p>}
        {authUserStatus === authUserStati.erronousTransfer && <p>{statusMessages.error}</p>}
        {authUserStatus !== authUserStati.successfulTransfer && <div className="grid-x">
          {authUserInputData.map(datum => {
            return <div className="cell" key={datum.name}>
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
            </div>
          })}
          <div className="cell">
            <a
              className={'button primary' + (allFieldsValid ? '' : ' disabled')}
              onClick={allFieldsValid ? () => this.postUserData() : null}
              tabIndex="0"
            >{authLabel}</a>
          </div>
        </div>}
      </div>
    );
  }
};

AuthUser.propTypes = {
  authLabel: PropTypes.string.isRequired,
  postUrl: PropTypes.string.isRequired,
  successCallback: PropTypes.func,
  statusMessages: PropTypes.object.isRequired,
};

export default AuthUser;
