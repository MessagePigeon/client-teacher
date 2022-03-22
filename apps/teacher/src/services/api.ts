import service from './lib/service.lib';

export type LoginBody = { username: string; password: string };
export type LoginResponse = { token: string };

export type RegisterBody = {
  username: string;
  name: string;
  password: string;
  registerCode: string;
};

export type InitResponse = { username: string; name: string };

export type StudentResponse = { id: string; online: boolean; remark: string };

export type ConnectRequestBody = { connectCode: string; remark: string };

export type ConnectRequestResponse = {
  requestId: string;
  studentId: string;
  remark: string;
};

export type ModifyStudentRemarkBody = { studentId: string; newRemark: string };

export type ModifyNameBody = { newName: string };

export type ModifyPasswordBody = { oldPassword: string; newPassword: string };

export class API {
  static async login(body: LoginBody) {
    return await service.post<LoginResponse>('/login', body);
  }

  static async register(body: RegisterBody) {
    return await service.post('/register', body);
  }

  static async init() {
    return await service.get<InitResponse>('/init');
  }

  static async getStudents() {
    return await service.get<StudentResponse[]>('/students');
  }

  static async connectStudent(body: ConnectRequestBody) {
    return await service.post<ConnectRequestResponse>('/connect-request', body);
  }

  static async modifyStudentRemark(body: ModifyStudentRemarkBody) {
    return await service.patch('/student/remark', body);
  }

  static async deleteStudent(studentId: string) {
    return await service.delete('/student', { params: { studentId } });
  }

  static async modifyName(body: ModifyNameBody) {
    return await service.patch('/name', body);
  }

  static async modifyPassword(body: ModifyPasswordBody) {
    return await service.patch('/password', body);
  }
}
