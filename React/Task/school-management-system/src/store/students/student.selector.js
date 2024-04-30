import { createSelector } from 'reselect';


export const selectStudentReducer = (state) => state.students;


export const selectStudents = createSelector(
  [selectStudentReducer],
  (studentsSlice) => studentsSlice.students
);

