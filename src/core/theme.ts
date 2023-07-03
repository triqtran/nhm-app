import { TextStyle } from 'react-native';

const color = {
  // primary
  primaryWine: '#7E2619',
  primaryWine70: '#B86E5F',
  primaryWine50: '#D8A196',
  primaryWine30: '#EBC3BC',
  primaryWine10: '#F5E0DC',
  // gradient
  gradientWine: ['#742E20', '#B1442E'],
  // secondary
  secondaryHoney: '#E9A552',
  secondaryHoney30: '#FFE2BA',
  secondaryHoney10: '#FEF9F4',
  secondaryBrown30: '#A39896',
  secondaryBrown10: '#CCBEBC',
  // Additional
  additionalOlive: '#5D8F4A',
  additionalOlive50: '#95B87D',
  additionalOlive30: '#BDD2A5',
  additionalGrey: '#040505',
  additionalGrey70: '#555A5E',
  additionalGrey50: '#97999A',
  additionalGrey30: '#CACBCC',
  additionalGrey10: '#E8E9EB',
  additionalLight: '#FFFFFF',
  // System
  systemError: '#F03C15',
  systemSuccess: '#3DCC6D',
  systemWarning: '#E9A552',
  systemAction: '#4399F0',
};

export type SizeType = 'normal' | 'semimedium' | 'medium' | 'large' | 'over' | 'extensive';

export type SizeTypeProps = { [k in SizeType]?: number };

/*
normal: 12
medium: 16
large: 20
over: 24
extensive: 48
*/


const radius: SizeTypeProps = {
  normal: 12,
  semimedium: 14,
  medium: 16,
  large: 20,
  over: 24,
  extensive: 48,
};

const padding: SizeTypeProps = {
  normal: 8,
  semimedium: 10,
  medium: 12,
  large: 14,
  over: 16,
  extensive: 20,
}

const margin: SizeTypeProps = {
  normal: 8,
  semimedium: 10,
  medium: 12,
  large: 14,
  over: 16,
  extensive: 20,
};

const size: SizeTypeProps = {
  normal: 12,
  semimedium: 14,
  medium: 16,
  large: 20,
  over: 24,
  extensive: 48,
};

type FontWeightType = '400' | '600' | 'bold' | '100' | '200' | '300' | '400' | '500' | '700' | '800' | '900';

const size_12 = 12;
const size_14= 14;
const size_16= 16;
const size_20 = 20;
const size_24 = 24;
const size_48 = 48;
const weight_normal: FontWeightType = '400';
const weight_semibold: FontWeightType = '600';
const weight_bold: FontWeightType = '700';

const familyBold = 'BeVietnamPro-Bold';
const familyExtraLight = 'BeVietnamPro-ExtraLight';
const familyThin = 'BeVietnamPro-Thin';
const familyRegular = 'BeVietnamPro-Regular';

const fontLevel1 = {
  fontWeight: weight_normal,
  fontFamily: familyThin,
  color: color.additionalGrey70,
};

const fontLevel2 = {
  fontWeight: weight_normal,
  fontFamily: familyExtraLight,
  color: color.additionalGrey70,
};

const fontLevel3 = {
  fontWeight: weight_semibold,
  fontFamily: familyRegular,
  color: color.additionalGrey70,
}

type FontType =
  'normal' | 'normalBold'
  | 'semimedium' | 'semimediumBold'
  | 'medium' | 'mediumBold'
  | 'large' | 'largeBold'
  | 'over' | 'overBold'
  | 'extensive' | 'extensiveBold';


const font: {
  [k in FontType]: TextStyle
} = {
  normal: { ...fontLevel1, fontSize: size_12 },
  normalBold: {
    ...fontLevel1,
    fontSize: size_12,
    fontWeight: weight_bold,
    fontFamily: familyExtraLight,
  },
  semimedium: { ...fontLevel1, fontSize: size_14 },
  semimediumBold: {
    ...fontLevel1,
    fontSize: size_14,
    fontWeight: weight_bold,
    fontFamily: familyExtraLight,
  },
  medium: { ...fontLevel2, fontSize: size_16 },
  mediumBold: {
    ...fontLevel2,
    fontSize: size_16,
    fontWeight: weight_bold,
    fontFamily: familyRegular,
  },
  large: { ...fontLevel2, fontSize: size_20 },
  largeBold: {
    ...fontLevel2,
    fontSize: size_20,
    fontWeight: weight_bold,
    fontFamily: familyRegular,
  },
  over: { ...fontLevel3, fontSize: size_24 },
  overBold: {
    ...fontLevel3,
    fontSize: size_24,
    fontWeight: weight_bold,
    fontFamily: familyBold,
  },
  extensive: { ...fontLevel3, fontSize: size_48 },
  extensiveBold: {
    ...fontLevel3,
    fontSize: size_48,
    fontWeight: weight_bold,
    fontFamily: familyBold,
  },
}

export default {
  color,
  font,
  margin,
  padding,
  radius,
  size,
}