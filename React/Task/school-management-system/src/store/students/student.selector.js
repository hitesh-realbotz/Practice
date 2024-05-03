import { createSelector } from 'reselect';


export const selectStudentReducer = (state) => state.students;

export const selectIsLoading = (state) => state.students.isLoading;


export const selectStudents = createSelector(
  [selectStudentReducer],
  (studentsSlice) => studentsSlice.students
);

const getFlattenedStudents = (state) => { 
  return state.students.students.flatMap(({ standard, divisions }) => {
  return divisions.flatMap(({ division, students }) => {
      return students.map(({ dob, email, name, rollNo, subject }) => {
          return { dob, email, name, rollNo, subject, standard, division };
      });
  });
})}

export const selectFlatenedStudents = (state) => {
  return getFlattenedStudents(state);
}
export const selectTotalStudentsCount = (state) => {
  return getFlattenedStudents(state).length;
}
