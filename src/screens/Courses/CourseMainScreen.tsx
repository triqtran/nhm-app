import { View, StyleSheet, Text } from "react-native";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { State } from "reduxes/states";
import { NHMPage } from "core";

export default function CourseMainScreen() {
  function mapStateToProps (state: State) {
    return {};
  }

  function mapDispatchToProps (dispatch: Dispatch) {
    return {};
  }

  return connect(mapStateToProps, mapDispatchToProps)(CourseScreen);
}

function CourseScreen () {
  return (
    <NHMPage>
      <View style={styles.view}>
        <Text>{"Course Screen"}</Text>
      </View>
    </NHMPage>
  );
}

const styles = StyleSheet.create({
  view: { alignItems: 'center', justifyContent: 'center' }
})
