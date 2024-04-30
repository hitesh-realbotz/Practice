import { combineReducers } from 'redux';

import { userReducer } from './user/user.reducer';
import { studentsReducer } from './students/student.reducer';
import toastReducer from './toasts/toast.reducer';
import { projectsReducer } from './projects/project.reducer';

export const rootReducer = combineReducers({
  user: userReducer,
  students: studentsReducer,
  projects: projectsReducer,
  toasts: toastReducer,
});
