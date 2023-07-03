import { View, StyleSheet, Text } from "react-native";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { State } from "reduxes/states";
import { NHMPage, theme } from "core";
import { StudentModule } from "reduxes/student/StudentModule";
import { StudentType } from "api/student/request";
import { useEffect } from "react";

export default function HomeMainScreen(studentMol: StudentModule) {
  function mapStateToProps (state: State) {
    return {
      profile: studentMol.selectors.profile(state),
      loading: studentMol.selectors.loading(state),
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
  profile: StudentType | null | undefined;
  loading: boolean;
  getProfile: () => void;
}

function HomeScreen ({
  profile,
  loading,
  getProfile,
}: HomeScreenProps) {

  // useEffect(() => {
  //   getProfile();
  // }, []);

  return (
    <NHMPage>
      <View style={styles.view}>
        <Text style={styles.text}>{"Home Screen"}</Text>
      </View>
    </NHMPage>
  );
}

const styles = StyleSheet.create({
  view: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  text: theme.font.largeBold,
})
