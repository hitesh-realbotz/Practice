import { STUDENTS_ACTION_TYPES } from './student.types';

import { createAction } from '../../utils/reducer/reducer.utils';
import { getConflictMessages } from '../../utils/validation/validation.utils'
import { CONSTANTS } from '../../constants/constants';

//Actions
export const fetchStudentsStart = (newStudents) =>
  createAction(STUDENTS_ACTION_TYPES.FETCH_STUDENTS_START, newStudents);

export const fetchStudentsSuccess = (studentsArray) =>
  createAction(STUDENTS_ACTION_TYPES.FETCH_STUDENTS_SUCCESS, studentsArray);

export const updateStudentsSuccess = (studentsArray) =>
  createAction(STUDENTS_ACTION_TYPES.UPDATE_STUDENT_SUCCESS, studentsArray);

export const addStudentsSuccess = (studentsArray) =>
  createAction(STUDENTS_ACTION_TYPES.ADD_STUDENT_SUCCESS, studentsArray);

export const deleteStudentsSuccess = (studentsArray) =>
  createAction(STUDENTS_ACTION_TYPES.DELETE_STUDENT_SUCCESS, studentsArray);

export const fetchStudentsFailed = (error) =>
  createAction(STUDENTS_ACTION_TYPES.FETCH_STUDENTS_FAILED, error);

export const updateStudentsFailed = (error) =>
  createAction(STUDENTS_ACTION_TYPES.UPDATE_STUDENT_FAILED, error);

export const addStudentsFailed = (error) =>
  createAction(STUDENTS_ACTION_TYPES.ADD_STUDENT_FAILED, error);

export const deleteStudentsFailed = (error) =>
  createAction(STUDENTS_ACTION_TYPES.DELETE_STUDENT_FAILED, error);


//Add Student Start processing
export const addStudentStart = (students, studentToAdd) => {
  const newStudentsTobe = addStudent(students, studentToAdd);
  return !newStudentsTobe.conflicts ? createAction(STUDENTS_ACTION_TYPES.ADD_STUDENT_START, newStudentsTobe) : newStudentsTobe;
}

//Add Student processing
const addStudent = (students, studentToAdd) => {

  const { standard, division, rollNo, name, email, dob, subject } = studentToAdd;
  let conflicts = { conflicts: [] };

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
        if (students[standardIndex].divisions[divisionIndex].students[existingStudentIndex].email === email) {
          conflicts = getConflictMessages(conflicts, CONSTANTS.EMAIL_ERROR_TAG, CONSTANTS.EMAIL_ASSIGNED);
        }
        if (students[standardIndex].divisions[divisionIndex].students[existingStudentIndex].rollNo === rollNo) {
          conflicts = getConflictMessages(conflicts, CONSTANTS.ROLL_NO_ERROR_TAG, CONSTANTS.ROLL_NO_ASSIGNED);
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
            students: [{ rollNo, name, email, dob, subject }]
          }
        ]
      }
    );

  }
  console.log(students);
  return students;
};



//Update Student Start processing
export const updateStudentStart = (students, studentToAdd, existingStudentData) => {
  const newStudentsTobe = updateStudent(students, studentToAdd, existingStudentData);
  return !newStudentsTobe.conflicts ? createAction(STUDENTS_ACTION_TYPES.UPDATE_STUDENT_START, newStudentsTobe) : newStudentsTobe;
}

//Update Student processing
const updateStudent = (students, studentToAdd, existingStudentData) => {

  const { standard, division, rollNo, name, email, dob, subject } = studentToAdd;
  let conflicts = { conflicts: [] };
  const standardIndex = students.findIndex(s => s.standard === standard);
  const existingStandardIndex = students.findIndex(s => s.standard === existingStudentData.standard);

  if (isStandardMatched(studentToAdd, existingStudentData)) {
    // console.log('Standard matched');
    const divisionIndex = getDivisionIndex(students, standardIndex, division);
    const existingDivisionIndex = getDivisionIndex(students, existingStandardIndex, existingStudentData.division);
    if (isDivisionMatched(studentToAdd, existingStudentData)) {
      // console.log('Division matched');
      if (!isRollNoMatched(studentToAdd, existingStudentData)) {
        // console.log('Roll No not matched');
        if (isRollNoTaken(students, standardIndex, divisionIndex, rollNo))
          conflicts = getConflictMessages(conflicts, CONSTANTS.ROLL_NO_ERROR_TAG, CONSTANTS.ROLL_NO_ASSIGNED);
      }
      if (!isEmailMatched(studentToAdd, existingStudentData)) {
        // console.log('email not matched');
        if (isEmailTaken(students, standardIndex, divisionIndex, email))
          conflicts = getConflictMessages(conflicts, CONSTANTS.EMAIL_ERROR_TAG, CONSTANTS.EMAIL_ASSIGNED);
      }

      if (!!conflicts.conflicts.length)
        return conflicts;

      const existingStudentIndex = getStudentIndexByEmail(students, existingStandardIndex, existingDivisionIndex, existingStudentData.email);

      students[existingStandardIndex].divisions[existingDivisionIndex].students[existingStudentIndex] = { rollNo, name, email, dob, subject };

      return students;

    } else {
      // console.log('Division not matched');
      if (divisionIndex === -1) {
        // console.log('Division not found');
        students[standardIndex].divisions.push({
          division,
          students: [{ rollNo, name, email, dob, subject }]
        });

      } else {
        // console.log('Division found');
        if (isRollNoTaken(students, standardIndex, divisionIndex, rollNo))
          conflicts = getConflictMessages(conflicts, CONSTANTS.ROLL_NO_ERROR_TAG, CONSTANTS.ROLL_NO_ASSIGNED);

        if (isEmailTaken(students, standardIndex, divisionIndex, email))
          conflicts = getConflictMessages(conflicts, CONSTANTS.EMAIL_ERROR_TAG, CONSTANTS.EMAIL_ASSIGNED);

        if (!!conflicts.conflicts.length)
          return conflicts;

        students[standardIndex].divisions[divisionIndex].students.push({ rollNo, name, email, dob, subject });
      }

      //Remove existing
      return removeExistingStudentDetails(students, existingStandardIndex, existingDivisionIndex, existingStudentData);

    }

  } else {
    console.log('Standard not matched');
    const existingDivisionIndex = getDivisionIndex(students, existingStandardIndex, existingStudentData.division);
    if (standardIndex === -1) {
      // console.log('Standard not found');
      students.push(
        {
          standard,
          divisions: [
            {
              division,
              students: [{ rollNo, name, email, dob, subject }]
            }
          ]
        });

    } else {
      // console.log('Standard found');
      const divisionIndex = getDivisionIndex(students, standardIndex, division);
      if (divisionIndex === -1) {
        // console.log('Division not found');
        students[standardIndex].divisions.push({
          division,
          students: [{ rollNo, name, email, dob, subject }]
        });

      } else {
        // console.log('Division found');
        if (isRollNoTaken(students, standardIndex, divisionIndex, rollNo))
          conflicts = getConflictMessages(conflicts, CONSTANTS.ROLL_NO_ERROR_TAG, CONSTANTS.ROLL_NO_ASSIGNED);

        if (isEmailTaken(students, standardIndex, divisionIndex, email))
          conflicts = getConflictMessages(conflicts, CONSTANTS.EMAIL_ERROR_TAG, CONSTANTS.EMAIL_ASSIGNED);

        if (!!conflicts.conflicts.length)
          return conflicts;

        students[standardIndex].divisions[divisionIndex].students.push({ rollNo, name, email, dob, subject });
      }

    }
    //Remove existing
    return removeExistingStudentDetails(students, existingStandardIndex, existingDivisionIndex, existingStudentData);
  }

};


//Remove existing details
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

  return students;
}


//Delete Student Start processing
export const deleteStudentStart = (students, studentToDelete) => {
  const { standard, division, rollNo, name, email, dob, subject } = studentToDelete;
  let conflicts = { conflicts: [] };
  const standardIndex = getStandardIndex(students, standard);
  if (standardIndex !== -1) {
    const divisionIndex = getDivisionIndex(students, standardIndex, division);
    if (divisionIndex !== -1) {
      const studentIndex = getStudentIndexByEmail(students, standardIndex, divisionIndex, email);
      if (studentIndex !== -1) {
        students = removeExistingStudentDetails(students, standardIndex, divisionIndex, studentIndex);
      }
    }
  }
  return createAction(STUDENTS_ACTION_TYPES.DELETE_STUDENT_START, students);
}


//Utility functions
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