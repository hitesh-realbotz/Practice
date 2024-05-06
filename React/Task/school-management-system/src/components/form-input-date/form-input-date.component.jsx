import { FormInputLabel, Input, Group, ErrorMessage } from './form-input-date.styles';
import { useState, useEffect, memo } from 'react';
import { validate } from '../../utils/validation/validation.utils'

const FormInputDate = memo(({ handleBlur, handleChange, errorM, label, ...otherProps }) => {
  // const FormInput = ({ isReset, isSubmitted, onHandleFormAction, errorM, label, ...otherProps }) => {

  const [errorMessage, setErrorMessage] = useState('');
  // const [otherPropsType, setOtherProps] = useState(otherProps);


  const isDate = otherProps.type.toLowerCase() === 'date';
  // const isDateC = otherProps.name.toLowerCase() === 'dobc';
  // otherProps.type = 'date';

  //Updating Error messages from FormComponent on Form submission
  useEffect(() => {
    setErrorMessage(errorM); // Update errorMessage when errorMessages prop changes
  }, [errorM]);
  // useEffect(() => {
  //   setOtherProps(otherPropsType);
  // }, [otherPropsType]);


  // const handleOnFocus = () => {
  //   if (otherProps.name.toLowerCase() === 'dobc') {
  //     otherPropsType.type = 'date';
  //     setOtherProps(otherPropsType);
  //   };
  // }

  const [isDateType, setIsDateType] = useState(otherProps.value ? true : false);

  const handleFocus = () => {
    console.log('DATE Focus');
    setIsDateType(true);
  };

  const onhandleBlur = (event) => {
    console.log('DATE Blur', event.target, event.target.value);
    if (!!event.target.value) {
      setIsDateType(false);
    }else{
      setIsDateType(true);
    }
    handleBlur(event);
  };
  const onhandleChange = (event) => {
    console.log('DATE Change', event.target, event.target.value);
    if (!!event.target.value) {
      setIsDateType(false);
    }else{
      setIsDateType(true);

    }
    handleChange(event);
  };


  return (
    < Group >

      <Input {...otherProps} type={isDateType ? 'date' : 'text'} onChange={(event) => onhandleChange(event)} onBlur={(event) => onhandleBlur(event)} onFocus={handleFocus} />
      {
        label && (
          <FormInputLabel shrink={otherProps.value.length} isDate={isDate}>
            {otherProps.value.length ? label : `Enter ${label}`}
          </FormInputLabel>
        )
      }
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}


      {/* <input
        type={isDateType ? 'date' : 'text'}
        placeholder="MM/DD/YYYY"
        onFocus={handleFocus}
        onBlur={onhandleBlur}
      /> */}

    </Group >
  );
});

export default FormInputDate;
