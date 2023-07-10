import {
  AnimatableNumericValue,
  DimensionValue,
  Platform,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { helpers } from 'common';

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
  systemAction: '#4399F0',
};

export type ColorType =
  'wine'
  | 'honey'
  | 'brown'
  | 'olive'
  | 'grey'
  | 'light'
  | 'red'
  | 'green'
  | 'blue';

export type VariantType =  'contained' | 'outlined' | 'outlined-transparent' | 'text';

export type SizeType =
  'normal'
  | 'semimedium'
  | 'medium'
  | 'large'
  | 'over'
  | 'extensive';


export const radius: { [k in SizeType]: AnimatableNumericValue } = {
  normal: helpers.selectDevice({ iPhone: 12, tablet: 14 }),
  semimedium: helpers.selectDevice({ iPhone: 14, tablet: 16 }),
  medium: helpers.selectDevice({ iPhone: 16, tablet: 20 }),
  large: helpers.selectDevice({ iPhone: 20, tablet: 24 }),
  over: helpers.selectDevice({ iPhone: 24, tablet: 36 }),
  extensive: helpers.selectDevice({ iPhone: 36, tablet: 48 }),
};

const padding: { [k in SizeType]: DimensionValue } = {
  normal: helpers.selectDevice({ iPhone: 8, tablet: 10 }),
  semimedium: helpers.selectDevice({ iPhone: 10, tablet: 12 }),
  medium: helpers.selectDevice({ iPhone: 12, tablet: 14 }),
  large: helpers.selectDevice({ iPhone: 14, tablet: 16 }),
  over: helpers.selectDevice({ iPhone: 16, tablet: 20 }),
  extensive: helpers.selectDevice({ iPhone: 20, tablet: 24 }),
};

const margin: { [k in SizeType]: DimensionValue } = {
  normal: helpers.selectDevice({ iPhone: 8, tablet: 10 }),
  semimedium: helpers.selectDevice({ iPhone: 10, tablet: 12 }),
  medium: helpers.selectDevice({ iPhone: 12, tablet: 14 }),
  large: helpers.selectDevice({ iPhone: 14, tablet: 16 }),
  over: helpers.selectDevice({ iPhone: 16, tablet: 20 }),
  extensive: helpers.selectDevice({ iPhone: 20, tablet: 24 }),
};

const size: { [k in SizeType]: number } = {
  normal: helpers.selectDevice({ iPhone: 12, tablet: 14 }),
  semimedium: helpers.selectDevice({ iPhone: 14, tablet: 16 }),
  medium: helpers.selectDevice({ iPhone: 16, tablet: 18 }),
  large: helpers.selectDevice({ iPhone: 18, tablet: 20 }),
  over: helpers.selectDevice({ iPhone: 20, tablet: 24 }),
  extensive: helpers.selectDevice({ iPhone: 24, tablet: 36 }),
};

type FontWeightType =
  '400' | '600' | 'bold' | '100' | '200' | '300' | '400'
  | '500' | '700' | '800' | '900';

const size_12 = 12;
const size_14= 14;
const size_16= 16;
const size_18 = 18;
const size_20 = 20;
const size_24 = 24;
const size_28 = 28;
const size_36 = 36;
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


const font: { [k in FontType]: TextStyle } = {
  normal: helpers.selectDevice({
    iPhone: { ...fontLevel1, fontSize: size_12 },
    tablet: { ...fontLevel1, fontSize: size_14 },
  }),
  normalBold: helpers.selectDevice({
    iPhone: {
      ...fontLevel1,
      fontSize: size_12,
      fontWeight: weight_bold,
      fontFamily: familyExtraLight,
    },
    tablet: {
      ...fontLevel1,
      fontSize: size_14,
      fontWeight: weight_bold,
      fontFamily: familyExtraLight,
    },
  }),
  semimedium: helpers.selectDevice({
    iPhone: { ...fontLevel1, fontSize: size_14 },
    tablet: { ...fontLevel1, fontSize: size_16 },
  }),
  semimediumBold: helpers.selectDevice({
    iPhone: {
      ...fontLevel1,
      fontSize: size_14,
      fontWeight: weight_bold,
      fontFamily: familyExtraLight,
    },
    tablet: {
      ...fontLevel1,
      fontSize: size_16,
      fontWeight: weight_bold,
      fontFamily: familyExtraLight,
    }
  }),
  medium: helpers.selectDevice({
    iPhone: { ...fontLevel2, fontSize: size_16 },
    tablet: { ...fontLevel2, fontSize: size_20 },
  }),
  mediumBold: helpers.selectDevice({
    iPhone: {
      ...fontLevel2,
      fontSize: size_16,
      fontWeight: weight_bold,
      fontFamily: familyRegular,
    },
    tablet: {
      ...fontLevel2,
      fontSize: size_18,
      fontWeight: weight_bold,
      fontFamily: familyRegular,
    }
  }),
  large: helpers.selectDevice({
    iPhone: { ...fontLevel2, fontSize: size_20 },
    tablet: { ...fontLevel2, fontSize: size_24 },
  }),
  largeBold: helpers.selectDevice({
    iPhone: {
      ...fontLevel2,
      fontSize: size_20,
      fontWeight: weight_bold,
      fontFamily: familyRegular,
    },
    tablet: {
      ...fontLevel2,
      fontSize: size_24,
      fontWeight: weight_bold,
      fontFamily: familyRegular,
    },
  }),
  over: helpers.selectDevice({
    iPhone: { ...fontLevel3, fontSize: size_24 },
    tablet: { ...fontLevel3, fontSize: size_28 },
  }),
  overBold: helpers.selectDevice({
    iPhone: {
      ...fontLevel3,
      fontSize: size_24,
      fontWeight: weight_bold,
      fontFamily: familyBold,
    },
    tablet: {
      ...fontLevel3,
      fontSize: size_28,
      fontWeight: weight_bold,
      fontFamily: familyBold,
    }
  }),
  extensive: helpers.selectDevice({
    iPhone: { ...fontLevel3, fontSize: size_36 },
    tablet: { ...fontLevel3, fontSize: size_48 },
  }),
  extensiveBold: helpers.selectDevice({
    iPhone: {
      ...fontLevel3,
      fontSize: size_36,
      fontWeight: weight_bold,
      fontFamily: familyBold,
    },
    tablet: {
      ...fontLevel3,
      fontSize: size_48,
      fontWeight: weight_bold,
      fontFamily: familyBold,
    },
  }),
};

export type ButtonSizeType = 'small' | 'normal' | 'large';

const buttonSize: { [k in ButtonSizeType]: number } = {
  normal: helpers.selectDevice({
    iPhone: 48,
    tablet: 64,
  }),
  small: helpers.selectDevice({
    iPhone: 40,
    tablet: 52,
  }),
  large: helpers.selectDevice({
    iPhone: 64,
    tablet: 80,
  }),
}

export type ButtonStyleType = {
  touch: ViewStyle;
  touchInactive: ViewStyle;
  title: TextStyle;
  titleInactive: TextStyle;
  loadingColor?: string;
}

/***
 * variant: 'contained' | size: 'small':
 *  - touch: { backgroundColor: '', height: buttonSize.small, radius: radius.extensive }
 *  - title: { ...theme.font.medium, color: color.additionalLight }
 * 
 * variant: 'contained' | size: 'normal':
 *  - touch: { backgroundColor: '', height: buttonSize.normal, radius: radius.extensive }
 *  - title: { ...theme.font.normal, color: color.additionalLight }
 * 
 * variant: 'contained' | size: 'large':
 *  - touch: { backgroundColor: '', height: buttonSize.large, radius: radius.extensive }
 *  - title: { ...theme.font.large, color: color.additionalLight }
 * 
 * variant: 'outlined' | size: 'small':
 *  - touch: { backgroundColor: color.additionalLight, borderWidth: 1, borderStyle: 'solid', borderColor: '', height: buttonSize.small, radius: radius.extensive }
 *  - title: { ...theme.font.normal, color: '' }
 * 
 * * variant: 'outlined' | size: 'normal':
 *  - touch: { backgroundColor: color.additionalLight, borderWidth: 1, borderStyle: 'solid', borderColor: '', height: buttonSize.normal, radius: radius.extensive }
 *  - title: { ...theme.font.medium, color: '' }
 * 
 * * variant: 'outlined' | size: 'large':
 *  - touch { backgroundColor: color.additionalLight, borderWidth: 1, borderStyle: 'solid', borderColor: '', height: buttonSize.large, radius: radius.extensive }
 *  - title: { ...theme.font.large, color: '' }
 * 
 * * variant: 'text' | size: 'small':
 *  - touch: {}
 *  - title: { ...theme.font.normal, color: '' }
 * 
 * * variant: 'text' | size: 'normal':
 *  - touch: {}
 *  - title: { ...theme.font.medium, color: '' }
 * 
 * * variant: 'text' | size: 'large':
 *  - touch: {}
 *  - title: { ...theme.font.large, color: '' }
*/

function buttonColor (colorType: ColorType) {
  const [active, inactive] = (() => {
    switch(colorType) {
      case 'wine': return [color.primaryWine, color.primaryWine30];
      case 'honey': return [color.secondaryHoney, color.secondaryHoney30];
      case 'brown': return [color.secondaryBrown30, color.secondaryBrown10];
      case 'olive': return [color.additionalOlive, color.additionalOlive30];
      case 'grey': return [color.additionalGrey, color.additionalGrey30];
      case 'red': return [color.systemError, color.primaryWine30];
      case 'green': return [color.systemSuccess, color.additionalOlive30];
      case 'green': return [color.systemAction, color.additionalGrey30];
      default: return [color.primaryWine, color.primaryWine30];
    }
  })();
  return { active, inactive };
}

function buttonStyles (
  variant: VariantType,
  size: ButtonSizeType,
  colortype: ColorType,
): ButtonStyleType {
  const btnColor = buttonColor(colortype);

  const btnView: ViewStyle = {
    maxHeight: buttonSize[size],
    borderRadius: radius.extensive,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: btnColor.active,
    maxWidth: helpers.selectDevice({
      iPhone: 280,
      tablet: 452,
    }),
  };
  const stext: TextStyle = (() => {
    switch(size) {
      case 'small': return { ...font.normalBold, textAlign: 'center' };
      case 'normal': return { ...font.mediumBold, textAlign: 'center' };
      case 'large': return { ...font.largeBold, textAlign: 'center' };
    }
  })();

  switch(variant) {
    case 'outlined':
    case 'outlined-transparent': {
      const backgroundColor = variant === 'outlined'
        ? color.additionalLight
        : 'transparent';
      return {
        touch: { ...btnView, backgroundColor , borderColor: btnColor.active },
        touchInactive: { ...btnView, backgroundColor, borderColor: btnColor.inactive },
        title: { ...stext, color: btnColor.active },
        titleInactive: { ...stext, color: btnColor.inactive },
        loadingColor: btnColor.active,
      }
    }
    case 'text': return {
      touch: {},
      touchInactive: {},
      title: { ...stext, color: btnColor.active },
      titleInactive: { ...stext, color: btnColor.inactive },
      loadingColor: btnColor.active,
    }
    default: return {
      touch: { ...btnView, backgroundColor: btnColor.active },
      touchInactive: { ...btnView, backgroundColor: btnColor.inactive },
      title: { ...stext, color: color.additionalLight },
      titleInactive: { ...stext, color: color.additionalGrey30 },
      loadingColor: color.additionalLight
    }
  }
}

export type RequiredType = 'max-length' | 'required' | 'validation' | 'empty';
export type InputRequiredType = {
  type: RequiredType;
  validation?: (data?: string) => boolean;
  message?: string;
}
export type InputFormattedType = 'text' | 'number' | 'phone' | 'date' | 'currency' | 'password';

export type NHMIconName =
  'home'
  | 'gallery';

const boxShadow = Platform.select({
  ios: {
    shadowColor: color.additionalGrey70,
    shadowOffset: {
      width: 4,
      height: 6,
    },
    shadowOpacity: 0.10,
    shadowRadius: 3.84,
  },
  android: { elevation: 5 },
})

export default {
  color,
  font,
  margin,
  padding,
  radius,
  size,
  buttonSize,
  buttonStyles,
  boxShadow,
}