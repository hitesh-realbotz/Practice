import { STUDENTS_ACTION_TYPES } from './student.types';

export const STUDENTS_INITIAL_STATE = {
  students: [  ],
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
    case STUDENTS_ACTION_TYPES.ADD_STUDENT_START:
    case STUDENTS_ACTION_TYPES.UPDATE_STUDENT_START:
    case STUDENTS_ACTION_TYPES.DELETE_STUDENT_START:
      return { ...state, isLoading: true };

    case STUDENTS_ACTION_TYPES.FETCH_STUDENTS_SUCCESS:
    case STUDENTS_ACTION_TYPES.ADD_STUDENT_SUCCESS:
    case STUDENTS_ACTION_TYPES.UPDATE_STUDENT_SUCCESS:
    case STUDENTS_ACTION_TYPES.DELETE_STUDENT_SUCCESS:
      return { ...state, students: payload, isLoading: false };

    case STUDENTS_ACTION_TYPES.FETCH_STUDENTS_FAILED:
    case STUDENTS_ACTION_TYPES.ADD_STUDENT_FAILED:
    case STUDENTS_ACTION_TYPES.UPDATE_STUDENT_FAILED:
    case STUDENTS_ACTION_TYPES.DELETE_STUDENT_FAILED:
      return { ...state, error: payload, isLoading: false };
      
    default:
      return state;
  }
};
