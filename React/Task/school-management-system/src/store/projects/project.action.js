
import { createAction } from '../../utils/reducer/reducer.utils';
import { getConflictMessages } from '../../utils/error-messages/error-messages.utils'
import { CONSTANTS } from '../../constants/constants';
import { PROJECTS_ACTION_TYPES } from './project.types';

export const fetchProjectsStart = (newProjects) =>
  createAction(PROJECTS_ACTION_TYPES.FETCH_PROJECTS_START, newProjects);

export const fetchProjectsSuccess = (projectsArray) =>
  createAction(
    PROJECTS_ACTION_TYPES.FETCH_PROJECTS_SUCCESSS,
    projectsArray
  );

export const updateProjectsSuccess = (projectsArray) =>
  createAction(
    PROJECTS_ACTION_TYPES.UPDATE_PROJECT_SUCCESS,
    projectsArray
  );

export const addProjectsSuccess = (projectsArray) =>
  createAction(
    PROJECTS_ACTION_TYPES.ADD_PROJECT_SUCCESS,
    projectsArray
  );
export const deleteProjectsSuccess = (projectsArray) =>
  createAction(
    PROJECTS_ACTION_TYPES.DELETE_PROJECT_SUCCESSS,
    projectsArray
  );

export const fetchProjectsFailed = (error) =>
  createAction(PROJECTS_ACTION_TYPES.FETCH_PROJECTS_FAILED, error);

export const updateProjectsFailed = (error) =>
  createAction(PROJECTS_ACTION_TYPES.UPDATE_PROJECT_FAILED, error);

export const addProjectsFailed = (error) =>
  createAction(PROJECTS_ACTION_TYPES.ADD_PROJECT_FAILED, error);

export const deleteProjectsFailed = (error) =>
  createAction(PROJECTS_ACTION_TYPES.DELETE_PROJECT_FAILED, error);


export const deleteProjectStart = (projects, projectToDelete) => {
  const { standard, division, rollNo, name, email, dob, subject } = studentToDelete;
  let conflicts = { conflicts: [] };
  const standardIndex = getStandardIndex(students, standard);
  // const existingStandardIndex = students.findIndex(s => s.standard === existingStudentData.standard);
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
export const updateProjectStart = (projects, projectToAdd, existingProjectData, students) => {
  const newProjectsTobe = updateProject(projects, projectToAdd, existingProjectData, students);
  return !newProjectsTobe.conflicts ? createAction(PROJECTS_ACTION_TYPES.UPDATE_PROJECT_START, newProjectsTobe) : newProjectsTobe;
}

export const addProjectStart = (projects, projectToAdd, students) => {
  const newProjectsTobe = addProject(projects, projectToAdd, students);
  return !newProjectsTobe.conflicts ? createAction(PROJECTS_ACTION_TYPES.ADD_PROJECT_START, newStudentsTobe) : newProjectsTobe;
}



const isStudentWithEmailAndName = (students, email, name) => {
  return students.some(s => (s.email === email && s.name === name));
}
const isStudentWithEmail = (students, email) => {
  return students.some(s => (s.email === email));
}
const getProjectIndexByTitle = (projects, title) => {
  return projects.findIndex(p => p.title === title);
}


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

const updateProject = (projects, projectToAdd, existingProjectData, students) => {

  const existingProjectIndex = getProjectIndexByTitle(projects, existingProjectData.title);
  if (!isStudentWithEmailAndName(students, existingProjectData.email, existingProjectData.name)) {
    if (isStudentWithEmail(students, email)) {
      conflicts = getConflictMessages(conflicts, CONSTANTS.NAME_ERROR_TAG, CONSTANTS.INVALID_STUDENT_NAME);
      return conflicts;
    }
    conflicts = getConflictMessages(conflicts, CONSTANTS.EMAIL_ERROR_TAG, CONSTANTS.INVALID_STUDENT_EMAIL);
    conflicts = getConflictMessages(conflicts, CONSTANTS.NAME_ERROR_TAG, CONSTANTS.INVALID_STUDENT_NAME);
    return conflicts;
  }
  projects[existingProjectIndex] = projectToAdd;

  return projects;

}

const addProject = (projects, projectToAdd, students) => {

  const { title, description, startDate, endDate, status, name, email } = projectToAdd;
  let conflicts = { conflicts: [] };

  if (isStudentWithEmailAndName(students, email, name)) {
    projects.push({ title, description, startDate, endDate, status, name, email });
  } else {

    if (isStudentWithEmail(students, email)) {
      conflicts = getConflictMessages(conflicts, CONSTANTS.NAME_ERROR_TAG, CONSTANTS.INVALID_STUDENT_NAME);
      return conflicts;
    }
    conflicts = getConflictMessages(conflicts, CONSTANTS.EMAIL_ERROR_TAG, CONSTANTS.INVALID_STUDENT_EMAIL);
    conflicts = getConflictMessages(conflicts, CONSTANTS.NAME_ERROR_TAG, CONSTANTS.INVALID_STUDENT_NAME);
    return conflicts;
  }

  console.log(projects);
  return projects;
};
