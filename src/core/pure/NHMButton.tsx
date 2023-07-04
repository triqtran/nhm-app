import React, { useCallback, useMemo, useState } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  GestureResponderEvent,
  ActivityIndicator,
  ViewStyle,
} from 'react-native';
import theme, {
  ButtonSizeType,
  ColorType,
  VariantType,
} from 'core/theme';

export type EZGButtonProps = {
  title?: string;
  color?: ColorType;
  variant?: VariantType;
  size?: ButtonSizeType;
  disabled?: boolean;
  loading?: boolean;
  lazy?: boolean;
  lazyTime?: number;
  style?: ViewStyle;
  onPressIn?: (event?: GestureResponderEvent) => void;
  onPressOut?: (event?: GestureResponderEvent) => void;
  onPress?: (event?: GestureResponderEvent) => void;
  onLongPress?: (event?: GestureResponderEvent) => void;
};

export default function EZGButton({
  title,
  color = 'wine',
  variant = 'contained',
  size = 'normal',
  disabled = false,
  loading = false,
  lazy = false,
  lazyTime = 500,
  style,
  onPress,
  onLongPress,
  onPressIn,
  onPressOut
}: EZGButtonProps) {

  const [lazyTrigger, setLazyTrigger] = useState(false);

  const handlePress = useCallback((event?: GestureResponderEvent) => {
    if (!lazy) {
      if (onPress) return onPress(event);
      return;
    }
    setLazyTrigger(true);
    setTimeout(() => {
      onPress(event);
      setLazyTrigger(false);
    }, lazyTime);
  }, [lazy, setLazyTrigger, onPress, lazyTime]);

  const combineStyle = useMemo(
    () => theme.buttonStyles(variant, size, color),
    [variant, size, color],
  );

  return (
    <TouchableOpacity
      style={[
        disabled ? combineStyle.touchInactive : combineStyle.touch,
        style,
      ]}
      onPress={handlePress}
      onLongPress={onLongPress}
      onPressOut={onPressOut}
      onPressIn={onPressIn}
      disabled={disabled || loading || lazyTrigger}>
      {title && (
        <Text style={
          disabled ? combineStyle.titleInactive : combineStyle.title
        }>{title}</Text>
      )}
      {loading && (
        <ActivityIndicator
          style={styles.loading}
          color={combineStyle.loadingColor}
          size="small"
        />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  touchView: {
    minHeight: 48,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.padding.medium,
    paddingHorizontal: theme.padding.large,
    borderRadius: theme.radius.normal,
    position: 'relative',
    flexDirection: 'row',
    backgroundColor: theme.color.primaryWine,
  },
  icon: { marginHorizontal: theme.margin.normal },
  loading: {
    position: 'absolute',
    right: theme.margin.normal,
    top: theme.padding.medium,
  },
});
