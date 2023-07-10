import {
  NavigationState,
  StackActions,
  CommonActions,
  createNavigationContainerRef,
  NavigationContainerRefWithCurrent,
} from '@react-navigation/native';
import { RootStackParamList } from './params';

function getActiveRouteName(state: NavigationState): string {
  const route = state.routes[state.index];

  if (route.state) {
    // Dive into nested navigators
    return getActiveRouteName(route.state as NavigationState);
  }

  return route.name;
}

class NavigationService {
  navigator: NavigationContainerRefWithCurrent<RootStackParamList> = null;
  currentRouterName: string = '';
  previousRouteName: string = '';

  constructor() {
    this.navigator = createNavigationContainerRef<
      RootStackParamList
    >();
    console.log('Initialize navigation:', this.navigator);
  }

  isLightStatus (screens: Array<string> = []) {
    if (!screens?.length) return false;
    return screens.includes(this.currentRouterName);
  }

  pushToScreen(routeName: string, params: any = null): void {
    if (!this.navigator) return;
    this.navigator.dispatch(
      CommonActions.navigate({
        name: routeName,
        params: params,
      }),
    );
  }

  forcePushScreen(routeName: string, params: any = null): void {
    this.navigator &&
      this.navigator.dispatch(StackActions.push(routeName, params));
  }

  replace(routeName: string, params: any = null): void {
    this.navigator &&
      this.navigator.dispatch(StackActions.replace(routeName, params));
  }

  popScreen(ntimes: number): void {
    this.navigator &&
      this.navigator.dispatch(StackActions.pop(ntimes));
  }

  popToTop(): void {
    this.navigator && this.navigator.dispatch(StackActions.popToTop());
  }

  goBack(): void {
    this.navigator && this.navigator.dispatch(CommonActions.goBack());
  }

  canGoback(): boolean {
    return this.navigator.canGoBack();
  }

  onNavigationStateChange = (state: NavigationState): boolean => {
    this.previousRouteName = this.currentRouterName;
    const currentScreen = getActiveRouteName(state);
    this.currentRouterName = currentScreen;
    return this.previousRouteName !== currentScreen;
  };

  updateParams(params: object): void {
    this.navigator.dispatch(
      CommonActions.setParams(params)
    );
  }
}

export default new NavigationService();
