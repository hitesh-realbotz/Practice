import { useState, useEffect, memo } from 'react';

const TextAreaInput = memo(({ handleBlur, errorM, label, ...otherProps }) => {

  const [errorMessage, setErrorMessage] = useState('');

  //Updating Error messages from FormComponent on Form submission
  useEffect(() => {
    setErrorMessage(errorM); // Update errorMessage when errorMessages prop changes
  }, [errorM]);

  return (
    <div className="mb-3">
      {
        label && (
          <label className='form-label'>
            {label}
          </label>
        )
      }
      <textarea className="form-control border-dark " {...otherProps} onBlur={handleBlur} />
      
      {errorMessage && <span className="form-text text-danger">{errorMessage}</span>}
    </div >
  );
});

export default TextAreaInput;
