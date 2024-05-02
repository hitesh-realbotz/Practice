import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkUserSession } from './store/user/user.action';
import { Routes, Route, Navigate } from 'react-router-dom';

import Navigation from './routes/navigation/navigation.component'
import SignInForm from './components/sign-in-form/sign-in-form.component';
import SignUpForm from './components/sign-up-form/sign-up-form.component';
import Authentication from './routes/authentication/authentication.component';
import Students from './components/students/students.component';
import Projects from './components/projects/projects.component';
import { fetchStudentsStart } from './store/students/student.action';
import { selectCurrentUser } from './store/user/user.selector';
import PrivateRoute from './routes/private-route/private-route.component';
import { fetchProjectsStart } from './store/projects/project.action';


function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, []);

  const currentUser = useSelector(selectCurrentUser);



  useEffect(() => {
    dispatch(fetchStudentsStart());
    dispatch(fetchProjectsStart());
  }, []);


  return (
    <Routes>
      <Route path='/' element={<Navigation />} >
        <Route index element={<SignInForm />} />
        <Route path='/sign-up' element={<SignUpForm />} />
        <Route path='/students'  element={!!currentUser ? <Students /> : <Navigate to="/" replace />} />
        <Route path='/projects'  element={!!currentUser ? <Projects /> : <Navigate to="/" replace />} />
        {/* <Route path='/projects' element={<Projects />} /> */}
        
        
      </Route>
    </Routes>
  );
}

export default App;
