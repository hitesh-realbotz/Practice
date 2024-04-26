import { STUDENTS_ACTION_TYPES } from './student.types';

import { createAction } from '../../utils/reducer/reducer.utils';
import { getConflictMessages } from '../../utils/error-messages/error-messages.utils'
import { CONSTANTS } from '../../constants/constants';

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


export const deleteStudentStart = (students, studentToDelete) => {
  const { standard, division, rollNo, name, email, dob, subject } = studentToDelete;
  let conflicts = { conflicts: [] };
  const standardIndex = getStandardIndex(students, standard);
  // const existingStandardIndex = students.findIndex(s => s.standard === existingStudentData.standard);
  if(standardIndex !== -1){
    const divisionIndex = getDivisionIndex(students, standardIndex, division);
    if(divisionIndex !== -1){
      const studentIndex = getStudentIndexByEmail(students, standardIndex, divisionIndex, email);
      if (studentIndex !== -1) {
        students = removeExistingStudentDetails(students, standardIndex, divisionIndex, studentIndex);
      }
    }
  }
  return createAction(STUDENTS_ACTION_TYPES.UPDATE_STUDENT_START, students);
}
export const updateStudentStart = (students, studentToAdd, existingStudentData) => {
  const newStudentsTobe = updateStudent(students, studentToAdd, existingStudentData);
  return !newStudentsTobe.conflicts ? createAction(STUDENTS_ACTION_TYPES.UPDATE_STUDENT_START, newStudentsTobe) : newStudentsTobe;
}

export const addStudentStart = (students, studentToAdd) => {
  const newStudentsTobe = addStudent(students, studentToAdd);
  return !newStudentsTobe.conflicts ? createAction(STUDENTS_ACTION_TYPES.UPDATE_STUDENT_START, newStudentsTobe) : newStudentsTobe;
}

const isStandardMatched = (studentToAdd, existingStudentData) => {
  return studentToAdd.standard === existingStudentData.standard
}
const isDivisionMatched = (studentToAdd, existingStudentData) => {
  return studentToAdd.division === existingStudentData.division
}
const isRollNoMatched = (studentToAdd, existingStudentData) => {
  return studentToAdd.rollNo === existingStudentData.rollNo
}
const isEmailMatched = (studentToAdd, existingStudentData) => {
  return studentToAdd.email === existingStudentData.email
}
const getStandardIndex = (students, standard) => {
  return students.findIndex(s => s.standard === standard);
}
const getDivisionIndex = (students, standardIndex, division) => {
  return students[standardIndex].divisions.findIndex(d => d.division === division);
}
const getStudentIndexByEmail = (students, standardIndex, divisionIndex, email) => {
  return students[standardIndex].divisions[divisionIndex].students.findIndex(s => s.email === email);
}
const isRollNoTaken = (students, standardIndex, divisionIndex, rollNo) => {
  return students[standardIndex].divisions[divisionIndex].students.some(s => s.rollNo === rollNo);
}
const isEmailTaken = (students, standardIndex, divisionIndex, email) => {
  return students[standardIndex].divisions[divisionIndex].students.some(s => s.email === email);
}
const isDivisionTaken = (students, standardIndex, division) => {
  return students[standardIndex].divisions.some(d => d.division === division);
}
const getStudentCount = (students, standardIndex, divisionIndex) => {
  return students[standardIndex].divisions[divisionIndex].students.length;
}
const getDivisionCount = (students, standardIndex) => {
  return students[standardIndex].divisions.length;
}

const updateStudent = (students, studentToAdd, existingStudentData) => {

  const { standard, division, rollNo, name, email, dob, subject } = studentToAdd;
  let conflicts = { conflicts: [] };
  const standardIndex = students.findIndex(s => s.standard === standard);
  const existingStandardIndex = students.findIndex(s => s.standard === existingStudentData.standard);


  if (isStandardMatched(studentToAdd, existingStudentData)) {
    console.log('Standard matched');
    const divisionIndex = getDivisionIndex(students, standardIndex, division);
    const existingDivisionIndex = getDivisionIndex(students, existingStandardIndex, existingStudentData.division);
    if (isDivisionMatched(studentToAdd, existingStudentData)) {
      console.log('Division matched');

      if (!isRollNoMatched(studentToAdd, existingStudentData)) {
        console.log('Roll No not matched');
        if (isRollNoTaken(students, standardIndex, divisionIndex, rollNo)) {
          conflicts = getConflictMessages(conflicts, CONSTANTS.ROLL_NO_ERROR_TAG, CONSTANTS.ROLL_NO_ASSIGNED);
        }
      }
      if (!isEmailMatched(studentToAdd, existingStudentData)) {
        console.log('email not matched');
        if (isEmailTaken(students, standardIndex, divisionIndex, email)) {
          conflicts = getConflictMessages(conflicts, CONSTANTS.EMAIL_ERROR_TAG, CONSTANTS.EMAIL_ASSIGNED);

        }
      }

      if (!!conflicts.conflicts.length) {
        return conflicts;
      }
      const existingStudentIndex = getStudentIndexByEmail(students, existingStandardIndex, existingDivisionIndex, existingStudentData.email);

      students[existingStandardIndex].divisions[existingDivisionIndex].students[existingStudentIndex] = { rollNo, name, email, dob, subject };
      console.log('Updated ', students[existingStandardIndex].divisions[existingDivisionIndex].students[existingStudentIndex]);
      console.log('Updated ', students);
      return students;

    } else {
      console.log('Division not matched');
      if (divisionIndex === -1) {
        console.log('Division not found');
        students[standardIndex].divisions.push({
          division,
          students: [{ rollNo, name, email, dob, subject }]
        });

      } else {
        console.log('Division found');
        if (isRollNoTaken(students, standardIndex, divisionIndex, rollNo)) {
          conflicts = getConflictMessages(conflicts, CONSTANTS.ROLL_NO_ERROR_TAG, CONSTANTS.ROLL_NO_ASSIGNED);
        }
        if (isEmailTaken(students, standardIndex, divisionIndex, email)) {
          conflicts = getConflictMessages(conflicts, CONSTANTS.EMAIL_ERROR_TAG, CONSTANTS.EMAIL_ASSIGNED);
        }
        if (!!conflicts.conflicts.length) {
          return conflicts;
        }

        students[standardIndex].divisions[divisionIndex].students.push({ rollNo, name, email, dob, subject });
      }

      //Remove existing
      return removeExistingStudentDetails(students, existingStandardIndex, existingDivisionIndex, existingStudentData);

    }

  } else {
    console.log('Standard not matched');
    const divisionIndex = getDivisionIndex(students, standardIndex, division);
    const existingDivisionIndex = getDivisionIndex(students, existingStandardIndex, existingStudentData.division);
    if (standardIndex === -1) {
      console.log('Standard not found');
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

    } else {
      console.log('Standard found');

      if (divisionIndex === -1) {
        console.log('Division not found');
        students[standardIndex].divisions.push({
          division,
          students: [{ rollNo, name, email, dob, subject }]
        });

      } else {
        console.log('Division found');
        if (isRollNoTaken(students, standardIndex, divisionIndex, rollNo)) {
          // conflicts.conflicts.push({
          //   field: 'rollNoError', message: 'Roll No. is already assigned!'
          // });
          conflicts = getConflictMessages(conflicts, CONSTANTS.ROLL_NO_ERROR_TAG, CONSTANTS.ROLL_NO_ASSIGNED);
        }
        if (isEmailTaken(students, standardIndex, divisionIndex, email)) {
          // conflicts.conflicts.push({
          //   field: 'emailError', message: 'Email is already assigned!'
          // });
          conflicts = getConflictMessages(conflicts, CONSTANTS.EMAIL_ERROR_TAG, CONSTANTS.EMAIL_ASSIGNED);
        }
        if (!!conflicts.conflicts.length) {
          return conflicts;
        }
        students[standardIndex].divisions[divisionIndex].students.push({ rollNo, name, email, dob, subject });
      }

    }

    //Remove existing
    return removeExistingStudentDetails(students, existingStandardIndex, existingDivisionIndex, existingStudentData);


  }

};

const removeExistingStudentDetails = (students, existingStandardIndex, existingDivisionIndex, existingStudentData) => {

  if (getStudentCount(students, existingStandardIndex, existingDivisionIndex) === 1) {
    if (getDivisionCount(students, existingStandardIndex) === 1) {
      students.splice(existingStandardIndex, 1);
    } else {
      students[existingStandardIndex].divisions.splice(existingDivisionIndex, 1);
    }
  } else {
    const existingStudentIndex = getStudentIndexByEmail(students, existingStandardIndex, existingDivisionIndex, existingStudentData.email);
    students[existingStandardIndex].divisions[existingDivisionIndex].students.splice(existingStudentIndex, 1);
  }

  console.log('Updated ', students);
  return students;

}



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

