import React, { useMemo } from 'react';
import { Svg } from 'react-native-svg';
import theme, { ColorType, IconSizeType } from 'core/theme';

export type IconProps = {
  size?: IconSizeType;
  fill?: string;
  stroke?: string;
};

export type BaseIconProps = {
  size: IconSizeType;
  color: ColorType;
  Element?: React.ElementType;
  targetFill?: string;
  targetStroke?: string;
};

export default function BaseIcon({
  size = 'normal',
  color = 'wine',
  Element,
  targetFill = null,
  targetStroke = null,
}: BaseIconProps) {
  if (!Element) return null;

  // fill: is the main of the color
  // stroke: is the sub-color
  const [fill, stroke] = useMemo(() => {
    switch (color) {
      case 'wine': return [theme.color.primaryWine, theme.color.primaryWine30];
      case 'olive': return [theme.color.additionalOlive, theme.color.additionalOlive30];
      case 'honey': return [theme.color.secondaryHoney, theme.color.secondaryHoney30];
      case 'brown': return [theme.color.secondaryBrown30, theme.color.secondaryBrown10];
      case 'grey': return [theme.color.additionalGrey, theme.color.additionalGrey50];
      case 'light': return [theme.color.additionalLight, theme.color.additionalGrey30];
      case 'red': return [theme.color.systemError, theme.color.primaryWine30];
      case 'blue': return [theme.color.systemAction, theme.color.systemAction10];
      case 'green': return [theme.color.systemSuccess, theme.color.additionalOlive30];
      default: return [theme.color.primaryWine, theme.color.primaryWine30];
    }
  }, [color]);

  const sz = useMemo(() => {
    switch(size) {
      case 'medium': return 36;
      case 'large': return 40;
      case 'over': return 48;
      case 'extensive': return 64;
      default: return 32;
    }
  }, [size]);

  return (
    <Svg
      width={sz}
      height={sz}
      viewBox={`0 0 ${sz} ${sz}`}
      fill="none">
      <Element
        size={size}
        fill={targetFill || fill}
        stroke={targetStroke || stroke}
      />
    </Svg>
  );
}
