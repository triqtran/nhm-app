import React from 'react';
import { View, StyleSheet, Text, FlatList, Dimensions } from "react-native";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { State } from "reduxes/states";
import theme, { ColorType } from 'core/theme';
import { NHMPage, NHMThumbnail } from "core";
import { StudentModule } from "reduxes/student/StudentModule";
import HomeHeader from "./components/HomeHeader";
import assets from 'assets';
import { helpers, i18n } from 'common';

export default function HomeMainScreen(studentMol: StudentModule) {
  function mapStateToProps (state: State) {
    return {
      loading: studentMol.selectors.profileLoading(state),
    };
  }

  function mapDispatchToProps (dispatch: Dispatch) {
    return {
      getProfile: studentMol.actions.getProfile.bindCreator(dispatch),
    };
  }

  return connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
}

const thumbActions = [
  {
    image: assets.images.imgBooks,
    label: i18n.BOOK,
    hint: i18n.BOOK_HINT,
    action: {
      color: 'wine',
      hasGradient: true,
      gradient: theme.color.gradientWine,
      onPress: () => {},
      title: i18n.CONTINUE,
    }
  },
  {
    image: assets.images.imgCalendar,
    label: i18n.UPCOMING_CLASSES,
    hint: i18n.UPCOMING_CLASSES_HINT,
  },
  {
    image: assets.images.imgRubik,
    label: i18n.GAME,
    hint: i18n.GAME_HINT,
    action: {
      color: 'wine',
      hasGradient: true,
      gradient: theme.color.gradientWine,
      onPress: () => {},
      title: i18n.PLAY,
    }
  },
  {
    image: assets.images.imgDocuments,
    label: i18n.NOTES,
    hint: i18n.NOTES_HINT,
    action: {
      color: 'honey',
      onPress: () => {},
      title: i18n.ADD_NOTE,
    }
  },
]

type HomeScreenProps = {
  loading: boolean;
  getProfile: () => void;
}

function HomeScreen ({
  loading,
  getProfile,
}: HomeScreenProps) {

  return (
    <NHMPage
      noFirstRefresh
      noScroll
      onRefresh={getProfile}
      refresh={loading}
    >
      <HomeHeader />
      <View style={styles.view}>
        <FlatList
          data={thumbActions}
          renderItem={({ item, index }) => (
            <View style={[
              styles.item,
              index % 2 === 1 ? styles.right : null
            ]}>
              <NHMThumbnail
                thumbImg={item.image}
                label={item.label}
                extra={(
                  <Text style={styles.hint}>
                    {item.hint}
                  </Text>
                )}
                pressAction={item?.action ? {
                  variant: 'contained',
                  color: (item?.action?.color as ColorType),
                  size: 'small',
                  title: item?.action?.title,
                  hasGradient: item?.action?.hasGradient,
                  gradient: item?.action?.gradient,
                  onPress: item?.action?.onPress,
                } : null}
              />
            </View>
          )}
          numColumns={2}
          contentContainerStyle={{
            paddingTop: 64,
            width: Dimensions.get('window').width - (theme.padding.medium as number) * 2,
          }}
          ItemSeparatorComponent={() => (
            <View style={{ height: helpers.selectDevice({
              iPhone: 64,
              tablet: 120,
            }) }} />
          )}
          scrollEnabled={false}
        />
      </View>
    </NHMPage>
  );
}

const styles = StyleSheet.create({
  view: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  hint: {
    ...theme.font.normal,
    color: theme.color.additionalGrey50,
    textAlign: 'center',
    paddingVertical: theme.padding.normal,
  },
  item: {},
  right: {
    alignSelf: 'flex-end',
    marginLeft: 50,
  },
})
