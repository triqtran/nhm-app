import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardTypeOptions,
  TextStyle,
  TextInputKeyPressEventData,
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
  StyleProp,
  ViewStyle,
  ReturnKeyTypeOptions,
} from 'react-native';
import theme, { ColorType, InputFormattedType, InputRequiredType, RequiredType } from 'core/theme';
import { i18n, helpers } from 'common';

const formatValue = (value: string, type: InputFormattedType): string => {
  if (!value || value.trim() === '') return '';
  switch(type) {
    case 'currency': return helpers.currency(parseInt(value), '');
    case 'date': return helpers.formatDateDivision(value);
    case 'phone': return helpers.formatPhone(value);
    default: return value;
  }
}

const reverseFormattedValue = (formattedValue: string, type: InputFormattedType): string => {
  if (!formattedValue || formattedValue.trim() === '') return '';
  switch(type) {
    case 'currency': return helpers.currencyFormatToPureNumber(formattedValue);
    case 'date': return helpers.reverseDateDivision(formattedValue);
    case 'phone': return helpers.reversePhone(formattedValue);
    default: return formattedValue;
  }
}

export type EZGInputProps = {
  label?: string;
  placeHolder?: string;
  styleLabel?: TextStyle;
  styleInput?: TextStyle;
  inputType?: InputFormattedType;
  keyboardType?: KeyboardTypeOptions;
  numberOfLines?: number;
  onChange?: (text: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onError?: (error: string) => void;
  onBackSpace?: () => void;
  showError?: boolean;
  required?: Array<InputRequiredType>;
  value?: string;
  focusable?: boolean;
  inputRef?: any;
  autoPasteCode?: boolean;
  maxLength?: number;
  editable?: boolean;
  returnKeyType?: ReturnKeyTypeOptions;
  onSubmitEditing?: (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void;
  isClearing?: boolean;
  onClear?: () => void;
  // icon?: {
  //   type: 'single' | 'twotone';
  //   position?: 'left' | 'right';
  //   name?: EZGIconName;
  //   color?: ColorType;
  //   onPress?: () => void;
  // },
  changedValue?: string;
};

export default function EZGInput({
  label,
  placeHolder,
  styleLabel,
  styleInput,
  inputType = 'text',
  keyboardType = 'default',
  numberOfLines,
  onChange,
  onFocus,
  onBlur,
  onError,
  onBackSpace,
  showError = true,
  required,
  value,
  focusable = false,
  inputRef,
  autoPasteCode = false,
  maxLength,
  editable = true,
  returnKeyType,
  onSubmitEditing,
  isClearing = false,
  onClear,
  // icon,
  changedValue
}: EZGInputProps) {
  const [textValue, setTextValue] = useState(() => formatValue(value, inputType));
  const [error, setError] = useState(null);

  const getErrorMessage = useCallback((requiredType: RequiredType) => {
    switch(requiredType) {
      case 'max-length': return i18n.ERROR_MAX_LENGTH;
      case 'validation': return i18n.ERROR_REGEX;
      case 'required': return i18n.ERROR_EMPTY_FIELD;
      default: return null;
    }
  }, []);

  const onChangeByInputType = useCallback((text: string) => {
    if (['currency', 'phone'].includes(inputType)) {
      const change = reverseFormattedValue(text, inputType);
      return onChange(change);
    }
    onChange(text);
  }, [onChange, inputType]);

  const handleChangeText = useCallback((text: string) => {
    const changedText = reverseFormattedValue(text, inputType);
    const value = formatValue(changedText, inputType);
    setTextValue(value);
    if (!required?.length) return onChangeByInputType(value);
    let err = null;
    for (let item of required) {
      if (item.type === 'required' && (!value || value.trim() === '')) {
        err = item.message || getErrorMessage(item.type);
        break;
      }
      if (item.validation) {
        const valid = item.validation(value);
        if (!valid) {
          err = item.message || getErrorMessage(item.type);
          break;
        }
      }
    }
    setError(err);
    onError && onError(err);
    return onChangeByInputType(value);
  }, [setTextValue, required, inputType, onChangeByInputType, setError, onError, getErrorMessage]);

  const onKeyPress = useCallback(({ nativeEvent }: { nativeEvent: TextInputKeyPressEventData }) => {
    if (nativeEvent.key === 'Backspace' && onBackSpace) onBackSpace();
  }, [onBackSpace]);

  // const onClearInput = useCallback(() => {
  //   setTextValue('');
  //   onClear && onClear();
  // }, [setTextValue, onClear]);

  const borderStyle = useMemo(() => {
    if (showError && error) return { borderColor: theme.color.systemError }; 
    return focusable ? { borderColor: theme.color.systemAction } : null;
  }, [showError, error, focusable]);

  const keyType: KeyboardTypeOptions = useMemo(() => {
    switch (inputType) {
      case 'number':
      case 'date':
        return 'numeric';
      case 'phone': return 'phone-pad';
      default: return keyboardType || 'default';
    }
  }, [inputType, keyboardType]);

  const isRequired = useMemo(() => {
    if (!required?.length) return false;
    return required.some(req => req.type === 'required');
  }, [required]);

  // const iconStyle = useMemo(() => {
  //   if (!icon) return null;
  //   const style: StyleProp<ViewStyle> = [styles.icon];
  //   if (icon.position === 'left') style.push(styles.iconLeft);
  //   style.push(isClearing ? styles.iconRightWithClear : styles.iconRight);
  //   return style;
  // }, [icon]);

  // const Icon = useMemo(() => {
  //   if (!icon) return null;
  //   return icon.type === 'twotone' ? EZGTwoToneIcon : EZGIcon;
  // }, [icon]);

  const inputStyle = useMemo(() => {
    const iStyle: StyleProp<ViewStyle> = [styles.input];
    if (styleInput) iStyle.push(styleInput);
    if (borderStyle) iStyle.push(borderStyle);
    if (!editable) iStyle.push(styles.disabled);
    // if (icon) {
    //   if (icon.position === 'left') iStyle.push(styles.inputHasIconLeft);
    //   else iStyle.push(isClearing ? styles.iconRightWithClear : styles.inputHasIconRight);
    // }
    return iStyle;
  }, [styleInput, editable, borderStyle]); // icon, 

  useEffect(() => {
    if (changedValue) setTextValue(formatValue(changedValue, inputType));
  }, [changedValue, inputType, setTextValue]);

  return (
    <View style={styles.view}>
      {label && (
        <View style={styles.labelView}>
          <Text style={[styles.label, styleLabel]}>{label}</Text>
          {isRequired && <Text style={[styles.label, styles.red]}>*</Text>}
        </View>
      )}
      {/* {icon && (
        <View style={iconStyle}>
          <Icon name={icon.name} color={icon.color} onPress={icon.onPress} />
        </View>
      )} */}
      <TextInput
        value={textValue}
        style={inputStyle}
        placeholder={placeHolder || ''}
        keyboardType={keyType}
        onChangeText={handleChangeText}
        onFocus={onFocus}
        onBlur={onBlur}
        autoFocus={focusable}
        ref={inputRef}
        onKeyPress={onKeyPress}
        textContentType={autoPasteCode ? 'oneTimeCode' : 'none'}
        maxLength={maxLength}
        editable={editable}
        returnKeyType={returnKeyType}
        onSubmitEditing={onSubmitEditing}
        numberOfLines={numberOfLines}
        multiline={!isNaN(numberOfLines) && numberOfLines > 0}
        secureTextEntry={inputType === 'password'}
      />
      {/* {isClearing && (
        <View style={styles.clear}>
          <EZGTwoToneIcon
            name="close"
            color="light"
            size="normal"
            onPress={onClearInput}
          />
        </View>
      )} */}
      {showError && error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  labelView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: theme.margin.large
  },
  label: {
    ...theme.font.normal,
    color: theme.color.additionalGrey70,
  },
  red: { color: theme.color.systemError },
  input: {
    width: '100%',
    minHeight: helpers.selectDevice({ iPhone: 48, tablet: 64 }),
    minWidth: helpers.selectDevice({ iPhone: 48, tablet: 64 }),
    borderRadius: theme.radius.extensive,
    borderColor: theme.color.additionalGrey30,
    borderStyle: 'solid',
    borderWidth: 1,
    paddingHorizontal: theme.padding.large,
    paddingVertical: theme.padding.normal,
  },
  inputHasIconLeft: {
    paddingLeft: (theme.padding.large as number) * 2.5,
  },
  inputHasIconRight: {
    paddingRight: (theme.padding.large as number) * 2.5,
  },
  inputHasIconRightWithClear: {
    paddingRight: (theme.padding.large as number) * 4.5,
  },
  disabled: {
    backgroundColor: theme.color.additionalGrey30
  },
  error: {
    ...theme.font.normal,
    color: theme.color.systemError,
    marginTop: theme.margin.normal,
    textAlign: 'right'
  },
  icon: {
    position: 'absolute',
    top: theme.padding.large,
  },
  // iconLeft: { left: theme.padding.small },
  // iconRight: { right: theme.padding.small },
  // iconRightWithClear: { right: theme.padding.small * 4.5 },
  // clear: {
  //   position: 'absolute',
  //   top: theme.padding.large,
  //   right: theme.padding.small,
  // },
  // close: {
  //   height: theme.padding.extraLarge,
  //   width: theme.padding.extraLarge,
  // }
});
