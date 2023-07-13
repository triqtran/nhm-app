import caller, { ApiResponse } from "api/caller";
import IStudentAPI, {
  ChangePasswordRes,
  ForgotPasswordReq,
  GetProfileRes,
  LogInReq,
  LogInRes,
  LogOutRes,
  ResetPasswordReq,
  SignUpReq,
} from "./request";

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
  forgotPassword(req: ForgotPasswordReq): Promise<ApiResponse<ChangePasswordRes>> {
    return caller.post('/student-users/forgot-password');
  };
  resetPassword(req: ResetPasswordReq): Promise<ApiResponse<ChangePasswordRes>> {
    return caller.post('/student-users/reset-password');
  };
}

export default new StudentAPI();