import { takeLatest } from 'redux-saga/effects';
import Runner from 'reduxes/Runner';
import resourceReducer, { selectors } from './ResourcesReducer';
import * as ResourcesAction from './ResourcesAction';
import * as ResourcesSaga from './ResourcesSaga';

export default function resourceModule(runner: Runner) {
  // bind reducer
  runner.addReducer('resources', resourceReducer);

  // bind sagas
  runner.addSaga(function* () {
    yield takeLatest(
      ResourcesAction.getStudentOwner.type,
      ResourcesSaga.getStudentOwnerSaga,
    );

    yield takeLatest(
      ResourcesAction.listBooks.type,
      ResourcesSaga.listBooksSaga,
    );

    yield takeLatest(
      ResourcesAction.getBookDetail.type,
      ResourcesSaga.getBookDetailSaga,
    );

    yield takeLatest(
      ResourcesAction.listExerciseGames.type,
      ResourcesSaga.listExerciseGamesSaga,
    );

    yield takeLatest(
      ResourcesAction.getlExerciseGameDetail.type,
      ResourcesSaga.getExerciseGameDetailSaga,
    );
  });

  return {
    actions: ResourcesAction,
    selectors,
  }
}

export type ResourceModule = ReturnType<typeof resourceModule>;