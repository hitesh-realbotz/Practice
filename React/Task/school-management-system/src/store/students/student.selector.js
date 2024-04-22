import { createSelector } from 'reselect';


export const selectStudentReducer = (state) => state.students;


export const selectStudents = createSelector(
  [selectStudentReducer],
  (studentsSlice) => studentsSlice.students
);

export const selectStudentsMap = createSelector(
  [selectStudents],
  (students) =>
  
    students.reduce((acc, student) => {
      
      const { standard, divisions } = student;
      acc[standard] = standard;
      return acc;
    }, {})
);

export const selectStudentsIsLoading = createSelector(
  [selectStudentReducer],
  (studentsSlice) => studentsSlice.isLoading
);
