import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import moment from 'moment';
import i18n from './i18n';

type DeviceType = {
  iPhone?: any;
  iPad?: any;
  android?: any;
  tablet?: any;
}

function isIphone () {
  if (Platform.OS !== 'ios') return false;
  return !Platform.isPad;
}

function isIPad () {
  return Platform.OS === 'ios' && Platform.isPad;
}

function isTablet () {
  return DeviceInfo.isTablet();
}

function isAndroidPhone () {
  if (Platform.OS !== 'android') return false;
  return !DeviceInfo.isTablet();
}

function selectDevice (props: DeviceType) {
  if (Platform.OS === 'ios') {
    return Platform.isPad
      ? (props?.iPad || props?.tablet || null)
      : (props?.iPhone || props?.android || null);
  }
  if (Platform.OS === 'android') {
    return DeviceInfo.isTablet()
      ? (props?.tablet || props?.iPad || null)
      : (props?.android || props?.iPhone || null);
  }
  return null;
}

function currency (number: number, symbol: string = 'đ', cleanByUnit = 0) {
  if (isNaN(number)) return '';
  const noSymbol = !symbol || symbol.trim() === '';
  const formattedNumber = cleanByUnit > 0 ? number / cleanByUnit : number;
  const formatter = formattedNumber?.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.') || '';
  return noSymbol ? formatter : `${formatter} ${symbol}`;
}

const currencyFormat = (
  number: number,
  currencySymbol: string = 'đ',
  useRound: boolean = false,
  unit: number = 1000,
) => {
  if (isNaN(number)) return '';
  const noSymbol = !currencySymbol || currencySymbol.trim() === '';
  if (useRound) {
    const roundNumber = Math.ceil(number / unit) * unit;
    const format =  roundNumber.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.');
    return noSymbol ? format : `${format} ${currencySymbol}`
  }
  const formattedNumber = number.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.');
  return noSymbol ? formattedNumber : `${formattedNumber} ${currencySymbol}`;
};

const currencyFormatToPureNumber = (t: string) => {
  if (typeof t === 'number') return t;
  if (!t && t.trim() === '') return '';
  return t.replace(/\./g, '');
};

const formatPhone = (phone: string): string => {
  if (!phone || phone.replace(/\s/g, '') === '') return '';
  const phoneNumber = phone.replace(/\s/g, '');
  const size = phoneNumber.length;
  if (size <= 3) return phoneNumber;
  const first = phoneNumber.substring(0, 3);
  if (size <= 7) return `${first} ${phoneNumber.substring(3)}`;
  const second = phoneNumber.substring(3, 7);
  if (size <= 10) {
    return `${first} ${second} ${phoneNumber.substring(7)}`;
  }
  const last = phoneNumber.substring(7, 10);
  if (size > 10) return `${first} ${second} ${last}`;
}

const formatDateDivision = (t: string) => {
  let newString = '';
  const indexSymbol = t.includes('/') ? 4 : 3;
  for (let i = 0; i < t.length; i += 1) {
    const ch = t.charAt(i);
    if (ch === '/') continue;
    newString += ch;
    if (i < t.length - 1 && (i === 1 || i === indexSymbol)) {
      newString += '/';
    }
  }
  return newString;
};

// const checkDay = (month: number, day: number, year: number) => {
//   let NhuanYear = year % 100 === 0 && year % 4 === 0;
//   switch (month) {
//     case 1:
//     case 3:
//     case 5:
//     case 7:
//     case 8:
//     case 10:
//     case 12:
//       return day <= 31 && day > 0;
//     case 2: {
//       if (NhuanYear) {
//         return day <= 29 && day > 0;
//       }
//       return day <= 28 && day > 0;
//     }
//     default:
//       return day <= 30 && day > 0;
//   }
// };

// const checkMonth = (month: number) => {
//   return month > 0 && month <= 12;
// };

// const checkYear = (year: number) => {
//   return year > 1900 && year <= moment().get('year');
// };

// const checkBirthday = (birth: string) => {
//   const normal = reverseDateDivision(birth);
//   const day = parseInt(normal.substring(0, 2));
//   const month = parseInt(normal.substring(2, 4));
//   const year = parseInt(normal.substring(4));
//   const curYear = moment().get('year');
//   if (checkDay(month, day, year) && checkMonth(month) && checkYear(year)) {
//     return curYear - year < 18 ? AppStrings.REQUIRE_EIGHTEEN : null;
//   }
//   return AppStrings.ERROR_BIRTHDAY;
// };

const reverseDateDivision = (formatString: string) => {
  return formatString.replace(/\//g, '');
};

const reversePhone = (phone: string): string => {
  if (!phone || phone.replace(/\s/g, '') === '') return '';
  const phoneNumber = phone.replace(/\s/g, '');
  return isNaN(parseInt(phoneNumber)) ? '' : phoneNumber;
};

function validateEmail (email?: string) {
  if (!email || email.trim() === '') return i18n.ERROR_EMPTY_FIELD;
  const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return regexEmail.test(email) ? null : i18n.ERROR_REGEX;
}

function validatePhone (phone?: string) {
  if (!phone || phone.trim() === '') return i18n.ERROR_EMPTY_FIELD;
  // validate length
  if (phone.replace(/\s/g, '').length < 10) return i18n.ERROR_MAX_LENGTH;
  // validate format
  const format =
    ['.', ',', '*', '+', '-', '#', '(', ')'].some(spec => phone.includes(spec))
    || phone === '0000000000';
  if (format) return i18n.ERROR_REGEX;
  return null;
}

export default {
  selectDevice,
  currency,
  currencyFormat,
  currencyFormatToPureNumber,
  formatPhone,
  formatDateDivision,
  reverseDateDivision,
  reversePhone,
  isIphone,
  isIPad,
  isAndroidPhone,
  isTablet,
  validateEmail,
  validatePhone,

}