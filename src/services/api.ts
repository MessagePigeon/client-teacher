import service from './lib/service';

export type LoginRequestBody = { username: string; password: string };
export type LoginResponse = { token: string };

export type RegisterRequestBody = {
  username: string;
  name: string;
  password: string;
  registerCode: string;
};

export type InitResponse = { username: string; name: string };

export type StudentResponse = { id: string; online: boolean; remark: string };

export type ConnectRequestBody = { connectCode: string; remark: string };

export type ModifyStudentRemarkBody = { studentId: string; newRemark: string };

export type DeleteStudentBody = { studentId: string };
export class API {
  static async login(body: LoginRequestBody) {
    return await service.post<LoginResponse>('/login', body);
  }

  static async register(body: RegisterRequestBody) {
    return await service.post('/register', body);
  }

  static async init() {
    return await service.get<InitResponse>('/init');
  }

  static async getStudents() {
    return await service.get<StudentResponse[]>('/students');
  }

  static async connectStudent(body: ConnectRequestBody) {
    return await service.post('/connect-request', body);
  }

  static async modifyStudentRemark(body: ModifyStudentRemarkBody) {
    return await service.patch('/student/remark', body);
  }

  static async deleteStudent(studentId: string) {
    return await service.delete('/student', { params: { studentId } });
  }
}
