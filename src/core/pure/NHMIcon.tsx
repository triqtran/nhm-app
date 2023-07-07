import React from 'react';
import { GestureResponderEvent, TouchableOpacity } from 'react-native';
import { ColorType, NHMIconName, SizeType } from 'core/theme';
import HomeIcon from 'assets/icons/HomeIcon';
import GalleryIcon from 'assets/icons/GalleryIcon';

type EZGIconProps = {
  name: NHMIconName;
  size?: SizeType;
  variant?: 'outlined' | 'contained';
  color?: ColorType;
  disabled?: boolean;
  onPress?: (event?: GestureResponderEvent) => void;
  onLongPress?: (event?: GestureResponderEvent) => void;
};

export default function EZGIcon({
  size = 'normal',
  variant = 'contained',
  color = 'wine',
  disabled = false,
  name,
  onPress,
  onLongPress,
}: EZGIconProps) {
  const Icon = (() => {
    switch (name) {
      case 'home': return HomeIcon;
      case 'gallery': return GalleryIcon;
      default:
        return null;
    }
  })();
  if (!onPress && !onLongPress) {
    return <Icon size={size} variant={variant} color={color} disabled={disabled} />;
  }
  return (
    <TouchableOpacity onPress={onPress} onLongPress={onLongPress}>
      <Icon size={size} variant={variant} color={color} disabled={disabled} />
    </TouchableOpacity>
  );
}