
import { useState, useEffect, memo } from 'react';
// import { validate } from '../../utils/validation/validation.utils'
import { ErrorMessage, FormInputLabel, Group, Input } from './form-text-area.styles';

const FormTextArea = memo(({ handleBlur, errorM, label, ...otherProps }) => {

  const [errorMessage, setErrorMessage] = useState('');
  
  useEffect(() => {
    setErrorMessage(errorM); // Update errorMessage when errorMessages prop changes
  }, [errorM]);


  return (
    < Group >
      {
        label && (
          <FormInputLabel >
            {label}
          </FormInputLabel>
        )
      }
      <Input {...otherProps} onBlur={handleBlur} />
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

    </Group >
  );
});

export default FormTextArea;
