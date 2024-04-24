import { FormInputLabel, Input, Group, ErrorMessage } from './form-input.styles';
import React, { useState, useEffect } from 'react';
import { validate } from '../../utils/error-messages/error-messages.utils'

const FormInput = ({ isReset, isSubmitted, onHandleFormAction, errorM, label, ...otherProps }) => {

  const [errorMessage, setErrorMessage] = useState('');

  const isDOB = otherProps.name.toLowerCase() === 'dob';

  ////Updating Error messages from FormComponent on onBlur
  // useEffect(() => {
  //   setErrorMessage(errorM); // Update errorMessage when errorMessages prop changes
  // }, [errorM]);

  useEffect(() => {
    const isSub = isSubmitted ? setErrorMessage(validate(otherProps.name, otherProps.value)) : '';
    onHandleFormAction(errorMessage);

  }, [isSubmitted]);

  useEffect(() => {
    const isRes = isReset ? setErrorMessage('') : '';
    onHandleFormAction();
  }, [isReset]);


  const onHandleBlur = (event) => {
    const { name, value } = event.target;
    setErrorMessage(validate(name, value));
  };


  return (
    < Group >
      {/* <Input {...otherProps} onBlur={handleBlur} /> */}
      <Input {...otherProps} onBlur={onHandleBlur} />
      {
        label && (
          <FormInputLabel shrink={otherProps.value.length} isDOB={isDOB}>
            {label}
          </FormInputLabel>
        )
      }
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

    </Group >
  );
};

export default FormInput;
