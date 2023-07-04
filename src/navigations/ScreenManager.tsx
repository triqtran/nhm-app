import React, { useMemo } from 'react';
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
import theme from 'core/theme';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootStackParamList>(); 

export default function ScreenManager () {
  const routeName = useMemo(() => ({
    COURSE: {
      name: ScreenID.COURSE as never,
      component: AppManager.presentations[ScreenID.COURSE],
    },
    HOME: {
      name: ScreenID.HOME as never,
      component: AppManager.presentations[ScreenID.HOME],
    },
    LOGIN: {
      name: ScreenID.LOGIN as never,
      component: AppManager.presentations[ScreenID.LOGIN],
    },
    PROFILE: {
      name: ScreenID.PROFILE as never,
      component: AppManager.presentations[ScreenID.PROFILE],
    },
    RESOURCE: {
      name: ScreenID.RESOURCE as never,
      component: AppManager.presentations[ScreenID.RESOURCE],
    },
    SCHEDULE: {
      name: ScreenID.SCHEDULE as never,
      component: AppManager.presentations[ScreenID.SCHEDULE],
    },
    SIGNUP: {
      name: ScreenID.SIGNUP as never,
      component: AppManager.presentations[ScreenID.SIGNUP],
    },
    SPLASH: {
      name: ScreenID.SPLASH as never,
      component: AppManager.presentations[ScreenID.SPLASH],
    },
    WELCOME: {
      name: ScreenID.WELCOME as never,
      component: AppManager.presentations[ScreenID.WELCOME],
    },
  }), []);

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

  return (
    <NavigationContainer ref={(ref) => (NavigationService.navigator = ref)}>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={ScreenID.SPLASH as never}
      >
        <Stack.Screen {...routeName.SPLASH} />
        <Stack.Screen {...routeName.WELCOME} />
        <Stack.Screen {...routeName.SIGNUP} />
        <Stack.Screen {...routeName.LOGIN} />
        <Stack.Screen name={ScreenID.MAIN as never} component={BottomTabStack} />
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
