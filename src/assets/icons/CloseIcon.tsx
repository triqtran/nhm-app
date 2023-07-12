import { IconSizeType } from 'core/theme';
import React from 'react';
import { Path } from 'react-native-svg';
import BaseIcon, { BaseIconProps, IconProps } from './BaseIcon';

const svgInfor: { [k in IconSizeType]: Array<string> } = {
  normal: [
    'M7.24107 25.2259L24.7411 7.65723',
    'M24.7589 25.2259L7.25893 7.65723',
  ],
  medium: [
    'M8.14583 28.3787L27.8333 8.61401',
    'M27.8542 28.3787L8.16667 8.61401',
  ],
  large: [
    'M9.0506 31.5316L30.9256 9.5708',
    'M30.9494 31.5316L9.0744 9.5708',
  ],
  over: [
    'M10.8611 37.8383L37.1111 11.4853',
    'M37.1389 37.8383L10.8889 11.4853',
  ],
  extensive: [
    'M14.4812 50.4507L49.4812 15.3135',
    'M49.5188 50.4507L14.5188 15.3135'
  ],
}

function Element ({ size, fill }: IconProps) {
  const data = svgInfor[size];
  return (
    <>
      {data.map((d, i) => (
        <Path
          d={d}
          stroke={fill}
          key={`${i}`}
          stroke-width="4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      ))}
    </>
  );
}

export default function CloseIcon(props: BaseIconProps) {
  return <BaseIcon {...props} Element={Element} />;
}