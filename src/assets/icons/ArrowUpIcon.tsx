import { IconSizeType } from 'core/theme';
import React from 'react';
import { Path } from 'react-native-svg';
import BaseIcon, { BaseIconProps, IconProps } from './BaseIcon';

const svgInfor: { [k in IconSizeType]: string } = {
  normal: 'M6 22L16.6667 11.3333L27.3333 22',
  medium: 'M6 24L18 12L30 24',
  large: 'M6.66699 26.667L20.0003 13.3337L33.3337 26.667',
  over: 'M8 32L24 16L40 32',
  extensive: 'M10.667 42.667L32.0003 21.3337L53.3337 42.667',
}

function Element ({ size, fill }: IconProps) {
  const data = svgInfor[size];
  return (
    <Path
      d={data}
      stroke={fill}
      stroke-width="4"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  );
}

export default function ArrowUpIcon(props: BaseIconProps) {
  return <BaseIcon {...props} Element={Element} />;
}