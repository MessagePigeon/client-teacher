import { createAxiosService } from '@mpigeon/client-shared';
import {
  CreateStudentRequest,
  CreateStudentResponse,
  CreateTeacherRequest,
  CreateTeacherResponse,
  DeleteRegisterCodeRequest,
  BanStudentRequest,
  BanTeacherRequest,
  FindRegisterCodesResponse,
  FindStudentsRequest,
  FindStudentsResponse,
  FindTeachersRequest,
  FindTeachersResponse,
  GenerateRegisterCodesRequest,
  LoginRequest,
  LoginResponse,
  MessagesRequest,
  MessagesResponse,
  ModifyConnectionRequest,
  ModifyStudentRequest,
  ModifyTeacherNameRequest,
  PaginationRequest,
  ResetTeacherPasswordRequest,
  ResetTeacherPasswordResponse,
} from './types';

const service = createAxiosService(
  import.meta.env.VITE_MOCK
    ? '/mock'
    : `${import.meta.env.VITE_HTTP_URL}/admin`,
);

export class API {
  static async login(body: LoginRequest) {
    return await service.post<LoginResponse>('/login', body);
  }
  static async init() {
    return await service.get('/init');
  }
  static async getMessages(params: MessagesRequest) {
    return await service.get<MessagesResponse>('/messages', { params });
  }
  static async getRegisterCodes(params: PaginationRequest) {
    return await service.get<FindRegisterCodesResponse>(
      '/teacher/register-codes',
      { params },
    );
  }
  static async generateRegisterCodes(body: GenerateRegisterCodesRequest) {
    return await service.post('/teacher/register-codes', body);
  }
  static async deleteRegisterCodes(params: DeleteRegisterCodeRequest) {
    return await service.delete('/teacher/register-code', { params });
  }
  static async modifyConnection(
    body: ModifyConnectionRequest,
    action: 'connect' | 'disconnect',
  ) {
    return await service.post(`/${action}ion`, body);
  }
  static async createTeacher(body: CreateTeacherRequest) {
    return await service.post<CreateTeacherResponse>('/teacher', body);
  }
  static async getTeachers(params: FindTeachersRequest) {
    return await service.get<FindTeachersResponse>('/teachers', { params });
  }
  static async renameTeacher(body: ModifyTeacherNameRequest) {
    return await service.patch('/teacher/name', body);
  }
  static async resetTeacherPassword(body: ResetTeacherPasswordRequest) {
    return await service.patch<ResetTeacherPasswordResponse>(
      '/teacher/password',
      body,
    );
  }
  static async banTeacher(body: BanTeacherRequest) {
    return await service.patch('/teacher/ban', body);
  }
  static async getStudents(params: FindStudentsRequest) {
    return await service.get<FindStudentsResponse>('/students', { params });
  }
  static async createStudent(body: CreateStudentRequest) {
    return await service.post<CreateStudentResponse>('/student', body);
  }
  static async modifyStudent(body: ModifyStudentRequest) {
    return await service.patch('/student', body);
  }
  static async banStudent(body: BanStudentRequest) {
    return await service.patch('/student/ban', body);
  }
}
