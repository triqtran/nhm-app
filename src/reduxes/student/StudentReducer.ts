import { StudentType } from 'api/student/request'
import Action from 'reduxes/Action';
import { State } from 'reduxes/states';
import * as StudentActions from './StudentAction';

export type StudentState = {
  data?: StudentType | null | undefined;
  error?: string | null;
  loading: boolean;
}

const initState: StudentState = { data: null, error: null, loading: false };

const studentReducer = Action.createReducer(
  Action.initial(initState),

  StudentActions.signUpSuccess.on((state: StudentState, payload: StudentType) => {
    return Object.assign({}, state, { data: payload });
  }),

  StudentActions.signUpFailed.on((state: StudentState) => {
    return Object.assign({}, state, { data: null, error: "Error" });
  }),

  StudentActions.logInSuccess.on((state: StudentState, payload: StudentType) => {
    return Object.assign({}, state, { data: payload });
  }),

  StudentActions.logInFailed.on((state: StudentState) => {
    return Object.assign({}, state, { data: null, error: "Error" });
  }),

  StudentActions.getProfile.on((state: StudentState) => {
    return Object.assign({}, state, { loading: true });
  }),
  
  StudentActions.getProfileSuccess.on((state: StudentState, payload: StudentType) => {
    return Object.assign({}, state, { loading: false, data: payload });
  }),

  StudentActions.getProfileFailed.on((state: StudentState) => {
    return Object.assign({}, state, { loading: false, data: null, error: "Error" });
  }),
);

export const selectors = {
  profile: (state: State) => state.student.data,
  loading: (state: State) => state.student.loading,
  error: (state: State) => state.student.error,
}

export default studentReducer;