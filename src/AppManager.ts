import Runner from './reduxes/Runner';
import logger from 'redux-logger';
import ScreenID from 'navigations/ScreenID';
import {
  CourseMainScreen,
  HomeMainScreen,
  ProfileMainScreen,
  ResourceMainScreen,
  ScheduleMainScreen,
} from 'screens';
import studentModule from 'reduxes/student/StudentModule';

export const ModuleID = {
  STUDENT_MODULE: 'student_module',
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

    // set up module
    this.modules[ModuleID.STUDENT_MODULE] = studentMol;

    if (__DEV__) {
      this.runner.addMiddleware(logger);
    }
    this.runner.run();
    this.store = this.runner.store;

    // presentation screens
    this.presentations[ScreenID.COURSE] = CourseMainScreen();
    this.presentations[ScreenID.HOME] = HomeMainScreen(studentMol);
    this.presentations[ScreenID.PROFILE] = ProfileMainScreen();
    this.presentations[ScreenID.RESOURCE] = ResourceMainScreen();
    this.presentations[ScreenID.SCHEDULE] = ScheduleMainScreen();
  }
}

export default new AppManager();