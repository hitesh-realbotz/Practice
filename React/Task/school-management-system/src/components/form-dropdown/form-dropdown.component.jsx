// Import necessary dependencies
import React, { useState, useEffect } from 'react';
import { FormDropdownInputLabel, Input, Group, Select, ErrorMessage } from './form-dropdown.styles';
import { validate } from '../../utils/error-messages/error-messages.utils'

const DropdownInput = React.memo(({ isReset, isSubmitted, errorM, name, label, options, handleChange, selectedOption }) => {

  const [errorMessage, setErrorMessage] = useState('');

  ////Updating Error messages from FormComponent on onBlur
  // useEffect(() => {
  //   setErrorMessage(errorM); // Update errorMessage when errorMessages prop changes
  // }, [errorM]);

  useEffect(() => {
    const isSub = isSubmitted ? setErrorMessage(validate(name, selectedOption)) : '';
  }, [isSubmitted]);

  useEffect(() => {
    const isRes = isReset ? setErrorMessage('') : '';
  }, [isReset]);


  const handleBlur = (event) => {
    setErrorMessage(validate(name, selectedOption));
  };

  return (
    <Group  >
      {label && (
        <FormDropdownInputLabel shrink={selectedOption !== ''}>
          {label}
        </FormDropdownInputLabel>
      )}

      <Select onChange={handleChange} value={selectedOption} onBlur={handleBlur} >
        <option value="" selected disabled hidden>
          Select
        </option>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </Group>
  );
});

export default DropdownInput;