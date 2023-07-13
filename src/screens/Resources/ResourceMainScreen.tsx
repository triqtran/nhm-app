import { View, StyleSheet, Text } from "react-native";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { State } from "reduxes/states";
import { NHMPage } from "core";
import { ResourceModule } from "reduxes/resources/ResourceModule";
import { StudentOwnerData } from "api/resources/request";
import { ErrorActionCall } from "reduxes/Action";

export default function ResourceMainScreen(resourceMol: ResourceModule) {
  function mapStateToProps (state: State) {
    return {
      data: resourceMol.selectors.mainData(state),
      loading: resourceMol.selectors.mainLoading(state),
      error: resourceMol.selectors.mainError(state),
    };
  }

  function mapDispatchToProps (dispatch: Dispatch) {
    return {
      getStudentOwner: resourceMol.actions.getStudentOwner.bindCreator(dispatch),
    };
  }

  return connect(mapStateToProps, mapDispatchToProps)(ResourceScreen);
}

type ResourceScreenProps = {
  data?: StudentOwnerData;
  loading?: boolean;
  error?: ErrorActionCall;
  getStudentOwner?: () => void;
}

function ResourceScreen ({
  data,
  loading,
  error,
  getStudentOwner,
}: ResourceScreenProps) {

  console.log('Owner Data:', data);

  return (
    <NHMPage
      refresh={loading}
      onRefresh={getStudentOwner}
      error={(error as string)}
    >
      <View style={styles.view}>
        <Text>{"Resource Screen"}</Text>
      </View>
    </NHMPage>
  );
}

const styles = StyleSheet.create({
  view: { flex: 1, alignItems: 'center', justifyContent: 'center' }
})
