import React, { useCallback, useMemo } from 'react';
import {
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
import { LearningJourney } from 'api/student/request';
import moment from 'moment';

export default function HomeMainScreen(studentMol: StudentModule) {
  function mapStateToProps (state: State) {
    return {
      journeys: studentMol.selectors.learningJourney(state),
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
  journeys: LearningJourney;
  loading: boolean;
  getProfile: () => void;
}

type ThumbItem = {
  image: ImageSourcePropType;
  label: string;
  hint?: string;
  detail?: React.ReactNode;
  action?: {
    color?: ColorType;
    hasGradient?: boolean;
    gradient?: Array<string>;
    onPress?: () => void;
    title?: string;
  }
};

function HomeScreen ({
  journeys,
  loading,
  getProfile,
}: HomeScreenProps) {

  const exploreScreen = useCallback((destScreen: string, params?: object) => {
    NavigationService.pushToScreen(destScreen, params);
  }, []);

  const thumbActions: Array<Array<ThumbItem>> = useMemo(() => {
    const timeline = journeys?.short_schedule || null;
    const fmtTime = moment(timeline.time, 'HH:mm:ss').format('HH:mm A');
    const fmtDate = moment(timeline.date, 'MM/DD/YYYY').format('MMM DD');
    const scheduleTime = `${fmtTime} ${fmtDate}`;
    const latestBook = journeys?.latest_book || null;
    const latestExercise = journeys?.latest_exercise || null;
    return [
      [
        {
          image: latestBook?.image
            ? { uri: latestBook?.image }
            : assets.images.imgBooks,
          label: i18n.BOOK,
          hint: i18n.BOOK_HINT,
          action: {
            color: 'wine',
            hasGradient: true,
            gradient: theme.color.gradientWine,
            onPress: () => exploreScreen(ScreenID.RESOURCE),
            title: latestBook?.title ? i18n.CONTINUE : i18n.EXPLORE,
          },
          detail: latestBook?.title
            ? (
              <View style={styles.vertical}>
                <Text style={styles.title}>
                  {latestBook?.title}
                </Text>
              </View>
            ) : null,
        },
        {
          image: latestExercise?.image
            ? { uri: latestExercise?.image }
            : assets.images.imgRubik,
          label: i18n.GAME,
          hint: i18n.GAME_HINT,
          action: {
            color: 'wine',
            hasGradient: true,
            gradient: theme.color.gradientWine,
            onPress: () => exploreScreen(ScreenID.RESOURCE),
            title: latestExercise?.title ? i18n.CONTINUE : i18n.PLAY,
          },
          detail: latestExercise?.title ? (
            <View style={styles.vertical}>
              <Text style={styles.title}>
                {latestExercise?.title}
              </Text>
              <Text style={styles.title}>
                {`${i18n.LEVEL} ${latestExercise?.current_level}/${latestExercise?.total_levels}`}
              </Text>
            </View>
          ) : null,
        },
      ],
      [
        {
          image: assets.images.imgCalendar,
          label: i18n.UPCOMING_CLASSES,
          hint: i18n.UPCOMING_CLASSES_HINT,
          detail: timeline
            ? (
              <View style={styles.vertical}>
                <Text style={styles.title}>{timeline?.course_title}</Text>
                <Text style={styles.title}>{scheduleTime}</Text>
              </View>
            ) : null,
          action: timeline
            ? {
              color: 'wine',
              hasGradient: true,
              gradient: theme.color.gradientWine,
              onPress: () => exploreScreen(ScreenID.RESOURCE),
              title: i18n.DETAIL,
            } : null,
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
              extra={left?.detail || (
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
              extra={right?.detail || (
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
};

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
  },
  title: {
    ...theme.font.medium,
    color: theme.color.additionalGrey,
    textAlign: 'center',
    paddingVertical: theme.padding.normal,
  },
  vertical: {
    flexDirection: 'column',
    alignItems: 'center',
  }
});
