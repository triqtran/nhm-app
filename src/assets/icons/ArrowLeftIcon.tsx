import { IconSizeType } from 'core/theme';
import React from 'react';
import { Path } from 'react-native-svg';
import BaseIcon, { BaseIconProps, IconProps } from './BaseIcon';

const svgInfor: { [k in IconSizeType]: string } = {
  normal: 'M22 26L11.3333 15.3333L22 4.66667',
  medium: 'M24 30L12 18L24 6',
  large: 'M26.667 33.333L13.3337 19.9997L26.667 6.66634',
  over: 'M32 40L16 24L32 8',
  extensive: 'M42.667 53.333L21.3337 31.9997L42.667 10.6663',
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

export default function ArrowLeftIcon(props: BaseIconProps) {
  return <BaseIcon {...props} Element={Element} />;
}