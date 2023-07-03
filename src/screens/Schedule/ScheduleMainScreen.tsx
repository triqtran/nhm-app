import { View, StyleSheet, Text } from "react-native";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { State } from "reduxes/states";
import { NHMPage } from "core";

export default function ScheduleMainScreen() {
  function mapStateToProps (state: State) {
    return {};
  }

  function mapDispatchToProps (dispatch: Dispatch) {
    return {};
  }

  return connect(mapStateToProps, mapDispatchToProps)(ScheduleScreen);
}

function ScheduleScreen () {
  return (
    <NHMPage>
      <View style={styles.view}>
        <Text>{"Schedule Screen"}</Text>
      </View>
    </NHMPage>
  );
}

const styles = StyleSheet.create({
  view: { alignItems: 'center', justifyContent: 'center' }
})
