import { LogInReq, SignUpReq, StudentType } from "api/student/request";
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