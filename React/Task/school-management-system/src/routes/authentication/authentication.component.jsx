import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import SignInForm from '../../components/sign-in-form/sign-in-form.component';

import { AuthenticationContainer } from './authentication.styles';
import { Route, Routes } from 'react-router-dom';

const Authentication = () => {
  return (

    <AuthenticationContainer>
      <Routes>
        <Route index element={<SignInForm />} />
        <Route path='/sign-up' element={<SignUpForm />} />
      </Routes>
    </AuthenticationContainer>
  );
};

export default Authentication;
