import assets from 'assets';
import { helpers, i18n } from 'common';
import theme from 'core/theme';
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function HomeHeader () {
  return (
    <View style={styles.header}>
      <View style={styles.body}>
        <View style={styles.left}>
          <Image
            source={assets.images.imgLogoClean}
            resizeMode="contain"
            style={styles.logoClean}
          />
        </View>
        <View style={styles.right}>
          <Image
            source={assets.images.imgLogoText}
            resizeMode="contain"
            style={styles.logoText}
          />
          <Text style={styles.title}>
            {i18n.HOME_TITLE_LABEL}
          </Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    minHeight: helpers.selectDevice({
      iPhone: 70,
      tablet: 100
    }),
    paddingVertical: theme.padding.medium,
    paddingHorizontal: theme.padding.extensive,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderBottomColor: theme.color.primaryWine30,
  },
  body: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  left: { width: 46 },
  right: { 
    flex: 1,
    height: 52,
    justifyContent: 'space-around',
  },
  logoClean: { width: 38, height: 52 },
  logoText: { width: 125, height: 21 },
  title: theme.font.semimedium,
})