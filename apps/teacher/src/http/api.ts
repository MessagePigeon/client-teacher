import service from './lib/axios.lib';

type LoginRequest = { username: string; password: string };
type LoginResponse = { token: string };

type RegisterRequest = {
  username: string;
  name: string;
  password: string;
  registerCode: string;
};

type InitResponse = { username: string; name: string };

type StudentResponse = Array<{
  id: string;
  online: boolean;
  remark: string;
}>;

type ConnectRequest = { connectCode: string; remark: string };

type ConnectRequestResponse = {
  requestId: string;
  studentId: string;
  remark: string;
};

type ModifyStudentRemarkRequest = {
  studentId: string;
  newRemark: string;
};

type ModifyNameRequest = { newName: string };

type ModifyPasswordRequest = {
  oldPassword: string;
  newPassword: string;
};

type SendMessageRequest = {
  studentIds: string[];
  message: string;
  tts: number;
  closeDelay: number;
};

type SendMessageResponse = {
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
