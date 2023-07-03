import { call, put } from "@redux-saga/core/effects";
import api from "api";
import { ApiResponse } from "api/caller";
import { GetProfileRes, LogInReq, LogInRes, SignUpReq } from "api/student/request";
import { storage } from "common";
import { ActionData } from "reduxes/Action";
import * as StudentAction from './StudentAction';

export function* signUpSaga (payload: ActionData<SignUpReq>) {
  try {
    const resp: ApiResponse<LogInRes> = yield call(api.student.signUp, payload.payload);
    if (resp?.status !== 200 || !resp?.data?.success) {
      throw new Error ("Error");
    }
    yield storage.saveAccessToken(resp.data.token);
    yield put(StudentAction.signUpSuccess.create(resp.data.data));
  } catch (err) {
    console.log(err);
    yield put(StudentAction.signUpFailed.create("Error"));
  }
}

export function* logInSaga (payload: ActionData<LogInReq>) {
  try {
    const resp: ApiResponse<LogInRes> = yield call(api.student.logIn, payload.payload);
    if (resp?.status !== 200 || !resp?.data?.success) {
      throw new Error ("Error");
    }
    yield storage.saveAccessToken(resp.data.token);
    yield put(StudentAction.logInSuccess.create(resp.data.data));
  } catch (err) {
    console.log(err);
    yield put(StudentAction.logInFailed.create("Error"));
  }
}

export function* getProfileSaga () {
  try {
    const resp: ApiResponse<GetProfileRes> = yield call(api.student.getProfile);
    if (resp?.status !== 200 || !resp?.data?.success) {
      throw new Error ("Error");
    }
    yield put(StudentAction.logInSuccess.create(resp.data.data));
  } catch (err) {
    console.log(err);
    yield put(StudentAction.getProfileFailed.create("Error"));
  }
}