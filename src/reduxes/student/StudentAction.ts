import {
  ForgotPasswordReq,
  LogInReq,
  ResetPasswordReq,
  SignUpReq,
  StudentType,
} from "api/student/request";
import Action from "reduxes/Action";

export const logIn: Action<LogInReq> = new Action('login');
export const logInSuccess: Action<StudentType> = new Action('logInSuccess');
export const logInFailed: Action<string | null> = new Action('logInFailed');

export const signUp: Action<SignUpReq> = new Action('signUp');
export const signUpSuccess: Action<StudentType> = new Action('signUpSuccess');
export const signUpFailed: Action<string | null> = new Action('signUpFailed');

export const getProfile: Action<void> = new Action('getProfile');
export const getProfileSuccess: Action<StudentType> = new Action('getProfileSuccess');
export const getProfileFailed: Action<string | null> = new Action('getProfileFailed');

export const logOut: Action<void> = new Action('logOut');
export const logOutSuccess: Action<void> = new Action('logOutSuccess');
export const logOutFailed: Action<void> = new Action('logOutFailed');

export const forgotPassword: Action<ForgotPasswordReq> = new Action('forgotPassword');
export const forgotPasswordSuccess: Action<string> = new Action('forgotPasswordSuccess');
export const forgotPasswordFailed: Action<void> = new Action('forgotPasswordFailed');

export const resetPassword: Action<ResetPasswordReq> = new Action('resetPassword');
export const resetPasswordSuccess: Action<string> = new Action('resetPasswordSuccess');
export const resetPasswordFailed: Action<void> = new Action('resetPasswordFailed');