import { helpers } from 'common';
import { NHMButton } from 'core';
import React from 'react';
import {
  GestureResponderEvent,
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import theme, { ButtonSizeType, ColorType, VariantType } from 'core/theme';

const IMAGE_SIZE = helpers.selectDevice({ iPhone: 80, tablet: 160 });
const THUMB_WIDTH = helpers.selectDevice({ iPhone: 156, tablet: 373 });
const THUMB_HEIGHT = helpers.selectDevice({ iPhone: 210, tablet: 384 });
const imgHorizontal = (THUMB_WIDTH - IMAGE_SIZE) / 2;
const BODY_WIDTH = helpers.selectDevice({ iPhone: 120, tablet: 262 });
const BODY_HEIGHT = helpers.selectDevice({ iPhone: 40, tablet: 64 });

type WrapThumbProps = {
  onPress?: (event?: GestureResponderEvent) => void;
  isPress?: boolean;
  children: React.JSX.Element;
}

function WrapThumb ({ onPress, isPress = false, children }: WrapThumbProps) {
  if (!isPress) return children;
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
    >{children}</TouchableOpacity>
  );
}

type NHMThumbnailProps = {
  thumbImg?: ImageSourcePropType;
  label?: string;
  extra?: React.ReactNode;
  thumbAsPress?: boolean;
  pressAction?: {
    title: string;
    onPress: (event?: GestureResponderEvent) => void;
    variant: VariantType;
    color: ColorType;
    size: ButtonSizeType;
    hasGradient?: boolean;
    gradient?: Array<string>;
  };
}

export default function NHMThumbnail ({
  thumbImg,
  label,
  extra,
  thumbAsPress = false,
  pressAction = null,
}: NHMThumbnailProps) {
  return (
    <WrapThumb
      isPress={thumbAsPress}
      onPress={pressAction?.onPress}
    >
      <View style={styles.view}>
        {thumbImg && <Image source={thumbImg} style={styles.image} />}
        <View style={styles.body}>
          {label && <Text style={styles.label}>{label}</Text>}
          {extra && <View style={styles.extra}>{extra}</View>}
          {pressAction && (
            <View style={styles.action}>
              <NHMButton {...pressAction} style={styles.actionBtn} />
            </View>
          )}
        </View>
      </View>
    </WrapThumb>
  );
}

const styles = StyleSheet.create({
  view: {
    width: THUMB_WIDTH,
    height: THUMB_HEIGHT,
    borderRadius: theme.radius.medium,
    backgroundColor: theme.color.additionalLight,
    padding: theme.padding.over,
    ...theme.boxShadow,
  },
  image: {
    position: 'absolute',
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    left: imgHorizontal,
    right: imgHorizontal,
    top: -(IMAGE_SIZE / 2),
  },
  body: {
    flex: 1,
    paddingTop: (
      (theme.padding.extensive as number)
      * helpers.selectDevice({ iPhone: 1.5, tablet: 3 })
    ),
    flexDirection: 'column',
    alignItems: 'center',
  },
  label: {
    ...theme.font.medium,
    color: theme.color.additionalGrey50,
    textAlign: 'center',
  },
  extra: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: BODY_WIDTH,
  },
  action: {
    maxWidth: BODY_WIDTH,
  },
  actionBtn: {
    width: BODY_WIDTH,
    height: BODY_HEIGHT,
  }
});
