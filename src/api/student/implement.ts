import caller, { ApiResponse } from "api/caller";
import IStudentAPI, { GetProfileRes, LogInReq, LogInRes, LogOutRes, SignUpReq } from "./request";

class StudentAPI implements IStudentAPI {
  logIn (req: LogInReq): Promise<ApiResponse<LogInRes>> {
    return caller.post('/student-users/login', req);
  };
  signUp (req: SignUpReq): Promise<ApiResponse<LogInRes>> {
    return caller.post('/student-users/signup', req);
  };
  getProfile (): Promise<ApiResponse<GetProfileRes>> {
    return caller.get('/student-users/profile');
  };
  logOut(): Promise<ApiResponse<LogOutRes>> {
    return caller.post('/student-users/logout');
  };
}

export default new StudentAPI();