import { FormInputLabel, Input, Group, ErrorMessage } from './form-input.styles';
import { useState, useEffect, memo } from 'react';
import { validate } from '../../utils/error-messages/error-messages.utils'

const FormInput = (({ handleBlur, errorM, label, ...otherProps }) => {
// const FormInput = ({ isReset, isSubmitted, onHandleFormAction, errorM, label, ...otherProps }) => {

  const [errorMessage, setErrorMessage] = useState('');

  const isDate = otherProps.type.toLowerCase() === 'date';
  
  //Updating Error messages from FormComponent on Form submission
  useEffect(() => {
    setErrorMessage(errorM); // Update errorMessage when errorMessages prop changes
  }, [errorM]);

  
  
  // const onHandleBlur = (event) => {
  //   const { name, value } = event.target;
  //   setErrorMessage(validate(name, value));
  // };
  //
  // useEffect(() => {
  //   const isSub = isSubmitted ? setErrorMessage(validate(otherProps.name, otherProps.value)) : '';
  //   onHandleFormAction(errorMessage);
  // }, [isSubmitted]);

  // useEffect(() => {
  //   const isRes = isReset ? setErrorMessage('') : '';
  //   onHandleFormAction();
  // }, [isReset]);


  return (
    < Group >
      <Input {...otherProps} onBlur={handleBlur} />
      {/* <Input {...otherProps} onBlur={onHandleBlur} /> */}
      {
        label && (
          <FormInputLabel shrink={otherProps.value.length} isDate={isDate}>
            {label}
          </FormInputLabel>
        )
      }
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

    </Group >
  );
});

export default FormInput;
