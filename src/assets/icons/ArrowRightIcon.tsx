import { IconSizeType } from 'core/theme';
import React from 'react';
import { Path } from 'react-native-svg';
import BaseIcon, { BaseIconProps, IconProps } from './BaseIcon';

const svgInfor: { [k in IconSizeType]: string } = {
  normal: 'M10 6L20.6667 16.6667L10 27.3333',
  medium: 'M12 6L24 18L12 30',
  large: 'M13.333 6.66699L26.6663 20.0003L13.333 33.3337',
  over: 'M16 8L32 24L16 40',
  extensive: 'M21.333 10.667L42.6663 32.0003L21.333 53.3337',
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

export default function ArrowRightIcon(props: BaseIconProps) {
  return <BaseIcon {...props} Element={Element} />;
}