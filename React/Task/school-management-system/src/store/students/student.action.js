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
console.log(newStudents);
  return newStudents != null ? createAction(STUDENTS_ACTION_TYPES.UPDATE_STUDENT_START, newStudents) : null;
}

const addStudent = (students, studentToAdd) => {

  // Check if studentToAdd has required properties
  if (!studentToAdd || !studentToAdd.standard || !studentToAdd.division || !studentToAdd.rollNo || !studentToAdd.name || !studentToAdd.email) {
    console.error('Invalid studentToAdd object');
    return students;
  }

  // Find the student with the matching standard
  const matchingStandard = students.find(student => student.standard === studentToAdd.standard);

  if (matchingStandard) {
    // Find the division within the matching student
    const matchingDivision = matchingStandard.divisions.find(division => division.division === studentToAdd.division);

    if (matchingDivision) {
      // Check if the student already exists in the division
      const existingStudent = matchingDivision.students.find(student => student.email === studentToAdd.email || student.rollNo === studentToAdd.rollNo);

      if (!existingStudent) {
        // If the student doesn't exist, add them to the division
        matchingDivision.students.push({
          rollNo: studentToAdd.rollNo,
          name: studentToAdd.name,
          email: studentToAdd.email,
        });
      }else{
        console.log('email &/ rollNo conflict');
        return null;
      }
    } else {
      // If the division doesn't exist, create it and add the student
      matchingStandard.divisions.push({
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
  } else {
    // If the standard doesn't exist, create it along with division and student
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
    });
  }

  console.log(students);
  return students;
};


// const addStudent = (students, studentToAdd) => {
//   // Iterate over each standard
//   students.forEach((student) => {
//     console.log('Student available', student);
//     if (student.standard === studentToAdd.standard) {
//       student.divisions.forEach((division) => {

//         if (division === studentToAdd.division) {
//           division.students.forEach((student) => {
//             if (student.email === studentToAdd.email || student.rollNo === studentToAdd.rollNo) {
//               return;
//             }
//           });

//           division.students.push({
//             rollNo: studentToAdd.rollNo,
//             name: studentToAdd.name,
//             email: studentToAdd.email,
//           });
//         }
//       });

//       student.divisions.push(
//         {
//           division: studentToAdd.division,
//           students: [
//             {
//               rollNo: studentToAdd.rollNo,
//               name: studentToAdd.name,
//               email: studentToAdd.email,
//             }
//           ],
//         });

//     }
//   });
//   students.push({
//     standard: studentToAdd.standard,
//     divisions: [
//       {
//         division: studentToAdd.division,
//         students: [
//           {
//             rollNo: studentToAdd.rollNo,
//             name: studentToAdd.name,
//             email: studentToAdd.email,
//           }
//         ],
//       }
//     ]
//   })
//   console.log(students);

//   return students;

// };

