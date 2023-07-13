import assets from 'assets';
import { NHMTag } from 'core';
import theme from 'core/theme';
import React from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';

type ProfileHeaderProps = {
  name: string;
}

export default function ProfileHeader ({ name }: ProfileHeaderProps) {
  return (
    <View style={styles.header}>
      <View style={styles.bgImg}>
        <Image
          source={assets.images.imgProfile}
          style={styles.profileImg}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.profileTitle}>{name}</Text>
      <View style={styles.tag}>
        <NHMTag label={"Student"} color="honey" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { alignItems: 'center' },
  bgImg: {
    height: 160, width: 160, borderRadius: 80,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.color.secondaryHoney30,
  },
  profileImg: { width: 120, height: 120 },
  profileTitle: {
    ...theme.font.overBold,
    color: theme.color.primaryWine,
    paddingVertical: theme.padding.large,
  },
  tag: { width: 80 },
})