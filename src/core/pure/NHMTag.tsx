import theme, { ColorType, VariantType } from 'core/theme';
import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

type NHMTagProps = {
  label?: string;
  variant?: VariantType;
  color?: ColorType;
};

export default function NHMTag ({
  label = null,
  variant = 'contained',
  color = 'wine',
}: NHMTagProps) {

  const [bgColor, textColor] = useMemo(() => {
    const mainColor = (() => {
      switch(color) {
        case 'wine': return theme.color.primaryWine;
        case 'honey': return theme.color.secondaryHoney;
        case 'brown': return theme.color.secondaryBrown30;
        case 'olive': return theme.color.additionalOlive;
        case 'grey': return theme.color.additionalGrey;
        case 'red': return theme.color.systemError;
        case 'blue': return theme.color.systemAction;
        case 'green': return theme.color.systemSuccess;
        default: return theme.color.primaryWine;
      }
    })();
    return variant === 'contained'
      ? [mainColor, theme.color.additionalLight]
      : [theme.color.additionalLight, mainColor];
  }, [variant, color]);

  return (
    <View style={[styles.view, { backgroundColor: bgColor }]}>
      <Text style={[styles.label, { color: textColor }]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    padding: 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.radius.normal,
  },
  label: {
    ...theme.font.normal,
    textAlign: 'center',
  },
})