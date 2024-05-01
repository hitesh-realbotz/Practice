
import { createAction } from '../../utils/reducer/reducer.utils';
import { getConflictMessages } from '../../utils/error-messages/error-messages.utils'
import { CONSTANTS } from '../../constants/constants';
import { PROJECTS_ACTION_TYPES } from './project.types';

export const fetchProjectsStart = (newProjects) =>
  createAction(PROJECTS_ACTION_TYPES.FETCH_PROJECTS_START, newProjects);

export const fetchProjectsSuccess = (projectsArray) =>
  createAction(
    PROJECTS_ACTION_TYPES.FETCH_PROJECTS_SUCCESS,
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
  const { title } = projectToDelete;
  const existingProjectIndex = getProjectIndexByTitle(projects, title);
  if (existingProjectIndex !== -1) {
    projects.splice(existingProjectIndex, 1);
    return createAction(PROJECTS_ACTION_TYPES.DELETE_PROJECT_START, projects);
  }else{
    return null;
  }
  
}

export const updateProjectStart = (projects, projectToUpdate, existingProjectData, students) => {
  const newProjectsTobe = updateProject(projects, projectToUpdate, existingProjectData, students);
  return !newProjectsTobe.conflicts ? createAction(PROJECTS_ACTION_TYPES.UPDATE_PROJECT_START, newProjectsTobe) : newProjectsTobe;
}

export const addProjectStart = (projects, projectToAdd, students) => {
  const newProjectsTobe = addProject(projects, projectToAdd, students);
  return !newProjectsTobe.conflicts ? createAction(PROJECTS_ACTION_TYPES.ADD_PROJECT_START, newProjectsTobe) : newProjectsTobe;
}



export const isStudentWithEmailAndName = (students, email, name) => {
  return students.some(s => (s.email === email && s.name === name));
}
const isStudentWithEmail = (students, email) => {
  return students.some(s => (s.email === email));
}
const isProjectTitleTaken = (projects, title) => {
  return projects.some(p => (p.title === title));
}
const getProjectIndexByTitle = (projects, title) => {
  return projects.findIndex(p => p.title === title);
}


const updateProject = (projects, projectToUpdate, existingProjectData, students) => {

  const { title, name, email } = projectToUpdate;
  const existingProjectIndex = getProjectIndexByTitle(projects, existingProjectData.title);

  let conflicts = { conflicts: [] };
  if (title !== existingProjectData.title && isProjectTitleTaken(projects, title))
    conflicts = getConflictMessages(conflicts, CONSTANTS.PROJECT_TITLE_ERROR_TAG, CONSTANTS.PROJECT_TITLE_ASSIGNED);

  if (name !== existingProjectData.name || email !== existingProjectData.email) {   
    const conflictsTobe = isStudentAvailable(conflicts, students, email, name);
    if (!!conflictsTobe)
      conflicts = conflictsTobe;
  }

  if (!!conflicts.conflicts.length)
    return conflicts;

  projects[existingProjectIndex] = projectToUpdate;
  return projects;

}

const isStudentAvailable = (conflicts, students, email, name) => {
  if (isStudentWithEmailAndName(students, email, name)) {
    return null;
  } else {
    if (isStudentWithEmail(students, email)) {
      conflicts = getConflictMessages(conflicts, CONSTANTS.NAME_ERROR_TAG, CONSTANTS.INVALID_STUDENT_NAME);
    } else {
      conflicts = getConflictMessages(conflicts, CONSTANTS.EMAIL_ERROR_TAG, CONSTANTS.INVALID_STUDENT_EMAIL);
      conflicts = getConflictMessages(conflicts, CONSTANTS.NAME_ERROR_TAG, CONSTANTS.INVALID_STUDENT_NAME);
    }
    return conflicts;
  }
}

const addProject = (projects, projectToAdd, students) => {

  const { title, name, email } = projectToAdd;
  let conflicts = { conflict: [] };
  if (isProjectTitleTaken(projects, title))
    conflicts = getConflictMessages(conflicts, CONSTANTS.PROJECT_TITLE_ERROR_TAG, CONSTANTS.PROJECT_TITLE_ASSIGNED);

  const conflictsTobe = isStudentAvailable(conflicts, students, email, name);
  if (!!conflictsTobe)
    conflicts = conflictsTobe;

  if (!!conflicts.conflict.length)
    return conflicts;

  projects.push(projectToAdd);
  return projects;

  // if (isStudentWithEmailAndName(students, email, name)) {
  //   projects.push(projectToAdd);
  // } else {
  //   if (isStudentWithEmail(students, email)) {
  //     conflicts = getConflictMessages(conflicts, CONSTANTS.NAME_ERROR_TAG, CONSTANTS.INVALID_STUDENT_NAME);
  //   } else {
  //     conflicts = getConflictMessages(conflicts, CONSTANTS.EMAIL_ERROR_TAG, CONSTANTS.INVALID_STUDENT_EMAIL);
  //     conflicts = getConflictMessages(conflicts, CONSTANTS.NAME_ERROR_TAG, CONSTANTS.INVALID_STUDENT_NAME);
  //   }
  //   return conflicts;
  // }
  // console.log(projects);
  // return projects;
};
