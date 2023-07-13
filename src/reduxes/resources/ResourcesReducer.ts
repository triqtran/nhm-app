import { BookType, ExerciseGameType, StudentOwnerData } from "api/resources/request"
import Action, { ErrorActionCall } from "reduxes/Action";
import { assignChange, State } from "reduxes/states";
import * as ResourcesAction from './ResourcesAction';

export type ResourcesState = {
  main?: {
    data?: StudentOwnerData;
    loading?: boolean;
    error?: ErrorActionCall;
  };
  book?: {
    list?: {
      data?: Array<BookType>;
      loading?: boolean;
      error?: ErrorActionCall;
    };
    detail?: {
      data?: BookType;
      loading?: boolean;
      error?: ErrorActionCall;
    };
  };
  exerciseGame?: {
    list?: {
      data?: Array<BookType>;
      loading?: boolean;
      error?: ErrorActionCall;
    };
    detail?: {
      data?: BookType;
      loading?: boolean;
      error?: ErrorActionCall;
    };
  };
};

const initState: ResourcesState = {
  main: {
    data: { current: [], books: [], games: [] },
    loading: false,
    error: null,
  },
  book: {
    list: { data: [], loading: false, error: null },
    detail: { data: null, loading: false, error: null },
  },
  exerciseGame: {
    list: { data: [], loading: false, error: null },
    detail: { data: null, loading: false, error: null },
  },
};

const resourceReducer = Action.createReducer(
  Action.initial(initState),

  ResourcesAction.getStudentOwner.on((state: ResourcesState) => {
    return assignChange(state, { main: { loading: true } });
  }),

  ResourcesAction.getStudentOwnerSuccess.on(
    (state: ResourcesState, payload: StudentOwnerData) => {
      return assignChange(state, {
        main: { loading: false, data: payload, error: null }
      });
    }
  ),

  ResourcesAction.getStudentOwnerFailed.on(
    (state: ResourcesState, payload: ErrorActionCall) => {
      return assignChange(state, {
        main: { loading: false, error: payload }
      });
    }
  ),

  ResourcesAction.listBooks.on((state: ResourcesState) => {
    return assignChange(state, {
      book: {
        ...state.book,
        list: { ...state?.book?.list, loading: true }
      }
    });
  }),

  ResourcesAction.listBooksSuccess.on(
    (state: ResourcesState, payload: Array<BookType>) => {
      return assignChange(state, {
        book: {
          ...state.book,
          list: { data: payload, loading: false, error: null }
        }
      });
    }
  ),

  ResourcesAction.listBooksFailed.on(
    (state: ResourcesState, payload: ErrorActionCall) => {
      return assignChange(state, {
        book: {
          ...state.book,
          list: { ...state?.book?.list, loading: false, error: payload }
        }
      });
    }
  ),

  ResourcesAction.getBookDetail.on((state: ResourcesState) => {
    return assignChange(state, {
      book: {
        ...state.book,
        detail: { ...state?.book?.detail, loading: true }
      }
    });
  }),

  ResourcesAction.getBookDetailSuccess.on(
    (state: ResourcesState, payload: BookType) => {
      return assignChange(state, {
        book: {
          ...state.book,
          detail: { data: payload, loading: false, error: null }
        }
      });
    }
  ),

  ResourcesAction.getBookDetailFailed.on(
    (state: ResourcesState, payload: ErrorActionCall) => {
      return assignChange(state, {
        book: {
          ...state.book,
          detail: { ...state?.book?.detail, loading: false, error: payload }
        }
      });
    }
  ),

  ResourcesAction.listExerciseGames.on((state: ResourcesState) => {
    return assignChange(state, {
      exerciseGame: {
        ...state.exerciseGame,
        list: { ...state?.exerciseGame?.list, loading: true }
      }
    });
  }),

  ResourcesAction.listExerciseGamesSuccess.on(
    (state: ResourcesState, payload: Array<ExerciseGameType>) => {
      return assignChange(state, {
        exerciseGame: {
          ...state.exerciseGame,
          list: { data: payload, loading: false, error: null }
        }
      });
    }
  ),

  ResourcesAction.listExerciseGamesFailed.on(
    (state: ResourcesState, payload: ErrorActionCall) => {
      return assignChange(state, {
        exerciseGame: {
          ...state.exerciseGame,
          list: { ...state?.exerciseGame?.list, loading: false, error: payload }
        }
      });
    }
  ),

  ResourcesAction.getlExerciseGameDetail.on((state: ResourcesState) => {
    return assignChange(state, {
      exerciseGame: {
        ...state.exerciseGame,
        detail: { ...state?.exerciseGame?.detail, loading: true }
      }
    });
  }),

  ResourcesAction.getlExerciseGameDetailSuccess.on(
    (state: ResourcesState, payload: ExerciseGameType) => {
      return assignChange(state, {
        exerciseGame: {
          ...state.exerciseGame,
          detail: { data: payload, loading: false, error: null }
        }
      });
    }
  ),

  ResourcesAction.getlExerciseGameDetailFailed.on(
    (state: ResourcesState, payload: ErrorActionCall) => {
      return assignChange(state, {
        exerciseGame: {
          ...state.exerciseGame,
          detail: { ...state?.exerciseGame?.detail, loading: false, error: payload }
        }
      });
    }
  ),

  ResourcesAction.clearBookDetail.on((state: ResourcesState) => {
    return assignChange(state, {
      book: {
        ...state.book,
        detail: { data: null, loading: false, error: null }
      }
    });
  }),

  ResourcesAction.clearExerciseGameDetail.on((state: ResourcesState) => {
    return assignChange(state, {
      exerciseGame: {
        ...state.exerciseGame,
        detail: { data: null, loading: false, error: null }
      }
    });
  }),
);

export const selectors = {
  mainData: (state: State) => state.resources.main?.data,
  mainLoading: (state: State) => state.resources.main?.loading,
  mainError: (state: State) => state.resources.main?.error,
  bookListData: (state: State) => state.resources.book?.list?.data,
  bookListLoading: (state: State) => state.resources.book?.list?.loading,
  bookListError: (state: State) => state.resources.book?.list?.error,
  bookDetailData: (state: State) => state.resources.book?.detail?.data,
  bookDetailLoading: (state: State) => state.resources.book?.detail?.loading,
  bookDetailError: (state: State) => state.resources.book?.detail?.error,
  exGameListData: (state: State) => state.resources.exerciseGame?.list?.data,
  exGameListLoading: (state: State) => state.resources.exerciseGame?.list?.loading,
  exGameListError: (state: State) => state.resources.exerciseGame?.list?.error,
  exGameDetailData: (state: State) => state.resources.exerciseGame?.detail?.data,
  exGameDetailLoading: (state: State) => state.resources.exerciseGame?.detail?.loading,
  exGameDetailError: (state: State) => state.resources.exerciseGame?.detail?.error,
}

export default resourceReducer;