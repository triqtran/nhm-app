import { Provider } from "react-redux";
import ScreenManager from "navigations/ScreenManager";
import AppManager from "./AppManager";
import { ForceUpdate, InAppMessage, NetworkState } from "./providers";

export default function App () {
  AppManager.start();

  return (
    <Provider store={AppManager.store}>
      <ForceUpdate />
      <InAppMessage />
      <NetworkState />
      <ScreenManager />
    </Provider>
  )
}
