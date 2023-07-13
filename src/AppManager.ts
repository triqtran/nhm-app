import Runner from './reduxes/Runner';
import logger from 'redux-logger';
import ScreenID from 'navigations/ScreenID';
import {
  CourseMainScreen,
  ForgotPasswordMainScreen,
  HomeMainScreen,
  LoginMainScreen,
  ProfileMainScreen,
  ResetPasswordMainScreen,
  ResourceMainScreen,
  ScheduleMainScreen,
  SentEmailMainScreen,
  SignUpMainScreen,
  SplashMainScreen,
  WelcomeMainScreen,
} from 'screens';
import studentModule from 'reduxes/student/StudentModule';
import resourceModule from 'reduxes/resources/ResourceModule';

export const ModuleID = {
  STUDENT_MODULE: 'student_module',
  RESOURCE_MODULE: 'resource_module',
}

class AppManager {
  modules: any = {};
  store: any;
  presentations: any = {};
  runner = new Runner();

  start() {
    this.runner.clear();
    // initial module
    const studentMol = studentModule(this.runner);
    const resourceMol = resourceModule(this.runner);

    // set up module
    this.modules[ModuleID.STUDENT_MODULE] = studentMol;
    this.modules[ModuleID.RESOURCE_MODULE] = resourceMol;

    if (__DEV__) {
      this.runner.addMiddleware(logger);
    }
    this.runner.run();
    this.store = this.runner.store;

    // presentation screens
    this.presentations[ScreenID.COURSE] = CourseMainScreen();
    this.presentations[ScreenID.FORGOT] = ForgotPasswordMainScreen(studentMol);
    this.presentations[ScreenID.HOME] = HomeMainScreen(studentMol);
    this.presentations[ScreenID.LOGIN] = LoginMainScreen(studentMol);
    this.presentations[ScreenID.PROFILE] = ProfileMainScreen(studentMol);
    this.presentations[ScreenID.RESET] = ResetPasswordMainScreen(studentMol);
    this.presentations[ScreenID.RESOURCE] = ResourceMainScreen(resourceMol);
    this.presentations[ScreenID.SCHEDULE] = ScheduleMainScreen();
    this.presentations[ScreenID.SENTEMAIL] = SentEmailMainScreen();
    this.presentations[ScreenID.SIGNUP] = SignUpMainScreen(studentMol);
    this.presentations[ScreenID.SPLASH] = SplashMainScreen(studentMol);
    this.presentations[ScreenID.WELCOME] = WelcomeMainScreen();
}
}

export default new AppManager();