import { takeLatest } from 'redux-saga/effects';
import Runner from 'reduxes/Runner';
import studentReducer, { selectors } from './StudentReducer';
import * as StudentAction from './StudentAction';
import * as StudentSaga from './StudentSaga';

export default function studentModule(runner: Runner) {
  // bind reducer
  runner.addReducer('student', studentReducer);

  // bind sagas
  runner.addSaga(function* () {
    yield takeLatest(
      StudentAction.signUp.type,
      StudentSaga.signUpSaga,
    );

    yield takeLatest(
      StudentAction.logIn.type,
      StudentSaga.logInSaga,
    );

    yield takeLatest(
      StudentAction.getProfile.type,
      StudentSaga.getProfileSaga,
    );
  });

  return {
    actions: StudentAction,
    selectors,
  }
}

export type StudentModule = ReturnType<typeof studentModule>;