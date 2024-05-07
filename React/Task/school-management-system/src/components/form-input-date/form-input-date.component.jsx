import { FormInputLabel, Input, Group, ErrorMessage } from './form-input-date.styles';
import { useState, useEffect, memo } from 'react';

const FormInputDate = memo(({ handleBlur, onChange, errorM, label, ...otherProps }) => {

  const [errorMessage, setErrorMessage] = useState('');

  const [isDate, setIsDate] = useState(otherProps.value ? true : false);

  //Updating Error messages from FormComponent on Form submission
  useEffect(() => {
    setErrorMessage(errorM); // Update errorMessage when errorMessages prop changes
  }, [errorM]);

  useEffect(() => {
    setIsDate(otherProps.value ? true : false);
  }, [otherProps.value]);

  const handleFocus = () => {
    setIsDate(true);
  };

  const onhandleChange = (event) => {
    if (!!event.target.value) setIsDate(true);
    else setIsDate(false);

    onChange(event);
  };

  const onhandleBlur = (event) => {
    if (!!event.target.value) setIsDate(true);
    else setIsDate(false);

    handleBlur(event);
  };


  return (
    < Group >
      {
        label && (
          <FormInputLabel shrink={otherProps.value.length} isDate={isDate}>
            {label}
            {/* {otherProps.value.length ? label : `Enter ${label}`} */}
          </FormInputLabel>
        )
      }
      <Input {...otherProps} type={isDate ? 'date' : 'text'} onChange={(event) => onhandleChange(event)} onBlur={(event) => onhandleBlur(event)} onFocus={handleFocus} />
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </Group >
  );
});

export default FormInputDate;
