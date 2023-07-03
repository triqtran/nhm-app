import { Dispatch } from 'redux';

/* Simple workaround for environments lacking symbols support  */
const _Symbol = (label: string) =>
  global.Symbol !== undefined ? Symbol(label) : `__$Symbol(${label})`;

const $$initial = _Symbol('initial');

/**
 * Flow type for [Flux Standard Action]{@link https://github.com/acdlite/flux-standard-action}.
 */
export type ActionData<PayloadT> = {
  type: string;
  payload: PayloadT;
  error?: boolean;
  meta?: any;
};

type ActionHandler<StateT, PayloadT> = (
  state: StateT,
  payload: PayloadT,
) => StateT;
type ActionHandlerNoPayload<StateT> = (state: StateT) => StateT;
type ActionReducer<StateT, PayloadT> = (
  state: StateT,
  action: ActionData<PayloadT>,
) => StateT | undefined;

/**
 * Utility class for dealing with Redux actions. The instance of the class acts like an identifier
 * for action. Under the hood it stil uses string identifiers and follows
 * [Flux Standard Action]{@link https://github.com/acdlite/flux-standard-action}.
 *
 * @example
 * const todoAdded = new Action("todoAdded")
 *
 * // Dispatch
 * dispatch(todoAdded.action({ text: "Todo text" }))
 *
 * // Reducer
 * const reducer = Action.createReducer(
 *   Action.initial({ todos: [] }), // default initial value is { }
 *
 *   todoAdded.on((state, item) => ({ todos: [...state.todos, item] }))
 * )
 */
class Action<PayloadT> {
  type: string;
  error: boolean;

  /**
   * @param {string} type Type identifier for the action.
   * @param {boolean} error If true this action represents some error. The payloads will have
   * `error: true` as required by [Flux Standard Action]{@link https://github.com/acdlite/flux-standard-action}.
   */
  constructor(type: string, error?: boolean) {
    this.type = type;
    this.error = !!error;
  }

  /**
   * Combines all of the passed handlers to form a single reducer. Handlers can be a wrapped
   * handlers from [Action.on()]{@link Action#on} calls as well as regular reducer functions.
   *
   * The default initial value for reducer is `{ }` (empty object). It can be overridden with
   * [Action.initial()]{@link Action.initial}.
   *
   * If the first argument passed is a string, the resulting reducer will have all of the attached
   * handlers operating on the sub key of the passed state rather than on the state itself.
   *
   * @param {string=} subKey Sub key for handlers to operate on.
   * @param {function} args Handler functions to be combined into the single reducer.
   * @returns {function} Redux-compatible reducer function.
   */
  static createReducer(
    ...args: Array<Function | string>
  ): (state: any, action: any) => any {
    let actionHandlersAndInitalizers = args;
    let key: string;

    function isFunction(value: any): boolean {
      return typeof value === 'function';
    }

    if (!isFunction(args[0])) {
      if (typeof args[0] === 'string') {
        key = args[0] as string;
      }

      actionHandlersAndInitalizers = args.slice(1);
    }

    let initial: Function =
      (actionHandlersAndInitalizers.find(
        (h) => isFunction(h) && (h as any)[$$initial],
      ) as Function) || (() => ({}));
    let actionHandlers: Array<Function> = actionHandlersAndInitalizers.filter(
      (h) => isFunction(h) && !(h as any)[$$initial],
    ) as Array<Function>;

    return (state: any, action: any) => {
      let parentState: any;
      if (key) {
        parentState = state;
        state = state[key];
      }

      if (state === undefined) {
        state = initial();
      } else {
        actionHandlers.forEach((actionHandler) => {
          const newState = actionHandler(state, action);
          if (newState !== undefined) {
            state = newState;
          }
        });
      }

      if (parentState && key) {
        return Object.assign({}, parentState, { [key]: state });
      } else {
        return state;
      }
    };
  }

  /**
   * Pass the result of the call to [createReducer()]{@link Action.createReducer} to define the
   * initial value of the resulting reducer.
   * @param valueOrFunc If function is passed it will be called when reducer needs initial value.
   *   Otherwise provided value is used as is by the reducer.
   * @example
   * Action.createReducer(
   *   Action.initial({ foo: 'bar' })
   * )
   */
  static initial(valueOrFunc: any) {
    const func =
      typeof valueOrFunc === 'function' ? valueOrFunc : () => valueOrFunc;

    Object.defineProperty(func, $$initial, {
      value: true,
    });

    return func;
  }

  /**
   * Creates plain action object which can be passed to `dispatch()` function.
   * @param {string=} stage To use when creating the action object.
   * @param payload Payload to be attached to the action object.
   * @returns {Object} Plain action object.
   */
  create(payload?: PayloadT): ActionData<PayloadT> {
    let thePayload = payload as PayloadT;
    return !this.error
      ? { type: this.type, payload: thePayload }
      : { type: this.type, error: true, payload: thePayload };
  }

  bindCreator(dispatch: Dispatch): (payload: PayloadT) => any {
    return (payload: PayloadT) => dispatch(this.create(payload));
  }

  /**
   * Wraps the provided handler function into a condition check, so the function is only called
   * if it receives the action with type equal to one of this action. Stage is taken into account
   * if specified. Reducer function will receive only payload part of the action.
   * @param {stage=} stage Process actions of specified stage.
   * @param {function(state, payload)} handler Handler function.
   * @returns {function} Wrapper handler function.
   */
  on<StateT>(
    handler: ActionHandler<StateT, PayloadT> | ActionHandlerNoPayload<StateT>,
  ): ActionReducer<StateT, PayloadT> {
    return (state: StateT, action: ActionData<PayloadT>) => {
      if (action.type === this.type) {
        return (handler as ActionHandler<StateT, PayloadT>)(
          state,
          action.payload,
        );
      }
      return undefined;
    };
  }
}

export default Action;
