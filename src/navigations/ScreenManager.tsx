import React from 'react';
import { Image, StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NavigationService from './NavigationService';
import { RootStackParamList } from './params';
import ScreenID from './ScreenID';
import AppManager from '../AppManager';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { i18n } from 'common';
import assets from 'assets';
import { theme } from 'core';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootStackParamList>();

const routeName = {
  HOME: {
    name: ScreenID.HOME as never,
    component: AppManager.presentations[ScreenID.HOME],
  },
  RESOURCE: {
    name: ScreenID.RESOURCE as never,
    component: AppManager.presentations[ScreenID.RESOURCE],
  },
  PROFILE: {
    name: ScreenID.PROFILE as never,
    component: AppManager.presentations[ScreenID.PROFILE],
  },
  SCHEDULE: {
    name: ScreenID.SCHEDULE as never,
    component: AppManager.presentations[ScreenID.SCHEDULE],
  },
  COURSE: {
    name: ScreenID.COURSE as never,
    component: AppManager.presentations[ScreenID.COURSE],
  },
}

function BottomTabStack () {
  return (
    <Tab.Navigator
      initialRouteName={routeName.HOME.name}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarLabel: ({ focused }) => {
          const label = (() => {
            switch (route.name) {
              case ScreenID.HOME: return i18n.HOME;
              case ScreenID.RESOURCE: return i18n.RESOURCE;
              case ScreenID.PROFILE: return i18n.PROFILE;
              default: return null;
            }
          })();
          if (!label) return null;
          return (
            <Text
              style={[
                styles.tabbarLabel,
                focused ? styles.bold : null
              ]}
            >{label}</Text>
          )
        },
        tabBarIcon: () => {
          const barIcon = (() => {
            switch (route.name) {
              case ScreenID.HOME: return assets.images.imgHome;
              case ScreenID.RESOURCE: return assets.images.imgResource;
              case ScreenID.PROFILE: return assets.images.imgProfile;
              default: return null;
            }
          })();
          if (!barIcon) return null;
          return (
            <Image
              source={barIcon}
              style={styles.tabbarIcon}
              resizeMode="contain"
            />
          );
        },
        tabBarStyle: styles.tabbarView,
        tabBarItemStyle: styles.tabbarItem,
      })}
    >
      <Tab.Screen {...routeName.HOME} />
      <Tab.Screen {...routeName.RESOURCE} />
      <Tab.Screen {...routeName.PROFILE} />
    </Tab.Navigator>
  )
} 

export default function ScreenManager () {
  return (
    <NavigationContainer
      ref={(ref) => (NavigationService.navigator = ref)}
      onStateChange={(state) => {
        console.log('State:', state);
      }}
    >
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={'main' as never}
      >
        <Stack.Screen name={'main' as never} component={BottomTabStack} />
        <Stack.Screen {...routeName.SCHEDULE} />
        <Stack.Screen {...routeName.COURSE} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  tabbar: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabbarView: { height: 100 },
  tabbarItem: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  tabbarLabel: {
    ...theme.font.normal,
    color: theme.color.secondaryBrown30,
  },
  bold: { color: theme.color.additionalGrey },
  tabbarIcon: { width: 56, height: 56, borderRadius: 28 },
})
