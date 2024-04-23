// Import necessary dependencies
import React, { useState } from 'react';
import { FormDropdownInputLabel, Input, Group, Select, ErrorMessage } from './form-dropdown.styles';
import { validate } from '../../utils/error-messages/error-messages.utils'

// Define a new component for the dropdown field
const DropdownInput = ({ name, label, options, handleChange, selectedOption }) => {


  const [errorMessage, setErrorMessage] = useState('');
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
      {/* <select onChange={handleChange} value={selectedOption}> */}
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
};

export default DropdownInput;