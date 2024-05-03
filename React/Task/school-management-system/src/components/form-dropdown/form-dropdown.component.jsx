// Import necessary dependencies
import { useState, useEffect, memo } from 'react';
import { FormDropdownInputLabel, Input, Group, Select, ErrorMessage } from './form-dropdown.styles';
import { validate } from '../../utils/validation/validation.utils'

// const DropdownInput = memo(({ errorM, name, label, options, handleChange, handleBlur, selectedOption }) => {
const DropdownInput = memo(({ errorM, label, options, handleChange, handleBlur, ...otherProps }) => {
  // const DropdownInput = React.memo(({ isReset, isSubmitted, errorM, name, label, options, handleChange, selectedOption }) => {

  const { name, value } = otherProps;
  const [errorMessage, setErrorMessage] = useState('');

  //Updating Error messages from FormComponent on From submission
  useEffect(() => {
    setErrorMessage(errorM);
  }, [errorM]);

  const onHandleBlur = (event) => {
    // console.log('DROP ', name, (event.target.value))
    handleBlur(event, name);
    // setErrorMessage(validate(name, selectedOption));
  };
  const onHandleChange = (event) => {
    // console.log('DROP Change ', name, event.target.value);
    handleChange(event, name);
    // setErrorMessage(validate(name, selectedOption));
  };


  // useEffect(() => {
  //   const isSub = isSubmitted ? setErrorMessage(validate(name, selectedOption)) : '';
  // }, [isSubmitted]);

  // useEffect(() => {
  //   const isRes = isReset ? setErrorMessage('') : '';
  // }, [isReset]);



  return (
    <Group  >
      {label && (
        <FormDropdownInputLabel shrink={otherProps.value !== ''}>
          {label}
        </FormDropdownInputLabel>
      )}

      {/* <Select onChange={handleChange} value={selectedOption} onBlur={onHandleBlur} > */}
      <Select {...otherProps} onChange={onHandleChange} onBlur={onHandleBlur} >
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