import {
  legacy_createStore as createStore,
  applyMiddleware,
  combineReducers,
  Middleware,
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import { enableBatching } from 'redux-batched-actions';

export default class Runner {
  sagas: Array<() => Iterator<any>>;
  middleware: Array<Middleware<any, any, any>>;
  reducers: { [key: string]: (state: any, action: any) => any };
  store: any;

  constructor() {
    this.sagas = [];
    this.middleware = [];
    this.reducers = {};
  }

  clear() {
    this.store = null;
    this.sagas = [];
    this.middleware = [];
    this.reducers = {};
  }

  addSaga(saga: () => Iterator<any>) {
    this.sagas.push(saga);
  }

  addReducer(key: string, reducer: (state: any, action: any) => any) {
    if (!this.reducers) {
      this.reducers = {};
    }

    if (this.reducers[key]) {
      throw new Error(`Reducer for key "${key}" is already set`);
    }

    this.reducers[key] = reducer;
  }

  addMiddleware(middleware: Middleware<any, any, any>) {
    this.middleware.push(middleware);
  }

  run() {
    if (this.store) {
      throw new Error('Runner is already running');
    }

    if (!this.reducers) {
      console.warn('Runner was runned without reducers');
    }

    const rootReducer = combineReducers(this.reducers);

    const sagaMiddleware = createSagaMiddleware();
    const middleware = this.middleware.concat(sagaMiddleware);
    this.store = createStore(
      enableBatching(rootReducer),
      {},
      applyMiddleware(...middleware),
    );

    this.sagas.forEach((saga) => sagaMiddleware.run(saga));
  }
}
