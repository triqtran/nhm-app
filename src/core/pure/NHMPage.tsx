import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';

type NHMPageProps = {
  children: React.ReactNode;
};

export default function NHMPage ({
  children
}: NHMPageProps) {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar
        translucent
        barStyle="dark-content"
        backgroundColor="transparent"
      />
      <View style={styles.view}>
        {children}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  view: { flex: 1 },
})