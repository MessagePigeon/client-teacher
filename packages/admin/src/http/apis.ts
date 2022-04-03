import { createAxiosService } from '@mpigeon/client-shared';
import {
  DeleteRegisterCodeRequest,
  GenerateRegisterCodesRequest,
  LoginRequest,
  LoginResponse,
  MessagesRequest,
  MessagesResponse,
  PaginationRequest,
  RegisterCodeResponse,
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
    return await service.get<RegisterCodeResponse>('/teacher/register-codes', {
      params,
    });
  }
  static async generateRegisterCodes(body: GenerateRegisterCodesRequest) {
    return await service.post('/teacher/register-codes', body);
  }
  static async deleteRegisterCodes(params: DeleteRegisterCodeRequest) {
    return await service.delete('/teacher/register-code', { params });
  }
}
