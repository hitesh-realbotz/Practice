import { TOASTS_ACTION_TYPES } from './toast.types';
// Redux actions
// export const showToast = (message) => ({
//     type: 'SHOW_TOAST',
//     payload: { message },
//   });
  
  // Redux reducer
  const initialState = {
    message: '',
  };
  
  const toastReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (action.type) {
      case TOASTS_ACTION_TYPES.SHOW_TOAST:
        return {
          ...state,
          message: payload,
        };
      default:
        return state;
    }
  };
  
  export default toastReducer;
  

  //   import { STUDENTS_ACTION_TYPES } from './student.types';

// export const TOAST_INITIAL_STATE = {
//   students: [  ],
//   isLoading: false,
//   error: null,
// };

// export const studentsReducer = (
//   state = STUDENTS_INITIAL_STATE,
//   action = {}
// ) => {
//   const { type, payload } = action;
    
//   switch (type) {
//     case STUDENTS_ACTION_TYPES.FETCH_STUDENTS_START:
//       return { ...state, isLoading: true };
//     case STUDENTS_ACTION_TYPES.UPDATE_STUDENT_START:
//       return { ...state, isLoading: true };
//     case STUDENTS_ACTION_TYPES.FETCH_STUDENTS_SUCCESS:
//       return { ...state, students: payload, isLoading: false };
//     case STUDENTS_ACTION_TYPES.UPDATE_STUDENT_SUCCESS:
//       return { ...state, students: payload, isLoading: false };
//     case STUDENTS_ACTION_TYPES.FETCH_STUDENTS_FAILED:
//       return { ...state, error: payload, isLoading: false };
//     default:
//       return state;
//   }
// };
