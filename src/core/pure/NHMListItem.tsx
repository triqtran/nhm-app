import { helpers } from "common";
import theme, { ColorType, IconSizeType, NHMIconName } from "core/theme";
import { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import NHMIcon from "./NHMIcon";

type NHMListItemProps = {
  prefix?: React.ReactNode;
  label?: string;
  subcribe?: string;
  iconRight?: {
    name: NHMIconName;
    size?: IconSizeType;
    color?: ColorType;
  };
  onPress?: () => void;
};

const RIGHT_SIZE = helpers.selectDevice({
  iPhone: 32,
  tablet: 36,
});

export default function NHMListItem ({
  prefix,
  label = null,
  subcribe = null,
  iconRight = {
    name: 'arrow-right',
    color: 'grey',
    size: 'normal',
  }
}: NHMListItemProps) {

  const rightBgColor = useMemo(() => {
    switch (iconRight.color) {
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
  }, [iconRight?.color]);

  return (
    <View style={styles.view}>
      {prefix && <View style={styles.prefix}>{prefix}</View>}
      <View style={styles.content}>
        {label && <Text style={styles.label}>{label}</Text>}
        {subcribe && <Text style={styles.subcribe}>{subcribe}</Text>}
      </View>
      <View style={[styles.right, { backgroundColor: rightBgColor }]}>
        <NHMIcon {...iconRight} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  view: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.color.additionalLight,
    borderRadius: theme.radius.semimedium,
    padding: theme.padding.medium,
    ...theme.boxShadow,
  },
  prefix: {
    width: helpers.selectDevice({
      iPhone: 32,
      tablet: 48,
    }),
    height: '100%',
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingLeft: theme.padding.normal,
  },
  label: {
    ...theme.font.semimediumBold,
    color: theme.color.additionalGrey,
  },
  subcribe: {
    ...theme.font.normal,
    position: 'relative',
    top: 4,
  },
  right: {
    width: RIGHT_SIZE,
    height: RIGHT_SIZE,
    borderRadius: RIGHT_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
})