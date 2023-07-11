import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { NHMButton, NHMPage } from 'core';
import { State } from 'reduxes/states';
import NavigationService from 'navigations/NavigationService';
import ScreenID from 'navigations/ScreenID';
import assets from 'assets';
import theme from 'core/theme';
import { helpers, i18n } from 'common';


export default function WelcomeMainScreen () {
  function mapStateToProps (state: State) {
    return {};
  }
  function mapDispatchToProps (dispatch: Dispatch) {
    return {}
  }
  return connect(mapStateToProps, mapDispatchToProps)(WelcomeScreen);
}

type WelcomeScreenProps = {
};

function WelcomeScreen ({ }: WelcomeScreenProps) {

  const moveToSignUp = () => NavigationService.pushToScreen(ScreenID.SIGNUP);

  const moveToLogIn = () => NavigationService.pushToScreen(ScreenID.LOGIN);

  return (
    <NHMPage>
      <View style={styles.view}>
        <Image
          source={assets.images.imgWelcome}
          resizeMode="contain"
          style={styles.image}
        />
        <View style={styles.padding}>
          <Text style={styles.title}>{i18n.WELCOME_LABEL}</Text>
        </View>
        <View style={styles.padding}>
          <NHMButton
            title={i18n.SIGN_UP_LABEL}
            onPress={moveToSignUp}
            hasGradient
            gradient={theme.color.gradientWine}
          />
        </View>
        <View style={styles.padding}>
          <NHMButton
            title={i18n.LOG_IN_LABEL}
            variant="outlined-transparent"
            onPress={moveToLogIn}
          />
        </View>
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
  image: {
    width: helpers.selectDevice({
      iPhone: 280,
      tablet: 452,
    }),
    height: helpers.selectDevice({
      iPhone: 360,
      tablet: 600,
    }),
  },
  title: {
    ...theme.font.overBold,
    color: theme.color.primaryWine,
  },
  padding: {
    paddingVertical: theme.padding.large
  }
})