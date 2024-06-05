import { Height, Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, OutlinedInput } from '@mui/material';
import { useState, useEffect, memo } from 'react';

const PasswordInput = memo(({ handleBlur, errorM, label, ...otherProps }) => {

  const [errorMessage, setErrorMessage] = useState('');
  const [isPasswordType, setIsPasswordType] = useState(otherProps.type == "password" ? true : false);

  //Updating Error messages from FormComponent on Form submission
  useEffect(() => {
    setErrorMessage(errorM); // Update errorMessage when errorMessages prop changes
  }, [errorM]);

  const handlePasswordToggle = () => {
    setIsPasswordType(!isPasswordType);
  }

  return (
    <div className="mb-3">
      {
        label && (
          <label className='form-label'>
            {label}
          </label>
        )
      }

      <div style={{ position: 'relative' }}>
        <input
          className="form-control border-dark"
          {...otherProps}
          type={isPasswordType ? 'password' : 'text'}
          onBlur={handleBlur}
        />
        <div style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)' }}>
          <IconButton onClick={handlePasswordToggle}>
            {isPasswordType ? <Visibility /> : <VisibilityOff />}
          </IconButton>
        </div>
      </div>
      {errorMessage && <span className="form-text text-danger">{errorMessage}</span>}
    </div >
  );
});

export default PasswordInput;
