import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { NHMPage } from 'core';
import { State } from 'reduxes/states';
import { helpers, i18n } from 'common';
import { StudentModule } from 'reduxes/student/StudentModule';
import { ResetPasswordReq } from 'api/student/request';

export default function ResetPasswordMainScreen (studentMol: StudentModule) {
  function mapStateToProps (state: State) {
    return {
      loading: studentMol.selectors.resetReqLoading(state),
      error: studentMol.selectors.resetReqError(state),
    };
  }
  function mapDispatchToProps (dispatch: Dispatch) {
    return {
      resetPassword: studentMol.actions.resetPassword.bindCreator(dispatch),
    }
  }
  return connect(mapStateToProps, mapDispatchToProps)(ResetPasswordScreen);
}

type ResetPasswordScreenProps = {
  loading?: boolean;
  error?: string;
  resetPassword?: (req: ResetPasswordReq) => void;
};

function validationReq (req: ResetPasswordReq) {
  if (!req) return i18n.ERROR_EMPTY_FIELD;
  const errEmail = helpers.validateEmail(req?.email);
  if (errEmail) return i18n.ERROR_EMPTY_FIELD;
  if (!req?.confirm_code || req.confirm_code.trim() === '') {
    return i18n.ERROR_EMPTY_FIELD;
  }
  if (!req?.password || req.password.trim() === '') {
    return i18n.ERROR_EMPTY_FIELD;
  }
  return null;
}

function ResetPasswordScreen ({
  loading,
  error,
  resetPassword,
}: ResetPasswordScreenProps) {

  const [req, setReq] = useState<ResetPasswordReq>(null);

  const onSubmit = useCallback(() => {
    const validError = validationReq(req);
    if (validError) return;
    resetPassword(req);
  }, [req, resetPassword]);

  return (
    <NHMPage
      noScroll
      refresh={loading}
      error={error}>
      <View style={styles.view}>
        <Text>{"Reset Password Screen"}</Text>
      </View>
    </NHMPage>
  )
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: helpers.selectDevice({
      iPhone: 100,
      tablet: 200,
    }),
    width: helpers.selectDevice({ iPhone: 322, tablet: 452 })
  },
})