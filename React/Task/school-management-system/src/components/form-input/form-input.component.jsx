import { FormInputLabel, Input, Group, ErrorMessage } from './form-input.styles';
import { useState, useEffect } from 'react';
import { validate } from '../../utils/error-messages/error-messages.utils'

const FormInput = ({ error, label, ...otherProps }) => {
  const [errorMessage, setErrorMessage] = useState(error);

  console.log('FROMINPUT ', label);
  console.log('FROMINPUT ', error);
  console.log('FROMINPUT ', errorMessage);
  const isDOB = otherProps.name.toLowerCase() === 'dob';
  useEffect(() => {
    setErrorMessage(error); // Update errorMessage when errorMessages prop changes
}, [error]);

  const handleBlur = (event) => {
    const { name, value } = event.target;
    setErrorMessage(validate(name, value));
};

  return (
    <Group>
      <Input {...otherProps}  onBlur={handleBlur}/>
      {label && (
        <FormInputLabel shrink={otherProps.value.length} isDOB={isDOB}>
          {label}
        </FormInputLabel>
      )}
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </Group>
  );
};

export default FormInput;
