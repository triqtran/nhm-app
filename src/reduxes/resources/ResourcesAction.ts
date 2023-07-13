import { BookType, ExerciseGameType, StudentOwnerData } from "api/resources/request";
import Action, { ErrorActionCall } from "reduxes/Action";


export const getStudentOwner: Action<void> = new Action('getStudentOwner');
export const getStudentOwnerSuccess: Action<StudentOwnerData> = new Action('getStudentOwnerSuccess');
export const getStudentOwnerFailed: Action<ErrorActionCall> = new Action('getStudentOwnerFailed');

export const listBooks: Action<void> = new Action('listBooks');
export const listBooksSuccess: Action<Array<BookType>> = new Action('listBooksSuccess');
export const listBooksFailed: Action<ErrorActionCall> = new Action('listBooksFailed');

export const listExerciseGames: Action<void> = new Action('listExerciseGames');
export const listExerciseGamesSuccess: Action<Array<ExerciseGameType>> = new Action('listExerciseGamesSuccess');
export const listExerciseGamesFailed: Action<ErrorActionCall> = new Action('listExerciseGamesFailed');

export const getBookDetail: Action<number> = new Action('getBookDetail');
export const getBookDetailSuccess: Action<BookType> = new Action('getBookDetailSuccess');
export const getBookDetailFailed: Action<ErrorActionCall> = new Action('getBookDetailFailed');

export const getlExerciseGameDetail: Action<number> = new Action('getlExerciseGameDetail');
export const getlExerciseGameDetailSuccess: Action<ExerciseGameType> = new Action('getlExerciseGameDetailSuccess');
export const getlExerciseGameDetailFailed: Action<ErrorActionCall> = new Action('getlExerciseGameDetailFailed');

export const clearBookDetail: Action<void> = new Action('clearBookDetail');
export const clearExerciseGameDetail: Action<void> = new Action('clearExerciseGameDetail');