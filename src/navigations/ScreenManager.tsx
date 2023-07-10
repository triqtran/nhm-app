import React, { useMemo } from 'react';
import { Image, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { NavigationContainer, NavigationContainerRefWithCurrent } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NavigationService from './NavigationService';
import { RootStackParamList } from './params';
import ScreenID from './ScreenID';
import AppManager from '../AppManager';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { i18n } from 'common';
import theme, { ColorType } from 'core/theme';
import { NHMIcon } from 'core';
import assets from 'assets';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootStackParamList>();

type TabBarIconProps = {
  children: React.ReactNode;
  color: ColorType;
  focusable: boolean;
}

function TabBarIcon ({
  children,
  color,
  focusable = false,
}: TabBarIconProps) {
  const [focusColor, focusBgColor] = useMemo(() => {
    switch(color) {
      case 'wine': return [theme.color.primaryWine, theme.color.primaryWine30];
      case 'olive': return [theme.color.additionalOlive, theme.color.additionalOlive30];
      case 'honey': return [theme.color.secondaryHoney, theme.color.secondaryHoney30];
      default: return [null, null];
    }
  }, [color]);
  const rounderStyle: ViewStyle = useMemo(() => {
    if (!focusable) return { backgroundColor: focusBgColor };
    return {
      borderColor: focusColor,
      borderWidth: 2,
      borderStyle: 'solid',
      backgroundColor: theme.color.additionalLight,
      padding: 8,
    };
  }, [focusable, focusColor, focusBgColor]);
  return (
    <View style={[styles.rounder, rounderStyle]}>
      {focusable ? (
        <View style={[styles.circle, { backgroundColor: focusBgColor }]}>
          {children}
        </View>
      ): children}
    </View>
  );
}

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
          lazy: true,
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
              <Text style={[styles.tabbarLabel, focused ? styles.bold : null]}>
                {label}
              </Text>
            )
          },
          tabBarIcon: ({ focused }) => {
            switch (route.name) {
              case ScreenID.HOME: {
                return (
                  <TabBarIcon focusable={focused} color="wine">
                    <NHMIcon name="home" color="wine" />
                  </TabBarIcon>
                );
              }
              case ScreenID.RESOURCE: {
                return (
                  <TabBarIcon focusable={focused} color="olive">
                    <NHMIcon name="gallery" color="olive" />
                  </TabBarIcon>
                );
              }
              case ScreenID.PROFILE: {
                return (
                  <TabBarIcon focusable={focused} color="honey">
                    <Image
                      source={assets.images.imgProfile}
                      style={styles.tabbarIcon}
                      resizeMode="contain"
                    />
                  </TabBarIcon>
                );
              }
              default: return null;
            }
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
    <NavigationContainer
      ref={
        (ref: NavigationContainerRefWithCurrent<
          RootStackParamList
        >) => (NavigationService.navigator = ref)
      }
      onStateChange={(props) => {
        console.log('[Navigation Change]', props);
      }}
    >
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
  tabbarView: {
    height: 80,
  },
  tabbarItem: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  tabbarLabel: {
    ...theme.font.normal,
    color: theme.color.secondaryBrown30,
    position: 'relative',
    top: theme.padding.medium,
  },
  bold: {
    fontWeight: '600',
    color: theme.color.primaryWine,
  },
  tabbarIcon: { width: 32, height: 32 },
  rounder: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
