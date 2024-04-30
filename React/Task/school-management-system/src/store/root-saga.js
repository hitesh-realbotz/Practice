import { all, call } from 'redux-saga/effects';

import { userSagas } from './user/user.saga';
import { studentsSaga } from './students/student.saga';
import { projectsSaga } from './projects/project.saga';

export function* rootSaga() {
  yield all([call(userSagas), call(studentsSaga), call(projectsSaga)]);
}
