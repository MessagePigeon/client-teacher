import service from './lib/axios.lib';
import {
  CloseMessageRequest,
  ConnectRequest,
  ConnectRequestResponse,
  InitResponse,
  LoginRequest,
  LoginResponse,
  MessagesResponse,
  ModifyNameRequest,
  ModifyPasswordRequest,
  ModifyStudentRemarkRequest,
  PaginationRequest,
  RegisterRequest,
  SendMessageRequest,
  SendMessageResponse,
  StudentResponse,
} from './types';

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

  static async getMessages(params: PaginationRequest) {
    return await service.get<MessagesResponse>('/messages', { params });
  }

  static async closeMessage(body: CloseMessageRequest) {
    return await service.post('/message-close', body);
  }
}
