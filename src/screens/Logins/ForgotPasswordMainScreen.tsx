import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { NHMPage } from 'core';
import { State } from 'reduxes/states';
import { helpers } from 'common';
import { StudentModule } from 'reduxes/student/StudentModule';
import { ForgotPasswordReq } from 'api/student/request';


export default function ForgotPasswordMainScreen (studentMol: StudentModule) {
  function mapStateToProps (state: State) {
    return {
      loading: studentMol.selectors.forgotReqLoading(state),
      error: studentMol.selectors.forgotReqError(state),
    };
  }
  function mapDispatchToProps (dispatch: Dispatch) {
    return {
      forgotPassword: studentMol.actions.forgotPassword.bindCreator(dispatch),
    }
  }
  return connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordScreen);
}

type ForgotPasswordScreenProps = {
  loading: boolean;
  error: string;
  forgotPassword: (req: ForgotPasswordReq) => void;
};

function ForgotPasswordScreen ({
  loading,
  error,
  forgotPassword,
}: ForgotPasswordScreenProps) {
  const [email, setEmail] = useState<string>(null);
  
  const onSubmit = useCallback(() => {
    const validError = helpers.validateEmail(email);
    if (validError) return;
    forgotPassword({ email });
  }, [forgotPassword, email]);

  return (
    <NHMPage noScroll refresh={loading} error={error}>
      <View style={styles.view}>
        <Text>{"Forgot Password Screen"}</Text>
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