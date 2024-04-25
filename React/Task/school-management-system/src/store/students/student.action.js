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


export const updateStudentStart = (students, studentToAdd, existingStudentData) => {
  console.log('StudentToAddData ', studentToAdd);
  console.log('existingStudentData ', existingStudentData);

  const newStudents = updateStudent(students, studentToAdd, existingStudentData);
  // console.log(newStudents);
  // console.log(newStudents.conflicts);
  return !newStudents.conflicts ? createAction(STUDENTS_ACTION_TYPES.UPDATE_STUDENT_START, newStudents) : newStudents;
}
export const addStudentStart = (students, studentToAdd) => {
  const newStudents = addStudent(students, studentToAdd);
  console.log(newStudents);
  console.log(newStudents.conflicts);
  return !newStudents.conflicts ? createAction(STUDENTS_ACTION_TYPES.UPDATE_STUDENT_START, newStudents) : newStudents;
}

const updateStudent = (students, studentToAdd, existingStudentData) => {

  const { standard, division, rollNo, name, email, dob, subject } = studentToAdd;
  const conflicts = { conflicts: [] };
  // Find the student with the matching standard
  const standardIndex = students.findIndex(s => s.standard === standard);
  const existingStandardIndex = students.findIndex(s => s.standard === existingStudentData.standard);

  if (standardIndex !== -1) {
    // Find the division within the matching student
    const divisionIndex = students[standardIndex].divisions.findIndex(d => d.division === division);
    const existingDivisionIndex = students[existingStandardIndex].divisions.findIndex(d => d.division === existingStudentData.division);

    if (divisionIndex !== -1) {
      // Check if the student already exists in the division
      const studentIndex = students[standardIndex].divisions[divisionIndex].students.findIndex(s => s.email === email || s.rollNo === rollNo);
      const existingStudentIndex = students[existingStandardIndex].divisions[existingDivisionIndex].students.findIndex(s => s.email === existingStudentData.email || s.rollNo === existingStudentData.rollNo);
      const isRollNoTaken = !!students[standardIndex].divisions[divisionIndex].students.filter(s => s.rollNo === rollNo).length;

      if (existingStudentData.rollNo == rollNo || !isRollNoTaken) {
        //Roll No updated 
        students[standardIndex].divisions[divisionIndex].students.push({ rollNo, name, email, dob, subject });
      }
      else {
        //Email &/ RollNo conflict
        if (students[standardIndex].divisions[divisionIndex].students[studentIndex].rollNo === rollNo) {
          conflicts.conflicts.push({
            field: 'rollNoError', message: 'Roll No. is already assigned!'
          });
        }
        return conflicts;

      }
    } else {
      // If the division doesn't exist, create it and add the student      
      students[standardIndex].divisions.push({
        division,
        students: [{ rollNo, name, email, dob, subject }]
      });
    }
  } else {
    // If the standard doesn't exist, create it along with division and student
    students.push(
      {
        standard,
        divisions: [
          {
            division,
            students: [
              { rollNo, name, email, dob, subject }
            ]
          }
        ]
      });

    const existingDivisionIndex = students[existingStandardIndex].divisions.findIndex(d => d.division === existingStudentData.division);

    if (students[existingStandardIndex].divisions[existingDivisionIndex].students.length === 1) {
      if (students[existingStandardIndex].divisions.length === 1) {
        if (students.length === 1) {
            students = [];
        }
        students[existingStandardIndex].divisions = [];
      }
      students[existingStandardIndex].divisions[existingDivisionIndex].students = [];
    } else {
      const existingStudentIndex = students[existingStandardIndex].divisions[existingDivisionIndex].students.findIndex(s => s.email === existingStudentData.email || s.rollNo === existingStudentData.rollNo);
      (students[existingStandardIndex].divisions[existingDivisionIndex].students).splice(existingStudentIndex, 1);
    }



  }
  console.log(students);
  return students;
};
const addStudent = (students, studentToAdd) => {

  const { standard, division, rollNo, name, email, dob, subject } = studentToAdd;
  // Find the student with the matching standard
  const standardIndex = students.findIndex(s => s.standard === standard);

  if (standardIndex !== -1) {
    // Find the division within the matching student
    const divisionIndex = students[standardIndex].divisions.findIndex(d => d.division === division);

    if (divisionIndex !== -1) {
      // Check if the student already exists in the division
      const existingStudentIndex = students[standardIndex].divisions[divisionIndex].students.findIndex(
        s => s.email === email || s.rollNo === rollNo
      );

      if (existingStudentIndex == -1) {
        // If the student doesn't exist, add them to the division
        students[standardIndex].divisions[divisionIndex].students.push({ rollNo, name, email, dob, subject });
      }
      else {
        //Email &/ RollNo conflict
        const conflicts = { conflicts: [] };
        // const isEmail = matchingDivision.students.find(student => student.email === studentToAdd.email);
        if (students[standardIndex].divisions[divisionIndex].students[existingStudentIndex].email === email) {
          conflicts.conflicts.push({
            field: 'emailError', message: 'Email is already assigned!'
          });
        }
        // const isRollNo = matchingDivision.students.find(student => student.rollNo === studentToAdd.rollNo);
        if (students[standardIndex].divisions[divisionIndex].students[existingStudentIndex].rollNo === rollNo) {
          conflicts.conflicts.push({
            field: 'rollNoError', message: 'Roll No. is already assigned!'
          });
        }
        return conflicts;

      }
    } else {
      // If the division doesn't exist, create it and add the student      
      students[standardIndex].divisions.push({
        division,
        students: [{ rollNo, name, email, dob, subject }]
      });
    }
  } else {
    // If the standard doesn't exist, create it along with division and student
    students.push(
      {
        standard,
        divisions: [
          {
            division,
            students: [
              { rollNo, name, email, dob, subject }
            ]
          }
        ]
      }
    );

  }
  console.log(students);
  return students;
};
// const addStudent = (students, studentToAdd) => {

//   const { standard, division, rollNo, name, email, dob, subject } = studentToAdd;

//   // Find the student with the matching standard
//   const matchingStandard = students.find(student => student.standard === studentToAdd.standard);

//   if (matchingStandard) {
//     // Find the division within the matching student
//     const matchingDivision = matchingStandard.divisions.find(division => division.division === studentToAdd.division);

//     if (matchingDivision) {
//       // Check if the student already exists in the division
//       const existingStudent = matchingDivision.students.find(student => student.email === studentToAdd.email || student.rollNo === studentToAdd.rollNo);

//       if (!existingStudent) {
//         // If the student doesn't exist, add them to the division
//         matchingDivision.students.push({ rollNo, name, email, dob, subject });
//       }
//       else {
//         //Email &/ RollNo conflict
//         const conflicts = { conflicts: [] };
//         const isEmail = matchingDivision.students.find(student => student.email === studentToAdd.email);
//         if (!!isEmail) {
//           conflicts.conflicts.push({
//             field: 'emailError', message: 'Email is already assigned!'
//           });
//         }
//         const isRollNo = matchingDivision.students.find(student => student.rollNo === studentToAdd.rollNo);
//         if (!!isRollNo) {
//           conflicts.conflicts.push({
//             field: 'rollNoError', message: 'Roll No. is already assigned!'
//           });
//         }
//         return conflicts;

//       }
//     } else {
//       // If the division doesn't exist, create it and add the student
//       matchingStandard.divisions.push(
//         {
//           division,
//           students: [{ rollNo, name, email, dob, subject }]
//         });
//     }
//   } else {
//     // If the standard doesn't exist, create it along with division and student
//     students.push(
//       {
//         standard,
//         divisions: [
//           {
//             division,
//             students: [
//               { rollNo, name, email, dob, subject }
//             ]
//           }
//         ]
//       });
//   }
//   console.log(students);
//   return students;
// };


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

