import { useState, useEffect, memo } from 'react';

const DropdownInput = memo(({ errorM, label, options, handleChange, handleBlur, ...otherProps }) => {

  const { name, value } = otherProps;
  const [errorMessage, setErrorMessage] = useState('');

  //Updating Error messages from FormComponent on From submission
  useEffect(() => {
    setErrorMessage(errorM);
  }, [errorM]);

  const onHandleBlur = (event) => {
    handleBlur(event, name);
  };
  const onHandleChange = (event) => {
    handleChange(event, name);
  };

  return (
    <div className="mb-3">
      {
        label && (
          <label className='form-label'>
            {label}
          </label>
        )
      }

      <select className="form-select" {...otherProps} onChange={onHandleChange} onBlur={onHandleBlur} >
        <option value="" selected disabled hidden>
          Select
        </option>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errorMessage && <span className="form-text text-danger">{errorMessage}</span>}
    </div>
  );
});

export default DropdownInput;