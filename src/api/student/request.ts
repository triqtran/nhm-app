import { ApiResponse } from "api/caller";

export type StudentStatusType = 'registered' | 'active' | 'suspended';

export const STUDENT_STATUS: { [k in StudentStatusType]: StudentStatusType } = {
  registered: 'registered',
  active: 'active',
  suspended: 'suspended',
}

export type StudentType = {
  id?: number;
  first_name: string;
  last_name: string;
  birthday: string;
  email: string;
  phone: string;
  status: StudentStatusType;
  password: string;
  ayotree_student_id?: number;
  ayotree_campus_id?: number;
  created_at: Date;
  updated_at?: Date;
}

export type LogInReq = {
  user_name: string;
  password: string;
}

export type LogInRes = {
  success: boolean;
  data: StudentType;
  token: string;
}

export type SignUpReq = {
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  username: string;
  password: string;
}

export type GetProfileRes = {
  success: boolean;
  data: StudentType;
}

export type LogOutRes = {
  success: boolean;
}

export default interface IStudentAPI {
  logIn: (req: LogInReq) => Promise<ApiResponse<LogInRes>>;
  signUp: (req: SignUpReq) => Promise<ApiResponse<LogInRes>>;
  getProfile: () => Promise<ApiResponse<GetProfileRes>>;
  logOut: () => Promise<ApiResponse<LogOutRes>>;
}