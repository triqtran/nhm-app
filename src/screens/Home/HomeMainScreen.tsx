import React, { useCallback, useMemo } from 'react';
import {
  Dimensions,
  FlatList,
  ImageSourcePropType,
  ListRenderItem,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { State } from "reduxes/states";
import theme, { ColorType } from 'core/theme';
import { NHMPage, NHMThumbnail } from "core";
import { StudentModule } from "reduxes/student/StudentModule";
import HomeHeader from "./components/HomeHeader";
import assets from 'assets';
import { helpers, i18n } from 'common';
import NavigationService from 'navigations/NavigationService';
import ScreenID from 'navigations/ScreenID';

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

type HomeScreenProps = {
  loading: boolean;
  getProfile: () => void;
}

type ThumbItem = {
  image: ImageSourcePropType;
  label: string;
  hint?: string;
  action?: {
    color?: ColorType;
    hasGradient?: boolean;
    gradient?: Array<string>;
    onPress?: () => void;
    title?: string;
  }
};

function HomeScreen ({
  loading,
  getProfile,
}: HomeScreenProps) {

  const exploreScreen = useCallback((destScreen: string, params?: object) => {
    NavigationService.pushToScreen(destScreen, params);
  }, []);

  const thumbActions: Array<Array<ThumbItem>> = useMemo(() => {
    return [
      [
        {
          image: assets.images.imgBooks,
          label: i18n.BOOK,
          hint: i18n.BOOK_HINT,
          action: {
            color: 'wine',
            hasGradient: true,
            gradient: theme.color.gradientWine,
            onPress: () => exploreScreen(ScreenID.RESOURCE),
            title: i18n.CONTINUE,
          }
        },
        {
          image: assets.images.imgCalendar,
          label: i18n.UPCOMING_CLASSES,
          hint: i18n.UPCOMING_CLASSES_HINT,
        },
      ],
      [
        {
          image: assets.images.imgRubik,
          label: i18n.GAME,
          hint: i18n.GAME_HINT,
          action: {
            color: 'wine',
            hasGradient: true,
            gradient: theme.color.gradientWine,
            onPress: () => exploreScreen(ScreenID.RESOURCE),
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
    ];
  }, [exploreScreen]);

  const renderItem: ListRenderItem<Array<ThumbItem>> = useCallback(
    ({ item }: { item: Array<ThumbItem> }) => {
      if (!item) return;
      const [left, right] = item || [null, null];
      return (
        <View style={styles.horizontal}>
          {left && (
            <NHMThumbnail
              thumbImg={left.image}
              label={left.label}
              extra={(
                <Text style={styles.hint}>
                  {left.hint}
                </Text>
              )}
              pressAction={left?.action ? {
                variant: 'contained',
                color: left?.action?.color,
                size: 'small',
                title: left?.action?.title,
                hasGradient: left?.action?.hasGradient,
                gradient: left?.action?.gradient,
                onPress: left?.action?.onPress,
              } : null}
            />
          )}
          {right && (
            <NHMThumbnail
              thumbImg={right.image}
              label={right.label}
              extra={(
                <Text style={styles.hint}>
                  {right.hint}
                </Text>
              )}
              pressAction={right?.action ? {
                variant: 'contained',
                color: right?.action?.color,
                size: 'small',
                title: right?.action?.title,
                hasGradient: right?.action?.hasGradient,
                gradient: right?.action?.gradient,
                onPress: right?.action?.onPress,
              } : null}
            />
          )}
        </View>
      );
    },
    []
  );

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
          renderItem={renderItem}
          contentContainerStyle={styles.flatlist}
          ItemSeparatorComponent={() => (
            <View style={styles.separate} />
          )}
          scrollEnabled={false}
        />
      </View>
    </NHMPage>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hint: {
    ...theme.font.normal,
    color: theme.color.additionalGrey50,
    textAlign: 'center',
    paddingVertical: theme.padding.normal,
  },
  flatlist: {
    paddingTop: helpers.selectDevice({
      iPhone: 64,
      tablet: 100,
    }),
    paddingHorizontal: theme.padding.medium,
    width: helpers.selectDevice({
      iPhone: 360,
      tablet: 852,
    }),
  },
  horizontal: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  right: {
    alignSelf: 'flex-end',
    marginLeft: 50,
  },
  separate: {
    height: helpers.selectDevice({
      iPhone: 64,
      tablet: 120,
    }),
  }
})
