import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { State } from "reduxes/states";
import { NHMButton, NHMPage } from "core";
import { StudentModule } from "reduxes/student/StudentModule";
import { StudentType } from "api/student/request";
import { helpers, i18n } from "common";
import ProfileHeader from "./components/ProfileHeader";
import ProfileActions from "./components/ProfileActions";

export default function ProfileMainScreen(studentMol: StudentModule) {
  function mapStateToProps (state: State) {
    return {
      data: studentMol.selectors.profileData(state),
      loading: studentMol.selectors.profileLoading(state),
      error: studentMol.selectors.profileError(state),
      logoutLoading: studentMol.selectors.logoutLoading(state),
      logoutError: studentMol.selectors.logoutError(state),
    };
  }
  function mapDispatchToProps (dispatch: Dispatch) {
    return {
      getProfile: studentMol.actions.getProfile.bindCreator(dispatch),
      logOut: studentMol.actions.logOut.bindCreator(dispatch),
    };
  }
  return connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
}

type ProfileScreenProps = {
  data: StudentType;
  loading?: boolean;
  error?: string;
  logoutLoading?: boolean;
  logoutError?: string;
  getProfile: () => void;
  logOut: () => void;
}

function ProfileScreen ({
  data,
  loading = false,
  error,
  logoutLoading = false,
  logoutError,
  getProfile,
  logOut,
}: ProfileScreenProps) {

  return (
    <NHMPage
      noScroll
      noFirstRefresh
      refresh={loading}
      onRefresh={getProfile}
      error={error || logoutError}
    >
      <View style={styles.view}>
        <View style={styles.body}>
          <ProfileHeader name={`${data?.first_name} ${data?.last_name}`} />
          <View style={styles.separate} />
          <ProfileActions />
          <View style={styles.separate} />
          <View>
            <NHMButton
              variant="outlined-transparent"
              title={i18n.LOGOUT}
              loading={logoutLoading}
              onPress={logOut}
            />
          </View>
        </View>
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
  body: {
    width: helpers.selectDevice({
      iPhone: 327,
      tablet: 451,
    }),
    height: '80%',
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  separate: { height: 20 },
})
