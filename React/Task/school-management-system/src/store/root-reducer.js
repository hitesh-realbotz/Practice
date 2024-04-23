import { combineReducers } from 'redux';

import { userReducer } from './user/user.reducer';
import { studentsReducer } from './students/student.reducer';

export const rootReducer = combineReducers({
  user: userReducer,
  students: studentsReducer,
});
