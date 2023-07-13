import { ResourcesState } from "./resources/ResourcesReducer";
import { StudentState } from "./student/StudentReducer";

export type State = {
  student: StudentState;
  schedule: any;
  courses: any;
  lessons: any;
  resources: ResourcesState;
};

export function assignChange<T>(state: T, change: T) {
  return Object.assign({}, state, change);
}