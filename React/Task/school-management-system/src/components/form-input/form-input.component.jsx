import { FormInputLabel, Input, Group, ErrorMessage } from './form-input.styles';
import { useState, useEffect, memo } from 'react';
import { validate } from '../../utils/validation/validation.utils'

const FormInput = memo(({ handleBlur, errorM, label, ...otherProps }) => {
// const FormInput = ({ isReset, isSubmitted, onHandleFormAction, errorM, label, ...otherProps }) => {

  const [errorMessage, setErrorMessage] = useState('');

  const isDate = otherProps.type.toLowerCase() === 'date';
  // const isDateC = otherProps.name.toLowerCase() === 'dobc';
  // otherProps.type = 'date';
  
  //Updating Error messages from FormComponent on Form submission
  useEffect(() => {
    setErrorMessage(errorM); // Update errorMessage when errorMessages prop changes
  }, [errorM]);
  

  return (
    < Group >
      {
        label && (
          <FormInputLabel>
            {label}
          </FormInputLabel>
        )
      }
      <Input {...otherProps} onBlur={handleBlur} />
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

    </Group >
  );
});

export default FormInput;
