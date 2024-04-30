import { useState } from 'react';
import { useDispatch } from 'react-redux';

import FormInput from '../form-input/form-input.component';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

import { SignInContainer, ButtonsContainer, RowContainer } from './sign-in-form.styles';
// import { ButtonsContainer } from '../students/student-form.styles';
import {
  // googleSignInStart,
  emailSignInStart,
} from '../../store/user/user.action';
import { NavLink } from './sign-in-form.styles';
import { validateForm, validate, getUpdatedErrorMsg } from '../../utils/error-messages/error-messages.utils';
import Students from '../students/students.component';
import Navigation from '../../routes/navigation/navigation.component';
import { useNavigate } from 'react-router-dom';

const defaultErrorMessages = {
  emailError: '',
  passwordError: '',
};


const SignInForm = () => {
  let defaultFormFields = {
    email: '',
    password: '',
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const [isSubmitted, setIsSubmitted] = useState(false);
  // const [isReset, setIsReset] = useState(false);

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const [errorMessages, setErrorMessages] = useState(defaultErrorMessages);
  const { emailError, passwordError } = errorMessages;

  const resetFormFields = () => {
    setErrorMessages(defaultErrorMessages);
    setFormFields(defaultFormFields);
    // setIsReset(!isReset);
  };

  const signInWithGoogle = async () => {
    // dispatch(googleSignInStart());
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // setIsSubmitted(!isSubmitted);
    const validationResult = validateForm(Object.keys(formFields), Object.values(formFields), Object.keys(defaultErrorMessages));

    if (!validationResult.isValid) {
      console.log('post validation ', validationResult.errors);
      setErrorMessages(validationResult.errors);
      return;
    }

    try {
      dispatch(emailSignInStart(email, password));
      resetFormFields();
      navigate('/students');
    } catch (error) {
      console.log('user sign in failed', error);
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

  return (
    <SignInContainer>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
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
          <Button type='submit'>Sign In</Button>
          <Button buttonType={BUTTON_TYPE_CLASSES.inverted} type='button' onClick={resetFormFields} >Reset</Button>
        </ButtonsContainer>
        <RowContainer>
          <div className='sign-up-hint'>No account yet? <NavLink to='/sign-up'>SIGN-UP</NavLink> </div>
        </RowContainer>
      </form>
    </SignInContainer>
  );
};

export default SignInForm;
