import { takeLatest, all, call, put } from 'redux-saga/effects';

import { getStudentsAndDocuments, addCollectionAndDocuments, updateCollectionAndDocuments  } from '../../utils/firebase/firebase.utils';

import {
  fetchStudentsSuccess,
  fetchStudentsFailed,
  updateStudentsFailed,
  updateStudentsSuccess,
  addStudentsSuccess,
  addStudentsFailed,
  deleteStudentsSuccess,
  deleteStudentsFailed
  
} from './student.action';
// import {showToast} from '../toasts/toast.action';

import { STUDENTS_ACTION_TYPES } from './student.types';
import { CONSTANTS } from '../../constants/constants';

import { toast } from 'react-toastify';

export function* fetchStudentsAsync() {
  try {
    const studentsArray = yield call(getStudentsAndDocuments, CONSTANTS.STUDENT_REMOTE_FOLDER);
    yield put(fetchStudentsSuccess(studentsArray));
  } catch (error) {
    yield put(fetchStudentsFailed(error));
  }
}

export function* addStudentsAsync(action) {
  const newStudents = action.payload;
  try {   
    const studentsArray = yield call(addCollectionAndDocuments, CONSTANTS.STUDENT_REMOTE_FOLDER, newStudents);
    yield put(addStudentsSuccess(newStudents));
    toast.success('Student added successfully!');
  } catch (error) {
    yield put(addStudentsFailed(error));
    toast.error('Error occured while adding Student!');
  }
}

export function* updateStudentsAsync(action) {
  const newStudents = action.payload;
  try {  
    // const studentsArray = yield call(addCollectionAndDocuments, 'students', newStudents);
    const studentsArray = yield call(updateCollectionAndDocuments, CONSTANTS.STUDENT_REMOTE_FOLDER, newStudents);
    yield put(updateStudentsSuccess(newStudents));
    // yield put(showToast('Student updated successfully!'));
    toast.success('Student updated successfully!');
    
  } catch (error) {
    yield put(updateStudentsFailed(error));
    toast.error('Error occured while updating Student!');
    // yield put(showToast('Error occured while updating Student!'));
  }
}


export function* deleteStudentsAsync(action) {
  const newStudents = action.payload;
  try {   
    const studentsArray = yield call(updateCollectionAndDocuments, CONSTANTS.STUDENT_REMOTE_FOLDER, newStudents);
    yield put(deleteStudentsSuccess(newStudents));
    toast.warn('Student deleted successfully');

  } catch (error) {
    yield put(deleteStudentsFailed(error));
    toast.error('Error occured while deletion of Student!');
    }
}

export function* onFetchStudents() {
  yield takeLatest(
    STUDENTS_ACTION_TYPES.FETCH_STUDENTS_START,
    fetchStudentsAsync
  );
}

export function* onAddStudentStart() {
  yield takeLatest(
    STUDENTS_ACTION_TYPES.ADD_STUDENT_START,
    addStudentsAsync
  );
}

export function* onUpdateStudentStart() {
  yield takeLatest(
    STUDENTS_ACTION_TYPES.UPDATE_STUDENT_START,
    updateStudentsAsync
  );
}

export function* onDeleteStudentStart() {
  yield takeLatest(
    STUDENTS_ACTION_TYPES.DELETE_STUDENT_START,
    deleteStudentsAsync
  );
}

export function* studentsSaga() {
  yield all([
    call(onFetchStudents),
    call(onUpdateStudentStart),
    call(onAddStudentStart),
    call(onDeleteStudentStart),

  ]);
}
