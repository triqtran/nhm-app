import { StudentType } from 'api/student/request'
import { i18n } from 'common';
import Action, { ErrorActionCall } from 'reduxes/Action';
import { State, assignChange } from 'reduxes/states';
import * as StudentActions from './StudentAction';

type RetuningData = { loading?: boolean; error?: ErrorActionCall };

export type StudentState = {
  profile?: {
    data?: StudentType;
    error?: string;
    loading?: boolean;
  };
  logInReq?: RetuningData;
  signUpReq?: RetuningData;
  forgotReq?: RetuningData;
  resetReq?: RetuningData;
  logOut?: RetuningData;
}

const initState: StudentState = {
  profile: { data: null, error: null, loading: false },
  logInReq: { loading: false, error: null },
  signUpReq: { loading: false, error: null },
  forgotReq: { loading: false, error: null },
  resetReq: { loading: false, error: null },
};

const studentReducer = Action.createReducer(
  Action.initial(initState),

  StudentActions.signUp.on((state: StudentState) => {
    return assignChange(state, {
      signUpReq: { loading: true }
    });
  }),

  StudentActions.signUpSuccess.on((state: StudentState, payload: StudentType) => {
    return assignChange(state, {
      profile: { data: payload },
      signUpReq: { loading: false, error: null },
    });
  }),

  StudentActions.signUpFailed.on((state: StudentState) => {
    return assignChange(state, {
      signUpReq: { loading: false, error: i18n.NETWORK_ERROR }
    });
  }),

  StudentActions.logIn.on((state: StudentState) => {
    return assignChange(state, {
      logInReq: { loading: true }
    });
  }),

  StudentActions.logInSuccess.on((state: StudentState, payload: StudentType) => {
    return assignChange(state, {
      profile: { data: payload },
      logInReq: { loading: false, error: null },
    });
  }),

  StudentActions.logInFailed.on((state: StudentState) => {
    return assignChange(state, {
      logInReq: { loading: false, error: i18n.NETWORK_ERROR },
    });
  }),

  StudentActions.getProfile.on((state: StudentState) => {
    return assignChange(state, {
      profile: { loading: true },
    });
  }),
  
  StudentActions.getProfileSuccess.on((state: StudentState, payload: StudentType) => {
    return assignChange(state, {
      profile: { data: payload, loading: false, error: null },
    });
  }),

  StudentActions.getProfileFailed.on((state: StudentState) => {
    return assignChange(state, {
      profile: { loading: false, error: null },
    });
  }),

  StudentActions.forgotPassword.on((state: StudentState) => {
    return assignChange(state, {
      forgotReq: { loading: true },
    });
  }),

  StudentActions.forgotPasswordSuccess.on((state: StudentState) => {
    return assignChange(state, {
      forgotReq: { loading: false },
    });
  }),

  StudentActions.forgotPasswordFailed.on((state: StudentState) => {
    return assignChange(state, {
      forgotReq: { loading: false, error: i18n.NETWORK_ERROR },
    });
  }),

  StudentActions.resetPassword.on((state: StudentState) => {
    return assignChange(state, {
      resetReq: { loading: true },
    });
  }),

  StudentActions.resetPasswordSuccess.on((state: StudentState) => {
    return assignChange(state, {
      resetReq: { loading: false },
    });
  }),

  StudentActions.resetPasswordFailed.on((state: StudentState) => {
    return assignChange(state, {
      resetReq: { loading: false, error: i18n.NETWORK_ERROR },
    });
  }),

  StudentActions.logOut.on((state: StudentState) => {
    return assignChange(state, {
      logOut: { loading: true }
    });
  }),

  StudentActions.logOutSuccess.on((state: StudentState) => {
    return assignChange(state, {
      logOut: { loading: false }
    });
  }),

  StudentActions.logOutFailed.on((state: StudentState) => {
    return assignChange(state, {
      logOut: { loading: false, error: i18n.NETWORK_ERROR }
    });
  }),
);

export const selectors = {
  profileData: (state: State) => state.student?.profile?.data || null,
  profileLoading: (state: State) => state.student?.profile?.loading,
  profileError: (state: State) => state.student?.profile?.error,
  logInReqLoading: (state: State) => state.student?.logInReq?.loading,
  logInReqError: (state: State) => state.student?.logInReq?.error,
  signUpReqLoading: (state: State) => state.student?.signUpReq?.loading,
  signUpReqError: (state: State) => state.student?.signUpReq?.error,
  learningJourney: (state: State) => state.student?.profile?.data?.learning_journey || null,
  forgotReqLoading: (state: State) => state.student?.forgotReq?.loading,
  forgotReqError: (state: State) => state.student?.forgotReq?.error,
  resetReqLoading: (state: State) => state.student?.resetReq?.loading,
  resetReqError: (state: State) => state.student?.resetReq?.error,
  logoutLoading: (state: State) => state.student?.logOut?.loading,
  logoutError: (state: State) => state.student?.logOut?.error,
}

export default studentReducer;