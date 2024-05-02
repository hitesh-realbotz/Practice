
import { useState, useEffect, memo } from 'react';
import { validate } from '../../utils/error-messages/error-messages.utils'
import { ErrorMessage, FormInputLabel, Group, Input } from './form-text-area.styles';

const FormTextArea = (({ handleBlur, errorM, label, ...otherProps }) => {

  const [errorMessage, setErrorMessage] = useState('');
  
  useEffect(() => {
    setErrorMessage(errorM); // Update errorMessage when errorMessages prop changes
  }, [errorM]);


  return (
    < Group >
      <Input {...otherProps} onBlur={handleBlur} />
      {
        label && (
          <FormInputLabel shrink={otherProps.value.length}>
            {label}
          </FormInputLabel>
        )
      }
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

    </Group >
  );
});

export default FormTextArea;
