import { takeLatest, all, call, put } from 'redux-saga/effects';

import { getStudentsAndDocuments, addCollectionAndDocuments, updateCollectionAndDocuments, getProjectsAndDocuments  } from '../../utils/firebase/firebase.utils';

import { CONSTANTS } from '../../constants/constants';

import { toast } from 'react-toastify';
import { addProjectsFailed, addProjectsSuccess, deleteProjectsFailed, deleteProjectsSuccess, fetchProjectsFailed, fetchProjectsSuccess, updateProjectsFailed, updateProjectsSuccess } from './project.action';
import { PROJECTS_ACTION_TYPES } from './project.types';

export function* fetchProjectsAsync() {
  try {
    const projectsArray = yield call(getProjectsAndDocuments, CONSTANTS.PROJECT_REMOTE_FOLDER);
    yield put(fetchProjectsSuccess(projectsArray));
  } catch (error) {
    yield put(fetchProjectsFailed(error));
  }
}

export function* addProjectsAsync(action) {
  const newProjects = action.payload;
  try {   
    const projectsArray = yield call(addCollectionAndDocuments, CONSTANTS.PROJECT_REMOTE_FOLDER, newProjects);
    yield put(addProjectsSuccess(newProjects));
    toast.success('Project added successfully!');
  } catch (error) {
    yield put(addProjectsFailed(error));
    toast.error('Error occured while adding Project!');
  }
}

export function* updateProjectsAsync(action) {
  const newProjects = action.payload;
  try {  
    const projectsArray = yield call(updateCollectionAndDocuments, CONSTANTS.PROJECT_REMOTE_FOLDER, newProjects);
    yield put(updateProjectsSuccess(newProjects));
    // yield put(showToast('Student updated successfully!'));
    toast.success('Project updated successfully!');
    
  } catch (error) {
    yield put(updateProjectsFailed(error));
    toast.error('Error occured while updating Project!');
  }
}


export function* deleteProjectsAsync(action) {
  const newProjects = action.payload;
  try {   
    const projectsArray = yield call(updateCollectionAndDocuments, CONSTANTS.PROJECT_REMOTE_FOLDER, newProjects);
    yield put(deleteProjectsSuccess(newProjects));
    toast.warn('Project deleted successfully');

  } catch (error) {
    yield put(deleteProjectsFailed(error));
    toast.error('Error occured while deletion of Project!');
    }
}

export function* onFetchProjects() {
  yield takeLatest(
    PROJECTS_ACTION_TYPES.FETCH_PROJECTS_START,
    fetchProjectsAsync
  );
}

export function* onAddProjectStart() {
  yield takeLatest(
    PROJECTS_ACTION_TYPES.ADD_PROJECT_START,
    addProjectsAsync
  );
}

export function* onUpdateProjectStart() {
  yield takeLatest(
    PROJECTS_ACTION_TYPES.UPDATE_PROJECT_START,
    updateProjectsAsync
  );
}

export function* onDeleteProjectStart() {
  yield takeLatest(
    PROJECTS_ACTION_TYPES.DELETE_PROJECT_START,
    deleteProjectsAsync
  );
}

export function* projectsSaga() {
  yield all([
    call(onFetchProjects),
    call(onUpdateProjectStart),
    call(onAddProjectStart),
    call(onDeleteProjectStart),

  ]);
}
