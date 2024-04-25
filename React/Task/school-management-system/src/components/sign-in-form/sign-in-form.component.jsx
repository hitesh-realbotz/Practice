import { useState } from 'react';
import { useDispatch } from 'react-redux';

import FormInput from '../form-input/form-input.component';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

import { SignInContainer, ButtonsContainer } from './sign-in-form.styles';
// import { ButtonsContainer } from '../students/student-form.styles';
import {
  // googleSignInStart,
  emailSignInStart,
} from '../../store/user/user.action';
import { NavLink } from './sign-in-form.styles';

const defaultFormFields = {
  email: '',
  password: '',
};

const SignInForm = () => {
  const dispatch = useDispatch();
  const [isSubmitted, setIsSubmitted] = useState(false);
    const [isReset, setIsReset] = useState(false);
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
    setIsReset(!isReset);
  };

  const signInWithGoogle = async () => {
    // dispatch(googleSignInStart());
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitted(!isSubmitted);

    try {
      dispatch(emailSignInStart(email, password));
      resetFormFields();
    } catch (error) {
      console.log('user sign in failed', error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const handleFormAction = () => {
    setIsReset(false);
    setIsSubmitted(false);
};

  return (
    <SignInContainer>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label='Email'
          type='email'
          onChange={handleChange}
          onHandleFormAction={handleFormAction}
          name='email'
          value={email}
          isSubmitted={isSubmitted}
          isReset={!isReset}
        />

        <FormInput
          label='Password'
          type='password'
          onChange={handleChange}
          onHandleFormAction={handleFormAction}
          name='password'
          value={password}
          isSubmitted={isSubmitted}
          isReset={!isReset}
        />
        <div className='sign-up-hint'>No account yet? <NavLink to='/sign-up'>SIGN-UP</NavLink> </div>
        <ButtonsContainer>
          <Button type='submit'>Sign In</Button>
          <Button buttonType={BUTTON_TYPE_CLASSES.inverted} type='button' onClick={resetFormFields} >Reset</Button>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  );
};

export default SignInForm;
