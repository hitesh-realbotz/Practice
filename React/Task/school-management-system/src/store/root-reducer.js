import { combineReducers } from 'redux';

import { userReducer } from './user/user.reducer';
import { studentsReducer } from './students/student.reducer';
import toastReducer from './toasts/toast.reducer';

export const rootReducer = combineReducers({
  user: userReducer,
  students: studentsReducer,
  toasts: toastReducer,
});
