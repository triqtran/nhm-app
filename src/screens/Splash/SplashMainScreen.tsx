import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import theme from 'core/theme';
import { NHMPage } from 'core';
import { State } from 'reduxes/states';
import NavigationService from 'navigations/NavigationService';
import ScreenID from 'navigations/ScreenID';
import { StudentModule } from 'reduxes/student/StudentModule';
import assets from 'assets';
import { helpers, i18n } from 'common';


export default function SplashMainScreen (studentMol: StudentModule) {
  function mapStateToProps (state: State) {
    return {
      studentId: studentMol.selectors.profile(state)?.id || undefined,
      loading: studentMol.selectors.loading(state),
      error: studentMol.selectors.error(state),
    }
  }
  function mapDispatchToProps (dispatch: Dispatch) {
    return {
      getProfile: studentMol.actions.getProfile.bindCreator(dispatch),
    }
  }
  return connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
}

type SplashScreenProps = {
  studentId: number | undefined;
  loading: boolean;
  error?: string | null | undefined;
  getProfile: () => void;
};

function SplashScreen ({
  studentId,
  loading = false,
  error,
  getProfile,
}: SplashScreenProps) {

  useEffect(() => {
    if (loading) return; // || error
    const destScreen = studentId ? ScreenID.MAIN : ScreenID.WELCOME;
    return NavigationService.pushToScreen(destScreen);
  }, [studentId, error, loading]);

  return (
    <NHMPage
      noScroll
      onRefresh={getProfile}
      refresh={loading}
      error={error}
    >
      <View style={styles.view}>
        <Image
          source={assets.images.imgSplash}
          resizeMode="contain"
          style={styles.image}
        />
        {error && (
          <Text style={styles.trial}>
            {i18n.NETWORK_ERROR}
            <TouchableOpacity
              style={styles.touch}
              onPress={getProfile}
            >
              <Text style={styles.touchText}>
                {i18n.TRY_AGAIN}
              </Text>
            </TouchableOpacity>
          </Text>
        )}
      </View>
    </NHMPage>
  )
}

const styles = StyleSheet.create({
  view: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  image: {
    width: helpers.selectDevice({ iPhone: 200, tablet: 400 }),
  },
  trial: {
    ...theme.font.normal,
    color: theme.color.primaryWine,
  },
  touch: {},
  touchText: {
    ...theme.font.normalBold,
    color: theme.color.systemAction,
    position: 'relative',
    top: 2,
    left: 4
  },
})