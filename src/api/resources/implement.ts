import caller, { ApiResponse } from "api/caller";
import IResourceAPI, {
  GetExerciseGameDetailRes,
  GetStudentOwnerRes,
  ListBooksRes,
  ListExerciseGamesRes,
} from "./request";

class ResourceAPI implements IResourceAPI {
  getStudentOwner(): Promise<ApiResponse<GetStudentOwnerRes>> {
    return caller.get('/resources/student-owner');
  };
  listBooks(): Promise<ApiResponse<ListBooksRes>> {
    return caller.get('/resources/student-books');
  };
  listExerciseGames(): Promise<ApiResponse<ListExerciseGamesRes>> {
    return caller.get('/resources/student-games');
  };
  getBookDetail(bookId: number): Promise<ApiResponse<ListBooksRes>> {
    return caller.get(`/resources/student-books/${bookId}`);
  };
  getExerciseGameDetail(exgameId: number): Promise<ApiResponse<GetExerciseGameDetailRes>> {
    return caller.get(`/resources/student-games/${exgameId}`);
  };
}

export default new ResourceAPI();
