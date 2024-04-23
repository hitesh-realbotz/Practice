import { STUDENTS_ACTION_TYPES } from './student.types';

import { createAction } from '../../utils/reducer/reducer.utils';

export const fetchStudentsStart = (newStudents) =>
  createAction(STUDENTS_ACTION_TYPES.FETCH_STUDENTS_START, newStudents);

export const fetchStudentsSuccess = (studentsArray) =>
  createAction(
    STUDENTS_ACTION_TYPES.FETCH_STUDENTS_SUCCESS,
    studentsArray
  );
export const updateStudentsSuccess = (studentsArray) =>
  createAction(
    STUDENTS_ACTION_TYPES.UPDATE_STUDENT_SUCCESS,
    studentsArray
  );

export const fetchStudentsFailed = (error) =>
  createAction(STUDENTS_ACTION_TYPES.FETCH_STUDENTS_FAILED, error);

export const updateStudentsFailed = (error) =>
  createAction(STUDENTS_ACTION_TYPES.UPDATE_STUDENT_FAILED, error);


export const updateStudentStart = (students, studentToAdd) => {
  const newStudents = addStudent(students, studentToAdd);
  console.log('newStudents Array.isArray(newStudents)',Array.isArray(newStudents));
  return createAction(STUDENTS_ACTION_TYPES.UPDATE_STUDENT_START, newStudents);
}

const addStudent = (students, studentToAdd) => {
  if (!Array.isArray(students)) {
    // If not, return students unchanged
    console.error('Students must be an array');
    return students;
  }
  // Iterate over each standard
  students.forEach((student) => {
    console.log('Student available', student);
    if (student.standard === studentToAdd.standard) {
      student.standard.divisions.forEach((division) => {

        if (division === studentToAdd.division) {
          division.students.forEach((student) => {
            if (student.email === studentToAdd.email || student.rollNo === studentToAdd.rollNo) {
              return;
            }
          });

          division.students.push({
            rollNo: studentToAdd.rollNo,
            name: studentToAdd.name,
            email: studentToAdd.email,
          });
        }
      });

      student.standard.divisions.push(
        {
          division: studentToAdd.division,
          students: [
            {
              rollNo: studentToAdd.rollNo,
              name: studentToAdd.name,
              email: studentToAdd.email,
            }
          ],
        });

    }
  });
  students.push({
    standard: studentToAdd.standard,
    divisions: [
      {
        division: studentToAdd.division,
        students: [
          {
            rollNo: studentToAdd.rollNo,
            name: studentToAdd.name,
            email: studentToAdd.email,
          }
        ],
      }
    ]
  })
  console.log(students);

  return students;

};

