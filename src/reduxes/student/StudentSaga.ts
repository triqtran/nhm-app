import { call, put } from "@redux-saga/core/effects";
import api from "api";
import { ApiResponse } from "api/caller";
import { ChangePasswordRes, ForgotPasswordReq, GetProfileRes, LogInReq, LogInRes, LogOutRes, ResetPasswordReq, SignUpReq } from "api/student/request";
import { i18n, storage } from "common";
import NavigationService from "navigations/NavigationService";
import ScreenID from "navigations/ScreenID";
import Action, { ActionData } from "reduxes/Action";
import * as StudentAction from './StudentAction';

export function* signUpSaga (payload: ActionData<SignUpReq>) {
  try {
    const resp: ApiResponse<LogInRes> = yield call(api.student.signUp, payload.payload);
    if (resp?.status !== 200 || !resp?.data?.success) {
      throw new Error (i18n.NETWORK_ERROR);
    }
    yield call(storage.saveAccessToken, resp.data.token);
    yield put(StudentAction.signUpSuccess.create(resp.data.data));
    NavigationService.pushToScreen(ScreenID.MAIN);
  } catch (err) {
    console.log(err);
    yield put(StudentAction.signUpFailed.create(i18n.NETWORK_ERROR));
  }
}

export function* logInSaga (payload: ActionData<LogInReq>) {
  try {
    const resp: ApiResponse<LogInRes> = yield call(api.student.logIn, payload.payload);
    if (resp?.status !== 200 || !resp?.data?.success) {
      throw new Error (i18n.NETWORK_ERROR);
    }
    yield call(storage.saveAccessToken, resp.data.token);
    yield put(StudentAction.logInSuccess.create(resp.data.data));
    NavigationService.pushToScreen(ScreenID.MAIN);
  } catch (err) {
    console.log(err);
    yield put(StudentAction.logInFailed.create(i18n.NETWORK_ERROR));
  }
}

export function* getProfileSaga () {
  try {
    const resp: ApiResponse<GetProfileRes> = yield call(api.student.getProfile);
    if (resp?.status !== 200 || !resp?.data?.success) {
      throw new Error (i18n.NETWORK_ERROR);
    }
    yield put(StudentAction.getProfileSuccess.create(resp.data.data));
  } catch (err) {
    console.log(err);
    yield put(StudentAction.getProfileFailed.create(i18n.NETWORK_ERROR));
  }
}

export function* logOutSaga () {
  try {
    const resp: ApiResponse<LogOutRes> = yield call(api.student.logOut);
    if (resp?.status !== 200 || !resp?.data?.success) {
      throw new Error (i18n.NETWORK_ERROR);
    }
    yield call(storage.clearAccessToken);
    yield put(StudentAction.logOutSuccess.create());
    NavigationService.pushToScreen(ScreenID.WELCOME);
  } catch (err) {
    console.log(err);
    yield put(StudentAction.logOutFailed.create());
  }
}

export function* forgotPasswordSaga (payload: ActionData<ForgotPasswordReq>) {
  try {
    const resp: ApiResponse<ChangePasswordRes> =
      yield call(api.student.forgotPassword, payload.payload);
    if (resp?.status !== 200 || !resp?.data?.success) {
      throw new Error (i18n.NETWORK_ERROR);
    }
    NavigationService.pushToScreen(ScreenID.SENTEMAIL);
  } catch (err) {
    console.log(err);
    yield put(StudentAction.logOutFailed.create());
  }
}

export function* resetPasswordSaga (payload: ActionData<ResetPasswordReq>) {
  try {
    const resp: ApiResponse<ChangePasswordRes> =
      yield call(api.student.resetPassword, payload.payload);
    if (resp?.status !== 200 || !resp?.data?.success) {
      throw new Error (i18n.NETWORK_ERROR);
    }
    NavigationService.pushToScreen(ScreenID.LOGIN);
  } catch (err) {
    console.log(err);
    yield put(StudentAction.logOutFailed.create());
  }
}
