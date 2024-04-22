// Import necessary dependencies
import React, { useState } from 'react';
import { FormDropdownInputLabel, Input, Group, Select } from './form-dropdown.styles';

// Define a new component for the dropdown field
const DropdownInput = ({ label, options, handleChange, selectedOption }) => {
  return (
    <Group>
      {label && (
        <FormDropdownInputLabel shrink={selectedOption !== ''}>
          {label}
        </FormDropdownInputLabel>
      )}
      

      <Select onChange={handleChange} value={selectedOption}>
      {/* <select onChange={handleChange} value={selectedOption}> */}
        <option value="" selected disabled hidden>
          Select
        </option>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      {/* </select> */}
      </Select>
    </Group>
  );
};

export default DropdownInput;