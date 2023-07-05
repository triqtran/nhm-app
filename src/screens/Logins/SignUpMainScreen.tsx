import { View, StyleSheet, Text, Image, ScrollView, KeyboardAvoidingViewProps, KeyboardAvoidingView, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { State } from "reduxes/states";
import { NHMButton, NHMInput, NHMPage } from "core";
import { StudentModule } from "reduxes/student/StudentModule";
import theme from "core/theme";
import { helpers, i18n } from "common";
import assets from "assets";
import { useCallback, useState } from "react";
import { SignUpReq } from "api/student/request";

export default function SignUpMainScreen(studentMol: StudentModule) {
  function mapStateToProps (state: State) {
    return {
      studentId: studentMol.selectors.profileData(state)?.id || null,
      loading: studentMol.selectors.signUpReqLoading(state),
      error: studentMol.selectors.signUpReqError(state),
    };
  }
  function mapDispatchToProps (dispatch: Dispatch) {
    return {
      signUp: studentMol.actions.signUp.bindCreator(dispatch),
    };
  }
  return connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);
}

type SignUpScreenProps = {
  studentId?: number;
  loading: boolean;
  error?: string;
  signUp: (req: SignUpReq) => void;
}

function SignUpScreen ({
  studentId,
  loading = false,
  error,
  signUp,
}: SignUpScreenProps) {
  const [req, setReq] = useState<SignUpReq>(null);

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
    console.log('Submmitted:', req);
  }, [req]);

  return (
    <NHMPage noScroll>
      <KeyboardAvoidingView {...keyboardProps}>
        <ScrollView style={styles.scroll}>
          <View style={styles.view}>
            <View style={styles.form}>
              <Image
                source={assets.images.imgSignUp} 
                resizeMode="contain"
                style={styles.image}
              />
              <Text style={styles.title}>{i18n.SIGN_UP_LABEL}</Text>
              <View style={styles.padding}>
                <View style={styles.horizontal}>
                  <View style={styles.hozItem}>
                    <NHMInput
                      label={i18n.FIRST_NAME}
                      placeHolder={i18n.FIRST_NAME_HINT}
                      required={[{type: 'required', message: i18n.ERROR_EMPTY_FIELD}]}
                      onChange={(text: string) => setReq({ ...req, first_name: text })}
                      styleInput={{ width: '100%' }}
                    />
                  </View>
                  <View style={styles.hozItem}>
                    <NHMInput
                      label={i18n.LAST_NAME}
                      placeHolder={i18n.LAST_NAME_HINT}
                      required={[{type: 'required', message: i18n.ERROR_EMPTY_FIELD}]}
                      onChange={(text: string) => setReq({ ...req, last_name: text })}
                      styleInput={{ width: '100%' }}
                    />
                  </View>
                </View>
              </View>
              <View style={styles.padding}>
                <NHMInput
                  inputType="phone"
                  label={i18n.USER_PHONE}
                  placeHolder={i18n.USER_PHONE_HINT}
                  required={[{type: 'required', message: i18n.ERROR_EMPTY_FIELD}]}
                  onChange={(text: string) => setReq({ ...req, first_name: text })}
                  styleInput={{ width: '100%' }}
                />
              </View>
              <View style={styles.padding}>
                <NHMInput
                  label={i18n.USER_EMAIL}
                  placeHolder={i18n.USER_EMAIL_HINT}
                  required={[{type: 'required', message: i18n.ERROR_EMPTY_FIELD}]}
                  onChange={(text: string) => setReq({ ...req, first_name: text })}
                  styleInput={{ width: '100%' }}
                />
              </View>
              <View style={styles.padding}>
                <NHMInput
                  label={i18n.USER_NAME}
                  placeHolder={i18n.USER_NAME_HINT}
                  required={[{type: 'required', message: i18n.ERROR_EMPTY_FIELD}]}
                  onChange={(text: string) => setReq({ ...req, username: text })}
                  styleInput={{ width: '100%' }}
                />
              </View>
              <View style={styles.padding}>
                <NHMInput
                    label={i18n.PASSWORD}
                    placeHolder={i18n.PASSWORD_HINT}
                    required={[{type: 'required', message: i18n.ERROR_EMPTY_FIELD}]}
                    onChange={(text: string) => setReq({ ...req, password: text })}
                    inputType="password"
                  />
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
      iPhone: theme.padding.normal,
      tablet: (theme.padding.normal as number) * 4
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
  image: helpers.selectDevice({
    iPhone: { width: 120, height: 120 },
    tablet: { width: 155, height: 155 },
  }),
  title: {
    ...theme.font.overBold,
    color: theme.color.primaryWine,
    paddingBottom: theme.padding.extensive,
  },
  padding: { width: '100%', paddingVertical: 8 },
  horizontal: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  hozItem: { width: '48%' },
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
  error: {
    ...theme.font.normalBold,
    color: theme.color.systemError,
    textAlign: 'center',
  },
});
