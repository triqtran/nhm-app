import { IconSizeType } from 'core/theme';
import React from 'react';
import { Path } from 'react-native-svg';
import BaseIcon, { BaseIconProps, IconProps } from './BaseIcon';

const svgInfor: { [k in IconSizeType]: Array<string> } = {
  normal: [
    'M5.66699 16.3659L25.667 16.3659',
    'M13.7334 24.3983L5.66673 16.3663L13.7334 8.33301',
    '2'
  ],
  medium: [
    'M6.375 18.4121L28.875 18.4121',
    'M15.4492 27.4485L6.37422 18.4125L15.4492 9.375',
    '2',
  ],
  large: [
    'M7.08301 20.4574L32.083 20.4574',
    'M17.166 30.4977L7.08268 20.4577L17.166 10.416',
    '3',
  ],
  over: [
    'M8.5 24.5479L38.5 24.5479',
    'M20.5996 36.597L8.49961 24.549L20.5996 12.499',
    '3',
  ],
  extensive: [
    'M11.333 32.7318L51.333 32.7318',
    'M27.4658 48.7967L11.3325 32.7327L27.4658 16.666',
    '4',
  ],
}

function Element ({ size, fill }: IconProps) {
  const data = svgInfor[size];
  return (
    <>
      <Path
        d={data[0]}
        stroke={fill}
        stroke-width={data[2]}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d={data[1]}
        stroke={fill}
        stroke-width={data[2]}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </>
  );
}

export default function LeadingLeftIcon(props: BaseIconProps) {
  return <BaseIcon {...props} Element={Element} />;
}