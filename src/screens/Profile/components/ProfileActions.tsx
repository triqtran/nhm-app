import React from 'react';
import { StyleSheet, View } from 'react-native';
import theme, { ColorType, NHMIconName } from 'core/theme';
import { NHMIcon, NHMListItem } from 'core';
import { helpers, i18n } from 'common';
import NavigationService from 'navigations/NavigationService';

type ActionType = {
  icon: {
    name: NHMIconName;
    color: ColorType;
  };
  label: string;
  subscribe: string;
  onPress: () => void;
}

const actions: Array<ActionType> = [
  {
    icon: { name: 'profile', color: 'wine' },
    label: i18n.YOUR_PROFILE,
    subscribe: i18n.PROFLE_INFO,
    onPress: () => NavigationService.pushToScreen(''),
  },
  {
    icon: { name: 'calendar', color: 'honey' },
    label: i18n.CALENDAR_CLASS,
    subscribe: i18n.CLASS_SCHEDULE_INFO,
    onPress: () => NavigationService.pushToScreen(''),
  },
  {
    icon: { name: 'paper', color: 'olive' },
    label: i18n.AYOTREE_INVOICE,
    subscribe: i18n.INVOICE_INFO,
    onPress: () => NavigationService.pushToScreen(''),
  },
  {
    icon: { name: 'lock', color: 'blue' },
    label: i18n.UPDATE_PASS,
    subscribe: i18n.UPDATE_PASS_INFO,
    onPress: () => NavigationService.pushToScreen(''),
  },
];

function getBgLeftColor (color: ColorType) {
  switch (color) {
    case 'wine': return theme.color.primaryWine10;
    case 'honey': return theme.color.secondaryHoney10;
    case 'brown': return theme.color.secondaryBrown10;
    case 'olive': return theme.color.additionalOlive30;
    case 'grey': return theme.color.additionalGrey10;
    case 'red': return theme.color.primaryWine10;
    case 'blue': return theme.color.systemAction10;
    case 'green': return theme.color.additionalOlive30;
    default: return theme.color.primaryWine10;
  }
}

export default function ProfileActions () {

  return (
    <View style={styles.actions}>
      {actions.map((act, i) => (
        <View style={i !== 0 ? styles.item : null}>
          <NHMListItem
            prefix={(
              <View style={[
                styles.left,
                { backgroundColor: getBgLeftColor(act.icon.color) }
              ]}>
                <NHMIcon
                  name={act.icon.name}
                  color={act.icon.color}
                />
              </View>
            )}
            label={act.label}
            subcribe={act.subscribe}
            onPress={act.onPress}
            key={`${i}`}
          />
        </View>
      ))}
    </View>
  )
}

const LEFT_SIZE = helpers.selectDevice({
  iPhone: 32,
  tablet: 48,
});

const styles = StyleSheet.create({
  actions: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  left: {
    width: LEFT_SIZE,
    height: LEFT_SIZE,
    borderRadius: LEFT_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    marginTop: theme.margin.medium,
  }
});