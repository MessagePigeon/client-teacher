import service from './lib/axios.lib';

export type LoginRequest = { username: string; password: string };
export type LoginResponse = { token: string };

export type RegisterRequest = {
  username: string;
  name: string;
  password: string;
  registerCode: string;
};

export type InitResponse = { username: string; name: string };

export type StudentResponse = Array<{
  id: string;
  online: boolean;
  remark: string;
}>;

export type ConnectRequest = { connectCode: string; remark: string };

export type ConnectRequestResponse = {
  requestId: string;
  studentId: string;
  remark: string;
};

export type ModifyStudentRemarkRequest = {
  studentId: string;
  newRemark: string;
};

export type ModifyNameRequest = { newName: string };

export type ModifyPasswordRequest = {
  oldPassword: string;
  newPassword: string;
};

export type SendMessageRequest = {
  studentIds: string[];
  message: string;
  tts: number;
  closeDelay: number;
};

export type SendMessageResponse = {
  messageId: number;
  createdAt: string;
  message: string;
  studentIds: string[];
};

export class API {
  static async login(body: LoginRequest) {
    return await service.post<LoginResponse>('/login', body);
  }

  static async register(body: RegisterRequest) {
    return await service.post('/register', body);
  }

  static async init() {
    return await service.get<InitResponse>('/init');
  }

  static async getStudents() {
    return await service.get<StudentResponse>('/students');
  }

  static async connectStudent(body: ConnectRequest) {
    return await service.post<ConnectRequestResponse>('/connect-request', body);
  }

  static async modifyStudentRemark(body: ModifyStudentRemarkRequest) {
    return await service.patch('/student/remark', body);
  }

  static async deleteStudent(studentId: string) {
    return await service.delete('/student', { params: { studentId } });
  }

  static async modifyName(body: ModifyNameRequest) {
    return await service.patch('/name', body);
  }

  static async modifyPassword(body: ModifyPasswordRequest) {
    return await service.patch('/password', body);
  }

  static async sendMessage(body: SendMessageRequest) {
    return await service.post<SendMessageResponse>('/message', body);
  }
}
