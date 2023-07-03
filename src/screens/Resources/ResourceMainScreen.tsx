import { View, StyleSheet, Text } from "react-native";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { State } from "reduxes/states";
import { NHMPage } from "core";

export default function ResourceMainScreen() {
  function mapStateToProps (state: State) {
    return {};
  }

  function mapDispatchToProps (dispatch: Dispatch) {
    return {};
  }

  return connect(mapStateToProps, mapDispatchToProps)(ResourceScreen);
}

function ResourceScreen () {
  return (
    <NHMPage>
      <View style={styles.view}>
        <Text>{"Resource Screen"}</Text>
      </View>
    </NHMPage>
  );
}

const styles = StyleSheet.create({
  view: { flex: 1, alignItems: 'center', justifyContent: 'center' }
})
