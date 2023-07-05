import { StudentState } from "./student/StudentReducer";

export type State = {
  student: StudentState;
  schedule: any;
  courses: any;
  lessons: any;
  resources: any;
};

export function assignChange<T>(state: T, change: T) {
  return Object.assign({}, state, change);
}