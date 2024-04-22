import { takeLatest, all, call, put } from 'redux-saga/effects';

import { getStudentsAndDocuments, addCollectionAndDocuments  } from '../../utils/firebase/firebase.utils';

import {
  fetchStudentsSuccess,
  fetchStudentsFailed,
  updateStudentsFailed,
  updateStudentsSuccess
} from './student.action';

import { STUDENTS_ACTION_TYPES } from './student.types';

export function* fetchStudentsAsync() {
  try {
    const studentsArray = yield call(getStudentsAndDocuments, 'students');
    console.log('saga ', studentsArray);
    yield put(fetchStudentsSuccess(studentsArray));
  } catch (error) {
    yield put(fetchStudentsFailed(error));
  }
}
export function* updateStudentsAsync(newStudents) {
  try {
    console.log('SAGA  newStudents Array.isArray(newStudents)',Array.isArray(newStudents));
    if (!Array.isArray(newStudents)) {
      // If not, return students unchanged
      console.error('Students must be an array');
      console.log(newStudents);
    return newStudents;
  }
    const studentsArray = yield call(addCollectionAndDocuments, 'students', newStudents);
    console.log('saga updated students ', studentsArray);
    yield put(updateStudentsSuccess(newStudents));

  } catch (error) {
    yield put(updateStudentsFailed(error));
  }
}

export function* onFetchStudents() {
  yield takeLatest(
    STUDENTS_ACTION_TYPES.FETCH_STUDENTS_START,
    fetchStudentsAsync
  );
}

export function* onUpdateStudentStart() {
  yield takeLatest(
    STUDENTS_ACTION_TYPES.UPDATE_STUDENT_START,
    updateStudentsAsync
  );

}

export function* studentsSaga() {
  yield all([
    call(onFetchStudents),
    call(onUpdateStudentStart),

  ]);
}
