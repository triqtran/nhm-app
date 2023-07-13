import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { NHMPage } from 'core';
import { State } from 'reduxes/states';
import { helpers } from 'common';
import NavigationService from 'navigations/NavigationService';
import ScreenID from 'navigations/ScreenID';


export default function SentEmailMainScreen () {
  function mapStateToProps (state: State) {
    return {};
  }
  function mapDispatchToProps (dispatch: Dispatch) {
    return {}
  }
  return connect(mapStateToProps, mapDispatchToProps)(SentEmailScreen);
}

type SentEmailScreenProps = {
};

function SentEmailScreen ({ }: SentEmailScreenProps) {

  const onNavigate = () => NavigationService.pushToScreen(ScreenID.RESET);

  return (
    <NHMPage noScroll>
      <View style={styles.view}>
        <Text>{"Sent Email Screen"}</Text>
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