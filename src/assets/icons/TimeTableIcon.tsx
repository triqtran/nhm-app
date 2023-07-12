import { IconSizeType } from 'core/theme';
import React from 'react';
import { Path } from 'react-native-svg';
import BaseIcon, { BaseIconProps, IconProps } from './BaseIcon';

const svgInfor: { [k in IconSizeType]: {
  paths: Array<string>;
  evenodd: string;
  width: string;
} } = {
  normal: {
    paths: [
      'M27.877 12.5396H4.11169',
      'M10.0771 17.7466H10.0647',
      'M15.994 17.7466H15.9817',
      'M21.9228 17.7466H21.9104',
      'M15.994 22.9283H15.9817',
      'M21.9228 22.9283H21.9104',
      'M10.608 2.66699V7.0547',
      'M21.3795 2.66699V7.0547',
    ],
    evenodd: 'M10.349 4.77246H21.6387C25.5543 4.77246 28 6.95371 28 10.9632V23.0294C28 27.1019 25.5543 29.3335 21.6387 29.3335H10.3613C6.43339 29.3335 4.00005 27.1397 4.00005 23.1302V10.9632C3.98769 6.95371 6.42104 4.77246 10.349 4.77246Z',
    width: '1.5',
  },
  medium: {
    paths: [
      'M31.3613 14.1067H4.62541',
      'M11.3366 19.9641H11.3227',
      'M17.9928 19.9641H17.9789',
      'M24.6627 19.9641H24.6488',
      'M17.9928 25.7942H17.9789',
      'M24.6627 25.7942H24.6488',
      'M11.9341 3V7.93617',
      'M24.0513 3V7.93617',
    ],
    evenodd: 'M11.6426 5.36914H24.3436C28.7486 5.36914 31.5 7.82304 31.5 12.3337V25.9081C31.5 30.4897 28.7486 33.0003 24.3436 33.0003H11.6565C7.23757 33.0003 4.50005 30.5323 4.50005 26.0216V12.3337C4.48616 7.82304 7.22367 5.36914 11.6426 5.36914Z',
    width: '1.5',
  },
  large: {
    paths: [
      'M34.8457 15.6738H5.13912',
      'M12.5961 22.1826H12.5806',
      'M19.9926 22.1826H19.9771',
      'M27.4037 22.1826H27.3882',
      'M19.9926 28.6601H19.9771',
      'M27.4037 28.6601H27.3882',
      'M13.2602 3.33301V8.81764',
      'M26.7241 3.33301V8.81764',
    ],
    evenodd: 'M12.9362 5.96484H27.0484C31.9429 5.96484 35 8.6914 35 13.7032V28.786C35 33.8766 31.9429 36.6662 27.0484 36.6662H12.9517C8.04174 36.6662 5.00006 33.9239 5.00006 28.912V13.7032C4.98462 8.6914 8.0263 5.96484 12.9362 5.96484Z',
    width: '2',
  },
  over: {
    paths: [
      'M41.8145 18.8089H6.16656',
      'M15.1161 26.6195H15.0975',
      'M23.9911 26.6195H23.9725',
      'M32.8846 26.6195H32.8661',
      'M23.9911 34.3929H23.9725',
      'M32.8846 34.3929H32.8661',
      'M15.9125 4V10.5816',
      'M32.0687 4V10.5816',
    ],
    evenodd: 'M12.9362 5.96484H27.0484C31.9429 5.96484 35 8.6914 35 13.7032V28.786C35 33.8766 31.9429 36.6662 27.0484 36.6662H12.9517C8.04174 36.6662 5.00006 33.9239 5.00006 28.912V13.7032C4.98462 8.6914 8.0263 5.96484 12.9362 5.96484Z',
    width: '2',
  },
  extensive: {
    paths: [
      'M55.7529 25.0772H8.2224',
      'M20.1541 35.4923H20.1294',
      'M31.9881 35.4923H31.9634',
      'M43.8455 35.4923H43.8208',
      'M31.9881 45.8565H31.9634',
      'M43.8455 45.8565H43.8208',
      'M21.2169 5.33301V14.1084',
      'M42.7589 5.33301V14.1084',
    ],
    evenodd: 'M20.698 9.54395H43.2774C51.1086 9.54395 56 13.9064 56 21.9253V46.0577C56 54.2027 51.1086 58.6661 43.2774 58.6661H20.7227C12.8668 58.6661 8.00009 54.2784 8.00009 46.2595V21.9253C7.97539 13.9064 12.8421 9.54395 20.698 9.54395Z',
    width: '3',
  },
}

function Element ({ size, fill }: IconProps) {
  const data = svgInfor[size];
  return (
    <>
      {data.paths.map((d, i) => (
        <Path
          d={d}
          stroke={fill}
          stroke-width={data.width}
          stroke-linecap="round"
          stroke-linejoin="round"
          key={`${i}`}
        />
      ))}
      <Path
        d={data.evenodd}
        stroke={fill}
        stroke-width={data.width}
        stroke-linecap="round"
        stroke-linejoin="round"
        fill-rule="evenodd"
        clip-rule="evenodd"
      />
    </>
  );
}

export default function TimeTableIcon(props: BaseIconProps) {
  return <BaseIcon {...props} Element={Element} />;
}