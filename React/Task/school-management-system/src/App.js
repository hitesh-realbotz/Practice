import './App.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkUserSession } from './store/user/user.action';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import Navigation from './routes/navigation/navigation.component'
import SignInForm from './components/sign-in-form/sign-in-form.component';
import SignUpForm from './components/sign-up-form/sign-up-form.component';
import Students from './components/students/students.component';
import Projects from './components/projects/projects.component';
import { selectCurrentUser } from './store/user/user.selector';
import { getStoredRoute, setStoredRoute } from './utils/navigation/navigation.utils';
// import { fetchStudentsStart } from './store/students/student.action';
// import { fetchProjectsStart } from './store/projects/project.action';


function App() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const currentUser = useSelector(selectCurrentUser);
  const [initialRouteChecked, setInitialRouteChecked] = useState(false);

  useEffect(() => { dispatch(checkUserSession()) }, []);


let initialRoute = getStoredRoute();
  useEffect(() => {
    // Check if the initial route has been set in browser storage
    if (initialRoute && !initialRouteChecked) {
      // Navigate to the stored initial route
      navigate(initialRoute, { replace: true });
      setInitialRouteChecked(true);
    }else{
      //set initial route in browser storage
      setStoredRoute();
    }
  }, [navigate, initialRouteChecked]);


  return (
    <Routes>
      <Route path='/' element={<Navigation />} >
        <Route index element={<SignInForm />} />
        <Route path='/sign-up' element={<SignUpForm />} />
        <Route path='/students'  element={!!currentUser ? <Students /> : <Navigate to="/" replace />}  />
        <Route path='/projects'  element={!!currentUser ? <Projects /> : <Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
