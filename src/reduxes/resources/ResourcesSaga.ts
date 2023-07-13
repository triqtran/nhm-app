import { call, put } from "@redux-saga/core/effects";
import api from "api";
import { ApiResponse } from "api/caller";
import { GetBookDetailRes, GetExerciseGameDetailRes, GetStudentOwnerRes, ListBooksRes, ListExerciseGamesRes } from "api/resources/request";
import { i18n } from "common";
import { ActionData } from "reduxes/Action";
import * as ResourcesAction from './ResourcesAction';

export function* getStudentOwnerSaga () {
  try {
    const resp: ApiResponse<GetStudentOwnerRes> = yield call(api.resource.getStudentOwner);
    if (resp?.status !== 200 || !resp?.data?.success) {
      throw new Error (i18n.NETWORK_ERROR);
    }
    yield put(ResourcesAction.getStudentOwnerSuccess.create(resp.data.data));
  } catch (err) {
    console.log(err);
    yield put(ResourcesAction.getStudentOwnerFailed.create(i18n.NETWORK_ERROR));
  }
}

export function* listBooksSaga () {
  try {
    const resp: ApiResponse<ListBooksRes> = yield call(api.resource.listBooks);
    if (resp?.status !== 200 || !resp?.data?.success) {
      throw new Error (i18n.NETWORK_ERROR);
    }
    yield put(ResourcesAction.listBooksSuccess.create(resp.data.data));
  } catch (err) {
    console.log(err);
    yield put(ResourcesAction.listBooksFailed.create(i18n.NETWORK_ERROR));
  }
}

export function* getBookDetailSaga (payload: ActionData<number>) {
  try {
    const resp: ApiResponse<GetBookDetailRes> =
      yield call(api.resource.getBookDetail, payload.payload);
    if (resp?.status !== 200 || !resp?.data?.success) {
      throw new Error (i18n.NETWORK_ERROR);
    }
    yield put(ResourcesAction.getBookDetailSuccess.create(resp.data.data));
  } catch (err) {
    console.log(err);
    yield put(ResourcesAction.getBookDetailFailed.create(i18n.NETWORK_ERROR));
  }
}

export function* listExerciseGamesSaga () {
  try {
    const resp: ApiResponse<ListExerciseGamesRes> = yield call(api.resource.listExerciseGames);
    if (resp?.status !== 200 || !resp?.data?.success) {
      throw new Error (i18n.NETWORK_ERROR);
    }
    yield put(ResourcesAction.listExerciseGamesSuccess.create(resp.data.data));
  } catch (err) {
    console.log(err);
    yield put(ResourcesAction.listExerciseGamesFailed.create(i18n.NETWORK_ERROR));
  }
}

export function* getExerciseGameDetailSaga (payload: ActionData<number>) {
  try {
    const resp: ApiResponse<GetExerciseGameDetailRes> =
      yield call(api.resource.getExerciseGameDetail, payload.payload);
    if (resp?.status !== 200 || !resp?.data?.success) {
      throw new Error (i18n.NETWORK_ERROR);
    }
    yield put(ResourcesAction.getlExerciseGameDetailSuccess.create(resp.data.data));
  } catch (err) {
    console.log(err);
    yield put(ResourcesAction.getlExerciseGameDetailFailed.create(i18n.NETWORK_ERROR));
  }
}
