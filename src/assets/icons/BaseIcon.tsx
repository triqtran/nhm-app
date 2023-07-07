import React, { useMemo } from 'react';
import { Svg } from 'react-native-svg';
import theme, { ColorType, SizeType } from 'core/theme';

export type IconProps = {
  size?: number;
  fill?: string;
  stroke?: string;
};

export type BaseIconProps = {
  size: SizeType;
  variant?: 'outlined' | 'contained';
  color: ColorType;
  Element?: React.ElementType;
  disabled?: boolean;
};

export default function BaseIcon({
  size = 'normal',
  variant = 'contained',
  color = 'wine',
  disabled = false,
  Element,
}: BaseIconProps) {
  if (!Element) return null;

  const [active, inactive] = useMemo(() => {
    switch (color) {
      case 'wine': return [theme.color.primaryWine, theme.color.primaryWine30];
      case 'olive': return [theme.color.additionalOlive, theme.color.additionalOlive30];
      case 'honey': return [theme.color.secondaryHoney, theme.color.secondaryHoney30];
      case 'brown': return [theme.color.secondaryBrown30, theme.color.secondaryBrown10];
      case 'grey': return [theme.color.additionalGrey, theme.color.additionalGrey50];
      case 'light': return [theme.color.additionalLight, theme.color.additionalGrey30];
      case 'red': return [theme.color.systemError, theme.color.primaryWine30];
      case 'blue': return [theme.color.systemAction, theme.color.additionalGrey50];
      case 'green': return [theme.color.systemSuccess, theme.color.additionalOlive30];
      default: return [theme.color.primaryWine, theme.color.primaryWine30];
    }
  }, [color]);

  const sz = useMemo(() => {
    switch(size) {
      case 'normal': return 32;
      case 'large': return 48;
      default: return 32;
    }
  }, [size]);
  const elementProps =
    variant === 'contained'
      ? { fill: disabled ? inactive : active }
      : { stroke: disabled ? inactive : active };

  return (
    <Svg
      width={sz}
      height={sz}
      viewBox={`0 0 ${sz} ${sz}`}
      fill="none">
      <Element size={sz} {...elementProps} />
    </Svg>
  );
}
