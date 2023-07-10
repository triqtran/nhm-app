import assets from 'assets';
import { helpers } from 'common';
import theme from 'core/theme';
import React, { useEffect, useMemo } from 'react';
import {
  ImageBackground,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import NHMToast from './NHMToast';

type NHMPageProps = {
  onRefresh?: () => void;
  noFirstRefresh?: boolean;
  refresh?: boolean;
  noScroll?: boolean;
  error?: string;
  children: React.ReactNode;
};

export default function NHMPage ({
  onRefresh,
  noFirstRefresh = false,
  refresh = false,
  noScroll = false,
  error,
  children
}: NHMPageProps) {

  const imgBase = useMemo(() => helpers.selectDevice({
    iPhone: assets.images.imgBaseIphone,
    tablet: assets.images.imgBaseIpad,
  }), []);

  useEffect(() => {
    if (noFirstRefresh) return;
    if (onRefresh) onRefresh();
  }, []);

  return (
    <ImageBackground source={imgBase} style={styles.base}>
      <SafeAreaView style={styles.safe}>
        <StatusBar
          translucent
          barStyle="dark-content"
          backgroundColor="transparent"
        />
        {noScroll ? (
          <View style={styles.view}>
            {children}
          </View>
        ) : (
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={refresh}
                onRefresh={onRefresh}
              />
            }>
            {children}
          </ScrollView>
        )}
        {error && (
          <View style={styles.error}>
            <NHMToast message={error} during="long" />
          </View>
        )}
      </SafeAreaView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  base: { flex: 1 },
  view: { flex: 1 },
  error: {
    position: 'absolute',
    bottom: (theme.margin.extensive) as number * 4,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  }
})