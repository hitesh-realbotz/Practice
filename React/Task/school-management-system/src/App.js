import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { checkUserSession } from './store/user/user.action';
import { Routes, Route } from 'react-router-dom';

import Navigation from './routes/navigation/navigation.component'
import SignInForm from './components/sign-in-form/sign-in-form.component';
import SignUpForm from './components/sign-up-form/sign-up-form.component';
import Authentication from './routes/authentication/authentication.component';
import Students from './components/students/students.component';
import Projects from './components/projects/projects.component';
import { fetchStudentsStart } from './store/students/student.action';


function App() {

  const dispatch = useDispatch();
 
  useEffect(() => {
    dispatch(checkUserSession());
  }, []);


  useEffect(() => {
    console.log('*********************');
    dispatch(fetchStudentsStart());
  }, []);


  return (
    <Routes>
      <Route path='/' element={<Navigation />} >
        {/* <Route path='/dashboard' element={<Home />} /> */}
        <Route index element={<SignInForm />} />
        <Route path='/sign-up' element={<SignUpForm />} />
        <Route path='/students' element={<Students />} />
        <Route path='/projects' element={<Projects />} />
        {/* <Route path='/sign-in' element={<SignInForm />} />
        <Route path='/sign-up' element={<SignUpForm />} /> */}
        {/* <Route path='/checkout' element={<Checkout />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
