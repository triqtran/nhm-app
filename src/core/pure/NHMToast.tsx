import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import theme from 'core/theme';

type NHMToastProps = {
  message?: string;
  during?: 'long' | 'short';
  durringTime?: number;
  onClear?: () => void;
}

export default function NHMToast ({
  message,
  during = 'long',
  durringTime,
  onClear,
}: NHMToastProps) {
  const [toastMsg, setToastMsg] = useState<string>(null); 
  const [show, setShow] = useState(false);

  const prevMessRef = useRef<string>(null);

  useEffect(() => {
    if (!message || message.trim() === '') {
      if (toastMsg && toastMsg.trim() !== '') {
        return setToastMsg(null);
      }
      return;
    }
    if (prevMessRef.current && prevMessRef.current.includes(message)) return;
    prevMessRef.current = message;
    setToastMsg(message);
  }, [message, prevMessRef, toastMsg, setToastMsg]);

  useEffect(() => {
    if (show || !toastMsg) return;
    setShow(toastMsg ? true : false);
  }, [toastMsg, show, setShow]);

  useEffect(() => {
    if (!show) return;
    const dueTime = (() => {
      if (durringTime && !isNaN(durringTime) && durringTime > 0) {
        return durringTime;
      }
      return during === 'short' ? 500 : 1000;
    })()
    setTimeout(() => {
      if (show) setShow(false);
      setToastMsg(null);
      if (onClear) onClear();
    }, dueTime);
  }, [show, setShow, setToastMsg, during, durringTime, onClear]);

  console.log({ message, toastMsg });

  if (!show || !toastMsg) return null;
  return (
    <View style={styles.toast}>
      <Text style={styles.message}>{toastMsg}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    top: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: `rgba(0, 0, 0, 0.75)`,
    padding: theme.padding.normal,
    borderRadius: theme.radius.normal,
    minWidth: 100,
    zIndex: 1000,
  },
  message: {
    ...theme.font.normal,
    color: theme.color.additionalLight,
    textAlign: 'center',
  },
})