import { IconSizeType } from 'core/theme';
import React from 'react';
import { Path } from 'react-native-svg';
import BaseIcon, { BaseIconProps, IconProps } from './BaseIcon';

const svgInfor: { [k in IconSizeType]: string } = {
  normal: 'M26 10L15.3333 20.6667L4.66667 10',
  medium: 'M30 12L18 24L6 12',
  large: 'M33.333 13.333L19.9997 26.6663L6.66634 13.333',
  over: 'M40 16L24 32L8 16',
  extensive: 'M53.333 21.333L31.9997 42.6663L10.6663 21.333',
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

export default function ArrowDownIcon(props: BaseIconProps) {
  return <BaseIcon {...props} Element={Element} />;
}