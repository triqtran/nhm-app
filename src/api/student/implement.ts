import caller, { ApiResponse } from "api/caller";
import IStudentAPI, { GetProfileRes, LogInReq, LogInRes, SignUpReq } from "./request";

class StudentAPI implements IStudentAPI {
  logIn (req: LogInReq): Promise<ApiResponse<LogInRes>> {
    return caller.post('/login', req);
  };
  signUp (req: SignUpReq): Promise<ApiResponse<LogInRes>> {
    return caller.post('/signup', req);
  };
  getProfile (): Promise<ApiResponse<GetProfileRes>> {
    return caller.get('/profile');
  };
}

export default new StudentAPI();