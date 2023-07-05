import { View, StyleSheet, Text, Image, ScrollView, KeyboardAvoidingViewProps, KeyboardAvoidingView, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { State } from "reduxes/states";
import { NHMButton, NHMInput, NHMPage } from "core";
import { StudentModule } from "reduxes/student/StudentModule";
import theme from "core/theme";
import { helpers, i18n } from "common";
import assets from "assets";
import { useCallback, useEffect, useState } from "react";
import { LogInReq } from "api/student/request";
import NavigationService from "navigations/NavigationService";
import ScreenID from "navigations/ScreenID";

export default function LoginMainScreen(studentMol: StudentModule) {
  function mapStateToProps (state: State) {
    return {
      studentId: studentMol.selectors.profileData(state)?.id || null,
      loading: studentMol.selectors.logInReqLoading(state),
      error: studentMol.selectors.logInReqError(state),
    };
  }
  function mapDispatchToProps (dispatch: Dispatch) {
    return {
      logIn: studentMol.actions.logIn.bindCreator(dispatch),
    };
  }
  return connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
}

function validateForm (email, password) {
  const errEmail = helpers.validateEmail(email);
  if (errEmail) return errEmail;
  const errPassword = !password || password.trim() === ''
    ? i18n.ERROR_EMPTY_FIELD : null;
  if (errPassword) return errPassword;
  return null;
}

type LoginScreenProps = {
  studentId?: number;
  loading: boolean;
  error?: string;
  logIn: (req: LogInReq) => void;
}

function LoginScreen ({
  studentId,
  loading = false,
  error,
  logIn,
}: LoginScreenProps) {
  const [email, setEmail] = useState<string>(null);
  const [password, setPassword] = useState<string>(null);

  const onFormChange = (name: string) => useCallback((text: string) => {
    switch(name) {
      case 'email': return setEmail(text);
      case 'password': return setPassword(text);
      default: return;
    }
  }, [setEmail, setPassword]);

  const keyboardProps: KeyboardAvoidingViewProps = helpers.selectDevice({
    iPhone: {
      style: [styles.view, { marginBottom: 90 }],
      behavior: 'padding', keyboardVerticalOffset: 50,
    },
    iPad: { style: [styles.view, { paddingBottom: 90 }] },
    android: { style: [styles.view, { paddingBottom: 90 }] },
    tablet: { style: [styles.view, { paddingBottom: 90 }] }
  });

  const onSubmit = useCallback(() => {
    console.log('Submmitted:', { email, password });
    const err = validateForm(email, password);
    if (err) return;
    logIn({ email, password });
  }, [email, password, logIn]); // logIn

  useEffect(() => {
    if (loading) return;
    if (studentId) {
      // logged in successfully
      return NavigationService.pushToScreen(ScreenID.MAIN);
    }
  }, [studentId, loading]);

  return (
    <NHMPage noScroll>
      <KeyboardAvoidingView {...keyboardProps}>
        <ScrollView style={styles.scroll}>
          <View style={styles.view}>
            <View style={styles.form}>
              <Image
                source={assets.images.imgLogin} 
                resizeMode="contain"
                style={styles.image}
              />
              <Text style={styles.title}>{i18n.LOGIN_FORM_TITLE}</Text>
              <View style={styles.padding}>
                <NHMInput
                  label={i18n.USER_NAME}
                  placeHolder={i18n.USER_NAME_HINT}
                  required={[
                    {type: 'required', message: i18n.ERROR_EMPTY_FIELD},
                    {
                      type: 'validation',
                      message: i18n.ERROR_REGEX,
                      validation: (t: string) => !helpers.validateEmail(t),
                    }
                  ]}
                  onChange={onFormChange('email')}
                  showError
                />
              </View>
              <View style={styles.padding}>
                <NHMInput
                    label={i18n.PASSWORD}
                    placeHolder={i18n.PASSWORD_HINT}
                    required={[{type: 'required', message: i18n.ERROR_EMPTY_FIELD}]}
                    onChange={onFormChange('password')}
                    inputType="password"
                    showError
                  />
              </View>
              <View style={styles.padding}>
                <Text style={styles.forgot}>
                  {i18n.FORGOT_PASSWORD}
                  <TouchableOpacity>
                    <Text style={styles.reset}>{i18n.RESET_PASSWORD}</Text>
                  </TouchableOpacity>
                </Text>
              </View>
              {error && (
                <View style={styles.padding}>
                  <Text style={styles.error}>{error}</Text>
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <View style={styles.bottom}>
        <NHMButton
          title={i18n.LETS_GO}
          onPress={onSubmit}
          loading={loading}
        />
      </View>
    </NHMPage>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    width: '100%',
    paddingTop: helpers.selectDevice({
      iPhone: (theme.padding.extensive as number) * 6,
      tablet: (theme.padding.extensive as number) * 14
    }),
  },
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: theme.padding.extensive,
  },
  form: {
    width: helpers.selectDevice({ iPhone: '100%', tablet: 450 }),
    alignItems: 'center',
  },
  image: { width: 155, height: 155 },
  title: {
    ...theme.font.overBold,
    color: theme.color.primaryWine,
    paddingBottom: theme.padding.extensive,
  },
  padding: { width: '100%', paddingVertical: 8 },
  bottom: {
    position: 'absolute',
    bottom: 0,
    left: theme.padding.extensive,
    right: theme.padding.extensive,
    justifyContent: 'center',
    ...helpers.selectDevice({
      tablet: { alignItems: 'center' },
      iPhone: null,
    })
  },
  forgot: {
    ...theme.font.semimedium,
    textAlign: 'center',
  },
  reset: {
    ...theme.font.semimediumBold,
    color: theme.color.primaryWine,
    position: 'relative',
    top: 3,
    left: 4
  },
  error: {
    ...theme.font.normalBold,
    color: theme.color.systemError,
    textAlign: 'center',
  },
});
