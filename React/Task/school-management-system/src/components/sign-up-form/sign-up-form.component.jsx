import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import FormInput from '../form-input/form-input.component';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';

import { ButtonsContainer, NavLink, RowContainer, SignUpContainer } from './sign-up-form.styles';
import { signUpStart } from '../../store/user/user.action';
import { validateForm, getUpdatedErrorMsg } from '../../utils/validation/validation.utils';
import { selectIsLoading, selectIsValidUser } from '../../store/user/user.selector';
import { useNavigate } from 'react-router-dom';
import Spinner from '../spinner/spinner.component';
import { CONSTANTS } from '../../constants/constants';


const defaultErrorMessages = {
  emailError: '',
  passwordError: '',
};

const SignUpForm = () => {

  let defaultFormFields = {
    email: '',
    password: '',
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isValidUser = useSelector(selectIsValidUser);
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    if (isValidUser) {
      navigate(CONSTANTS.STUDENTS_ROUTE_PATH);
    }
  }, [isValidUser]);

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const [errorMessages, setErrorMessages] = useState(defaultErrorMessages);
  const { emailError, passwordError } = errorMessages;

  const resetFormFields = () => {
    setErrorMessages(defaultErrorMessages);
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationResult = validateForm(Object.keys(formFields), Object.values(formFields), Object.keys(defaultErrorMessages));
    if (!validationResult.isValid) {
      setErrorMessages(validationResult.errors);
      return;
    }


    try {
      dispatch(signUpStart(email, password));
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert('Cannot create user, email already in use');
      } else {
        console.log('user creation encountered an error', error);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };


  //Updating Error messages from FormComponent
  const onHandleBlur = (event, errorTag) => {
    const { name, value } = event.target;
    const errors = getUpdatedErrorMsg(errorTag, name, value, errorMessages);
    setErrorMessages(errors);
  };
  const handleFormAction = () => {
    // setIsReset(false);
    // setIsSubmitted(false);
  };

  return (

    <>
      {
        isLoading ?
          <>
            <Spinner />
          </>
          :
          <SignUpContainer>
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>

              <RowContainer>
                <FormInput
                  label='Email'
                  type='email'
                  name='email'
                  value={email}
                  onChange={handleChange}
                  handleBlur={(event) => onHandleBlur(event, 'emailError')}
                  errorM={emailError}
                />
              </RowContainer>
              <RowContainer>
                <FormInput
                  label='Password'
                  type='password'
                  name='password'
                  value={password}
                  onChange={handleChange}
                  handleBlur={(event) => onHandleBlur(event, 'passwordError')}
                  errorM={passwordError}
                />
              </RowContainer>
              <ButtonsContainer>
                <Button type='submit'>Sign Up</Button>
                <Button buttonType={BUTTON_TYPE_CLASSES.inverted} type='button' onClick={resetFormFields} >Reset</Button>
              </ButtonsContainer>
              <RowContainer>
                <div className='sign-up-hint'>Already have account? <NavLink to='/'>SIGN-IN</NavLink> </div>
              </RowContainer>
            </form>
          </SignUpContainer>
      }
    </>
  );
};

export default SignUpForm;
