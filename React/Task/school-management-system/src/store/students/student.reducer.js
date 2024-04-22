import { STUDENTS_ACTION_TYPES } from './student.types';

export const STUDENTS_INITIAL_STATE = {
  students: [],
  isLoading: false,
  error: null,
};

export const studentsReducer = (
  state = STUDENTS_INITIAL_STATE,
  action = {}
) => {
  const { type, payload } = action;
    
  switch (type) {
    case STUDENTS_ACTION_TYPES.FETCH_STUDENTS_START:
      return { ...state, isLoading: true };
    case STUDENTS_ACTION_TYPES.UPDATE_STUDENT_START:
      return { ...state, isLoading: true };
    case STUDENTS_ACTION_TYPES.FETCH_STUDENTS_SUCCESS:
      return { ...state, students: payload, isLoading: false };
    case STUDENTS_ACTION_TYPES.UPDATE_STUDENT_SUCCESS:
      return { ...state, students: payload, isLoading: false };
    case STUDENTS_ACTION_TYPES.FETCH_STUDENTS_FAILED:
      return { ...state, error: payload, isLoading: false };
    default:
      return state;
  }
};
