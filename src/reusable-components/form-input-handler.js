import PropTypes from 'prop-types';
import React from 'react';

const FormInputHandler = ({ displayInputs, headline, inputsData, inputsValues, onChange, onSubmit, statusMessage, submitLabel }) => {
  const checkFieldsValidity = (fields) => {
    let allValid = true;
    fields.map(field => {
      if (inputsValues[field.name].valid === false) {
        allValid = false;
      }
    });
    return allValid;
  };
  const allFieldsValid = checkFieldsValidity(inputsData);
 
  return <div className="callout">
    <h1>{headline}</h1>
    <p>{statusMessage}</p>
    {displayInputs && <div className="grid-x">
      {inputsData.map(datum => {
      return <div className="cell" key={datum.name}>
        <label>{datum.label}
          <input
            onChange={(event) => {
              const newObject = {};
              newObject[datum.name] = {};
              newObject[datum.name].value = event.target.value;
              newObject[datum.name].valid = datum.validation(event.target.value);
              onChange(newObject);
            }}
            type={datum.type}
            placeholder={datum.placeholder}
            value={inputsValues[datum.name].value}
          />
        </label>
        <p className="help-text"><span className={'fa ' + (inputsValues[datum.name].valid ? 'fa-check-square-o' : 'fa-square-o')}></span> {datum.helpText}</p>
      </div>})}
      <div className="cell">
        <a
          className={'button hollow secondary' + (allFieldsValid ? '' : ' disabled')}
          onClick={allFieldsValid ? onSubmit : null}
          type="submit"
          tabIndex="0"
        >{submitLabel}</a>
      </div>
    </div>}
  </div>;
};

FormInputHandler.propTypes = {
  displayInputs: PropTypes.bool.isRequired,
  headline: PropTypes.string.isRequired,
  inputsData: PropTypes.array.isRequired,
  inputsValues: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  statusMessage: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  submitLabel: PropTypes.string.isRequired,
};

export default FormInputHandler;
