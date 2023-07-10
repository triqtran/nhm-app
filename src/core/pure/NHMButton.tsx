import React, { useCallback, useMemo, useState } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  GestureResponderEvent,
  ActivityIndicator,
  ViewStyle,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import theme, {
  ButtonSizeType,
  ColorType,
  VariantType,
} from 'core/theme';

type GradientBodyProps = {
  children: React.JSX.Element;
  hasGradient: boolean;
  gradient: Array<string>;
};

function GradientBody ({
  children,
  hasGradient = false,
  gradient = [],
}: GradientBodyProps): React.JSX.Element {
  if (hasGradient && gradient?.length > 0) {
    return (
      <LinearGradient
        colors={gradient}
        style={styles.gradient}
        start={{x: 0.0, y: 0.25}}
        end={{x: 0.5, y: 1.0}}
      >
        {children}
      </LinearGradient>
    );
  }
  return children;
}

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
  hasGradient?: boolean;
  gradient?: Array<string>;
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
  hasGradient = false,
  gradient = [],
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

  const textStyle = useMemo(() => {
    const textColor = (() => {
      if (hasGradient && gradient?.length > 0) {
        return { color: theme.color.additionalLight };
      }
      return {};
    })();
    return disabled
      ? { ...combineStyle.titleInactive, ...textColor }
      : { ...combineStyle.title, ...textColor };
  }, [
    hasGradient,
    gradient,
    disabled,
    combineStyle?.title,
    combineStyle?.titleInactive,
  ]);

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
      <GradientBody hasGradient={hasGradient} gradient={gradient}>
        <View style={styles.title}>
          {title && <Text style={textStyle}>{title}</Text>}
          {loading && (
            <ActivityIndicator
              style={styles.loading}
              color={combineStyle.loadingColor}
              size="small"
            />
          )}
        </View>
      </GradientBody>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  icon: { marginHorizontal: theme.margin.normal },
  title: { flexDirection: 'row' },
  loading: {
    position: 'absolute',
    right: -((theme.padding.normal as number) * 4),
  },
  gradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.padding.medium,
    paddingHorizontal: theme.padding.large,
    borderRadius: theme.radius.extensive,
  },
});
